import { Injectable } from "@angular/core";
import { Platform, ToastController } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";
import { CommonPopoverService } from "../common-popover/common-popover.service";
@Injectable({
  providedIn: "root"
})
export class NetworkConnectionService {
  onDevice: boolean;
  networkErrMsg: string =
    "Unable to connect to the server. Please check your internet connection.";
  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
    public network: Network,
    private commonPopover: CommonPopoverService
  ) {
    this.onDevice = this.platform.is("cordova");

    //Checks if user is offline
    this.network.onDisconnect().subscribe(() => {
      return this.commonPopover.toastPopOver(this.networkErrMsg);
    });

    //Checks if user is online
    this.network.onConnect().subscribe(() => {
      return this.commonPopover.toastPopOver("Network Connected");
    });
  }

  /**
   * Checking if user is online or not
   */
  isOnline() {
    if (this.onDevice && this.network["type"]) {
      return this.network["type"] !== "none";
    } else {
      return navigator.onLine;
    }
  }

  /**
   * Checking if user is offline or not
   */
  isOffline() {
    if (this.onDevice && this.network["type"]) {
      return this.network["type"] === "none";
    } else {
      return !navigator.onLine;
    }
  }

  /**
   * Sending connection message
   */
  isConnectionMessage(): any {
    return this.commonPopover.toastPopOver(this.networkErrMsg);
  }
}
