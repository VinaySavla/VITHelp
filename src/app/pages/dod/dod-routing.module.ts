import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DodPage } from './dod.page';

const routes: Routes = [
  {
    path: '',
    component: DodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DodPageRoutingModule {}
