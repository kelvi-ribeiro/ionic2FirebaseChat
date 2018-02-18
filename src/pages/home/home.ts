import { AuthProvider } from './../../providers/auth/auth.provider';
import { FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from './../signup/signup';
import { UserProvider } from './../../providers/user/user.provider';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users:FirebaseListObservable<User[]>
  view:string = 'chats';

  constructor(
              public authProvider:AuthProvider,
              public navCtrl: NavController,
              public userProvider:UserProvider) {

  }
  ionViewCanEnter():Promise<boolean>{
    return this.authProvider.authenticated;
  }
  ionViewDidLoad(){
    this.users = this.userProvider.users


  }
  onChatCreate(user:User){
    console.log('User',user);

  }
  onSignup():void{
    this.navCtrl.push(SignupPage)
  }

}
