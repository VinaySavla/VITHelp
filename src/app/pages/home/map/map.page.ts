import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
serviceRole:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceRole = this.route.snapshot.paramMap.get("serviceRole");
  }

}
