import { Injectable } from '@angular/core';

@Injectable()
export class ShareServiceProvider {

  lowBucketTrigger: boolean;
  incomeTrigger: boolean;
  billDueTrigger: boolean;
  billPaidTrigger: boolean;
  user_id = 0;

  constructor() {
    this.lowBucketTrigger = false;
    this.incomeTrigger = false;
    this.billDueTrigger = false;
    this.billPaidTrigger = false;
  }

  setLowBucketTrigger(trigger) {
    this.lowBucketTrigger = trigger;
  }

  getLowBucketTrigger() {
    return this.lowBucketTrigger;
  }

  setIncomeTrigger(trigger) {
    this.incomeTrigger = trigger;
  }

  getIncomeTrigger() {
    return this.incomeTrigger;
  }

  setBillDueTrigger(trigger) {
    this.billDueTrigger = trigger;
  }

  getBillDueTrigger() {
    return this.billDueTrigger;
  }

  setBillPaidTrigger(trigger) {
    this.billPaidTrigger = trigger;
  }

  getBillPaidTrigger() {
    return this.billPaidTrigger;
  }

  setUserId(user_id) {
    this.user_id = user_id;
  }

  getUserId() {
    return this.user_id;
  }

}


