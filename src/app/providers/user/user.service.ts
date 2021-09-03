import { Injectable } from "@angular/core";
import { ServiceProvider } from "../service/service.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private serviceProvider: ServiceProvider) {}

  /**
   * Select user role
   * @param data user data
   */
  selectRole(data) {
    return new Promise<any>((resolve, reject) => {
      this.serviceProvider.put(`user/role`, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * get user info
   */
  getUser() {
    return new Promise<any>((resolve, reject) => {
      this.serviceProvider.get(`user`).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * get user info within radius
   */
  getUserWihtinRadius(option = {}) {
    return new Promise<any>((resolve, reject) => {
      this.serviceProvider
        .get(
          `user/radius?skip=${option["skip"]}&&limit=${option["limit"]}&&keyword=${option["keyword"]}&&sort=${option["sort"]}&&order=${option["order"]}`
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  /**
   * Update user info
   * @param data user data
   */
  updateUser(data) {
    console.log('User Service | updateUser()');
    return new Promise<any>((resolve, reject) => {
      this.serviceProvider.put(`user`, data).subscribe(
        res => {
          console.log('User Service | updateUser() | response : + ' + JSON.stringify(res));
          resolve(res);
        },
        err => {
          console.log('User Service | updateUser() | errors : '+ JSON.stringify(err));
          reject(err);
        }
      );
    });
  }
}
