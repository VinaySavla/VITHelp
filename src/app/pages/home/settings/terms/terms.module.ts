import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TermsPageRoutingModule } from "./terms-routing.module";

import { TermsPage } from "./terms.page";
import { CommonHeaderModule } from "src/app/components/common-header/common-header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsPageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [TermsPage]
})
export class TermsPageModule {}
