import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

// import { SelectElementPage } from '../select-element/select-element';
import { SelectBotModalPage } from '../select-bot-modal/select-bot-modal';
import { SelectStyleModalPage } from '../select-style-modal/select-style-modal';

import { Chatbox } from '../../providers/providers';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatboxesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chatboxes',
  templateUrl: 'chatboxes.html',
})
export class ChatboxesPage {
  session: any;
  currentItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatbox: Chatbox, public storage: Storage, public modalCtrl: ModalController) {
    this.session = { id: '', displayName: '' };
    this.storage.get('gokurbi.com-user').then((userObject) => {
      this.session = JSON.parse(userObject);

      this.chatbox.query(null,this.session.id).subscribe((resp) => {
        this.currentItems = resp.data;

        // this.currentItems.push(resp.data[0]);
        // this.currentItems.push(resp.data[0]);
        // this.currentItems.push(resp.data[0]);
        // this.currentItems.push(resp.data[0]);
        // this.currentItems.push(resp.data[0]);
        // this.currentItems.push(resp.data[0]);
        
      }, (err) => {
        console.error("todo mal");
      });

    });
  }

  ionViewDidLoad() {
  }

  create() {
    this.chatbox.new().subscribe((resp) => {
      
      if(!resp.bots) resp.bots = [];
      if(!resp.styles) resp.styles = [];

      this.currentItems.push(resp);
    }, (err) => {
      console.error("todo mal");
    });
  }

  delete(index){
    this.chatbox.delete(this.currentItems[index].id).subscribe((resp) => {
      this.currentItems.splice(index,1);
    }, (err) => {
      console.error("todo mal");
    });
  }

  addBot(index) {
    let chatbox = this.currentItems[index];

    if(!chatbox.bots) chatbox.bots = [];
    let replyModal = this.modalCtrl.create(SelectBotModalPage,{ bots: chatbox.bots });
    replyModal.onDidDismiss(selection => {
      if (selection) {
        
        let updateChatbox = {
          _id: chatbox._id,
          owner: chatbox.owner,
          bots: selection
        };
        
        this.chatbox.update(updateChatbox).subscribe((resp) => {
          this.currentItems[index].bots = resp.bots;
        }, (err) => {
          console.error("todo mal");
        });
      }

    })
    replyModal.present();
  }

  removeBot(index,botname) {
    let chatbox = this.currentItems[index];
    let bot = chatbox.bots.indexOf(botname);
    
    chatbox.bots.splice(bot,1);

    let updateChatbox = {
      _id: chatbox._id,
      owner: chatbox.owner,
      bots: chatbox.bots
    };
    
    this.chatbox.update(updateChatbox).subscribe((resp) => {
      this.currentItems[index].bots = resp.bots;
    }, (err) => {
      console.error("todo mal");
    });
  }

  addStyle(index) {
    let chatbox = this.currentItems[index];

    if(!chatbox.styles) chatbox.styles = [];
    let replyModal = this.modalCtrl.create(SelectStyleModalPage,{ styles: chatbox.styles });
    replyModal.onDidDismiss(selection => {
      if (selection) {
        
        let updateChatbox = {
          _id: chatbox._id,
          owner: chatbox.owner,
          styles: selection
        };
        
        this.chatbox.update(updateChatbox).subscribe((resp) => {
          this.currentItems[index].styles = resp.styles;
        }, (err) => {
          console.error("todo mal");
        });
      }

    })
    replyModal.present();
  }

  removeStyle(index,stylename) {
    let chatbox = this.currentItems[index];
    let style = chatbox.styles.indexOf(stylename);
    
    chatbox.styles.splice(style,1);

    let updateChatbox = {
      _id: chatbox._id,
      owner: chatbox.owner,
      styles: chatbox.styles
    };
    
    this.chatbox.update(updateChatbox).subscribe((resp) => {
      this.currentItems[index].styles = resp.styles;
    }, (err) => {
      console.error("todo mal");
    });
  }
}
