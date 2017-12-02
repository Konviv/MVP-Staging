import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { RegisterOnePage } from '../register-one/register-one';
import { LinkuseraccountPage } from '../linkuseraccount/linkuseraccount';
import { TellonePage } from '../tellone/tellone';

import { AppSettingsProvider } from '../../providers/app-settings/app-settings';
import {ShareServiceProvider} from "../../providers/share-service/share-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  apiUrl = this.appSettings.getApiUrl();
  token = String;
  user = {};
  user_id;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              public appSettings: AppSettingsProvider, public events: Events, private alertCtrl: AlertController,
              public shareService: ShareServiceProvider) {
    this.user = this.user;
  }


  ionViewDidLoad() {
    this.events.publish('token:added', {stuff: 'stuff'})
  }

  doLogin() {
    // this.navCtrl.setRoot('MenuPage')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.apiUrl + 'login', JSON.stringify(this.user), {headers:headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log('>>>>>>>>>>>> ', data)
        // this.events.publish('token:added', data.token)
        if(data.login === 'yes') {
          this.token = data.token;
          // this.user_id = data.user_id;
          console.log("login.ts user id: ", data.user_id);
          this.shareService.setUserId(data.user_id);
          this.navCtrl.setRoot('MenuPage')
        }
        else if(data.login === 'no') {
          let alert = this.alertCtrl.create({
            title: 'Bad Request',
            subTitle: 'Email or Password is incorrect, please try again',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      })
  }

  registerUser() {
    this.navCtrl.setRoot('RegisterOnePage');
  }

  tellMeMore() {
    this.navCtrl.push('TellonePage');
  }

}
