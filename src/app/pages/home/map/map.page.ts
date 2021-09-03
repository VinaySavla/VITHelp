import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StorageProvider } from 'src/app/providers/storage/storage.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
serviceRole:any;

  constructor(private route: ActivatedRoute, private keystore:StorageProvider) { }

  ngOnInit() {
    this.keystore.get("User").then(user => {
      this.serviceRole = user;
  });
  }

}
