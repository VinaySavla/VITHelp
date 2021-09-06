import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {
title="case: "
isHidden:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  addSupport(){
    this.isHidden=false;
  }
  sendSupport(){
    this.isHidden=true;
  }

}
