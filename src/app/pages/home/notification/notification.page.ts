import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  serviceRole:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceRole = this.route.snapshot.paramMap.get("serviceRole");
  }

}
