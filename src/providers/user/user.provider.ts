import {Http} from '@angular/http'
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';


@Injectable()
export class UserProvider {
  users:FirebaseListObservable<User[]>
  constructor(
        public af:AngularFire,
        public http: Http,
        ) {
    this.users = this.af.database.list(`/users`)
  }

  createUser(user:User):firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
    .set(user);
  }

}
