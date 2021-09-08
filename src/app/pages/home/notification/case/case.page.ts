import { StatusService } from './../../../../providers/status/status.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {
  title = "Case: "
  currentUser:boolean;
  statusData: any[];
  isHidden: boolean = true;
  contentHidden: boolean = true;
  serviceRole: String;
  userStatus: any;
  constructor(private keystore: StorageProvider, private statusService: StatusService) { }

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
        user: status.VolunteerID != undefined ? status.VolunteerID : status.DistressedID,
        msg: status.status,
        createdAt: status.TimeStamp
      }
    });
  }

  
  @ViewChild(IonContent) content: IonContent

  sendMessage(buttonValue: string) {
    this.currentUser=true;
    const data = {
      CaseID: 1,
      VolunteerID: 2,
      DistressedID: null,
      status: buttonValue,

    };
    this.statusService.sendStatus(data);
    // this.userStatus = {
    //   user:1,
    //   msg: buttonValue,
    //   CreatedAt: 1554090856000
    // }
    this.statusData.push({
      user: 1,
      msg: buttonValue,
      createdAt: 1554090856000
    });
    setTimeout(() =>{
      this.content.scrollToBottom(200);
    });
  }

}
