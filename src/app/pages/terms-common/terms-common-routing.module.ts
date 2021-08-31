import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsCommonPage } from './terms-common.page';

const routes: Routes = [
  {
    path: '',
    component: TermsCommonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsCommonPageRoutingModule {}
