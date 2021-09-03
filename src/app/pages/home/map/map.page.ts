import { Component, OnInit } from "@angular/core";
import { StorageProvider } from "src/app/providers/storage/storage.service";
import { Router } from "@angular/router";
import { constants } from "src/app/constants/constants";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements OnInit {
  title = "Map";
  constructor(
    private keystore: StorageProvider,
    private router: Router,
    private commonPopover: CommonPopoverService
  ) {}

  ngOnInit() {
    this.checkIfRoleSelected();
  }

  /**
   * Check if role selected or not
   */
  checkIfRoleSelected() {
    this.keystore.get("User").then(data => {
      if (data.serviceRole === constants.enums.roles.SERVICE_TAKER) {
        // navigate to select role screen
        // this.router.navigate(["/select-role"]);
        this.commonPopover.toastPopOver("False alarm is legally punishable!");
      }
    });
  }
}
