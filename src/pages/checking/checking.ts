import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TestServiceProvider } from '../../providers/test-service/test-service';

@IonicPage()
@Component({
  selector: 'page-checking',
  templateUrl: 'checking.html',
  providers: [TestServiceProvider]
})
export class CheckingPage {

  showMore: boolean = false;
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

  // Toggle SHOW MORE
  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
