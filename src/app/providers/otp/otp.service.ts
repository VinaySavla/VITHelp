import { Injectable } from "@angular/core";
import { ServiceProvider } from "../service/service.service";
import { StorageProvider } from "../storage/storage.service";
import * as JWT from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class OtpService {
  constructor(
    private serviceProvider: ServiceProvider,
    private keyStore: StorageProvider
  ) {}

  /**
   * Send OTP function
   * @param data user credentials
   * @param retry retry if resend
   */
  sendOTP(data, retry = "false") {
    return new Promise<any>((resolve, reject) => {
      this.serviceProvider
        .post(`public/otp/send?retry=${retry}`, data)
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
   * verify OTP function
   * @param data user credentials
   */
  verifyOTP(data) {
    return new Promise<any>((resolve, reject) => {
      this.serviceProvider.post(`public/otp/verify`, data).subscribe(
        res => {
          resolve(this.storeCredentials(res));
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * Used to store needed information in local storage
   * @param response usually token
   */
  storeCredentials(response) {
    //Token based auth
    if (Object.keys(response).length) {
      let token = response.token;
      // let userID = JWT(response.token);
      localStorage.setItem("token", `${token}`);
      return this.keyStore.set("Authorization", `${token}`).then(() => {
        return this.keyStore.set("User", response.user);
      });
    } else {
      return;
    }
  }
}
