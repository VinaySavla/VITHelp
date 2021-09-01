import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StorageProvider } from "src/app/providers/storage/storage.service";

@Component({
  selector: "app-common-header",
  templateUrl: "./common-header.component.html",
  styleUrls: ["./common-header.component.scss"]
})
export class CommonHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isBackButtonActivate: boolean;
  @Input() isLogoutButtonActivate: boolean;
  @Input() isFullLogoActivate: boolean;
  @Input() isSmallLogoActivate: boolean;
  @Input() backPageLink: string;
  @Input() isLoggedAsActivate: boolean;
  serviceRole: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute ,
    private keystore: StorageProvider
  ) {}

  ngOnInit() {
    this.keystore.get("User").then(user => {
      this.serviceRole = user;
  });
  }
}
