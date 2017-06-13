import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { Bots } from '../../providers/providers';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the BotsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bots',
  templateUrl: 'bots.html',
})
export class BotsPage {
  session: {};
  currentItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public bots: Bots, public storage: Storage, public modalCtrl: ModalController) {
    this.session = { displayName: '' };
    this.storage.get('gokurbi.com-user').then((userObject) => {
      this.session = JSON.parse(userObject);
    });

    this.bots.query().subscribe((resp) => {
      this.currentItems = resp.data;
    }, (err) => {
      console.error("todo mal");
    });
  }

  ionViewDidLoad() {
  }

}
