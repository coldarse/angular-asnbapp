import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageComponent } from './language/language.component';
import { VerifymykadComponent } from './verifymykad/verifymykad.component';
import { CheckbalanceComponent } from './checkbalance/checkbalance.component';

import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

import { OutofserviceComponent } from './outofservice/outofservice.component';
import { TransactionmenuComponent } from './transactionmenu/transactionmenu.component';
import { ErrorscreenComponent } from './errorscreen/errorscreen.component';
import { TransactionsuccessfulComponent } from './transactionsuccessful/transactionsuccessful.component';
import { AccountregistrationComponent } from './accountregistration/accountregistration.component';
import { FeedbackscreenComponent } from './feedbackscreen/feedbackscreen.component';
import { BijakregistrationComponent } from './bijakregistration/bijakregistration.component';
import { UpdatedetailsComponent } from './updatedetails/updatedetails.component';
import { PortalregistrationComponent } from './portalregistration/portalregistration.component';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { selectLang } from "src/app/_models/language";
import { signalrConnection } from 'src/app/_models/signalr';
import { accessToken } from 'src/app/_models/apiToken';
import { JsonAppConfigService } from './config/json-app-config.service';


export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'MyMessageHub';
  c.qs = { user: 'aldan' }
  c.url = 'http://localhost:8081/';
  c.logging = true;
  
  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}

export function initializerFn(jsonAppConfigService: JsonAppConfigService) {
  return () => {
    return jsonAppConfigService.load();
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LanguageComponent,
    VerifymykadComponent,
    CheckbalanceComponent,
    OutofserviceComponent,
    TransactionmenuComponent,
    ErrorscreenComponent,
    TransactionsuccessfulComponent,
    AccountregistrationComponent,
    FeedbackscreenComponent,
    BijakregistrationComponent,
    UpdatedetailsComponent,
    PortalregistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    SignalRModule.forRoot(createConfig),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  providers: [
    selectLang,
    signalrConnection,
    accessToken
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    // { prefix: "./assets/translate/core/", suffix: ".json" },
    { prefix: "./assets/translate/", suffix: ".json" },
  ]);
}
