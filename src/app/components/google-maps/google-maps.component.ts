import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { constants } from "src/app/constants/constants";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform } from "@ionic/angular";
import { UserService } from "src/app/providers/user/user.service";
declare let google: any;
@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.scss"]
})
export class GoogleMapsComponent implements OnInit {
  // @ViewChild("search", { static: false }) searchElementRef: ElementRef;
  @ViewChild("gmap", { static: false }) gmapElement: any;
  map: any;
  marker: any;
  infoWindow: any;
  lat: any;
  lng: any;
  defaultLat: number = 28.6304;
  defaultLng: number = 77.2177;
  searchBox: any;
  @Input() isEdit: boolean;
  @Input() editData: any;
  @Input() searchPlace: any;
  @Output() getLatLng: EventEmitter<any> = new EventEmitter();
  option = {
    skip: "",
    limit: "",
    keyword: "",
    sort: "",
    order: ""
  };
  constructor(
    private commonPopover: CommonPopoverService,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    private userService: UserService
  ) {}
  showGeoLocationIcon: boolean = false;
  ngOnInit() {}
  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  /**
   * Initise Map
   */
  initMap() {
    let mapProp = {
      center: new google.maps.LatLng(this.defaultLat, this.defaultLng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      myLocationButton: true
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    // Create the search-box & my-location and link them it to the UI element.
    // let input = document.getElementById("search-input");
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // let location = document.getElementById("my-location");
    // this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(location);
    // this.showGeoLocationIcon = true;
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.defaultLat, this.defaultLng),
      map: this.map
      // animation: google.maps.Animation.DROP
    });

    //Current location
    if (this.platform.is("cordova")) {
      this.checkGPSPermission();
    } else {
      this.getCurrentPosition();
    }

    //Create and open InfoWindow.
    this.infoWindow = new google.maps.InfoWindow();

    // this.searchBox = new google.maps.places.Autocomplete(
    //   this.searchElementRef.nativeElement
    // );
  }

  /**
   * Adds a marker to the map.
   * @param location
   */
  addMarker(location) {
    // if marker exists and has a .setMap method, hide it
    if (this.marker && this.marker.setMap) {
      this.marker.setMap(null);
    }
    // Add the marker at the clicked location
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map
      // animation: google.maps.Animation.DROP
    });
  }

  /**
   * Get current position
   */
  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.showPosition(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        err => {
          console.log(err);
          this.commonPopover.toastPopOver(err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      // alert("Geolocation is not supported by this browser.");
      console.log("Geolocation is not supported by this browser.");
    }
  }

  /**
   * To show position
   * @param lat
   * @param lng
   */
  showPosition(lat, lng) {
    let location = new google.maps.LatLng(lat, lng);
    this.map.panTo(location);
    this.addMarker(location);
    this.getPosition(lat, lng);
    this.nearbySearch(lat, lng, [constants.googleMaps.places.HOSPITAL]);
    this.textSearch(lat, lng, constants.googleMaps.places.MARKET);
    this.fetchUser();
  }

  /**
   * Search location.
   */
  public searchAddress() {
    this.searchBox.addListener("place_changed", () => {
      // get the place result
      let place = this.searchBox.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      let location = new google.maps.LatLng(this.lat, this.lng);
      this.map.panTo(location);
      this.addMarker(location);
      this.getPosition(this.lat, this.lng);
    });
  }

  /**
   * Emit to lat-lng to location screen
   * @param lat
   * @param lng
   */
  getPosition(lat, lng) {
    this.getLatLng.emit({ lat: lat, lng: lng });
  }

  /**
   * Search place by nearbySearch
   * https://developers.google.com/places/web-service/supported_types#table1
   * @param lat
   * @param lng
   * @param placeArray
   */
  nearbySearch(lat, lng, placeArray) {
    let pyrmont = { lat: lat, lng: lng };

    // Create the places service.
    let service = new google.maps.places.PlacesService(this.map);

    // Perform a nearby search.
    let request = {
      location: pyrmont,
      radius: constants.googleMaps.radius,
      types: placeArray // this is where you set the map to get the hospitals and health related places
    };
    let that = this;

    service.nearbySearch(request, function(results, status, pagination) {
      if (status !== "OK") return;
      that.createMarkers(results);
    });
  }

  /**
   * Search place by textSearch
   * https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests
   * @param lat
   * @param lng
   * @param place
   */
  textSearch(lat, lng, place) {
    let pyrmont = { lat: lat, lng: lng };
    let that = this;
    // Create the places service.
    let service = new google.maps.places.PlacesService(this.map);
    let requests = {
      location: pyrmont,
      radius: constants.googleMaps.radius,
      query: place
    };

    service.textSearch(requests, function(results, status, pagination) {
      if (status !== "OK") return;
      that.createMarkers(results);
    });
  }

  /**
   * Create marker on map
   * @param places
   */
  createMarkers(places) {
    let bounds = new google.maps.LatLngBounds();

    for (let i = 0, place; (place = places[i]); i++) {
      let image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      let name = place.name;
      let address = place.formatted_address || place.vicinity;
      let mapUrl = `https://maps.google.com/?q=${name},${address}`;
      this.placeMarker(name, address, mapUrl, image, place.geometry.location);
      bounds.extend(place.geometry.location);
    }
    this.map.fitBounds(bounds);
  }

  //Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        result => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        err => {
          this.commonPopover.toastPopOver(err);
          console.log(err);
        }
      );
  }

  /**
   * Method to request GPS permission
   */
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              this.commonPopover.toastPopOver(error);
              console.log(error);
            }
          );
      }
    });
  }

  /**
   * Method to ask to turn on GPS
   */
  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLocationCoordinates();
        },
        error => {
          this.commonPopover.toastPopOver(error);
          console.log(error);
        }
      );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation
      .getCurrentPosition()
      .then(position => {
        this.showPosition(position.coords.latitude, position.coords.longitude);
      })
      .catch(error => {
        this.commonPopover.toastPopOver(error);
        console.log(error);
      });
  }

  /**
   * Fetch User details with in radius
   */
  fetchUser() {
    this.userService
      .getUserWihtinRadius(this.option)
      .then(res => {
        this.createMarkersUser(res.items);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Create marker on map
   * @param places
   */
  createMarkersUser(places) {
    let bounds = new google.maps.LatLngBounds();

    for (let i = 0, place; (place = places[i]); i++) {
      let image = {
        url: "assets/images/VIT-logo.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 50)
      };

      let name = place.name || "CovitUser";
      let address = place.address.formattedAddress;
      let mapUrl = `https://maps.google.com/?q=${address}`;
      let location = new google.maps.LatLng(
        place.address.lat,
        place.address.lng
      );
      this.placeMarker(name, address, mapUrl, image, location);
      bounds.extend(location);
    }
    this.map.fitBounds(bounds);
  }

  /**
   * Place Marker on Map
   * @param name
   * @param address
   * @param mapUrl
   * @param icon
   * @param location
   */
  placeMarker(name, address, mapUrl, icon, location) {
    let contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">' +
      name +
      "</h1>" +
      '<div id="bodyContent">' +
      "<p>" +
      address +
      "</p>" +
      "<div class='view-link'><a target='_blank' href='" +
      mapUrl +
      "'><span>View On Map</span></a></div>";
    "</div>" + "</div>";

    let marker = new google.maps.Marker({
      map: this.map,
      icon: icon,
      title: name,
      position: location
    });
    google.maps.event.addListener(marker, "click", event => {
      this.infoWindow.setContent(contentString);
      this.infoWindow.open(this.map, marker);
    });
  }
}
