import { OnInit } from '@angular/core';

import { AuthProvider } from './../providers/auth/auth.provider';

import {App,AlertController,MenuController, NavController } from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';
export abstract class BaseComponent implements OnInit{
  protected navCtrl:NavController;
  constructor(
    public alertCtrl:AlertController,
    public authProvider:AuthProvider,
    public app:App,
    public menuCtrl:MenuController
  ){}
  ngOnInit():void{
    this.navCtrl = this.app.getActiveNav();
    // this.navCtrl = this.app.getActiveNavs[0].push
  }
  onLogout():void{
    this.alertCtrl.create({
      message:'Do you want to quit?',
      buttons:[
        {
          text:'Yes',
          handler:()=>{
            this.authProvider.logout()
            .then(()=>{
              this.navCtrl.setRoot(SigninPage)
            })
          }
        },
        {
          text:'No'
        }
      ]
    }).present();
  }
}
