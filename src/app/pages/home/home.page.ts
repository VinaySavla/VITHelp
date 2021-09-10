import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StorageProvider } from "src/app/providers/storage/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  serviceRole:any;
  tabsList = [
    {
      tabName: "map",
      iconName: "map",
      label: "Map"
    },
    {
      tabName: "notification",
      iconName: "notifications",
      label: "Notifications"
    },
    {
      tabName: "distressed",
      iconName: "nuclear-sharp",
      label: "Raise Distress"
    },
    {
      tabName: "settings",
      iconName: "information-outline",
      label: "Info"
    },
    {
      tabName: "profile",
      iconName: "person-circle-outline",
      label: "Profile"
    }
  ];
  tabsListV = [
    {
      tabName: "map",
      iconName: "map",
      label: "Map"
    },
    {
      tabName: "notification",
      iconName: "notifications",
      label: "Notifications"
    },
    {
      tabName: "settings",
      iconName: "information-outline",
      label: "Info"
    },
    {
      tabName: "profile",
      iconName: "person-circle-outline",
      label: "Profile"
    }
  ];
  constructor(private route: ActivatedRoute, private keystore: StorageProvider) {}

  ngOnInit() {
    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
  });
  }
}
