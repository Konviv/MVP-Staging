import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettingsProvider } from '../../providers/app-settings/app-settings';
import { LinkuseraccountPage } from '../linkuseraccount/linkuseraccount';
import { RegistersixPage } from '../registersix/registersix';
import {ShareServiceProvider} from "../../providers/share-service/share-service";


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  apiUrl = this.appSettings.getApiUrl();
  user = {};
  user_id;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              public appSettings: AppSettingsProvider, private alertCtrl: AlertController,
              public shareService: ShareServiceProvider) {
    // this.user_id = this.shareService.getUserId();
  }


  register() {
    if(this.user.email.match(/@/g)) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.apiUrl + 'register', JSON.stringify(this.user), {headers:headers})
        .map(res => res.json())
        .subscribe(data => {

          console.log("register data: ", data);

          this.shareService.setUserId(data.user_id);

          console.log("data: ", data);
          console.log("data.user_id: ", data.user_id);
          console.log("user_id: ", this.user_id);

          if(data.success === true) {
            this.navCtrl.push('RegistersixPage');
          }
          else if(data.success === false) {
            let alert = this.alertCtrl.create({
              title: 'Bad Request',
              subTitle: 'Email already exists, please a different email',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        })
      // this.user_id = this.shareService.getUserId();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Not A Valid Email',
        subTitle: 'Please Try Again',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

}
