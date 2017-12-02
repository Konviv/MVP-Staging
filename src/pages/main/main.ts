import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { BucketsPage } from "../buckets/buckets";
import { TestServiceProvider } from "../../providers/test-service/test-service";
import { ShareServiceProvider } from "../../providers/share-service/share-service";

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  leftToSpend = 0;
  income = 0;
  creditCardBalance = 0;
  cashInChecking = 0;
  hasCreditCard = false;
  badgeCount: number = 0;                            // Number of new notifications to display in badge
  bucketArray = [];                                  // Array containing bucket objects
  transactions = [];
  accounts = [];
  user_id;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public testService: TestServiceProvider, public events: Events,
              public shareService: ShareServiceProvider) {
    this.user_id = this.shareService.getUserId();
    // this.getAccounts();
    this.getIncome();
    this.getCreditCardBalance();
    this.getBuckets();

    // Increment badge count if trigger was activated
    if (this.shareService.getLowBucketTrigger() == true) {
      this.incrementBadgeCount();
    }
    if (this.shareService.getIncomeTrigger() == true) {
      this.incrementBadgeCount();
    }
    if (this.shareService.getBillPaidTrigger() == true) {
      this.incrementBadgeCount();
    }
  }

  // // Make sure to load user id
  // getAccounts() {
  //   this.testService.getAccounts()
  //     .subscribe(
  //       data => {
  //         console.log("main.ts account data: ", data);
  //
  //       },
  //       error => alert(error)
  //     )
  // }

  // Get income
  getIncome() {
    this.testService.getTransactions()
      .subscribe(
        data => {
          this.transactions = data.result.map((data) => {
            if (data.category === "Transfer") {
              return {
                category: data.category,
                amount: data.amount,
                name: data.name
              };
            }
          });

          // Get all valid transactions
          this.transactions = this.transactions.filter(function(i) {
            return (i !== undefined);
          });

          this.transactions.forEach(i => {

            // Check if there was an income event
            if (i.name.includes("Deposit") || i.name.includes("deposit") ) {
              this.income += i.amount;
              this.shareService.setIncomeTrigger(true);
            }

            // Check if transfer was a bill
            if (i.name.includes("Bill") || i.name.includes("bill")) {
              this.shareService.setBillPaidTrigger(true);
            }
          });
        },
        error => alert(error)
      )
  }

  // Get credit card information
  getCreditCardBalance() {
    this.testService.getAccounts()
      .subscribe(
        data => {

          // Get total balance
          var creditCardAccount = 0;

          this.accounts = data.result.map(i => {
            if (i.subtype == 'credit card') {
              creditCardAccount++;
              if (i.availablebalance != null) {
                this.creditCardBalance += i.availablebalance;
              }
            }
            if (i.subtype == 'checking') {
              if (i.availablebalance != null) {
                this.cashInChecking += i.availablebalance;
              }
            }
          });

          // Check if credit card exists
          if (creditCardAccount > 0) {
            this.hasCreditCard = true;
          }
        }
      )
  }

  getBuckets() {
    this.testService.getBuckets()
      .subscribe(
        data => {
          this.bucketArray = data;
          console.log("main.ts buckets",data);

          // Check if bucket is below 15%
          this.bucketArray.forEach(i => {
            var percent = (i.bucket_fill / i.bucket) * 100;
            if (percent < 15) {
              this.shareService.setLowBucketTrigger(true);    // Activate trigger if percent is below 15%
            }
          });

        },
        error => alert(error),
        () => {
          // Calculate amount left to spend
          for (let i = 0; i < this.bucketArray.length; i++) {
            this.leftToSpend += this.bucketArray[i].bucket_fill;
          }

        }
      );
  }

  // Increment badge count for new notifications
  incrementBadgeCount(): void {
    this.events.publish('badge:updated', ++this.badgeCount);
  }

  // Decrement badge count for new notifications
  decrementBadgeCount(): void {

    // Make sure notifications are never negative
    if (this.badgeCount == 0) {
      this.events.publish('badge:updated', 0);
    }
    else {
      this.events.publish('badge:updated', --this.badgeCount);
    }
  }

  // Create modal for bucket page
  pushBucket(bucket) {
    let bucketModal = this.modalCtrl.create(BucketsPage, {
      bucket: bucket,
      bucketArray: this.bucketArray
    });
    bucketModal.present();
  }
}
