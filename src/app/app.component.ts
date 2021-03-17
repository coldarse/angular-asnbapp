import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfiguration } from './config/app-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-asnbapp';

  constructor(private appConfig: AppConfiguration) {
    this.title = appConfig.title;

    console.log(appConfig.title);
    console.log(appConfig.baseUrl);

    // private translate: TranslateService) {
    // translate.setTranslation('en',  );
    // translate.setDefaultLang('en');
  // }

  // useLanguage(language: string) {
  //     this.translate.use(language);
  // }
  }
}
