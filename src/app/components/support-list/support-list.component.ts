import { Component, OnInit, Input } from "@angular/core";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { Router } from "@angular/router";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { StorageProvider } from "src/app/providers/storage/storage.service";
import _ from "lodash";
import { UserService } from "src/app/providers/user/user.service";
import { constants } from "src/app/constants/constants";
@Component({
  selector: "app-support-list",
  templateUrl: "./support-list.component.html",
  styleUrls: ["./support-list.component.scss"]
})
export class SupportListComponent implements OnInit {
  @Input() serviceRole: string;
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkBoxList: any = constants.checkBoxList;
  selectedList = [];
  selectedRadio: any;
  isAllSelected: boolean = false;
  volunteer = constants.enums.roles.SERVICE_PROVIDER;
  distressed = constants.enums.roles.SERVICE_TAKER;
  constructor(
    private networkConnection: NetworkConnectionService,
    private router: Router,
    private commonPopover: CommonPopoverService,
    private keystore: StorageProvider,
    private userService: UserService
  ) {}

  ngOnInit() {}

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

  selectRadio(value) {
    this.selectedRadio = value;
  }

  async saveUserInfo() {
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    let list = _.filter(this.checkBoxList, { isChecked: true });
    list = _.map(list, "value");

    let data = {
      supportList:
        this.serviceRole === constants.enums.roles.SERVICE_PROVIDER
          ? list
          : [this.selectedRadio],
      serviceRole: this.serviceRole
    };
    if (
      _.isEmpty(data["supportList"]) ||
      (_.isEmpty(this.selectedRadio) &&
        this.serviceRole !== constants.enums.roles.SERVICE_PROVIDER)
    ) {
      return this.commonPopover.toastPopOver("Select atleast 1 option.");
    }
    await this.commonPopover.loaderPresent("Updating user profile.");
    this.userService
      .updateUser(data)
      .then(res => {
        this.commonPopover.loaderDismiss();
        this.commonPopover.toastPopOver("Changes saved successfully");
        this.keystore.set("User", res);
        this.commonPopover.dismissModal();
        this.router.navigate(["/home/map"]);
      })
      .catch(err => {
        this.commonPopover.loaderDismiss();
      });
  }
}
