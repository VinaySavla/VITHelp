import { Component, ViewChild } from "@angular/core";

import { Platform, IonRouterOutlet } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { CommonPopoverService } from "./providers/common-popover/common-popover.service";
import { LoginService } from "./providers/login/login.service";
import { StorageProvider } from "./providers/storage/storage.service";
import { SupportListComponent } from "./components/support-list/support-list.component";
import { Router } from "@angular/router";
import { constants } from "./constants/constants";
import { UserService } from "./providers/user/user.service";
import { GoogleMapsService } from "./providers/google-maps/google-maps.service";
import _ from "lodash";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private keyboard: Keyboard,
    private commonPopover: CommonPopoverService,
    private loginService: LoginService,
    private keystore: StorageProvider,
    private router: Router,
    private userService: UserService,
    private googleService: GoogleMapsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.keyboard.hideFormAccessoryBar(false);
      this.statusBar.styleDefault();
      // Let status bar overlay webview
      this.statusBar.overlaysWebView(false);
      // Set status bar to white
      this.statusBar.backgroundColorByHexString("#ed576b");
      this.splashScreen.hide();

      //Back button click
      this.platform.backButton.subscribe(() => {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else {
          return this.onBackButton();
        }
      });

      // //Ask for change role
      // this.keystore.get("isAuthenticated").then(auth => {
      //   if (!auth) {
      //     return;
      //   }
      //   this.keystore.get("User").then(user => {
      //     if (!user.isServiceRoleSelected) {
      //       // navigate to select role screen
      //       setTimeout(() => {
      //         this.router.navigate(["/select-role"]);
      //       }, 100);
      //     } else {
      //       //Set current location
      //       this.getCurrentLocation(user.serviceRole);
      //       let role =
      //         user.serviceRole === constants.enums.roles.SERVICE_PROVIDER
      //           ? constants.enums.rolesValue.VOLUNTEER
      //           : constants.enums.rolesValue.DISTRESSED;
      //       this.commonPopover
      //         .alertPopOver(
      //           `You are a ${role}. Do you want to change?`,
      //           "Change Role",
      //           "Change"
      //         )
      //         .then(data => {
      //           if (data) {
      //             //Give confirmation on change role
      //             let changedRole =
      //               role !== constants.enums.rolesValue.VOLUNTEER
      //                 ? constants.enums.rolesValue.VOLUNTEER
      //                 : constants.enums.rolesValue.DISTRESSED;
      //             let serviceRole =
      //               user.serviceRole === constants.enums.roles.SERVICE_PROVIDER
      //                 ? constants.enums.roles.SERVICE_TAKER
      //                 : constants.enums.roles.SERVICE_PROVIDER;
      //             this.commonPopover
      //               .alertPopOver(
      //                 `You are a ${changedRole} now. Click continue to select resources and save your changes.`,
      //                 "Role Changed",
      //                 "Continue"
      //               )
      //               .then(userChange => {
      //                 if (userChange) {
      //                   //open modal
      //                   this.commonPopover.presentModal(SupportListComponent, {
      //                     serviceRole: serviceRole
      //                   });
      //                 }
      //               });
      //           }
      //         });
      //     }
      //   });
      // });
    });
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

  /**
   * Confirmation alaert to exit app on back button press
   * when no more page is present
   */
  onBackButton() {
    this.commonPopover
      .alertPopOver("Do you want to exit?", "Exit App")
      .then(data => {
        if (data) {
          navigator["app"].exitApp();
        }
      });
  }
}
