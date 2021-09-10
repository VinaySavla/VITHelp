import { Component, OnInit } from '@angular/core';
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  serviceRole:any;
  constructor(private keystore:StorageProvider) { }

  ngOnInit() {
    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
  });
  }

}
