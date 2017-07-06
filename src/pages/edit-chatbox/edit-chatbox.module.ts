import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditChatboxPage } from './edit-chatbox';

@NgModule({
  declarations: [
    EditChatboxPage,
  ],
  imports: [
    IonicPageModule.forChild(EditChatboxPage),
  ],
  exports: [
    EditChatboxPage
  ]
})
export class EditChatboxPageModule {}
