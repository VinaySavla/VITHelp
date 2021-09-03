import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import _ from "lodash";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { catchError, tap, timeoutWith, timeout } from "rxjs/operators";
import { AuthProvider } from "../auth/auth.service";
import { CommonPopoverService } from "../common-popover/common-popover.service";
import { headersToString } from "selenium-webdriver/http";
export class TimeoutError implements Error {
  name: string;
  message: string;
  stack: any;

  constructor(message?: string) {
    this.name = "TimeoutError";
    this.message =
      message ||
      " Connection is too slow. Unable to connect to the server. Please check you internet connection.";
    this.stack = new Error().stack;
  }
}

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  // private baseUrl: string = "http://192.168.0.5:8080/";
  private baseUrl: string = "https://covithelp-backend.herokuapp.com/";
  private appversion: string = "";

  constructor(
    private http: HttpClient,
    private commonPopover: CommonPopoverService,
    // private events: Events,
    private user: AuthProvider
  ) {}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
  get(url, search?: any) {
    return this.http.get(this.baseUrl + this.appversion + url).pipe(
      tap(_ => this.log("Successfully GET")),
      catchError(this.errorHandler.bind(this))
    );
  }

  post(url, data?: Object, params?: HttpParams): Observable<any> {
    let httpOptions = {
      params: params
    };
    return this.http
      .post<any>(this.baseUrl + this.appversion + url, data, httpOptions)
      .pipe(
        tap(_ => this.log("Successfully POST")),
        catchError(this.errorHandler.bind(this))
      );
  }

  patch(url, data?: Object, search?: any) {
    return this.http.patch(this.baseUrl + this.appversion + url, data).pipe(
      tap(_ => this.log("Successfully PATCH")),
      catchError(this.errorHandler.bind(this))
    );
  }

  put(url, data?: Object, search?: any) {
    return this.http.put(this.baseUrl + this.appversion + url, data).pipe(
      tap(_ => this.log("Successfully PUT")),
      catchError(this.errorHandler.bind(this))
    );
  }

  delete(url, search?: any) {
    return this.http.delete(this.baseUrl + this.appversion + url).pipe(
      tap(_ => this.log("Successfully DELETE")),
      catchError(this.errorHandler.bind(this))
    );
  }

  async errorHandler(error: Error) {
    if (error.name == "TimeoutError" || error["status"] === 0) {
      this.commonPopover.toastPopOver("Unable To Reach Server");
      throw error;
    } else if (error["status"] === 500) {
      this.commonPopover.toastPopOver(
        error["error"]["message"] || "Internal Server Error"
      );
      throw error;
    } else if (error["status"] === 422) {
      this.commonPopover.toastPopOver(
        error["error"]["message"] || "Unprocessable Entity"
      );
      throw error;
    } else if (error["status"] === 400) {
      this.commonPopover.toastPopOver(
        error["error"]["message"] || "Bad Request"
      );
      throw error;
    } else if (error["status"] === 404) {
      this.commonPopover.toastPopOver(error["error"]["message"] || "Not Found");
      throw error;
    } else if (error["status"] === 401) {
      console.log(error);
      if (
        error["url"].indexOf(this.baseUrl + this.appversion + "user/login") !==
        -1
      ) {
        this.commonPopover.toastPopOver("Invalid Credentials");
        throw error;
      } else {
        this.user.logout().then(result => {
          let message = "Session Expired. Please login again.";
          // this.events.publish("user:logout", message);
        });
      }
    } else if (error["status"] === 403) {
      this.commonPopover.toastPopOver(error["error"]["message"] || "Not Found");
      throw error;
    }
    throw error;
  }
}
