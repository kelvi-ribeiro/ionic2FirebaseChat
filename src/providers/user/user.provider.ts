import { Observable  } from 'rxjs';
import 'rxjs/add/operator/map'
import {Http} from '@angular/http'
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { User } from '../../models/user.model';
import { BaseProvider } from '../base/base.provider';


@Injectable()
export class UserProvider extends BaseProvider {
  users:FirebaseListObservable<User[]>
  currentUser:FirebaseObjectObservable<User>
  constructor(
        public af:AngularFire,
        public http: Http,
        )
         {
           super();

    this.listenAuthState();
  }
  private setUsers(uidToExclude:string):void{
    this.users = <FirebaseListObservable<User[]>>this.af.database.list(`/users`,{
      query:{
        orderByChild:'name'
      }
    }).map((users:User[])=>{
      return users.filter((user:User)=>user.$key !== uidToExclude)
    })
  }
  private listenAuthState():void{
    this.af.auth
    .subscribe((authState:FirebaseAuthState)=>{
      if(authState){
        this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
        this.setUsers(authState.auth.uid);

      }
    })
  }

  createUser(user:User,uuid:string):firebase.Promise<void>{
    return this.af.database.object(`/users/${uuid}`)
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
