import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';
import { CommonHeaderModule } from "src/app/components/common-header/common-header.module";

import { NotificationPage } from './notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
