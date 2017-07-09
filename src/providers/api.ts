import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@Injectable()
export class Api {
  url: string = 'https://kurbi.stamplayapp.com';
  headers: Headers;
  options: RequestOptions;

  constructor(public http: Http, public storage: Storage) {

    // this.storage.remove('gokurbi.com-jwt').then((resp) => {
    //   console.log('user token removed');
    // });

    this.storage.get('gokurbi.com-jwt').then((token) => {
      
      console.log(token);

      if(token) {
        this.headers = new Headers({ 'x-stamplay-jwt': token });
        this.options = new RequestOptions({ headers: this.headers });
      }
    });
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!this.options) {
      this.options = new RequestOptions({ headers: this.headers });
    }

    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      this.options.search = !this.options.search && p || this.options.search;
    }

    let final_endpoint = this.url + '/' + endpoint;
    return this.http.get(final_endpoint, this.options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    this.options = null;
    return this.http.post(this.url + '/' + endpoint, body, this.options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, this.options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, this.options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, this.options);
  }
}
