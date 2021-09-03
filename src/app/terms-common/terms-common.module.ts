import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsCommonPageRoutingModule } from './terms-common-routing.module';

import { TermsCommonPage } from './terms-common.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsCommonPageRoutingModule
  ],
  declarations: [TermsCommonPage]
})
export class TermsCommonPageModule {}
