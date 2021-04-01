import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from './app-config';

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService extends AppConfig {

  constructor(private http: HttpClient) {
    super();
  }

  // This function needs to return a promise
  load() {
    return this.http.get<AppConfig>('app.config.json')
      .toPromise()
      .then(data => {
        this.baseUrl = data.baseUrl;
        this.AldanDevURL = data.AldanDevURL;
      })
      .catch(() => {
        console.error('Could not load configuration');
      });
  }
}