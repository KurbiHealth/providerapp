import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectStyleModalPage } from './select-style-modal';

@NgModule({
  declarations: [
    SelectStyleModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectStyleModalPage),
  ],
  exports: [
    SelectStyleModalPage
  ]
})
export class SelectStyleModalPageModule {}
