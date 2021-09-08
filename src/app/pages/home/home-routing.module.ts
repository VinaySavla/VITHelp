import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: "",
        redirectTo: "map",
        pathMatch: "full"
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'distressed',
        loadChildren: () => import('./distressed/distressed.module').then( m => m.DistressedPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
