import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasePage } from './case.page';

const routes: Routes = [
  {
    path: '',
    component: CasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasePageRoutingModule {}
