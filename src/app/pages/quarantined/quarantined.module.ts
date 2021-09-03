import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuarantinedPageRoutingModule } from './quarantined-routing.module';

import { QuarantinedPage } from './quarantined.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuarantinedPageRoutingModule
  ],
  declarations: [QuarantinedPage]
})
export class QuarantinedPageModule {}
