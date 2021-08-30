import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectRolePageRoutingModule } from './select-role-routing.module';

import { SelectRolePage } from './select-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectRolePageRoutingModule
  ],
  declarations: [SelectRolePage]
})
export class SelectRolePageModule {}
