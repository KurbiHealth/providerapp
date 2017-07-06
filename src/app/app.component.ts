import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { FirstRunPage } from '../pages/pages';
import { MainPage } from '../pages/pages';

import { LoginPage } from '../pages/login/login';
import { ChatsPage } from '../pages/chats/chats';
import { PostsPage } from '../pages/posts/posts';
import { ChatboxesPage } from '../pages/chatboxes/chatboxes';
import { ChatstylePage } from '../pages/chatstyle/chatstyle';

import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: {};
  session: {};
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { icon: 'chatbubbles', title: 'chats', component: ChatsPage },
    { icon: 'document', title: 'posts', component: PostsPage },
    { icon: 'code-working', title: 'chatboxes', component: ChatboxesPage }
  ]

  constructor(private translate: TranslateService, platform: Platform, private config: Config, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    // this.initTranslate();
    this.session = null;


    this.session = {displayName: '', role: ''};
    this.storage.get('gokurbi.com-user').then((userObject) => {
      if(userObject) {
        this.session = JSON.parse(userObject);
        this.rootPage = MainPage;
        
        if(this.session['role']==='admin') {
          this.pages.push({ icon: 'brush', title: 'styles', component: ChatstylePage });
        }

        this.pages.push({ icon: 'log-out', title: 'logout', component: LoginPage });

      } else {
        // No user session
        this.session = null;
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  ionViewWillEnter() {
    this.session = {displayName: '', role: ''};
    this.storage.get('gokurbi.com-user').then((userObject) => {
      if(userObject) {
        this.session = JSON.parse(userObject);
      } else {
        this.session = null;
      }
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    if(page.title=='logout') {
      //logout menu button clicked

      this.storage.remove('gokurbi.com-user').then((resp) => {
        console.log('user storage removed');
        this.session = null;
      });
    }
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
