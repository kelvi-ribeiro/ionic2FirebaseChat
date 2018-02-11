import { FirebaseAuthState } from 'angularfire2';
import { AuthProvider } from './../../providers/auth/auth.provider';
import { UserProvider } from './../../providers/user/user.provider';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/first'
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username
    this.userProvider.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {
        if (!userExists) {
          this.authProvider.createAuthUser({
            email: formUser.email,
            password: formUser.password
          })
            .then((authState: FirebaseAuthState) => {

              delete formUser.password;
              formUser.uid = authState.auth.uid;
              this.userProvider.createUser(formUser)
                .then(() => {
                  this.navCtrl.setRoot(HomePage)
                  loading.dismiss()
                }).catch((error: any) => {
                  console.log(error);
                  loading.dismiss();
                  this.showAlert(error)

                })
            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error)

            })


        } else {
          this.showAlert(`O username ${username} já está sendo usado em outra conta`);
          loading.dismiss();
        }

      });

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

}
