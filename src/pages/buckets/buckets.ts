import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AdjustBucketPage} from "../adjust-bucket/adjust-bucket";
import {TransferMoneyPage} from "../transfer-money/transfer-money";
import {TestServiceProvider} from "../../providers/test-service/test-service";

@IonicPage()
@Component({
  selector: 'page-buckets',
  templateUrl: 'buckets.html',
})
export class BucketsPage {

  bucket;
  bucketArray;
  listOfBuckets = [];
  allTransactions = [];
  bucketTransactions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public viewCtrl: ViewController, public actionSheetCtrl: ActionSheetController,
              public testService: TestServiceProvider) {
    this.bucket = navParams.get("bucket");

    this.bucketArray = navParams.get("bucketArray");

    this.getTransactions(this.bucket);

    // Make sure bucketArray is not altered by copying buckets into another array
    for (let i = 0; i < this.bucketArray.length; i++) {
      this.listOfBuckets[i] = this.bucketArray[i];
    }

    // Get index of the current bucket
    var currentBucketIndex = this.listOfBuckets.indexOf(this.bucket);

    // Make sure item was found before removing
    if (currentBucketIndex > -1) {
      this.listOfBuckets.splice(currentBucketIndex, 1);               // Removes one item
    }
  }

  getTransactions(bucket) {
    this.testService.getTransactions()
      .subscribe(
        data => {
          this.bucketTransactions = data.result.map((data) => {
            let d = new Date(data.date);
            return {
              name: data.name,
              amount: data.amount,
              date: d.toLocaleDateString()
            }
          });
        }
      )
  }

  // Create modal for adjust bucket page
  pushAdjustBucketPage() {
    let adjustBucketModal = this.modalCtrl.create(AdjustBucketPage);
    adjustBucketModal.present();
  }

  // Create modal for transfer money page
  pushTransferMoneyPage() {
    let transferMoneyModal = this.modalCtrl.create(TransferMoneyPage, {buckets: this.listOfBuckets});
    transferMoneyModal.present();
  }

  // Open action sheet to move transaction to another bucket
  openMoveTransaction(t) {
    let date = new Date(t.date);
    let month = date.getMonth();
    let day = date.getDate();

    let moveTxnSheet = this.actionSheetCtrl.create({
      title: month + "/" + day + " " + t.name + " $" + t.amount,
      subTitle: "Move transaction to:",
      buttons: [
        {
          text: this.listOfBuckets[0].Category
        },
        {
          text: this.listOfBuckets[1].Category
        },
        {
          text: this.listOfBuckets[2].Category
        },
        {
          text: this.listOfBuckets[3].Category
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    moveTxnSheet.present();
  }

  // Close modal
  exitModal() {
    this.viewCtrl.dismiss();
  }
}
