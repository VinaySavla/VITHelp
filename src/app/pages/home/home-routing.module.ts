import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
    {
      path: 'map',
      loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
    },
    {
      path: 'notification',
      loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
