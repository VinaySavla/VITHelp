import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NotificationsPageRoutingModule } from "./notifications-routing.module";

import { NotificationsPage } from "./notifications.page";
import { CommonHeaderModule } from "src/app/components/common-header/common-header.module";
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    CommonHeaderModule,
    PipeModule,
    ComponentsModule
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule {}
