import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TestServiceProvider } from "../../providers/test-service/test-service";
import {ShareServiceProvider} from "../../providers/share-service/share-service";

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {

  month;
  day;
  billDate;
  upcomingBillName;
  upcomingBillAmount;
  bills = [];
  allBills = [];
  bucketArray = [];
  billBuckets = [];

  tempBills = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestServiceProvider,
              public shareService: ShareServiceProvider) {

    // Get current date
    var date = new Date();
    this.month = date.toLocaleString("en-us", {month: "long"});
    this.day = date.getUTCDate();

    this.getBills();
    this.getBillBuckets();
  }

  getBills() {
    this.testService.getTransactions()
      .subscribe(
        data => {
          this.bills = data.result.map((data) => {
            if (data.category === "Service" || data.category === "Rent") {
              var d = new Date(data.date);

              return {
                amount: data.amount,
                category: data.category,
                date: d.toLocaleDateString(),                 // Change date to MM/DD/YYYY format
                name: data.name
              }
            }
          });

          this.tempBills = data.result.map((data) => {
            if (data.category === "Service" || data.category === "Rent") {
              var d = new Date(data.date);

              return {
                amount: data.amount,
                category: data.category,
                date: d.toLocaleDateString(),                 // Change date to MM/DD/YYYY format
                name: data.name
              }
            }
          });

          // Get current month
          var date = new Date();
          var currentMonth = date.getUTCMonth();

          // Get bills from the current month
          this.bills = this.bills.filter(function(i) {
            if (i !== undefined) {
              var d = new Date(i.date);
              var month = d.getUTCMonth();
            }
            // return (i !== undefined && month == currentMonth);
            return (i !== undefined);
          });

          if (this.bills.length > 0) {
            this.bills.forEach(i => {
              var inAllBills = false;

              // Check if bill is in all bills array
              for (let j = 0; j < this.allBills.length; j++) {
                if (i.name == this.allBills[j].name) {
                  inAllBills = true;
                }
              }

              // Set month to current month
              var d = new Date(i.date);
              d.setMonth(currentMonth);

              // Add bill to array if not already there
              if (!inAllBills) {
                this.allBills.push(
                  {
                    name: i.name,
                    date: d.toLocaleDateString(),
                    amount: i.amount
                  }
                )
                inAllBills = false;
              }
            });

            // Display next bill due
            var billDate = new Date();

            // Find next bill due
            var billDue = this.allBills[0];
            var billDueDate = new Date(billDue.date);

            this.allBills.forEach(i => {

              // Get time in milliseconds
              var d = new Date(i.date);
              var billTime = d.getTime();
              var currentTime = billDate.getTime();

              if (Math.abs(currentTime - billTime) < Math.abs(currentTime - billDueDate.getTime()) &&
                billTime > currentTime) {
                billDue = i;
              }
            });

            this.billDate = billDue.date;                       // Change date to MM/DD/YYYY format
            this.upcomingBillAmount = billDue.amount;
            this.upcomingBillName = billDue.name;
          }
        },
        error => alert(error)
      );
  }


  getBillBuckets() {
    this.testService.getBuckets()
      .subscribe(
        data => {
          this.bucketArray = data;
          this.billBuckets = this.bucketArray.filter(function(i) {
            return (i.bucketname == "Insurance" || i.bucketname == "Loans" || i.bucketname == "Rent" ||
              i.bucketname == "Subscription" ||  i.bucketname == "Bills" || i.bucketname == "Variable Bills");
          });

          // Check if bucket is below 15%
          this.bucketArray.forEach(i => {
            var percent = (i.bucketfill / i.bucketsize) * 100;
            if (percent < 15) {
              this.shareService.setLowBucketTrigger(true);    // Activate trigger if percent is below 15%
            }
          });
        },
        error => alert(error),
      );
  }
}
