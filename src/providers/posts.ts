import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

// import { Post } from '../models/post';

@Injectable()
export class Posts {

  constructor(public http: Http, public api: Api) {
  }

  query(postId?: string) {

    if(postId) {
      return this.api.get('api/cobject/v1/articles/' + postId).map(resp => resp.json());
    } else {
      return this.api.get('api/cobject/v1/articles?per_page=250').map(resp => resp.json());
    }
  }

}