import { UserProvider } from './../../providers/user/user.provider';
import { AuthProvider } from './../../providers/auth/auth.provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:string[] = [];
  newMessage:string;
  pageTitle:string;
  sender:User;
  recipiente:User;



  constructor(public userProvider:UserProvider,
              public authProvider:AuthProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }
  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }
  ionViewDidLoad(){
    this.recipiente = this.navParams.get('recipenteUser');
    this.pageTitle = this.recipiente.name;
    this.userProvider.currentUser
    .first()
    .subscribe((currentUser:User)=>{
      this.sender = currentUser;
      console.log('this.sender',this.sender);

    })
  }

 sendMessage(newMessage:string):void{
   this.messages.push(newMessage);
 }

}
