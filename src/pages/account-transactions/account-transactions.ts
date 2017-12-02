import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import {TestServiceProvider} from "../../providers/test-service/test-service";

/**
 * Generated class for the AccountTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-transactions',
  templateUrl: 'account-transactions.html',
})
export class AccountTransactionsPage {
  accTransactions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              public testService: TestServiceProvider) {
    this.getTransactions();
  }

   accId = this.navParams.get('id');
  accountName = this.navParams.get('subtype');

  getTransactions() {
    this.testService.getTransactions()
      .subscribe(
        data => {
          console.log("acct-trxns.ts accId: ",this.accId);
          console.log("data result: ", data.result);
          this.accTransactions = data.result.filter((data) => {
            if (data.account_id == this.accId) {
              return {
                amount: data.amount,
                name: data.name
              }
            }
          });
          console.log("accTransactions array: ", this.accTransactions);

        }
      )
  }

  // ionViewDidLoad() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   this.http.post('http://localhost:3001/transactions', {headers:headers})
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       this.accTransactions = data.transactions.filter((data) => {
  //         console.log('------------- ', data)
  //         if(data.account_id === this.accId) {
  //           return {
  //             amount: data.amount,
  //             name: data.name
  //           }
  //         }
  //         })
  //         console.log('>>>>>>>>>>>>>>> ', this.accTransactions)
  //       });
  // }

}
