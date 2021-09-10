import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StorageProvider } from 'src/app/providers/storage/storage.service';
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  serviceRole: any;
  title = "Map"

  constructor(private route: ActivatedRoute, private keystore: StorageProvider, private commonPopover: CommonPopoverService) { }

  ngOnInit() {
    this.checkIfRoleSelected();
  }
  checkIfRoleSelected() {
    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
      if (this.serviceRole == "Distressed") {
        this.commonPopover.toastPopOver("False alarm is legally punishable!");
      }
    });
  }
}
