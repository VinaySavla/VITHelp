import { Component, OnInit } from '@angular/core';

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
      user: 'useer1',
      createdAt: 1554090856000,
      msg: 'Attending'
    },
    {
      user: 'useer2',
      createdAt: 1554090856000,
      msg: '',
    },
    {
      user: 'useer3',
      createdAt: 1554090856000,
      msg: '',
    },
    {
      user: 'useer4',
      createdAt: 1554090856000,
      msg: '',
    }
  ];



  sendessage() { }

}

// export class CasePage{

// }

