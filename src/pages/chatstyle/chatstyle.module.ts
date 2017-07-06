import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatstylePage } from './chatstyle';

@NgModule({
  declarations: [
    ChatstylePage,
  ],
  imports: [
    IonicPageModule.forChild(ChatstylePage),
  ],
  exports: [
    ChatstylePage
  ]
})
export class ChatstylePageModule {}
