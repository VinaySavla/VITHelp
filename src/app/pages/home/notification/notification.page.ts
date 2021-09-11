import { CommonPopoverService } from './../../../providers/common-popover/common-popover.service';
import { StatusService } from 'src/app/providers/status/status.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  serviceRole: any;
  isAccepted: boolean = true;
  Cases: any[];
  CaseID: any;
  user: any;
  Case: any;
  constructor(
    private route: ActivatedRoute, private router: Router,
    private keystore: StorageProvider,
    private commonPopover: CommonPopoverService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
      this.keystore.get("user").then(user => this.user = user);
      this.getCases();
    });
  }

  getCases() {
    this.statusService.getCases().then(Cases => {
      this.Cases = Cases;
    })
  }
  toCase(CaseID) {
    this.keystore.set('CaseID', CaseID);
  }
  declineCase(CaseID) {
    this.commonPopover.loaderPresent("Updating Status");
      const data = {
      CaseID: CaseID,
      UserID: this.user.UserID,
      serviceRole: this.serviceRole,
      Status: 'Decline',
    };
    try {
      this.statusService.sendStatus(data).then(res => {
        this.commonPopover.loaderDismiss();
        this.ngOnInit();
      })
    }
    catch (error) {
      console.log(error);
      this.commonPopover.loaderDismiss();
    }
  }
}
