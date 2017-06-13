import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { ChatroomreplyPage } from '../chatroomreply/chatroomreply';

import { User } from '../../providers/providers';
import { Chats } from '../../providers/providers';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatroomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {
  session: {};
  chat: any;
  replies: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public chats: Chats, public user: User, public storage: Storage) {
    
    this.replies = [];
    this.chat = this.navParams.get('item');

    this.storage.get('gokurbi.com-user').then((userObject) => {
      this.session = JSON.parse(userObject);
    });
    
  }

  newReply() {
    let replyModal = this.modalCtrl.create(ChatroomreplyPage);
    replyModal.onDidDismiss(item => {
      
      if (item) {
        this.chats.postReply(this.chat.id,item.response).subscribe((reply) => {
          reply.user = this.session;
          this.replies.unshift(reply);
        }, (err) => {
          console.error("todo mal")
        });
        
      }
    })
    replyModal.present();
  }

  deleteReply(reply,index) {
    this.chats.deleteReply(reply.id).subscribe((resp) => {
      this.replies.splice(index,1);
    }, (err) => {
      console.error("todo mal")
    });
  }

  ionViewDidLoad() {

    let anonymous_user = { id: 0, name: "anonymous", displayName: "Anonymous" };

    this.chats.getReplies(this.chat.id).subscribe((resp) => {
      for (let reply of resp.data) {
        reply.user = { id: 0, displayName: '' };
      }

      this.replies = resp.data;
      
      for (let reply of this.replies) {
        if(!reply.owner) {
          reply.user = anonymous_user;
        } else {

          this.user.get(reply.owner).subscribe((resp) => {
            
            reply.user = resp.data[0];
          }, (err) => {
            console.error("todo mal")
          });
        }
      }
    }, (err) => {
      console.error("todo mal")
    });
  }

}
