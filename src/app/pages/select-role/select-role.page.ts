import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/providers/user/user.service";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { StorageProvider } from "src/app/providers/storage/storage.service";
import { constants } from "src/app/constants/constants";
import { Platform } from "@ionic/angular";
import { GoogleMapsService } from "src/app/providers/google-maps/google-maps.service";
import _ from "lodash";
@Component({
  selector: "app-select-role",
  templateUrl: "./select-role.page.html",
  styleUrls: ["./select-role.page.scss"]
})
export class SelectRolePage implements OnInit {
  serviceRole = "";
  isServiceRoleStored: boolean = false;
  storedRole: any = "";
  volunteer = constants.enums.roles.SERVICE_PROVIDER;
  distressed = constants.enums.roles.SERVICE_TAKER;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private networkConnection: NetworkConnectionService,
    private commonPopover: CommonPopoverService,
    private keystore: StorageProvider,
    private platform: Platform,
    private googleService: GoogleMapsService
  ) {}

  ngOnInit() {
    this.keystore.get("User").then(user => {
      if (user.isServiceRoleSelected) {
        this.serviceRole = user.serviceRole;
        this.storedRole = user.serviceRole;
        this.isServiceRoleStored = true;
      }
    });
  }
  selectRole(role) {
    this.serviceRole = role;
  }
  async chooseRole() {
    // if (!this.serviceRole) {
    //   return;
    // }
    // if (this.networkConnection.isOffline()) {
    //   return this.networkConnection.isConnectionMessage();
    // }
    // let data = {
    //   serviceRole: this.serviceRole
    // };
    // await this.commonPopover.loaderPresent("Selecting Role");
    // this.userService
    //   .selectRole(data)
    //   .then(res => {
    //     this.commonPopover.loaderDismiss();
    //     this.router.navigate(["/home"]);
    //     this.keystore.set("User", res);
    //   })
    //   .catch(err => {
    //     this.commonPopover.loaderDismiss();
    //   });
    if (this.isServiceRoleStored) {
      if (this.serviceRole === this.storedRole) {
        this.router.navigate(["/home"]);
      } else {
        if (this.networkConnection.isOffline()) {
          return this.networkConnection.isConnectionMessage();
        }
        let data = {
          serviceRole: this.serviceRole,
          supportList: []
        };
        await this.commonPopover.loaderPresent("Updating Role");
        this.userService
          .updateUser(data)
          .then(res => {
            this.commonPopover.loaderDismiss();
            this.router.navigate(["/home"]);
            this.keystore.set("User", res);
          })
          .catch(err => {
            this.commonPopover.loaderDismiss();
          });
      }
    } else {
      this.router.navigate([
        "/setup-profile",
        { serviceRole: this.serviceRole }
      ]);
    }

    // Update current location
    this.getCurrentLocation(this.serviceRole);
  }

  async getCurrentLocation(serviceRole) {
    // let address = await this.googleService.getCurrentPosition();
    let address;
    //Current location
    if (this.platform.is("cordova")) {
      address = await this.googleService.checkGPSPermission();
    } else {
      address = await this.googleService.getCurrentPosition();
    }
    if (_.isEmpty(address)) {
      return;
    }
    let data = {
      address: address,
      serviceRole: serviceRole
    };
    this.userService.updateUser(data).then(res => {
      this.keystore.set("User", res);
    });
  }
}
