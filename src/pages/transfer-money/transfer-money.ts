import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-transfer-money',
  templateUrl: 'transfer-money.html',
})
export class TransferMoneyPage {

  buckets = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.buckets = navParams.get('buckets');
  }

  exitModal() {
    this.viewCtrl.dismiss();
  }
}
