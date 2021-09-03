import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuarantinedPage } from './quarantined.page';

const routes: Routes = [
  {
    path: '',
    component: QuarantinedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuarantinedPageRoutingModule {}
