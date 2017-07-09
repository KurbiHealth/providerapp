import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/user';

import {App, Events} from 'ionic-angular';

// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  session: any;

  constructor(
    public app: App,
    public events: Events,
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController, public storage: Storage) {

    this.session = {};
    this.loginErrorString = 'Bad credentials, please try again.';
    
    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // });
  }

  // Attempt to login in through our User service
  doLogin() {

    this.user.login(this.account).subscribe((resp) => {

      this.session = resp.json();
      this.user.getRole(this.session.givenRole).subscribe((roleResp) => {

        this.session.role = roleResp.json().name;
        
        if(!this.session.displayName) {
          this.session['displayName'] = '';
        }

        // Save Stamplay jwt for current app user session
        this.storage.set('gokurbi.com-jwt', resp.headers.get('x-stamplay-jwt'));
        this.storage.set('gokurbi.com-user',JSON.stringify(this.session)).then((userObject) => {
          
          this.events.publish('user:login', userObject, this.session.role);
          this.app.getRootNav().setRoot(MainPage);
        });
      }, (err) => {
        
        console.error("todo mal")
      });

    }, (err) => {
      if(err) {
        console.log(err);
        
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }
}
