import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatroomreplyPage } from './chatroomreply';

@NgModule({
  declarations: [
    ChatroomreplyPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatroomreplyPage),
  ],
  exports: [
    ChatroomreplyPage
  ]
})
export class ChatroomreplyPageModule {}
