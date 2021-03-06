
import { Component } from '@angular/core';
import {AlertController,Loading, LoadingController,NavController, NavParams,  } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from './../../providers/auth/auth.provider';
import { HomePage } from '../home/home';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup

  constructor(
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public authProvider:AuthProvider,
    public formBuilder:FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams) {
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }





  onSubmit():void{
    let loading:Loading = this.showLoading();
   this.authProvider.signWithEmail(this.signinForm.value)
   .then((isLogged:boolean)=>{
     if(isLogged){
       this.navCtrl.setRoot(HomePage)
       loading.dismiss();
     }

   }).catch((error:any)=>{
     console.log(error);
     loading.dismiss();
     this.showAlert(error);

   })

  }
  onSignup():void{
    this.navCtrl.push(SignupPage)
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create(({
      content: 'Please wait...'
    }));
    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }
  onHomePage():void{
    this.navCtrl.push(HomePage)
    .then((hasAcess:boolean)=>{
      console.log('Autorizado',hasAcess);

    }).catch(err=>{
      console.log('Não autorizado ',err);

    })
  }
  onLogout():void{
    this.authProvider.logout();
  }

}
