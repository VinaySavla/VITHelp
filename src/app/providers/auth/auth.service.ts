import { Injectable } from "@angular/core";
import _ from "lodash";
import { forkJoin } from "rxjs";
import { StorageProvider } from "../storage/storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthProvider {
  private user: any = {
    uid: "",
    roles: []
  };

  public header: Object = {};

  constructor(private keyStore: StorageProvider) {
    this.setHeaders();
  }

  isAuthenticated() {
    return this.currentUser().then(user => {
      return typeof this.user == "object";
    });
  }

  currentUser() {
    return this.keyStore.get("user").then(user => {
      // return this.user = user && user.length ? JSON.parse(user) : ''
      return (this.user = user ? user : "");
    });
  }

  setToken(token) {
    let encodedToken = btoa(`${token}:`);
    return this.keyStore.set("Authorization", `Basic ${encodedToken}`);
  }

  private setHeaders() {
    let headers = ["Authentication", "X-CSRF-TOKEN"];
    headers.forEach(name => {
      this.keyStore.get(name).then(value => {
        this.header[name] = value;
      });
    });
  }

  currentAtlasLevel() {
    return this.currentUser().then(user => {
      return user.level_number.lowest_lvl;
    });
  }

  logout() {
    let headers = [
      "Authorization",
      "user",
      "isAuthenticated",
      "uri",
      "activePage",
      "token_expires_in",
      "viewLoaded",
      "isRefreshTokenTriggered"
    ];
    let removalPromises = [];
    headers.forEach(name => {
      removalPromises.push(this.keyStore.remove(name));
    });

    //same behaviour as Promise.all()
    // return Observable.forkJoin(removalPromises).toPromise()
    return forkJoin(removalPromises).toPromise();
  }

  storeCredentials(response) {
    //Token based auth
    let token = btoa(`${response.user.apitoken.token}:`);
    return this.keyStore.set("Authorization", `basic ${token}`).then(() => {
      return this.keyStore.set("user", JSON.stringify(response.user));
    });
  }
}
