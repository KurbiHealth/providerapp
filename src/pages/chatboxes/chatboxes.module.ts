import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatboxesPage } from './chatboxes';

@NgModule({
  declarations: [
    ChatboxesPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatboxesPage),
  ],
  exports: [
    ChatboxesPage
  ]
})
export class ChatboxesPageModule {}
