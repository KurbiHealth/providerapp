import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

// import { Chat } from '../models/chat';

@Injectable()
export class Chats {

  constructor(public http: Http, public api: Api) {
  }

  query(chatRoomId?: string) {

    if(chatRoomId) {
      return this.api.get('api/cobject/v1/chatroomreplies?chatRoomId=' + chatRoomId).map(resp => resp.json());
    } else {
      return this.api.get('api/codeblock/v1/run/conversations').map(resp => resp.json());
    }
    
  }

  getReplies(chatRoomId: string) {
    return this.api.get('api/cobject/v1/chatroomreplies?sort=-dt_create&chatRoomId=' + chatRoomId ).map(resp => resp.json());
  }

  postReply(chatRoomId: string, text: string) {
    return this.api.post('api/cobject/v1/chatroomreplies',{chatRoomId: chatRoomId, replyText: text}).map(resp => resp.json());
  }

  deleteReply(replyId: String) {
    return this.api.delete('api/cobject/v1/chatroomreplies/' + replyId).map(resp => resp.json());
  }

}