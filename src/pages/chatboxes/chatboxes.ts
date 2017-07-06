import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { EditChatboxPage } from '../edit-chatbox/edit-chatbox';

import { SelectBotModalPage } from '../select-bot-modal/select-bot-modal';
import { SelectStyleModalPage } from '../select-style-modal/select-style-modal';

import { Chatbox } from '../../providers/providers';
import { Styles } from '../../providers/providers';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatbox: Chatbox, public styles: Styles, public storage: Storage, public modalCtrl: ModalController) {
    this.currentItems = [];
    this.session = { id: '', displayName: '' };
    this.storage.get('gokurbi.com-user').then((userObject) => {
      this.session = JSON.parse(userObject);

      this.chatbox.query(null,this.session.id).subscribe((resp) => {
        for (let index = 0; index < resp.data.length; index++) {
          this.styles.query(resp.data[index].styles.toString()).subscribe((styleResp) => {
            resp.data[index].styleImage = styleResp.image;
            this.currentItems.push(resp.data[index]);
          }, (err) => {
            console.error("todo mal");
          });
        }
        
      }, (err) => {
        console.error("todo mal");
      });

    });
  }

  ionViewDidLoad() {
  }

  create() {
    let replyModal = this.modalCtrl.create(EditChatboxPage, { new: true } );
    replyModal.onDidDismiss(selection => {
      if (selection) {
        
        var styleImage = selection.styleImage;

        let newChatbox = {
          owner: this.session.id,
          name: selection.name,
          bots: selection.bots.toString(),
          styles: selection.styles
        };

        this.chatbox.new(newChatbox).subscribe((resp) => {
          resp.styleImage = styleImage;
          this.currentItems.push(resp);
        }, (err) => {
          console.error("todo mal");
        });
      }
    })
    replyModal.present();
  }

  update(index) {
    let replyModal = this.modalCtrl.create(EditChatboxPage,{ chatbox: this.currentItems[index] });
    replyModal.onDidDismiss(resp => {
      if (resp) {

        if(resp=="delete") {
          this.delete(index);

        } else {

        var styleImage = resp.styleImage;

        let updateChatbox = {
          _id: this.currentItems[index]._id,
          owner: this.currentItems[index].owner,
          name: resp.name,
          bots: resp.bots,
          styles: resp.styles
        };
        
        this.chatbox.update(updateChatbox).subscribe((resp) => {
          resp.styleImage = styleImage;
          this.currentItems[index] = resp;
        }, (err) => {
          console.error("todo mal");
        });
        }
      }

    })
    replyModal.present();
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
