import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistersevenPage } from '../registerseven/registerseven';
import {TestServiceProvider} from "../../providers/test-service/test-service";
import {ShareServiceProvider} from "../../providers/share-service/share-service";

/**
 * Generated class for the RegistersixPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersix',
  templateUrl: 'registersix.html',
})
export class RegistersixPage {

  user_id;

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider,
              public shareService: ShareServiceProvider) {
    this.user_id = this.shareService.getUserId();
    console.log("register six user id: ", this.user_id);
  }

  linkBank() {
    this.navCtrl.push('RegistersevenPage');
  }

}
