import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule,FirebaseAppConfig} from 'angularfire2'

const FIREBASEAPPCONFIG:FirebaseAppConfig = {
  apiKey: "AIzaSyDkR-rQRhNS7_xWogZcefsKWhaRTBTs5dY",
  authDomain: "ionic2-firebase-chat-cb60a.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-cb60a.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-cb60a.appspot.com",
  messagingSenderId: "568435627712"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASEAPPCONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
