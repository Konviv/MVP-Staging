import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adjust-bucket',
  templateUrl: 'adjust-bucket.html',
})
export class AdjustBucketPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  exitModal() {
    this.viewCtrl.dismiss();
  }
}
