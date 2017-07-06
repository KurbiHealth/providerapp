import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionButtonComponent } from './session-button';

@NgModule({
  declarations: [
    SessionButtonComponent,
  ],
  imports: [
    IonicPageModule.forChild(SessionButtonComponent),
  ],
  exports: [
    SessionButtonComponent
  ]
})
export class SessionButtonComponentModule {}
