import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { Styles } from '../../providers/providers';

import { Camera } from '@ionic-native/camera';

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
    
    @ViewChild('fileInput') fileInput;
    isReadyToSave: boolean;
    item: any;
    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public navParams: NavParams, public styles: Styles, public camera: Camera) {
      
      let current = navParams.data.style;

      this.form = formBuilder.group({
        stylePic: [current.image || ''],
        name: [current.name || '', Validators.required],
        about: [current.about || '']
      });

      // Watch the form for changes, and
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });

    }

    getPicture() {
      if (Camera['installed']()) {
        this.camera.getPicture({
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 96,
          targetHeight: 96
        }).then((data) => {
          this.form.patchValue({ 'stylePic': 'data:image/jpg;base64,' + data });
        }, (err) => {
          alert('Unable to take photo');
        })
      } else {
        this.fileInput.nativeElement.click();
      }
    }

    processWebImage(event) {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this.form.patchValue({ 'stylePic': imageData });
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    getImageStyle() {
      return 'url(' + this.form.controls['stylePic'].value + ')'
    }

    cancel() {
      this.viewCtrl.dismiss();
    }

    confirm() {
      if (!this.form.valid) { return; }    
      this.viewCtrl.dismiss(this.form.value);
    }

    ionViewDidLoad() {
      
    }

}
