import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/providers/user/user.service';
import { NetworkConnectionService } from 'src/app/providers/network-connection/network-connection.service';
import { CommonPopoverService } from 'src/app/providers/common-popover/common-popover.service';
import { StorageProvider } from 'src/app/providers/storage/storage.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { constants } from '../../constants/constants';
import { GoogleMapsService } from 'src/app/providers/google-maps/google-maps.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  noDataText = 'Unable to find profile.';
  @Input() serviceRole: string;
  tempArray = new Array(8);
  title = 'Profile';
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkBoxList: any = constants.checkBoxList;
  selectedList = [];
  selectedRadio: any;
  isAllSelected = false;
  isLoading = false;
  userForm: any;
  userInfo: any;
  volunteer = constants.enums.roles.SERVICE_PROVIDER;
  distressed = constants.enums.roles.SERVICE_TAKER;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private networkConnection: NetworkConnectionService,
    private commonPopover: CommonPopoverService,
    private keystore: StorageProvider,
    private router: Router,
    private googleService: GoogleMapsService
  ) {}
  ngOnInit() {
    this.fetchUserInfo();
  }

  /**
   * fetch user profile
   */
  fetchUserInfo() {
    this.isLoading = true;
    this.userService
      .getUser()
      .then(data => {
        this.isLoading = false;
        this.userInfo = data;
        this.selectedList = data.supportList;
        if (
          this.userInfo.serviceRole === constants.enums.roles.SERVICE_TAKER ||
          this.serviceRole === constants.enums.roles.SERVICE_TAKER
        ) {
          this.selectedRadio = this.userInfo.supportList[0];
        }
        _.map(this.selectedList, item => {
          const indx = _.findIndex(this.checkBoxList, elem => {
            return elem.value === item;
          });
          if (indx > -1) {
            this.checkBoxList[indx].isChecked = true;
          }
        });
        if (this.checkBoxList.length === this.selectedList.length) {
          this.isAllSelected = true;
          this.masterCheck = true;
        }

        this.userForm = this.formBuilder.group({
          name: [data.name || '', [Validators.required]],
          countryCode: [
            data.countryCode || '',
            [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]
          ],
          phone: [
            data.phone || '',
            [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
          ],
          profession: [data.profession || '', [Validators.required]],
          address: this.formBuilder.group({
            lat: [data.address.lat || '', [Validators.required]],
            lng: [data.address.lng || '', [Validators.required]],
            formattedAddress: [
              data.address.formattedAddress || '',
              [Validators.required]
            ]
          }),
          serviceRole: [data.serviceRole || '', [Validators.required]],
          supportList: [data.supportList || ''],
          isServiceRoleSelected: [data.isServiceRoleSelected || ''],
          isUserServiceActive: [
            data.isUserServiceActive || '',
            [Validators.required]
          ]
        });
        if (
          this.userInfo.serviceRole === constants.enums.roles.SERVICE_TAKER ||
          this.serviceRole === constants.enums.roles.SERVICE_TAKER
        ) {
          this.userForm.get('profession').clearValidators();
          this.userForm.get('profession').updateValueAndValidity();
        }
        if (this.serviceRole) {
          this.userForm.patchValue({
            serviceRole: this.serviceRole
          });
          this.userForm.get('isUserServiceActive').clearValidators();
          this.userForm.get('isUserServiceActive').updateValueAndValidity();
        }
      })
      .catch(err => {
        this.isLoading = false;
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

    // if (!this.userForm.valid) {
    //   console.log('User Profile Component | saveUserInfo() | User Form validation failed');
    //   return;
    // }

    let list = _.filter(this.checkBoxList, { isChecked: true });
    list = _.map(list, 'value');

    const data = {
      name: this.userForm.controls.name.value,
      address: this.userForm.controls.address.value,
      supportList:
        this.userInfo.serviceRole === constants.enums.roles.SERVICE_PROVIDER ||
        this.serviceRole === constants.enums.roles.SERVICE_PROVIDER
          ? list
          : [this.selectedRadio],
      serviceRole: this.serviceRole || this.userInfo.serviceRole,
      isServiceRoleSelected: true,
      isUserServiceActive: this.userForm.controls.isUserServiceActive.value,
      profession : this.userForm.controls.profession.value

    };

   

    if (
      this.userInfo.serviceRole === constants.enums.roles.SERVICE_PROVIDER ||
      this.serviceRole === constants.enums.roles.SERVICE_PROVIDER
    ) {
      data.profession = this.userForm.controls.profession.value;
    }


    console.log('User Profile Component | saveUserInfo() | data inputted | ' + JSON.stringify(data));

    await this.commonPopover.loaderPresent('Updating user profile.');

    this.userService
      .updateUser(data)
      .then(res => {
        console.log('User Profile Component | saveUserInfo() | response | ' + JSON.stringify(res));
        this.commonPopover.loaderDismiss();
        this.commonPopover.toastPopOver('Profile updated successfully');
        this.keystore.set('User', res);
        if (this.serviceRole) {
          this.router.navigate(['/home/map']);
        }
      })
      .catch(err => {
        this.commonPopover.loaderDismiss();
        console.error('User Profile Component | saveUserInfo() | response | ' + JSON.stringify(err));
      });
  }

  /**
   * Get current position
   */
  async getCurrentPosition() {
    await this.commonPopover.loaderPresent('Fetching current location');
    const address = await this.googleService.getCurrentPosition();
    this.commonPopover.loaderDismiss();
    if (!_.isEmpty(address)) {
      // Set value of lat-lng,formatted_address
      this.userForm.patchValue({
        address: {
          lat: address.lat,
          lng: address.lng,
          formattedAddress: address.formattedAddress
        }
      });
    }
  }
}
