import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingListsPageRoutingModule } from './setting-lists-routing.module';

import { SettingListsPage } from './setting-lists.page';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingListsPageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [SettingListsPage]
})
export class SettingListsPageModule {}
