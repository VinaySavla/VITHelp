import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { Network } from "@ionic-native/network/ngx";
import { ServiceProvider } from "./providers/service/service.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { TokenInterceptor } from "./providers/service/token.interceptor";
import { StorageProvider } from "./providers/storage/storage.service";
import { SupportListComponent } from "./components/support-list/support-list.component";
import { FormsModule } from "@angular/forms";

import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";


import * as Sentry from 'sentry-cordova';
Sentry.init({ dsn: 'https://50d69d1d58a048fa9e4ad726b409de86@o292934.ingest.sentry.io/5177920' });
import { ErrorHandler } from '@angular/core';


export class SentryIonicErrorHandler extends ErrorHandler {
  handleError(error) {
    super.handleError(error);
    try {
      Sentry.captureException(error.originalError || error);
    } catch (e) {
      console.error(e);
    }
  }
}


@NgModule({
  declarations: [AppComponent, SupportListComponent],
  entryComponents: [SupportListComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Keyboard,
    Network,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ServiceProvider,
    StorageProvider,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    {provide: ErrorHandler, useClass: SentryIonicErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
