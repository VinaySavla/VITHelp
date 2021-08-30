import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitOtpPageRoutingModule } from './submit-otp-routing.module';

import { SubmitOtpPage } from './submit-otp.page';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitOtpPageRoutingModule,
    CommonHeaderModule,
    ReactiveFormsModule
  ],
  declarations: [SubmitOtpPage]
})
export class SubmitOtpPageModule {}
