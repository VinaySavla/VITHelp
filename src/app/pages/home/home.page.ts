import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  tabsList = [
    {
      tabName: "map",
      iconName: "map",
      label: "Map"
    },
    // {
    //   tabName: "lists",
    //   iconName: "list-outline",
    //   label: "Lists"
    // },
    {
      tabName: "notifications",
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
  constructor() {}

  ngOnInit() {}
}
