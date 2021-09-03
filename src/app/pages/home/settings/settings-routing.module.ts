import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsPage } from "./settings.page";

const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./setting-lists/setting-lists.module").then(
            m => m.SettingListsPageModule
          )
      },
      {
        path: "faq",
        loadChildren: () =>
          import("./faq/faq.module").then(m => m.FaqPageModule)
      },
      {
        path: "help",
        loadChildren: () =>
          import("./help/help.module").then(m => m.HelpPageModule)
      },
      {
        path: "terms",
        loadChildren: () =>
          import("./terms/terms.module").then(m => m.TermsPageModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => 
        import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
      }
      // {
      //   path: "profile",
      //   loadChildren: () =>
      //     import("../profile/profile.module").then(m => m.ProfilePageModule)
      // }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule {}
