import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToHome() {
    this.navCtrl.setRoot('MenuPage')
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    //
    // this.http.post('http://localhost:3001/login', JSON.stringify(this.user), {headers:headers})
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     if(data.login === 'yes') this.navCtrl.setRoot('MenuPage')
    //     else {
    //       console.log('Bad login cridentials');
    //     }
    //   })
  }

}
