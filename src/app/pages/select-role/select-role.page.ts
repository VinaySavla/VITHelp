import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { StorageProvider } from "src/app/providers/storage/storage.service";
import { constants } from "src/app/constants/constants";
import { Platform } from "@ionic/angular";
import { GoogleMapsService } from "src/app/providers/google-maps/google-maps.service";
import _ from "lodash";
import { StatusService } from "src/app/providers/status/status.service";

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.page.html',
  styleUrls: ['./select-role.page.scss'],
})
export class SelectRolePage implements OnInit {
  serviceRole = "";
  isServiceRoleStored: boolean = false;
  storedRole: any = "";
  // volunteer = constants.enums.roles.SERVICE_PROVIDER;
  // distressed = constants.enums.roles.SERVICE_TAKER;
  volunteer = "Volunteer"
  distressed = "Distressed"
  phoneNumber: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private networkConnection: NetworkConnectionService,
    private commonPopover: CommonPopoverService,
    private keystore: StorageProvider,
    private platform: Platform,
    private statusService: StatusService,
    private googleService: GoogleMapsService
  ) { }

  ngOnInit() {
    this.keystore.get("User").then(user => {
        this.serviceRole = user;
      });
  }
  selectRole(Role) {
    this.serviceRole = Role;
    this.keystore.set("User", this.serviceRole)
  }
  async chooseRole() {
    
    const phoneNumber= await this.keystore.get('PhoneNumber');
    const userData = await this.statusService.authUser(phoneNumber);
    if(userData.users && typeof userData.users !="undefined" && userData.users !=null && userData.users.length != null && userData.users.length > 0 &&  phoneNumber==userData.users[0].PhoneNumber){
      this.router.navigate(["/home"]);
    }
    else{
      this.router.navigate(["/setup-profile"]);
    }

    // if (this.isServiceRoleStored) {
    //   if (this.serviceRole === this.storedRole) {
    //     this.router.navigate(["/home"]);
    //   } else {
    //     if (this.networkConnection.isOffline()) {
    //       return this.networkConnection.isConnectionMessage();
    //     }
    //     let data = {
    //       serviceRole: this.serviceRole,
    //       supportList: []
    //     };
    //     await this.commonPopover.loaderPresent("Updating Role");
    //     this.commonPopover.loaderDismiss();
    //   }
    // } else {
    //   this.router.navigate(["/setup-profile"]);
    // }

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
    //TODO update users res to store in keystore
    // this.userService.updateUser(data).then(res => {
    //   this.keystore.set("User", res);
    // });
  }
}