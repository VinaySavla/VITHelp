import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/providers/user/user.service";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import _ from "lodash";
import { IonInfiniteScroll } from "@ionic/angular";
@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"]
})
export class NotificationsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  noDataText = "No Volunteer/Distress Nearby";
  tempArray = new Array(8);
  isLoading: boolean = false;
  userData: any;
  skip: number = 0;
  limit: number = 10;
  totalCount: number = 0;
  option = {
    skip: 0,
    limit: 10,
    keyword: "",
    sort: "",
    order: ""
  };
  constructor(
    private userService: UserService,
    private networkConnection: NetworkConnectionService,
    private commonPopover: CommonPopoverService
  ) {}

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    this.isLoading = true;
    this.userService
      .getUserWihtinRadius(this.option)
      .then(res => {
        this.totalCount = res.totalCount;
        this.userData = res.items.map(item => {
          item["mapUrl"] =
            "https://maps.google.com/?q=" + item.address.formattedAddress;
          return item;
        });
        this.isLoading = false;
        if (this.userData.length == this.totalCount) {
          this.infiniteScroll.disabled = true;
        }
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  /**
   * Infinite scroll
   * @param event
   */
  loadData(event) {
    this.option["skip"] += 10;
    setTimeout(() => {
      this.userService
        .getUserWihtinRadius(this.option)
        .then(res => {
          this.totalCount = res.totalCount;
          let user = res.items.map(item => {
            item["mapUrl"] =
              "https://maps.google.com/?q=" + item.address.formattedAddress;
            return item;
          });
          this.userData = _.concat(this.userData, user);
          event.target.complete();

          // App logic to determine if all data is loaded
          // and disable the infinite scroll
          if (this.userData.length == this.totalCount) {
            event.target.disabled = true;
          }
        })
        .catch(err => {
          console.log(err);
          event.target.complete();
        });
    }, 500);
  }

  /**
   * Refresh Event
   * @param event
   */
  doRefresh(event) {
    this.option["skip"] = 0;
    this.infiniteScroll.disabled = false;
    setTimeout(() => {
      this.fetchUser();
      //complete()  signify that the refreshing has completed and to close the refresher
      event.target.complete();
    }, 1000);
  }
}
