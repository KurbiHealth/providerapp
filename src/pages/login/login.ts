import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

// import { TranslateService } from '@ngx-translate/core';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'matiasgallego@gmail.com',
    password: '0gKYRyUiHm5M&Q@zR'
  };

  // Our translated text strings
  private loginErrorString: string;
  session: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    // public translateService: TranslateService,
    public storage: Storage) {

    this.loginErrorString = 'Bad credentials, please try again.';
    this.storage.get('gokurbi.com-user').then((userObject) => {
      if(userObject) {
        this.navCtrl.push(MainPage);
      }
    });

    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      
      // Save Stamplay jwt for current app user session
      this.storage.set('gokurbi.com-jwt', resp.headers.get('x-stamplay-jwt'));
      this.storage.set('gokurbi.com-user',resp.text());

      this.navCtrl.push(MainPage);

    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
