import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import {AllTransactionsPage} from '../all-transactions/all-transactions';
import {CheckingPage} from '../checking/checking';
import {SavingsPage} from '../savings/savings';
import {TransactionsPage} from '../transactions/transactions';
import {UpdateAccountPage} from '../update-account/update-account';
import { AccountTransactionsPage } from '../account-transactions/account-transactions';

import {TestServiceProvider} from '../../providers/test-service/test-service';
import {ShareServiceProvider} from "../../providers/share-service/share-service";

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
  providers: [TestServiceProvider]
})
export class AccountsPage {

  accounts = [];
  transactions = [];
  accTransactions = [];
  amountSpent = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider,
              public http: Http, public shareService: ShareServiceProvider) {

    // Get last three days and their months
    var currentDate = new Date();
    var firstMonth = currentDate.getUTCMonth();
    var firstDay = currentDate.getUTCDate();
    currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    var secondMonth = currentDate.getUTCMonth();
    var secondDay = currentDate.getUTCDate();
    currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    var thirdMonth = currentDate.getUTCMonth();
    var thirdDay = currentDate.getUTCDate();


    this.loadAccounts();
    this.getAmountSpent(firstMonth, firstDay, secondMonth, secondDay, thirdMonth, thirdDay);
  }

  // Get accounts
  loadAccounts() {
    this.testService.getAccounts()
      .subscribe(data => {
          // this.accounts = data.accounts.map((data) => {
          this.accounts = data.result.map((data) => {
            return {
              subtype: data.subtype,
              balance: data.availablebalance,
              accountId: data.account_id,
            }
          })
        console.log("accounts: ", this.accounts);

      })
  }

  listSingleAccTrans(accId, accountName) {
    console.log("acct.ts accId: ", accId);
    this.navCtrl.push(AccountTransactionsPage, {id: accId, subtype: accountName})
  }


  // Push all transactions page
  //ionViewDidEnter() {
      // this.testService.getTransactions()
      // .subscribe(data => {
      //     this.transactions = data.transactions.map((data) => {
      //       return {
      //         amount: data.amount,
      //         name: data.name
      //       }
      //     })
      // })

      // this.testService.getList()
      //   .subscribe(
      //     data => {
      //       console.log("data: ", data);
      //
      //       this.transactions = data;
      //     }
      //   );

  //}
  // ionViewDidEnter() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   this.http.post('http://localhost:3001/transactions', {headers:headers})
  //     .map(res => res.json())
  //     .subscribe(data => {
  //         this.transactions = data.transactions.map((data) => {
  //           return {
  //             amount: data.amount,
  //             name: data.name
  //           }
  //         })
  //     })
  // }

  ionViewDidEnter() {
    this.testService.getTransactions()
      .subscribe(data => {
        console.log('>>>>>>>> transactions are ', data)
        this.transactions = data.result.map((data) => {
          return {
            amount: data.amount,
            name: data.name
          }
        })
      })
  }

  pushAllTransactions(transactions) {
     this.navCtrl.push('TransactionsPage');
  }

  getAmountSpent(firstMonth, firstDay, secondMonth, secondDay, thirdMonth, thirdDay) {
    this.testService.getTransactions()
      .subscribe(data => {
        // console.log('====================== ', data)
          this.transactions = data.result;

          this.transactions.forEach(i => {

            // Get month and day of transaction
            var date = new Date(i.date);
            var month = date.getUTCMonth();
            var day = date.getUTCDate();

            // Get amount from last 3 days
            if(firstMonth == month && firstDay == day || secondMonth == month && secondDay == day ||
               thirdMonth == month && thirdDay == day) {
              if (i.amount >= 0) {
                this.amountSpent += i.amount;
              }
            }
          });
        },
        error => alert(error)
      )
  }
}
