import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Events } from 'ionic-angular';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = 'TabsPage';

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    {title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home'},
    {title: 'Accounts', pageName: 'TabsPage', tabComponent: 'AccountsPage', index: 1, icon: 'logo-codepen'},
    {title: 'Insights', pageName: 'TabsPage', tabComponent: 'InsightsPage', index: 2, icon: 'analytics'},
    {title: 'Notifications', pageName: 'TabsPage', tabComponent: 'NotificationsPage', index: 3, icon: 'notifications'},
    {title: 'Daily Spend Tracker', pageName: 'SpendTrackerPage', icon: 'calculator'},
    // {title: 'Profile', pageName: 'ProfilePage', icon: 'person'},
    // {title: 'Settings', pageName: 'SettingsPage', icon: 'settings'},
    // {title: 'Help', pageName: 'HelpPage', icon: 'help'},
    {title: 'Logout', pageName: 'LogoutPage', icon: 'log-out'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  openPage(page: PageInterface) {
    let params = {};
    if(page.index) {
      params = {tabIndex: page.index};
    }

    if(this.nav.getActiveChildNav() && page.index != undefined) {
      this.events.subscribe('token:added', (data) => {
        console.log('>>>>>>>>>>>>>>>>> token added is ', data)
      })
      this.nav.getActiveChildNav().select(page.index);
    }
    else {
      this.nav.setRoot(page.pageName, params)
    }
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    if(childNav) {
      if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
    if(this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
  }
}
