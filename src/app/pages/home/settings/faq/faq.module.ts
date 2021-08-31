import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqPageRoutingModule } from './faq-routing.module';

import { FaqPage } from './faq.page';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqPageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [FaqPage]
})
export class FaqPageModule {}
