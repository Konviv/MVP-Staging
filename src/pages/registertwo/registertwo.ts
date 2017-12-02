import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterthreePage } from '../registerthree/registerthree';

/**
 * Generated class for the RegistertwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registertwo',
  templateUrl: 'registertwo.html',
})
export class RegistertwoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showSimpleBucket() {
    this.navCtrl.push('RegisterthreePage');
  }

}
