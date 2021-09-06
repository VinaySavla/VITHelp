import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  serviceRole:any;
  constructor(private route: ActivatedRoute,private router:Router, private keystore:StorageProvider) { }

  ngOnInit() {
    this.keystore.get("User").then(user => {
      this.serviceRole = user;
  });
  }
}
