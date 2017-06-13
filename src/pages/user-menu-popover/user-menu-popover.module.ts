import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMenuPopoverPage } from './user-menu-popover';

@NgModule({
  declarations: [
    UserMenuPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMenuPopoverPage),
  ],
  exports: [
    UserMenuPopoverPage
  ]
})
export class UserMenuPopoverPageModule {}
