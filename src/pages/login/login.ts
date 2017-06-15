import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/user';

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

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController, public storage: Storage) {

    this.loginErrorString = 'Bad credentials, please try again.';
    
    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {

      // Save Stamplay jwt for current app user session
      this.storage.set('gokurbi.com-jwt', resp.headers.get('x-stamplay-jwt'));
      this.storage.set('gokurbi.com-user',resp.text()).then((userObject) => {
        this.navCtrl.setRoot(MainPage);
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
