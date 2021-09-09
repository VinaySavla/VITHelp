import { CommonPopoverService } from './../../../../providers/common-popover/common-popover.service';
import { StatusService } from './../../../../providers/status/status.service';
import { Component, OnInit, ViewChild,NgZone  } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {
  @ViewChild('content') content : IonContent;
  title = "Case: "
  currentUser:boolean;
  statusData: any[];
  isHidden: boolean = true;
  contentHidden: boolean = true;
  serviceRole: String;
  userStatus: any;
  commentBox:String = '';
  messageBox:String;
  constructor(private keystore: StorageProvider, private statusService: StatusService, private commonPopover:CommonPopoverService,public _zone: NgZone) { }

  ngOnInit() {
    this.statusService.getStatus().then((statusData) => { this.statusData = statusData["statuses"]; });
    this.keystore.get("User").then(user => {
      this.serviceRole = user;
    });
  }
  addSupport() {
    if (this.isHidden) {
      this.isHidden = false;
    }
    else {
      this.isHidden = true;
    }
  }

  showContent() {
    if (this.contentHidden) {
      this.contentHidden = false;
    }
    else {
      this.contentHidden = true;
    }
  }


  public get messages() {
    return this.statusData == undefined ? [] : this.statusData.map((status) => {
      return {
        // user: status.VolunteerID != undefined ? status.VolunteerID : status.DistressedID,
        user: status.UserID,
        serviceRole: status.serviceRole,
        msg: status.Status,
        createdAt: status.TimeStamp
      }
    });
  }

  
  
  sendMessage(buttonValue: string) {
    this.commonPopover.loaderPresent("Updating Status");
    this.messageBox = buttonValue + ': ' + this.commentBox;
    const data = {
      CaseID: 1,
      UserID: 1,
      serviceRole: this.serviceRole,
      Status: this.messageBox,

    };
    try{
      this.statusData.push({
        user: 1,
        msg: this.messageBox,
        createdAt: 1554090856000
      });
      this.statusService.sendStatus(data).then(res =>{
        this.commonPopover.loaderDismiss();
      })
    }
    catch(error){
      console.log(error);
      this.commonPopover.loaderDismiss();
    }
    this.commentBox='';
  }
}
