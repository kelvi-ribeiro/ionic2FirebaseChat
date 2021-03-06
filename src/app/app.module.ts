
import { ChatPage } from './../pages/chat/chat';
import { CapitalizePipe } from './../pipes/capitalize.pipe';

import { UserProvider } from './../providers/user/user.provider';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule,FirebaseAppConfig,AuthProviders, AuthMethods} from 'angularfire2'
import { SignupPage } from '../pages/signup/signup';
import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth.provider';
import { BaseProvider } from '../providers/base/base.provider';
import { SigninPage } from '../pages/signin/signin';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';
import { ChatProvider } from '../providers/chat/chat.provider';




// const FIREBASEAPPCONFIG:FirebaseAppConfig = {
const FIREBASEAPPCONFIG = {
  apiKey: "AIzaSyDkR-rQRhNS7_xWogZcefsKWhaRTBTs5dY",
  authDomain: "ionic2-firebase-chat-cb60a.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-cb60a.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-cb60a.appspot.com",
  messagingSenderId: "568435627712"
};
  const firebaseAuthConfig = {
    provider:AuthProviders.Custom,
    method:AuthMethods.Password

  }
@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  imports: [

    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASEAPPCONFIG,firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  providers: [
    ChatProvider,
    AuthProvider,
    StatusBar,
    SplashScreen,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,


  ]
})
export class AppModule {}
