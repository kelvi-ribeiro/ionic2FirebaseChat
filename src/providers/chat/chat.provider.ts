import { AngularFire } from 'angularfire2';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base.provider';
import { Chat } from '../../models/chat.model';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider extends BaseProvider {

  constructor(public af:AngularFire,
              public http: HttpClient) {
              super();
  }

  create(chat:Chat,userId1:string,userId2:string):firebase.Promise<void>{
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
    .set(chat)
    .catch(this.handlePromiseError)
  }

}
