import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Styles } from '../../providers/providers';
import { SelectStyleModalPage } from '../select-style-modal/select-style-modal';

@IonicPage()
@Component({
  selector: 'page-chatstyle',
  templateUrl: 'chatstyle.html',
})
export class ChatstylePage {
  session: {};
  currentItems: any[];
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public styles: Styles, 
    public storage: Storage, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
      
      this.currentItems = [];
      
      this.session = { displayName: '' };
      this.storage.get('gokurbi.com-user').then((userObject) => {
        this.session = JSON.parse(userObject);
      });

      this.styles.query(null).subscribe((resp) => {

        this.currentItems = resp.data;
        
      }, (err) => {
        console.error("todo mal");
      });
    }

    edit(styleObject,index) {

      let replyModal = this.modalCtrl.create(SelectStyleModalPage,{ style: styleObject });
      replyModal.onDidDismiss(item => {
        if (item) {

          let updateStyle = {
            _id: styleObject.id,
            name: item.name,
            about: item.about,
            image: item.stylePic
          };
          
          let loading = this.loadingCtrl.create({
            content: 'Updating, please wait...'
          });

          loading.present();

          this.styles.update(updateStyle).subscribe((resp) => {
            this.currentItems[index] = resp;
            loading.dismiss();
          }, (err) => {
            console.error("todo mal");
          });
        }

      })
      replyModal.present();
      
    }
}
