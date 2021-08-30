import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupProfilePageRoutingModule } from './setup-profile-routing.module';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

import { SetupProfilePage } from './setup-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupProfilePageRoutingModule,
    ReactiveFormsModule,
    CommonHeaderModule
  ],
  declarations: [SetupProfilePage]
})
export class SetupProfilePageModule {}
