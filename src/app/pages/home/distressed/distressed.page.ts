import { StorageProvider } from './../../../providers/storage/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distressed',
  templateUrl: './distressed.page.html',
  styleUrls: ['./distressed.page.scss'],
})
export class DistressedPage implements OnInit {
  serviceRole: any;
  constructor(private keystore: StorageProvider) { }

  ngOnInit() {
    this.keystore.get("User").then(user => {
      this.serviceRole = user;
  });
  }

}
