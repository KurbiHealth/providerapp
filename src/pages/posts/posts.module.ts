import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsPage } from './posts';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    PostsPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(PostsPage),
  ],
  exports: [
    PostsPage
  ]
})
export class PostsPageModule {}
