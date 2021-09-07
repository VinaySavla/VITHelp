import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {
  title = "case: "
  isHidden: boolean = true;
  contentHidden: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  addSupport() {
    this.isHidden = false;
  }
  sendSupport() {
    this.isHidden = true;
  }
  showContent() {
    if (this.contentHidden) {
      this.contentHidden = false;
    }
    else {
      this.contentHidden = true;
    }
  }

  // hideContent(){
  //   this.contentHidden=true;
  // }

  messages = [
    {
      user: 'Distress',
      createdAt: 1554090856000,
      msg: 'Attending'
    },
    {
      user: 'Volunteer',
      createdAt: 1554090856000,
      msg: 'Attending'
    },
    {
      user: 'Distress',
      createdAt: 1554090856000,
      msg: 'Attending'
    },
    {
      user: 'Volunteer',
      createdAt: 1554090856000,
      msg: 'Attending'
    }
  ];


  currentUser = 'Volunteer';

  @ViewChild(IonContent) content: IonContent

  sendessage() { }

}

// export class CasePage{

// }

