import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage } from '../pages/pages';
import { LoginPage } from '../pages/login/login';
import { ChatsPage } from '../pages/chats/chats';
import { PostsPage } from '../pages/posts/posts';
import { ChatboxesPage } from '../pages/chatboxes/chatboxes';

import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { icon: 'chatbubbles', title: 'chats', component: ChatsPage },
    { icon: 'document', title: 'posts', component: PostsPage },
    { icon: 'contact', title: 'bots', component: ChatboxesPage },
    { icon: 'login', title: 'login', component: LoginPage }
  ]

  constructor(private translate: TranslateService, platform: Platform, private config: Config, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.initTranslate();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
