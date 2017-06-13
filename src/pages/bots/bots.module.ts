import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BotsPage } from './bots';

@NgModule({
  declarations: [
    BotsPage,
  ],
  imports: [
    IonicPageModule.forChild(BotsPage),
  ],
  exports: [
    BotsPage
  ]
})
export class BotsPageModule {}
