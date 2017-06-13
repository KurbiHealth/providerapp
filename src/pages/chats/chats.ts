import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ChatroomPage } from '../chatroom/chatroom';

import { Chats } from '../../providers/providers';
import { Chat } from '../../models/chat';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  session: {};
  currentItems: Chat[];

  constructor(public navCtrl: NavController, public chats: Chats, public storage: Storage) {
    this.session = { displayName: '' };
    this.storage.get('gokurbi.com-user').then((userObject) => {
      this.session = JSON.parse(userObject);
    });

    this.chats.query().subscribe((resp) => {
      this.currentItems = resp.conversations;
    }, (err) => {
      console.error("todo mal")
    });

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Go to the Chatroom details page
   */
  goChatroomPage(chatroom) {
    this.navCtrl.push(ChatroomPage, 
      { item: chatroom}, 
      { animate: true, direction: 'forward' }
    );
  }

   /**
   * Local searchbar Items
   */
  getItems($event) {
    return this.currentItems;
  }

}
