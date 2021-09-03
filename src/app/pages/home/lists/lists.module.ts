import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ListsPageRoutingModule } from "./lists-routing.module";

import { ListsPage } from "./lists.page";
import { CommonHeaderModule } from "src/app/components/common-header/common-header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsPageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
