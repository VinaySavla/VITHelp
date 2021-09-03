import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SetupProfilePageRoutingModule } from "./setup-profile-routing.module";

import { SetupProfilePage } from "./setup-profile.page";
import { CommonHeaderModule } from "src/app/components/common-header/common-header.module";
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupProfilePageRoutingModule,
    CommonHeaderModule,
    ComponentsModule
  ],
  declarations: [SetupProfilePage]
})
export class SetupProfilePageModule {}
