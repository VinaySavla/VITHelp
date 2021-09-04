import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';
import { CommonHeaderModule } from "src/app/components/common-header/common-header.module";
import { ComponentsModule } from 'src/app/components/components.module';

import { MapPage } from './map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    CommonHeaderModule,
    ComponentsModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
