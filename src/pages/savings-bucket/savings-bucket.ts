import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TestServiceProvider} from "../../providers/test-service/test-service";

@IonicPage()
@Component({
  selector: 'page-savings-bucket',
  templateUrl: 'savings-bucket.html',
})
export class SavingsBucketPage {

  savingsTotal = 0;
  avgMonthlySpending = 0;
  amountInSavings = 0;
  allAccounts;
  allTransactions = [];
  amountSpentEachMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider) {
    this.getSavings();
    this.averageMonthlySpending();
  }

  // Get amount currently available in savings account
  getSavings() {
    this.testService.getAccounts()
      .subscribe(
        data => {
          this.allAccounts = data.result.map(i => {
            if (i.subtype == "savings" && i.balances.available != null) {
              this.amountInSavings += i.balances.available;
            }
          });
        }
      );
  }

  // Get average monthly spending
  averageMonthlySpending() {
    this.testService.getTransactions()
      .subscribe(
        data => {
          this.allTransactions = data.result.map((data) => {

            // Get month of current transaction
            var date = new Date(data.date);
            var month = date.getUTCMonth();

            if (data.amount != null) {
              this.amountSpentEachMonth[month] += data.amount;   // Get total amount spent in that month
            }
          });

          let activeMonths = 0;
          let monthlyTotal = 0;

          // Get number of months that money was spent
          for (let i = 0; i < this.amountSpentEachMonth.length; i++) {
            if (this.amountSpentEachMonth[i] > 0) {
              activeMonths++;
            }
          }

          // Get total spent in all months
          for (let i = 0; i < this.amountSpentEachMonth.length; i++) {
            monthlyTotal += this.amountSpentEachMonth[i];
          }

          if (activeMonths > 0) {
            this.avgMonthlySpending = monthlyTotal / activeMonths;
          }
        },
        error => alert(error)
      );
  }

  changeSavingsTotal(months) {
    this.savingsTotal = this.avgMonthlySpending * months;                       // Multiply total by month goal
    this.savingsTotal.toFixed(2);
  }
}
