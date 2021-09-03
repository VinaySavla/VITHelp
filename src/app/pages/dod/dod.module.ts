import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DodPageRoutingModule } from './dod-routing.module';

import { DodPage } from './dod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DodPageRoutingModule
  ],
  declarations: [DodPage]
})
export class DodPageModule {}
