import { OnInit } from '@angular/core';

import { AuthProvider } from './../providers/auth/auth.provider';

import {App,AlertController,MenuController, NavController } from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';
export abstract class BaseComponent implements OnInit{
  protected navCtrl:NavController;
  constructor(
    public alertCtrl:AlertController,
    public AuthProvider:AuthProvider,
    public app:App,
    public menuCtrl:MenuController
  ){}
  ngOnInit():void{
    this.navCtrl = this.app.getActiveNav();
  }
  onLogout():void{
    this.alertCtrl.create({
      message:'Do you want to quit?',
      buttons:[
        {
          text:'Yes',
          handler:()=>{
            this.AuthProvider.logout()
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
