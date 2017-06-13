import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Bots } from '../../providers/providers';

/**
 * Generated class for the SelectElementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-element',
  templateUrl: 'select-element.html',
})
export class SelectElementPage {
  currentItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public bots: Bots) {
    
    console.log(navParams);
    
    this.bots.query(null).subscribe((resp) => {
      this.currentItems = resp.data;
    }, (err) => {
      console.error("todo mal");
    });
  }

  ionViewDidLoad() {
  }

}
