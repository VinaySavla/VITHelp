import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, AuthGuardLogin } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then(m => m.IndexPageModule),
    canActivate: [AuthGuardLogin]
  },
  {
    path: 'select-role',
    loadChildren: () =>
      import('./pages/select-role/select-role.module').then(
        m => m.SelectRolePageModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'submit-otp',
    loadChildren: () =>
      import('./pages/submit-otp/submit-otp.module').then(
        m => m.SubmitOtpPageModule
      ),
    canActivate: [AuthGuardLogin]
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'setup-profile',
    loadChildren: () =>
      import('./pages/setup-profile/setup-profile.module').then(m => m.SetupProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/home/settings/contact-us/contact-us.module').then( m => m.ContactUsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'terms-common',
    loadChildren: () => import('./terms-common/terms-common.module').then( m => m.TermsCommonPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
