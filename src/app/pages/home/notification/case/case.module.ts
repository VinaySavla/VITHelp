import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasePageRoutingModule } from './case-routing.module';

import { CasePage } from './case.page';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasePageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [CasePage]
})
export class CasePageModule {}
