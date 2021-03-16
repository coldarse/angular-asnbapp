import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageComponent } from './language/language.component';
import { VerifymykadComponent } from './verifymykad/verifymykad.component';
import { CheckbalanceComponent } from './checkbalance/checkbalance.component';

import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

import { OutofserviceComponent } from './outofservice/outofservice.component';
import { TransactionmenuComponent } from './transactionmenu/transactionmenu.component';
import { ErrorscreenComponent } from './errorscreen/errorscreen.component';
import { TransactionsuccessfulComponent } from './transactionsuccessful/transactionsuccessful.component';
import { AccountregistrationComponent } from './accountregistration/accountregistration.component';
import { FeedbackscreenComponent } from './feedbackscreen/feedbackscreen.component';
import { BijakregistrationComponent } from './bijakregistration/bijakregistration.component';
import { UpdatedetailsComponent } from './updatedetails/updatedetails.component';
import { PortalregistrationComponent } from './portalregistration/portalregistration.component';


export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'MyMessageHub';
  c.qs = { user: 'aldan' };
  c.url = 'http://localhost:8081/';
  c.logging = true;
  
  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
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
    AppRoutingModule,
    HttpClientModule,
    SignalRModule.forRoot(createConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
