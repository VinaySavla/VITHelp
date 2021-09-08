import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatbotPageRoutingModule } from './chatbot-routing.module';

import { ChatbotPage } from './chatbot.page';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonHeaderModule,
    ChatbotPageRoutingModule
  ],
  declarations: [ChatbotPage]
})
export class ChatbotPageModule {}
