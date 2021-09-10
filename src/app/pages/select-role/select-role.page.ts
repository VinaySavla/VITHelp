import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { StorageProvider } from "src/app/providers/storage/storage.service";
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
  phoneNumber: any;

  constructor(
    private router: Router,
    private networkConnection: NetworkConnectionService,
    private commonPopover: CommonPopoverService,
    private keystore: StorageProvider,
    private platform: Platform,
    private statusService: StatusService,
    private googleService: GoogleMapsService
  ) { }

  ngOnInit() {
    this.keystore.get("serviceRole").then(user => {
        this.serviceRole = user;
      });
  }
  selectRole(Role) {
    this.serviceRole = Role;
    this.keystore.set("serviceRole", Role);
  }
  async chooseRole() {
    
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    this.commonPopover.loaderPresent('Selecting Role');
    const phoneNumber= await this.keystore.get('PhoneNumber');
    const userData = await this.statusService.getUser(phoneNumber);
    this.keystore.set("user", userData.users[0]); // TODO FixME
    if(userData.users && typeof userData.users !="undefined" && userData.users !=null && userData.users.length != null && userData.users.length > 0 &&  phoneNumber==userData.users[0].PhoneNumber){
      this.router.navigate(["/home"]);
      this.commonPopover.loaderDismiss();
    }
    else{
      this.router.navigate(["/setup-profile"]);
      this.commonPopover.loaderDismiss();
    }

    this.getCurrentLocation(this.serviceRole);
  }
  async getCurrentLocation(serviceRole) {
    let address;
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
  }
}