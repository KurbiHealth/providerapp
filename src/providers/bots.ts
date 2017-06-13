import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class Bots {

  constructor(public http: Http, public api: Api) {
  }

  query(botId?: string) {

    if(botId) {
      return this.api.get('api/cobject/v1/chatbot/' + botId).map(resp => resp.json());
    } else {
      return this.api.get('api/cobject/v1/chatbot?per_page=250').map(resp => resp.json());
    }
  }

}