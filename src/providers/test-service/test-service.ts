import { AppSettingsProvider } from './../app-settings/app-settings';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
// import { user } from '../../pages/login/login';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {ShareServiceProvider} from "../share-service/share-service";

@Injectable()
export class TestServiceProvider {
  acc = [];
  apiUrl = this.appSettings.getApiUrl();
  user_id;

  constructor(public http: Http, public appSettings: AppSettingsProvider, public events: Events,
              public shareService: ShareServiceProvider) {
    this.user_id = this.shareService.getUserId();
    console.log("test service user id: ", this.user_id);
    this.getAccounts();
    this.getTransactions();
    this.getList();
    // this.loginUser();
  }

  // loginUser() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //
  //   return this.http.post( this.apiUrl + 'login', JSON.stringify(this.user), {headers:headers})
  //     .map(res => res.json())
  //     // .subscribe(data => {
  //     //   if(data.login === 'yes') {
  //     //     this.token = data.token;
  //     //     return this.navCtrl.setRoot('MenuPage')
  //     //   }
  //     //   else {
  //     //     console.log('Bad login cridentials');
  //     //   }
  //     // })
  // }

  ionViewDidLoad() {
    this.events.subscribe('token:added', (data) => {
      console.log('>>>>>>>>>>>>>>>>> token added is ', data)
    })
  }

  getAccounts(){
     return this.http.get(this.apiUrl+'accounts/' + this.user_id)
     .map(response => response.json());
   }

   getTransactions() {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');

     return this.http.get(this.apiUrl + 'transactions/' + this.user_id)
       .map(res => res.json());
   }

  getList(){
     return this.http.get(this.apiUrl+'list')
     .map(response=> response.json().result);
   }

  getAccountById(id) {
    return this.http.get(this.apiUrl+'account/' + id)
      .map(response => response.json().result);
  }

  // getList(){
  //   return this.http.get(this.apiUrl+'list')
  //     .map(response=> response.json().result);
  // }

  getBuckets() {
    console.log("test service getBuckets() user id: ",this.user_id);
    return this.http.get(this.apiUrl+'buckets/' + this.user_id)
      .map(response=> response.json().result);
  }

  getNotifications() {
    return this.http.get(this.apiUrl+'notifications/' + this.user_id)
      .map(response=> response.json().result);
  }

  postNotifications(notification) {
    // let body = JSON.stringify(notification);

    return this.http.post(this.apiUrl+'notifications/' + this.user_id, notification)
      .map(response => response.json().result);

      // .subscribe(
      //   data => {
      //     console.log(data['_body']);
      //   },
      //   error => alert(error)
      // )
  }
}
