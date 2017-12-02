import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { AdjustBucketPage } from "../pages/adjust-bucket/adjust-bucket";
import { AllInsightsPage } from './../pages/all-insights/all-insights';
import { AllTransactionsPage } from './../pages/all-transactions/all-transactions';
import { BucketsPage } from './../pages/buckets/buckets';
import { CheckingPage } from './../pages/checking/checking';
import { LoginPage } from './../pages/login/login';
import { MenuPage } from './../pages/menu/menu';  // FOR TESTING
import { SavingsPage } from './../pages/savings/savings';
import { TransferMoneyPage } from "../pages/transfer-money/transfer-money";
import { UpdateAccountPage } from './../pages/update-account/update-account';
import { AccountTransactionsPage } from './../pages/account-transactions/account-transactions'

import { AppSettingsProvider } from '../providers/app-settings/app-settings';
import { TestServiceProvider } from '../providers/test-service/test-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ShareServiceProvider } from '../providers/share-service/share-service';

@NgModule({
  declarations: [
    MyApp,
    AdjustBucketPage,
    AllInsightsPage,
    AllTransactionsPage,
    BucketsPage,
    CheckingPage,
    LoginPage,
    SavingsPage,
    TransferMoneyPage,
    UpdateAccountPage,
    AccountTransactionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        windows: {
          tabsPlacement: 'bottom',
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdjustBucketPage,
    AllInsightsPage,
    AllTransactionsPage,
    BucketsPage,
    CheckingPage,
    LoginPage,
    SavingsPage,
    TransferMoneyPage,
    UpdateAccountPage,
    AccountTransactionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppSettingsProvider,
    TestServiceProvider,
    LocalNotifications,
    ShareServiceProvider
  ]
})
export class AppModule {}
