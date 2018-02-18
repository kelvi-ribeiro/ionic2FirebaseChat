import { AuthProvider } from '../../providers/auth/auth.provider';
import { BaseComponent } from '../base.component';
import { Component, Input } from '@angular/core';
import {App,AlertController,MenuController } from 'ionic-angular';


@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input()
  title:string;

  constructor(
    public alertCtrl:AlertController,
    public authProvider:AuthProvider,
    public app:App,
    public menuCtrl:MenuController
  ) {
   super(alertCtrl,authProvider,app,menuCtrl);
  }

}
