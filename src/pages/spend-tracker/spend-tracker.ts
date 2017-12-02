import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TestServiceProvider} from "../../providers/test-service/test-service";

@IonicPage()
@Component({
  selector: 'page-spend-tracker',
  templateUrl: 'spend-tracker.html',
})
export class SpendTrackerPage {

  sevenDayAvg: number = 0;
  transactions = [];
  dailyAmount = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider) {
    var currentDate = new Date();

    // Fill array with date as key
    for (let i = 0; i < 7; i++) {
      this.dailyAmount.push({
        date: currentDate.toLocaleDateString().toString(),
        amount: 0
      });
      currentDate.setDate(currentDate.getDate() - 1);
    }
    this.getTransactions();
  }

  // Get amount spent each day in the past week
  getTransactions() {
    this.testService.getTransactions()
      .subscribe(
        data => {
          this.transactions = data.result.map((data) => {

            // Get current date
            var d = new Date(data.date);
            var date = d.toLocaleDateString().toString();

            // Increment amount in correct key (date)
            if (date in this.dailyAmount) {
              this.dailyAmount[date] += data.amount;
            }

            return {
              amount: data.amount,
              date: d.toLocaleDateString()
            };
          });

          // Get 7 day average
          let totalAmount = 0;
          this.dailyAmount.forEach(i => {
            if (i.amount != null) {
              totalAmount += i.amount;
            }
          });

          this.sevenDayAvg = totalAmount / 7;
          this.sevenDayAvg.toFixed(2);
        },
        error => alert(error)
      );
  }
}
