import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { Styles } from '../../providers/providers';

/**
 * Generated class for the SelectStyleModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-style-modal',
  templateUrl: 'select-style-modal.html',
})
export class SelectStyleModalPage {

  currentItems: any[];

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public styles: Styles) {
      
      this.currentItems = [];
      let selectedStyles = navParams.data.styles;
      
      this.styles.query(null).subscribe((resp) => {
        
        for (var index = 0; index < resp.data.length; index++) {
          
          if(selectedStyles.includes(resp.data[index].id)) {
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

    confirm() {
      let selection = [];
      for (var index = 0; index < this.currentItems.length; index++) {
        if(this.currentItems[index].selected) {
          selection.push(this.currentItems[index].id);
        }
      }
      this.viewCtrl.dismiss(selection);
    }

  ionViewDidLoad() {
    
  }

}
