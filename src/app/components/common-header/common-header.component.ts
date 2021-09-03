import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LoginService } from "src/app/providers/login/login.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { Router } from "@angular/router";
import { StorageProvider } from "src/app/providers/storage/storage.service";
import { constants } from "src/app/constants/constants";

@Component({
  selector: "app-common-header",
  templateUrl: "./common-header.component.html",
  styleUrls: ["./common-header.component.scss"]
})
export class CommonHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isBackButtonActivate: boolean;
  @Input() isLogoutButtonActivate: boolean;
  @Input() isFullLogoActivate: boolean;
  @Input() isSmallLogoActivate: boolean;
  @Input() backPageLink: string;
  @Input() isLoggedAsActivate: boolean;
  serviceRole: any;
  constructor(
    private loginService: LoginService,
    private commonPopover: CommonPopoverService,
    private router: Router,
    private keystore: StorageProvider
  ) {}

  ngOnInit() {
    this.keystore.get("User").then(user => {
      this.serviceRole =
        user.serviceRole === constants.enums.roles.SERVICE_PROVIDER
          ? constants.enums.rolesValue.VOLUNTEER
          : constants.enums.rolesValue.DISTRESSED;
    });
  }

  /**
   * Logout confirmation alert box
   */
  goToLogout() {
    this.commonPopover
      .alertPopOver("Do you really want to logout?", "Logout confirmation")
      .then(data => {
        if (data) {
          this.logout();
        }
      });
  }
  async logout() {
    await this.commonPopover.loaderPresent("Logging Out...");
    let message = "Successfully logged out";
    //Logout event
    this.loginService.logout().then(result => {
      this.router.navigate(["/login"]);
      this.commonPopover.toastPopOver(message);
      this.commonPopover.loaderDismiss();
    });
  }
}
