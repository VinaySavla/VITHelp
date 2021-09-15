import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationPage } from './notification.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  },  {
    path: 'case',
    loadChildren: () => import('./case/case.module').then( m => m.CasePageModule)
  },
  {
    path: 'certificate',
    loadChildren: () => import('./certificate/certificate.module').then( m => m.CertificatePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
