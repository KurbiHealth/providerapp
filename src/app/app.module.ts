import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

// import { LoginPage } from '../pages/login/login';
// import { ChatsPage } from '../pages/chats/chats';
// import { PostsPage } from '../pages/posts/posts';
// import { ChatboxesPage } from '../pages/chatboxes/chatboxes';

import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { ChatsPageModule } from '../pages/chats/chats.module';
import { ChatroomPageModule } from '../pages/chatroom/chatroom.module';
import { ChatroomreplyPageModule } from '../pages/chatroomreply/chatroomreply.module';
import { PostsPageModule } from '../pages/posts/posts.module';
import { ChatboxesPageModule } from '../pages/chatboxes/chatboxes.module';
import { SelectBotModalPageModule } from '../pages/select-bot-modal/select-bot-modal.module';
import { SelectStyleModalPageModule } from '../pages/select-style-modal/select-style-modal.module';

// import { SessionButtonComponentModule } from '../components/session-button/session-button.module';
// import { SessionButtonComponent } from '../components/session-button/session-button';

import { Api } from '../providers/api';
import { Chats } from '../providers/chats';
import { Posts } from '../providers/posts';
import { Chatbox } from '../providers/chatbox';
import { Bots } from '../providers/bots';
import { Styles } from '../providers/styles';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';

import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MyApp
  // ,SessionButtonComponent
  // LoginPage,
  // ChatsPage,
  // PostsPage,
  // ChatboxesPage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Api,
    Chats,
    Posts,
    Chatbox,
    Bots,
    Styles,
    User,
    Camera,
    SplashScreen,
    StatusBar,

    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    
    // SessionButtonComponentModule,

    LoginPageModule,
    SignupPageModule,
    ChatsPageModule,
    ChatroomPageModule,
    ChatroomreplyPageModule,
    PostsPageModule,
    ChatboxesPageModule,
    SelectBotModalPageModule,
    SelectStyleModalPageModule,
    ChatboxesPageModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
