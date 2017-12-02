import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tab0 = 'BillsPage';
  tab1 = 'MainPage';
  tab2 = 'SavingsBucketPage';

  buckets: string = "main";   // Start index of segment

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  pushHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
