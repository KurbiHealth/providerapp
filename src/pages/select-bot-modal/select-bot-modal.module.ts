import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectBotModalPage } from './select-bot-modal';

@NgModule({
  declarations: [
    SelectBotModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectBotModalPage),
  ],
  exports: [
    SelectBotModalPage
  ]
})
export class SelectBotModalPageModule {}
