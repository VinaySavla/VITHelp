import { Injectable } from "@angular/core";
import { CommonPopoverService } from "../common-popover/common-popover.service";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Platform } from "@ionic/angular";
declare var google: any;

@Injectable({
  providedIn: "root"
})
export class GoogleMapsService {
  constructor(
    private commonPopover: CommonPopoverService,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform
  ) {}

  /**
   * Get current position
   */
  async getCurrentPosition() {
    return new Promise<any>((resolve, reject) => {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(
          position => {
            this.textAddressOfLocation(
              position.coords.latitude,
              position.coords.longitude
            )
              .then(data => resolve(data))
              .catch(err => reject(err));
          },
          err => {
            this.commonPopover.toastPopOver(err);
            console.log(err);
            reject({});
          },
          { enableHighAccuracy: true }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });
  }

  /**
   * Find formatted address of lat-lng
   * @param lat
   * @param lng
   */
  async textAddressOfLocation(lat, lng) {
    return new Promise<any>((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      let latlng = { lat: lat, lng: lng };
      let that = this;
      geocoder.geocode({ location: latlng }, function(results) {
        if (results[0]) {
          let data = {
            lat: lat,
            lng: lng,
            formattedAddress: results[0].formatted_address
          };
          resolve(data);
        } else {
          console.log("No results found");
          this.commonPopover.toastPopOver("No results found");
          reject({});
        }
      });
    });
  }

  //Check if application having GPS access permission
  async checkGPSPermission() {
    return new Promise<any>((resolve, reject) => {
      this.androidPermissions
        .checkPermission(
          this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
        )
        .then(
          result => {
            if (result.hasPermission) {
              //If having permission show 'Turn On GPS' dialogue
              this.askToTurnOnGPS()
                .then(data => resolve(data))
                .catch(err => reject(err));
            } else {
              //If not having permission ask for permission
              this.requestGPSPermission()
                .then(data => resolve(data))
                .catch(err => reject(err));
            }
          },
          err => {
            this.commonPopover.toastPopOver(err);
            console.log(err);
            reject({});
          }
        );
    });
  }

  async requestGPSPermission() {
    return new Promise<any>((resolve, reject) => {
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
                this.askToTurnOnGPS()
                  .then(data => resolve(data))
                  .catch(err => reject(err));
              },
              error => {
                //Show alert if user click on 'No Thanks'
                this.commonPopover.toastPopOver(error);
                console.log(error);
                reject({});
              }
            );
        }
      });
    });
  }

  async askToTurnOnGPS() {
    return new Promise<any>((resolve, reject) => {
      this.locationAccuracy
        .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        .then(
          () => {
            // When GPS Turned ON call method to get Accurate location coordinates
            this.getLocationCoordinates()
              .then(data => resolve(data))
              .catch(err => reject(err));
          },
          error => {
            this.commonPopover.toastPopOver(error);
            console.log(error);
            reject({});
          }
        );
    });
  }

  // Methos to get device accurate coordinates using device GPS
  async getLocationCoordinates() {
    return new Promise<any>((resolve, reject) => {
      this.geolocation
        .getCurrentPosition()
        .then(position => {
          this.textAddressOfLocation(
            position.coords.latitude,
            position.coords.longitude
          )
            .then(data => resolve(data))
            .catch(err => reject(err));
        })
        .catch(error => {
          this.commonPopover.toastPopOver(error);
          console.log(error);
          reject({});
        });
    });
  }
}
