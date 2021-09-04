import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { StorageProvider } from "../providers/storage/storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private keyStore: StorageProvider) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorize();
  }

  isAuthorize() {
    return this.keyStore.get("isAuthenticated").then(authenticated => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigateByUrl("/login");
        return false;
      }
    });
  }
}

@Injectable({
  providedIn: "root"
})
export class AuthGuardLogin implements CanActivate {
  constructor(private router: Router, private keyStore: StorageProvider) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.keyStore.get("isAuthenticated").then(authenticated => {
      if (authenticated) {
        this.router.navigateByUrl("/select-role");
        return false;
      } else {
        return true;
      }
    });
  }
}
