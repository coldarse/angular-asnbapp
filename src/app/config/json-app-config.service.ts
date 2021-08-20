import { Injectable } from '@angular/core';
import { AppConfiguration } from './app-configuration';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService extends AppConfiguration {

  constructor(private http: HttpClient) {
    super();
  }

  // This function needs to return a promise
  load() {
    return this.http.get<AppConfiguration>('app.config.json')
      .toPromise()
      .then(data => {
        this.baseUrl = data.baseUrl;
        this.AldanDevURL = data.AldanDevURL;
        this.AldanReceiptURL = data.AldanReceiptURL;
        this.AESCrpytKey = data.AESCrpytKey;
        this.idletime = Number(data.idletime);
        this.popuptime = Number(data.popuptime);
        this.thresholdForAdditionalInfo3 = Number(data.thresholdForAdditionalInfo3)
        this.thresholdForAdditionalInfo2 = Number(data.thresholdForAdditionalInfo2)
        this.thresholdForAdditionalInfo1 = Number(data.thresholdForAdditionalInfo1)
      })
      .catch(() => {
        console.error('Could not load configuration');
      });
  }
}