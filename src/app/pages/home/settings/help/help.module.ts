import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HelpPageRoutingModule } from "./help-routing.module";

import { HelpPage } from "./help.page";
import { CommonHeaderModule } from "src/app/components/common-header/common-header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpPageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [HelpPage]
})
export class HelpPageModule {}
