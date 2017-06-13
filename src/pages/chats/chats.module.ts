import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatsPage } from './chats';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ChatsPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ChatsPage),
  ],
  exports: [
    ChatsPage
  ]
})
export class ChatsPageModule {}
