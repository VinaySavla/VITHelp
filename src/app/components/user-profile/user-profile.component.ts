import { StatusService } from 'src/app/providers/status/status.service';
import { ActivatedRoute } from '@angular/router';
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
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
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
    private statusService: StatusService,
    private googleService: GoogleMapsService
    ) {}

  ngOnInit() {
    this.keystore.get("User").then(user => {
      this.serviceRole = user;
  });
  this.keystore.get("phnNo").then(phnNo => {
    this.signUpForm.value.phone= phnNo;
    this.phoneNo = phnNo;
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
        CountryCode:this.countryCode,
        PhoneNumber: this.phoneNo,
        Age: this.signUpForm.controls.age.value,
        address: this.signUpForm.value.address.formattedAddress,
        lat: this.signUpForm.value.address.lat,
        lng: this.signUpForm.value.address.lng,
        Food: this.checkBoxList['0'].isChecked?"1":"0",
        Clothing: this.checkBoxList['1'].isChecked?"1":"0",
        Shelter: this.checkBoxList['2'].isChecked?"1":"0",
        Medical: this.checkBoxList['3'].isChecked?"1":"0",
        serviceRole: this.serviceRole,
        isServiceRoleSelected: true,
        isUserServiceActive: this.signUpForm.controls.isUserServiceActive.value,
        profession : this.signUpForm.controls.profession.value
  
      };

      
      if (
        this.serviceRole === "Volunteer"
        ) {
          data.profession = this.signUpForm.controls.profession.value;
        }
        
        await this.commonPopover.loaderPresent('Updating user profile.');
       try{

         this.statusService.userData(data);
       }
       catch(error)
       {
         console.log(error);
       }
        
        
   
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
