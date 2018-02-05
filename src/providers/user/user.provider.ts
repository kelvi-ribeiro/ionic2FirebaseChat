import {Http} from '@angular/http'
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from 'firebase';


@Injectable()
export class UserProvider {

  constructor(
        public af:AngularFire,
        public http: Http,
        ) {
    console.log('Hello UserProvider Provider');
  }

  createUser(user:User):firebase.Promise<void>{
    return this.af.database.list(`/users`)
    .push(user);
  }

}
