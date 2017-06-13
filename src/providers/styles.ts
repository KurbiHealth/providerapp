import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class Styles {

  constructor(public http: Http, public api: Api) {
  }

  query(styleId?: string) {

    if(styleId) {
      return this.api.get('api/cobject/v1/chatstyle/' + styleId).map(resp => resp.json());
    } else {
      return this.api.get('api/cobject/v1/chatstyle?per_page=250').map(resp => resp.json());
    }
  }

}