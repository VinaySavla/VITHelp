import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IndexPage } from "./index.page";
import { AuthGuardLogin } from "../guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: IndexPage,
    children: [
      {
        path: "",
        redirectTo: "welcome",
        pathMatch: "full"
      },
      {
        path: "welcome",
        loadChildren: () =>
          import("../pages/welcome/welcome.module").then(
            m => m.WelcomePageModule
          ),
        canActivate: [AuthGuardLogin]
      },
      {
        path: "login",
        loadChildren: () =>
          import("../pages/login/login.module").then(m => m.LoginPageModule),
        canActivate: [AuthGuardLogin]
      }
      // {
      //   path: "signup",
      //   loadChildren: () =>
      //     import("../pages/signup/signup.module").then(m => m.SignupPageModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule {}
