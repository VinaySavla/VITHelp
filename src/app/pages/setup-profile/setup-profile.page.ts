import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-setup-profile",
  templateUrl: "./setup-profile.page.html",
  styleUrls: ["./setup-profile.page.scss"]
})
export class SetupProfilePage implements OnInit {
  serviceRole: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.serviceRole = this.route.snapshot.paramMap.get("serviceRole");
  }
}
