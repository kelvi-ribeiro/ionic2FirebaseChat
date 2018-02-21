import { ChatProvider } from './../../providers/chat/chat.provider';
import { AuthProvider } from './../../providers/auth/auth.provider';
import { FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from './../signup/signup';
import { UserProvider } from './../../providers/user/user.provider';
import { User } from '../../models/user.model';
import { ChatPage } from '../chat/chat';
import { Chat } from '../../models/chat.model';
import firebase from 'firebase'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users:FirebaseListObservable<User[]>
  view:string = 'chats';

  constructor(
              public chatProvider:ChatProvider,
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
  onChatCreate(recipenteUser:User){
    this.userProvider.currentUser
    .first()
    .subscribe((currentUser:User)=>{
      this.chatProvider.getDeepChat(currentUser.$key,recipenteUser.$key)
      .first()
      .subscribe((chat:Chat)=>{
        if(chat.hasOwnProperty('$value')){
          let timestamp:Object = firebase.database.ServerValue.TIMESTAMP;
          let chat1 = new Chat('',timestamp,recipenteUser.name,'');
          this.chatProvider.create(chat1,currentUser.$key,recipenteUser.$key);
          let chat2 = new Chat('',timestamp,currentUser.name,'');
          this.chatProvider.create(chat2,recipenteUser.$key,currentUser.$key);
        }

      });

    })

    this.navCtrl.push(ChatPage,{
      recipenteUser:recipenteUser
    })

  }
  onSignup():void{
    this.navCtrl.push(SignupPage)
  }

}
