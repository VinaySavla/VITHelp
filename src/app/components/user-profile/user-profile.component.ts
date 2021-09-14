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
  signUpForm: FormGroup;
  userData: any;
  userReg: any;
  volunteer = "Volunteer";
  distressed = "Distressed";
  phoneNumber: any;
  countryCode: any;
  checkBoxList: any = constants.checkBoxList;
  sosReason: any;
  isExistingUser: Boolean = false;

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
  ) { }

  ngOnInit() {
    this.getUser();

    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
    });

  }



  async getUser() {
    this.isLoading = true;
    const phoneNumber = await this.keystore.get('PhoneNumber');
    this.statusService.getUser(phoneNumber).then(res => {
      this.userData = res
      console.log(this.userData);
      this.isLoading = false;
      if ((this.userData.users && typeof this.userData.users != "undefined" && this.userData.users != null && this.userData.users.length != null && this.userData.users.length > 0)) {
        this.isExistingUser = true;
        console.log(this.userData.users[0])
        this.signUpForm = this.formBuilder.group({
          name: [this.userData.users[0].Name || '', [Validators.required]],
          countryCode: [
            this.userData.users[0].CountryCode || '',
            [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]
          ],
          phone: [
            this.userData.users[0].PhoneNumber || '',
            [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
          ],
          age: [this.userData.users[0].Age || '', [Validators.required, Validators.pattern(/^[0-9]{2}$/), Validators.min(20), Validators.max(55)]],
          profession: [this.userData.users[0].Profession || ''],
          address: this.formBuilder.group({
            lat: [this.userData.users[0].Lat || '', [Validators.required]],
            lng: [this.userData.users[0].Lng || '', [Validators.required]],
            formattedAddress: [
              this.userData.users[0].Address || '',
              [Validators.required]
            ]
          }),
          serviceRole: [this.userData.users[0].serviceRole || ''],
          isServiceRoleSelected: [this.userData.users[0].isServiceRoleSelected || ''],
          isUserServiceActive: [
            this.userData.users[0].isUserServiceActive || true
          ],
        });
      }
      else {
        this.isExistingUser = false;
        this.isLoading = false;
        this.keystore.get("PhoneNumber").then(PhoneNumber => {
          this.signUpForm.value.phone = PhoneNumber;
          this.phoneNumber = PhoneNumber;
        });
        this.keystore.get("countryCode").then(countryCode => {
          this.signUpForm.value.countryCode = countryCode;
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
          age: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/), Validators.min(20), Validators.max(55)]],
          profession: [''],
          address: this.formBuilder.group({
            lat: ['', [Validators.required]],
            lng: ['', [Validators.required]],
            formattedAddress: [
              '',
              [Validators.required]
            ]
          }),
          serviceRole: [''],
          isServiceRoleSelected: [''],
          isUserServiceActive: [
            true
          ],
        });
      }
    })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
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
    if (this.signUpForm.valid) {
      console.log('User  Profile Component | saveUserInfo()');
      if (this.networkConnection.isOffline()) {
        return this.networkConnection.isConnectionMessage();
      }

      let list = _.filter(this.checkBoxList, { isChecked: true });
      list = _.map(list, 'value');

      const data = {
        Name: this.signUpForm.controls.name.value,
        CountryCode: this.countryCode || this.userData.users[0].CountryCode,
        PhoneNumber: parseInt(this.phoneNumber) || this.userData.users[0].PhoneNumber,
        Age: this.signUpForm.controls.age.value,
        Address: this.signUpForm.value.address.formattedAddress,
        Lat: this.signUpForm.value.address.lat,
        Lng: this.signUpForm.value.address.lng,
        // serviceRole: this.serviceRole,
        isUserServiceActive: this.signUpForm.controls.isUserServiceActive.value,
        Profession: this.signUpForm.controls.profession.value
      };


      if (
        this.serviceRole === "Volunteer"
      ) {
        data.Profession = this.signUpForm.controls.profession.value;
      }

      await this.commonPopover.loaderPresent('Updating User Profile.');
      this.keystore.get("isSignUpPage").then(res => {
        if(res == true){
          this.keystore.set("user", data);
        }
      });
      if (this.isExistingUser == false) {

        try {
          this.statusService.userData(data);
          // console.log(JSON.stringify(data));
          // console.log(this.phoneNumber);
          this.commonPopover.loaderDismiss();
          this.router.navigate(['/home/map']);
        }
        catch (error) {
          console.log(error);
          this.commonPopover.loaderDismiss();
        }
      } else {
        try {
          this.statusService.updateUser(data,this.userData.users[0].Id);
          this.commonPopover.loaderDismiss();
          this.router.navigate(['/home/map']);
          // console.log(JSON.stringify(data));
        }
        catch (error) {
          console.log(error);
          this.commonPopover.loaderDismiss();
        }
        this.commonPopover.loaderDismiss();
        this.router.navigate(['/home/map']);
      }
    }
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
