import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatroomPage } from './chatroom';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ChatroomPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ChatroomPage),
  ],
  exports: [
    ChatroomPage
  ]
})
export class ChatroomPageModule {}
