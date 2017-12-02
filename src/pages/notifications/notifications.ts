import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Platform, Events} from 'ionic-angular';
import {LocalNotifications} from '@ionic-native/local-notifications';

import {TestServiceProvider} from "../../providers/test-service/test-service";
import {ShareServiceProvider} from "../../providers/share-service/share-service";
import {share} from "rxjs/operator/share";

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  lowBucketTrigger;
  incomeTrigger;
  billDueTrigger;
  billPaidTrigger;
  badgeCount: number = 0;                // Number of new notifications to display in badge

  newNotifications = [];
  oldNotifications = [];
  allNotifications = [
    {
      title: "Buckets running low",
      text: "You have buckets that are below 15% capacity",
      date: new Date()
    },
    {
      title: "Income received",
      text: "Your income has come in",
      date: new Date()
    },
    {
      title: "Upcoming bill",
      text: "You have a bill that is due soon",
      date: new Date()
    },
    {
      title: "Bill paid",
      text: "You have paid off a bill",
      date: new Date()
    }
  ];

  constructor(public navCtrl: NavController, private plt: Platform, private localNotifications: LocalNotifications,
              alertCtrl: AlertController, public testService: TestServiceProvider, public events: Events,
              public shareService: ShareServiceProvider) {
    this.getNotifications();

    this.plt.ready().then((readySource) => {
      this.localNotifications.on('schedule', (notification, state) => {
        let json = JSON.parse(notification.data);

        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.message
        });
        alert.present();
      });
    });

    // Find out if trigger is true
    this.lowBucketTrigger = this.shareService.getLowBucketTrigger();
    this.incomeTrigger = this.shareService.getIncomeTrigger();
    this.billDueTrigger = this.shareService.getBillDueTrigger();
    this.billPaidTrigger = this.shareService.getBillPaidTrigger();

    // Create notifications if trigger is true
    if (this.lowBucketTrigger == true) {
      this.bucketsAreLowNotification();
    }
    if (this.incomeTrigger == true) {
      this.incomeReceivedNotification();
    }
    if (this.billDueTrigger == true) {
      this.upcomingBillNotification();
    }
    if (this.billPaidTrigger == true) {
      this.billPaidNotification();
    }
  }

  // API Calls ---------------------------------------------------------------------------------------------------------

  // Get past notifications to display
  getNotifications() {
    this.testService.getNotifications()
      .subscribe(
        data => {
          this.oldNotifications = data;
        console.log("old notifications: ", this.oldNotifications);
        },
        error => alert(error)
      )
  }

  // Post notification to database after it has been clicked
  postNotifications(notification) {
    var date = new Date(notification.date);
    this.testService.postNotifications({
      name: notification.text,
      date: date.toLocaleDateString()
  }).subscribe();

    var index = this.newNotifications.indexOf(notification);
    if (index > -1) {
      this.newNotifications.splice(index, 1);          // Remove from new notifications
    }
    this.decrementBadgeCount();                                   // Decrement badge count
  }

  // Notifications -----------------------------------------------------------------------------------------------------

  // Create notification for when buckets are below 15%
  bucketsAreLowNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: this.allNotifications[0].title,
      text: this.allNotifications[0].text,
      at: this.allNotifications[0].date
    });

    this.newNotifications.push(this.allNotifications[0]);   // Add new notification to array being displayed
    this.incrementBadgeCount();
  }

  // Create notification when income is received
  incomeReceivedNotification() {
    this.localNotifications.schedule({
      id: 2,
      title: this.allNotifications[1].title,
      text: this.allNotifications[1].text,
      at: this.allNotifications[1].date
    });

    this.newNotifications.push(this.allNotifications[1]);   // Add new notification to array being displayed
    this.incrementBadgeCount();
  }

  // Create notification when bill due date is coming up
  upcomingBillNotification() {
    this.localNotifications.schedule({
      id: 3,
      title: this.allNotifications[2].title,
      text: this.allNotifications[2].text,
      at: this.allNotifications[2].date
    });

    this.newNotifications.push(this.allNotifications[2]);   // Add new notification to array being displayed
    this.incrementBadgeCount();
  }

  // Create notification when a bill has been paid
  billPaidNotification() {
    this.localNotifications.schedule({
      id: 4,
      title: this.allNotifications[3].title,
      text: this.allNotifications[3].text,
      at: this.allNotifications[3].date
    });

    this.newNotifications.push(this.allNotifications[3]);   // Add new notification to array being displayed
    this.incrementBadgeCount();
  }

  // Badge count handlers ----------------------------------------------------------------------------------------------

  // Increment badge count for new notifications
  incrementBadgeCount(): void {
    this.events.publish('badge:updated', ++this.badgeCount);
  }

  // Decrement badge count for new notifications
  decrementBadgeCount(): void {

    // Make sure notifications are never negative
    if (this.badgeCount == 0) {
      this.events.publish('badge:updated', this.badgeCount = 0);
    }
    else {
      this.events.publish('badge:updated', --this.badgeCount);
    }
  }

  // Clear notification badge number and move notifications to old array
  resetBadgeCount(): void {
    this.events.publish('badge:updated', this.badgeCount = 0);
    for (let i = 0; i < this.newNotifications.length; i++) {
      this.oldNotifications.push(this.newNotifications[i]);
    }
    this.newNotifications.splice(0, this.newNotifications.length);
  }
}
