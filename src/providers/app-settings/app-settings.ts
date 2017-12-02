import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const CONFIG ={
  apiURL: 'http://localhost:3001/'
};

@Injectable()
export class AppSettingsProvider {

  constructor() {
    console.log('Hello AppSettingsProvider Provider');
  }
  public getApiUrl(){
    return CONFIG.apiURL;
  }
}
