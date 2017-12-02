import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { TestServiceProvider } from "../../providers/test-service/test-service";

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
  providers: [TestServiceProvider]
})
export class TransactionsPage {

  transactions = [];    // Empty array for account info

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider,
              public http: Http) {
    this.getTransactions();
  }

  getTransactions() {
    this.testService.getTransactions()
      .subscribe(
        data => {
          console.log("transactions.ts data: ",data);
          this.transactions = data.result;
        }
      )
  }

  // ionViewDidEnter() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //
  //   this.http.post('http://localhost:3001/transactions', {headers:headers})
  //     .map(res => res.json())
  //     .subscribe(data => {
  //
  //
  //         this.transactions = data.transactions.map((data) => {
  //           return {
  //             amount: data.amount,
  //             name: data.name
  //           }
  //         })
  //
  //       console.log('>>>>>>>>>>>  ', data)
  //       // console.log('>>>>>>>>>>> accounts ', this.accounts)
  //     })
  // }

}
