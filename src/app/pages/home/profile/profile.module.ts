import { CommonHeaderComponent } from './../../../components/common-header/common-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    CommonHeaderModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
