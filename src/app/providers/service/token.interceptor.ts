import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        setHeaders: {
          "content-type": "application/json"
        }
      });
    }

    if (!request.headers.has("api_key")) {
      request = request.clone({
        setHeaders: {
          api_key: "5c624a57793a4c76657e7561305056715362202b68634156274d313a5c"
        }
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json")
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
