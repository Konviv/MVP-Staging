import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  notifications = 'NotificationsPage';
  insights = 'InsightsPage';
  accounts = 'AccountsPage';
  buckets = 'HomePage';
  myIndex: number;

  public badgeCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.myIndex = navParams.data.tabIndex || 0;

    // Subscribe to the event
    this.events.subscribe('badge:updated', count => {
      this.badgeCount = count;
    });
  }

  // Clear notification badge number
  resetBadgeCount() {
    this.badgeCount = 0;
  }
}
