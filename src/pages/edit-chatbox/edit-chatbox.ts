import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

import { Bots } from '../../providers/providers';
import { Styles } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-edit-chatbox',
  templateUrl: 'edit-chatbox.html',
})
export class EditChatboxPage {

  @ViewChild(Slides) slider: Slides;

  botsArray: any[];
  stylesArray: any[];
  isReadyToSave: boolean;

  chatboxName: string;
  selectedStyle: any;
  selectedBots: string;

  newChatbox: boolean;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public bots: Bots, public styles: Styles, public _DomSanitizer: DomSanitizer) {

    this.botsArray = [];
    this.stylesArray = [];
    this.selectedStyle = {
      id: '',
      image: ''
    };

    this.newChatbox = (navParams.data.new)?true:false;

    this.chatboxName = (navParams.data.chatbox)?navParams.data.chatbox.name:'';
    this.selectedBots = (navParams.data.chatbox)?navParams.data.chatbox.bots:'';
    this.selectedStyle.id = (navParams.data.chatbox)?navParams.data.chatbox.styles.toString():'';

    this.isReadyToSave = true;

    this.bots.query(null).subscribe((resp) => {
      
      for (let index = 0; index < resp.data.length; index++) {
        if(this.selectedBots.indexOf(resp.data[index].id)!=-1) {
          resp.data[index].selected = true;
        } else {
          resp.data[index].selected = false;
        }
        
        this.botsArray.push(resp.data[index]);
      }
      
    }, (err) => {
      console.error("todo mal");
    });

    this.styles.query(null).subscribe((resp) => {
      this.stylesArray = resp.data;
    }, (err) => {
      console.error("todo mal");
    });
  }

  updateBots() {
    for (let index = 0; index < this.botsArray.length; index++) {
      if(this.botsArray[index].selected) {
        this.selectedBots += (this.selectedBots.length)?','+this.botsArray[index].id:this.botsArray[index].id;
      }
    }
  }

  selectStyle(style) {
    this.selectedStyle = style;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  confirm() {
    let selectedBots = [];
    for (let index = 0; index < this.botsArray.length; index++) {
      if(this.botsArray[index].selected) selectedBots.push(this.botsArray[index].id);
    }

    let chatbox = { 
      name: this.chatboxName,
      styles: [this.selectedStyle.id],
      styleImage: this.selectedStyle.image,
      bots: selectedBots
    };

    this.viewCtrl.dismiss(chatbox);
  }

  remove() {
    this.viewCtrl.dismiss('delete');
  }

  slideNext() {
    this.slider.slideNext();
  }

  slidePrev() {
    this.slider.slidePrev();
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      if(this.slider) {
        this.slider.update();
      }
    },300);
  }

}
