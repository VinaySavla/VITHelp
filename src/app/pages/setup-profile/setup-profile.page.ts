import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { StorageProvider } from 'src/app/providers/storage/storage.service';
import { constants } from 'src/app/constants/constants';
import { NetworkConnectionService } from 'src/app/providers/network-connection/network-connection.service';
import { CommonPopoverService } from 'src/app/providers/common-popover/common-popover.service';
import _ from 'lodash';
import { GoogleMapsService } from 'src/app/providers/google-maps/google-maps.service';
import axios from 'axios';


@Component({
  selector: "app-setup-profile",
  templateUrl: "./setup-profile.page.html",
  styleUrls: ["./setup-profile.page.scss"]
})
export class SetupProfilePage implements OnInit {
  noDataText = 'Unable to find profile.';
  @Input() serviceRole: string;
  title = 'Profile';
  tempArray = new Array(8);
  isIndeterminate: boolean;
  ionicForm: FormGroup;
  masterCheck: boolean;
  selectedList = [];
  selectedRadio: any;
  isAllSelected = false;
  isLoading = false;
  signUpForm: any;
  userInfo: any;
  userReg: any;
  volunteer = "Volunteer";
  distressed = "Distressed";
  phoneNo: any;
  countryCode: any;
  checkBoxList: any = constants.checkBoxList;
  sosReason:any;
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private keystore: StorageProvider,
    private networkConnection: NetworkConnectionService,
    private commonPopover: CommonPopoverService,
    private googleService: GoogleMapsService
    ) {}

  ngOnInit() {
    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
    this.keystore.set("isSignUpPage", true);
  });
  this.keystore.get("PhoneNumber").then(PhoneNumber => {
    this.signUpForm.value.phone= PhoneNumber;
    this.phoneNo = PhoneNumber;
});
this.keystore.get("countryCode").then(countryCode => {
  this.signUpForm.value.countryCode= countryCode;
  this.countryCode = countryCode;
});
  this.signUpForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    countryCode: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]
    ],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
    ],
    age: ['', [Validators.required, Validators.pattern(/^[20-55]{1,2}$/)]],
    profession: ['', [Validators.required]],
    address: this.formBuilder.group({
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      formattedAddress: [
        '',
        [Validators.required]
      ]
    }),
    serviceRole: ['', [Validators.required]],
    supportList: [''],
    isServiceRoleSelected: [''],
    isUserServiceActive: [
      true,
      [Validators.required]
    ],
    sosReason: ['']
  });
  }
   /**
   * CheckBox
   * @param event
   */
    checkMaster(event) {
      setTimeout(() => {
        this.checkBoxList.forEach((obj: { isChecked: boolean }) => {
          obj.isChecked = this.masterCheck;
        });
      });
    }
  
    /**
     * Check box event
     */
    checkEvent() {
      const totalItems = this.checkBoxList.length;
      let checked = 0;
      this.checkBoxList.map((obj: { isChecked: any }) => {
        if (obj.isChecked) { checked++; }
      });
      if (checked > 0 && checked < totalItems) {
        // If even one item is checked but not all
        this.isIndeterminate = true;
        this.masterCheck = false;
      } else if (checked === totalItems) {
        // If all are checked
        this.masterCheck = true;
        this.isIndeterminate = false;
      } else {
        // If none is checked
        this.isIndeterminate = false;
        this.masterCheck = false;
      }
    }
  
    /**
     * Select radio
     * @param value
     */
    selectRadio(value) {
      this.selectedRadio = value;
    }
  
    /**
     * Save user info
     */
    async saveUserInfo() {
      console.log('User  Profile Component | saveUserInfo()');
      if (this.networkConnection.isOffline()) {
        return this.networkConnection.isConnectionMessage();
      }
  
      let list = _.filter(this.checkBoxList, { isChecked: true });
      list = _.map(list, 'value');

      const data = {
        Name: this.signUpForm.controls.name.value,
        CountryCode:this.signUpForm.controls.countryCode.value,
        PhoneNumber: this.signUpForm.controls.phone.value,
        Age: this.signUpForm.controls.age.value,
        address: this.signUpForm.value.address.formattedAddress,
        Lat: this.signUpForm.value.address.lat,
        Lng: this.signUpForm.value.address.lng,
        // serviceRole: this.serviceRole,
        isUserServiceActive: this.signUpForm.controls.isUserServiceActive.value,
        Profession : this.signUpForm.controls.profession.value
  
      };
      console.log(JSON.stringify(data));
    //   const headers = { 
    //     'Content-Type': 'application/json'
    // };
      
      if (
        this.serviceRole === "Volunteer"
        ) {
          data.Profession = this.signUpForm.controls.profession.value;
        }
        
        await this.commonPopover.loaderPresent('Updating user profile.');
        // axios.post('http://localhost:3001/data/userData',data,{headers})
        // .then(response=>console.log(response))
  
  
    //   if(this.serviceRole=="Volunteer"){
    //   var voluntData = new FormData;
    //   voluntData.append('cntrCode', this.countryCode);
    //   voluntData.append('fName', this.signUpForm.value.name);
    //   voluntData.append('phnno', this.phoneNo);
    //   voluntData.append('Age', this.signUpForm.value.age);
    //   voluntData.append('prof', this.signUpForm.value.profession);
    //   voluntData.append('addr', this.signUpForm.value.address.formattedAddress);
    //   voluntData.append('lat', this.signUpForm.value.address.lat);
    //   voluntData.append('lng', this.signUpForm.value.address.lng);
    //   voluntData.append('available', this.signUpForm.value.isUserServiceActive?"1":"0");
    //   voluntData.append('myFood', this.checkBoxList['0'].isChecked?"1":"0");
    //   voluntData.append('myCloth', this.checkBoxList['1'].isChecked?"1":"0");
    //   voluntData.append('myShelt', this.checkBoxList['2'].isChecked?"1":"0");
    //   voluntData.append('myMedic', this.checkBoxList['3'].isChecked?"1":"0");
    //   this.crudService.addVolunteer(voluntData);
    //   }
    //   if(this.serviceRole=="Distressed"){
    //     var distressData = new FormData;
    //   distressData.append('cntrCode', this.countryCode);
    //   distressData.append('fName', this.signUpForm.value.name);
    //   distressData.append('phoneno', this.phoneNo);
    //   distressData.append('Age',this.signUpForm.value.age);
    //   distressData.append('addr', this.signUpForm.value.address.formattedAddress);
    //   distressData.append('lat', this.signUpForm.value.address.lat);
    //   distressData.append('lng', this.signUpForm.value.address.lng);
    //   distressData.append('available', this.signUpForm.value.isUserServiceActive?"1":"0");
    //   distressData.append('sosReason',this.signUpForm.value.sosReason);
    //   this.crudService.addDistressed(distressData);
    //   // console.log(this.signUpForm.value.address.formattedAddress);
    // }
    this.commonPopover.loaderDismiss();
    this.router.navigate(['/home/map']);
  }
  async getCurrentPosition() {
    await this.commonPopover.loaderPresent('Fetching current location');
    const address = await this.googleService.getCurrentPosition();
    this.commonPopover.loaderDismiss();
    if (!_.isEmpty(address)) {
      // Set value of lat-lng,formatted_address
      this.signUpForm.patchValue({
        address: {
          lat: address.lat,
          lng: address.lng,
          formattedAddress: address.formattedAddress
        }
      });
    }
  }
}
