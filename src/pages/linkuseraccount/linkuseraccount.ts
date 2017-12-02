import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-linkuseraccount',
  templateUrl: 'linkuseraccount.html',
})
export class LinkuseraccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  // userInfo = {
  //   public_token: 'public-sandbox-05726013-af6a-4b99-89a7-3d29589689d1'
  // };

  linkUserAccounts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get('http://localhost:3001/accounts', {headers:headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log('the data is >>>>>>>> ', data);
      })

     this.navCtrl.setRoot('LinkuseraccountPage');
  }

}
