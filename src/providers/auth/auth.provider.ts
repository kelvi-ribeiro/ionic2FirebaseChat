import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { BaseProvider } from '../base/base.provider';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(
    public auth: AngularFireAuth,
    public http: Http
  ) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: { email: string, password: string }): firebase.Promise<FirebaseAuthState> {

    return this.auth.createUser(user)
    .catch(this.handlePromiseError);
  }
  signWithEmail(user:{email:string,password:string}):firebase.Promise<boolean>{
    return this.auth.login(user)
    .then((authState:FirebaseAuthState)=>{
      return authState != null;
    }).catch(this.handlePromiseError)
  }

}
