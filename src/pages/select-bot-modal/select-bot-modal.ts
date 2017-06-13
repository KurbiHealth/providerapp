import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Bots } from '../../providers/providers';

/**
 * Generated class for the SelectBotModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-bot-modal',
  templateUrl: 'select-bot-modal.html',
})
export class SelectBotModalPage {

    currentItems: any[];

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public bots: Bots) {
      
      this.currentItems = [];
      let selectedBots = navParams.data.bots;
      
      this.bots.query(null).subscribe((resp) => {
        
        for (var index = 0; index < resp.data.length; index++) {
          
          if(selectedBots.includes(resp.data[index].name)) {
            resp.data[index].selected = true;
          } else {
            resp.data[index].selected = false;
          }
          
          this.currentItems.push(resp.data[index]);
        }
        
      }, (err) => {
        console.error("todo mal");
      });
    }

    updateBotList(bot) {

    }

    confirm() {
      let selection = [];
      for (var index = 0; index < this.currentItems.length; index++) {
        if(this.currentItems[index].selected) {
          selection.push(this.currentItems[index].name);
        }
      }
      this.viewCtrl.dismiss(selection);
    }

    ionViewDidLoad() {
    }
}
