import { CommonPopoverService } from './../../../../providers/common-popover/common-popover.service';
import { StatusService } from './../../../../providers/status/status.service';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit, AfterViewChecked {
  title = 'Case: ';
  currentUser: boolean;
  statusData: any[];
  isHidden: boolean = true;
  contentHidden: boolean = true;
  serviceRole: String;
  userStatus: any;
  commentBox: String = '';
  messageBox: String;
  userCaseData: any;
  user: any;
  CaseId: any;

  @ViewChild('content', { static: false }) content: IonContent;


  constructor(
    private keystore: StorageProvider,
    private statusService: StatusService,
    private commonPopover: CommonPopoverService
  ) { }

  ngOnInit() {
    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
      this.getCaseDetails();
    });
    this.keystore.get("user").then(user => this.user = user);
  }

  ngAfterViewChecked() { this.content.scrollToBottom(); }

  async getCaseDetails() {
    this.keystore.get("CaseID").then(CaseId => {
      this.CaseId = CaseId;
      // const caseData = await this.statusService.getCase(this.CaseId);
      this.statusService.getCase(this.CaseId).then(caseData => {
        this.userCaseData = caseData;
        this.title = "Case: " + this.userCaseData.Id;
      });
      this.statusService.getStatus(this.CaseId).then((statusData) => {
        this.statusData = statusData["statuses"];
      });
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
        user: status.user.Name,
        serviceRole: status.serviceRole,
        msg: status.Status,
        createdAt: status.time
      }
    });
  }



  sendMessage(buttonValue: string) {
    this.commonPopover.loaderPresent("Updating Status");
    this.messageBox = buttonValue + ' ' + this.commentBox;
    const data = {
      CaseId: this.userCaseData.Id,
      UserId: this.user.Id,
      serviceRole: this.serviceRole,
      Status: this.messageBox,
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
    this.commentBox = '';
    if (buttonValue == 'Closed') {
      this.statusService.closeCase(this.userCaseData.Id).then(res => {
        this.ngOnInit();
        this.commonPopover.loaderDismiss();
      });
    }
    this.isHidden = true;
  }
}
