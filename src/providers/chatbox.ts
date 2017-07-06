import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class Chatbox {

  constructor(public http: Http, public api: Api) {
  }

  query(chatboxId?: string, userId?: string) {
    if(chatboxId) {
      return this.api.get('api/cobject/v1/chatbox/' + chatboxId).map(resp => resp.json());
    } else {
      return this.api.get('api/cobject/v1/chatbox?owner=' + userId).map(resp => resp.json());
    }
  }

  new(chatbox) {
    return this.api.post('api/cobject/v1/chatbox',chatbox).map(resp => resp.json());
  }

  delete(chatboxId) {
    return this.api.delete('api/cobject/v1/chatbox/' + chatboxId).map(resp => resp.json());
  }

  update(chatbox) {
    return this.api.put('api/cobject/v1/chatbox/' + chatbox._id, chatbox).map(resp => resp.json());
  }

}