import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'session-button',
  templateUrl: 'session-button.html'
})
export class SessionButtonComponent {

  session: {};

  constructor(public storage: Storage) {
    this.session = { displayName: ''};

    this.storage.get('gokurbi.com-user').then((userObject) => {
      if(userObject) {
        this.session = JSON.parse(userObject);
      } else {
        this.session = null;
      }
    });
  }

}
