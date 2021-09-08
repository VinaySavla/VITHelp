import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DistressedPageRoutingModule } from './distressed-routing.module';

import { DistressedPage } from './distressed.page';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CommonHeaderModule,
    DistressedPageRoutingModule
  ],
  declarations: [DistressedPage]
})
export class DistressedPageModule {}
