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
      this.keystore.get("user").then(user => {
        this.user = user
        this.getCases();
      });
    });
  }
  
  getCases() {
    if (this.serviceRole === "Distressed"){
      this.statusService.getUserCase(this.user.Id).then(Cases => {
        this.Cases = Cases;
      });
    } else {
      this.statusService.notifications(this.user.Id).then(Cases => {
        this.Cases = Cases;
      });
    }
  }
  toCase(CaseID) {
    this.keystore.set('CaseID', CaseID);
  }
  acceptCase(CaseID) {
    this.commonPopover.loaderPresent("Updating Status");
    const data = {
      CaseId: CaseID,
      UserId: this.user.Id,
      serviceRole: this.serviceRole,
      Status: 'Accepted',
    };
    console.log(this.user.Id)
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
  declineCase(CaseID) {
    this.commonPopover.loaderPresent("Updating Status");
    const data = {
      CaseId: CaseID,
      UserId: this.user.Id,
      serviceRole: this.serviceRole,
      Status: 'Declined',
    };
    console.log(this.user.Id)
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

  accepted(caseToBeCheck: any): boolean {
    for(const status of caseToBeCheck.statuses) {
      if(status.UserId == this.user.Id) {
        if(status.Status == "Accepted") {
          return true;
        }
      }
    }
    return false;
  }

  rejected(caseToBeCheck: any): boolean {
    for(const status of caseToBeCheck.statuses) {
      if(status.UserId == this.user.Id) {
        if(status.Status == "Declined") {
          return true;
        }
      }
    }
    return false;
  }
}
