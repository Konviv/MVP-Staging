import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TestServiceProvider} from "../../providers/test-service/test-service";

@IonicPage()
@Component({
  selector: 'page-all-insights',
  templateUrl: 'all-insights.html',
})
export class AllInsightsPage {

  location;
  amount = 0;
  numTransactions = 0;
  monthlySpending = 0;
  previousMonthlySpending = 0;
  weeklyAvg = 0;
  allTransactions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider) {

    // Get current month
    var currentDate = new Date();
    var currentMonth = currentDate.getUTCMonth();
    var currentYear = currentDate.getUTCFullYear();

    this.getInsights(currentMonth, currentYear);
  }

  getInsights(currentMonth, currentYear) {
    this.testService.getTransactions()
      .subscribe(
        data => {
          var category = "Food and Drink";

          this.allTransactions = data.result.map((data) => {
            return {
              name: data.name,
              amount: data.amount,
              category: data.category,
              date: data.date
            };
          });

          this.allTransactions.forEach(i => {

            // Get month of transaction
            var date = new Date(i.date);
            var month = date.getUTCMonth();

            var prevMonth = month - 1;                                            // Get previous month

            // Get amounts spent this month and previous month
            if(currentMonth == month) {
              this.monthlySpending += i.amount;
            }
            if (currentMonth - 1 == prevMonth) {
              this.previousMonthlySpending += i.amount;
            }
          });

          // Get all transaction of given category
          this.allTransactions = this.allTransactions.filter(function(i) {
            return (i.category == category);
          });

          this.location = this.allTransactions[1].name;                           // Get name of location
          this.allTransactions.forEach(i => {
            var monthSpend = 0;

            // Get month of transaction
            var date = new Date(i.date);
            var month = date.getUTCMonth();

            // Get amount spent this month
            if(currentMonth == month) {
              monthSpend += i.amount;
            }

            this.weeklyAvg = monthSpend / 4;                                      // Get weekly average spent on food

            if (i.name == this.location && i.amount != null) {
              this.amount += i.amount;
              this.numTransactions++;
            }
          })
        }
      )
  }
}
