import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistressedPage } from './distressed.page';

const routes: Routes = [
  {
    path: '',
    component: DistressedPage
  },
  {
    path: 'chatbot',
    loadChildren: () => import('./chatbot/chatbot.module').then( m => m.ChatbotPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistressedPageRoutingModule {}
