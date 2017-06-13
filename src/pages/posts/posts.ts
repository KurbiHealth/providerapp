import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Posts } from '../../providers/providers';
import { Post } from '../../models/post';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the PostsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  session: {};
  currentItems: Post[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public posts: Posts, public storage: Storage) {
    this.session = { displayName: '' };
    this.storage.get('gokurbi.com-user').then((userObject) => {
      this.session = JSON.parse(userObject);
    });
    
    this.posts.query().subscribe((resp) => {
      this.currentItems = resp.data;
    }, (err) => {
      console.error("todo mal")
    });
  }

  ionViewDidLoad() {
  }

   /**
   * Local searchbar Items
   */
  getItems($event) {
    return this.currentItems;
  }

}
