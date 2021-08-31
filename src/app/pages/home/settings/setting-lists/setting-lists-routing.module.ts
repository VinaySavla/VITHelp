import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingListsPage } from './setting-lists.page';

const routes: Routes = [
  {
    path: '',
    component: SettingListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingListsPageRoutingModule {}
