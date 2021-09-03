import { Injectable } from "@angular/core";
import { StorageProvider } from "../storage/storage.service";
import { forkJoin } from "rxjs";
// import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private keyStore: StorageProvider) {}

  /**
   * Logout function
   */
  logout() {
    let headers = ["Authorization", "User", "userName", "isAuthenticated"];
    let removalPromises = [];
    localStorage.removeItem("token");
    headers.forEach(name => {
      removalPromises.push(this.keyStore.remove(name));
    });

    //same behaviour as Promise.all()
    return forkJoin(removalPromises).toPromise();
  }
}
