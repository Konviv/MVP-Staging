import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {AllInsightsPage} from "../all-insights/all-insights";

import {TestServiceProvider} from "../../providers/test-service/test-service";

@IonicPage()
@Component({
  selector: 'page-insights',
  templateUrl: 'insights.html',
  providers: [TestServiceProvider]
})
export class InsightsPage {

  allTransactions = [];
  amountSaved = 0;
  numberOfTransactionsOver100 = 0;
  monthlySpending = 0;
  dailyAverage;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider) {

    // Get current month
    var currentDate = new Date();
    var currentMonth = currentDate.getUTCMonth();
    var currentYear = currentDate.getUTCFullYear();

    this.getInsights(currentMonth, currentYear);
  }

  // Get amount saved in specific category
  getInsights(currentMonth, currentYear) {
    this.testService.getTransactions()
      .subscribe(
        data => {
          var category = "Food and Drink";
          var totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Get total days in current month

          this.allTransactions = data.result.map((data) => {
            return {
              name: data.name,
              amount: data.amount,
              category: data.category,
              date: data.date
            };
          });

          this.allTransactions.forEach(i => {

            // Get number of transactions that are over $100
            // Get month of transaction
            var date = new Date(i.date);
            var month = date.getUTCMonth();

            // Increment counter
            if (i.amount > 100 && month == currentMonth) {
              this.numberOfTransactionsOver100++;
            }

            // Total spent this month
            if(currentMonth == month) {
              this.monthlySpending += i.amount;
            }
          });

          // Get daily average to 2 decimal points
          this.dailyAverage = this.monthlySpending / totalDaysInMonth;
          this.dailyAverage = this.dailyAverage.toFixed(2);

          // Get all transaction of given category
          this.allTransactions = this.allTransactions.filter(function(i) {
            return (i.category == category);
          });

          this.allTransactions.forEach(i => {
            var amountSpentLastMonth = 0;
            var amountSpentThisMonth = 0;

            // Get month of transaction
            var date = new Date(i.date);
            var month = date.getUTCMonth();

            // Calculate amount spent previous month
            if (month == (currentMonth-1)) {
              amountSpentLastMonth += i.amount;
            }

            // Calculate amount spent this month
            if (month == currentMonth) {
              amountSpentThisMonth += i.amount;
            }

            this.amountSaved = amountSpentLastMonth - amountSpentThisMonth;
          })
        }
      )
  }

  pushAllInsights() {
    this.navCtrl.push(AllInsightsPage);
  }
}
