import { CommonPopoverService } from './../../../../providers/common-popover/common-popover.service';
import { StatusService } from 'src/app/providers/status/status.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
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
      this.statusService.closedCases(this.user.Id).then(Cases => {
        this.Cases = Cases;
      });
    } else {
      this.statusService.history(this.user.Id).then(Cases => {
        this.Cases = Cases;
      });
    }
  }
  toCase(CaseID) {
    this.keystore.set('CaseID', CaseID);
  }

}
