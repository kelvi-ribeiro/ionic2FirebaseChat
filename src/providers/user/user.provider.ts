import { Observable  } from 'rxjs';
import 'rxjs/add/operator/map'
import {Http} from '@angular/http'
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';
import { BaseProvider } from '../base/base.provider';


@Injectable()
export class UserProvider extends BaseProvider {
  users:FirebaseListObservable<User[]>
  constructor(
        public af:AngularFire,
        public http: Http,
        )
         {
           super();
    this.users = this.af.database.list(`/users`)
  }

  createUser(user:User):firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
    .set(user)
    .catch(this.handlePromiseError)
  }
  userExists(username:string):Observable<boolean>{
    return  this.af.database.list(`/users`,{
       query:{
         orderByChild:'username',
         equalTo:username
       }
     }).map((users:User[])=>{
       return users.length>0;
     }).catch(this.handleObservableError)


  }

}
