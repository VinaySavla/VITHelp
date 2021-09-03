import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/providers/user/user.service";
import _ from "lodash";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { StorageProvider } from "src/app/providers/storage/storage.service";
import { constants } from "src/app/constants/constants";
import { UserProfileComponent } from "src/app/components/user-profile/user-profile.component";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  @ViewChild("userProf", { static: false })
  userProf: UserProfileComponent;
  tempArray = new Array(8);
  title = "Profile";
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkBoxList: any = [
    {
      value: "food",
      name: "Food",
      isChecked: false
    },
    {
      value: "clothing",
      name: "Clothing",
      isChecked: false
    },
    {
      value: "shelter",
      name: "Shelter",
      isChecked: false
    },
    {
      value: "medical",
      name: "Medical",
      isChecked: false
    }
  ];
  selectedList = [];
  selectedRadio: any;
  isAllSelected: boolean = false;
  isLoading = false;
  userForm: any;
  userInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private networkConnection: NetworkConnectionService,
    private commonPopover: CommonPopoverService,
    private keystore: StorageProvider
  ) {}
  ngOnInit() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.isLoading = true;
    this.userService
      .getUser()
      .then(data => {
        this.isLoading = false;
        this.userInfo = data;
        this.selectedList = data.supportList;
        if (this.userInfo.serviceRole === constants.enums.roles.SERVICE_TAKER) {
          this.selectedRadio = this.userInfo.supportList[0];
        }
        _.map(this.selectedList, item => {
          let indx = _.findIndex(this.checkBoxList, elem => {
            return elem.value === item;
          });
          if (indx > -1) {
            this.checkBoxList[indx]["isChecked"] = true;
          }
        });
        if (this.checkBoxList.length == this.selectedList.length) {
          this.isAllSelected = true;
          this.masterCheck = true;
        }

        this.userForm = this.formBuilder.group({
          name: [data.name || "", [Validators.required]],
          countryCode: [
            data.countryCode || "",
            [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]
          ],
          phone: [
            data.phone || "",
            [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
          ],
          profession: [data.profession || "", [Validators.required]],
          address: [data.address || ""],
          serviceRole: [data.serviceRole || "", [Validators.required]],
          supportList: [data.supportList || ""],
          isServiceRoleSelected: [
            data.isServiceRoleSelected || "",
            [Validators.required]
          ]
        });
        if (this.userInfo.serviceRole === constants.enums.roles.SERVICE_TAKER) {
          this.userForm.get("profession").clearValidators();
          this.userForm.get("profession").updateValueAndValidity();
        }
      })
      .catch(err => {
        this.isLoading = false;
      });
  }

  checkMaster(event) {
    setTimeout(() => {
      this.checkBoxList.forEach((obj: { isChecked: boolean }) => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.checkBoxList.length;
    let checked = 0;
    this.checkBoxList.map((obj: { isChecked: any }) => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  /**
   * Select or unselect item
   * @param item
   */
  selectItem(item) {
    if (item === "all") {
      if (this.isAllSelected) {
        this.selectedList = [];
        for (let data of this.checkBoxList) {
          data.isChecked = false;
        }
        this.isAllSelected = false;
      } else {
        this.selectedList = _.map(this.checkBoxList, "value");
        for (let data of this.checkBoxList) {
          data.isChecked = true;
        }
        this.isAllSelected = true;
      }
    } else {
      let indx = _.indexOf(this.selectedList, item.value);
      if (indx > -1) {
        this.selectedList.splice(indx, 1);
        let indxItem = _.findIndex(this.checkBoxList, elem => {
          return elem.value === item.value;
        });
        this.checkBoxList[indxItem]["isChecked"] = false;
        this.isAllSelected = false;
      } else {
        this.selectedList.push(item.value);
        let indxItem = _.findIndex(this.checkBoxList, elem => {
          return elem.value === item.value;
        });
        this.checkBoxList[indxItem]["isChecked"] = true;
        if (this.checkBoxList.length == this.selectedList.length) {
          this.isAllSelected = true;
        }
      }
    }
  }

  selectRadio(value) {
    this.selectedRadio = value;
  }
  async saveUserInfo() {
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    if (!this.userForm.valid) {
      return;
    }
    let list = _.filter(this.checkBoxList, { isChecked: true });
    list = _.map(list, "value");

    let data = {
      name: this.userForm.controls["name"].value,
      address: this.userForm.controls["address"].value,
      supportList:
        this.userInfo.serviceRole === constants.enums.roles.SERVICE_PROVIDER
          ? list
          : [this.selectedRadio]
    };
    if (this.userInfo.serviceRole === constants.enums.roles.SERVICE_PROVIDER) {
      data["profession"] = this.userForm.controls["profession"].value;
    }
    await this.commonPopover.loaderPresent("Updating user profile.");
    this.userService
      .updateUser(data)
      .then(res => {
        this.commonPopover.loaderDismiss();
        this.commonPopover.toastPopOver("Profile updated successfully");
        this.keystore.set("User", res);
      })
      .catch(err => {
        this.commonPopover.loaderDismiss();
      });
  }

  doRefresh(event) {
    this.userProf.fetchUserInfo();
    setTimeout(() => {
      //complete()  signify that the refreshing has completed and to close the refresher
      event.target.complete();
    }, 1000);
  }
}
