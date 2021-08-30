import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupProfilePage } from './setup-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SetupProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupProfilePageRoutingModule {}
