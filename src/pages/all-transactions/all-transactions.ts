import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TestServiceProvider } from "../../providers/test-service/test-service";

@IonicPage()
@Component({
  selector: 'page-all-transactions',
  templateUrl: 'all-transactions.html',
  providers: [TestServiceProvider]
})
export class AllTransactionsPage {

  transactions = [];    // Empty array for account info

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider) {
    this.listAccounts();
  }

  listAccounts() {
    this.testService.getList()
      .subscribe(
        data => this.transactions = data,
        error => alert(error),
        () => console.log('finished list' + this.transactions)
      );
  }
}

