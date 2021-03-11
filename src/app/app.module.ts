import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'MyMessageHub';
  c.qs = { user: 'donald' };
  c.url = 'http://localhost:8080/';
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
    AccountregistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignalRModule.forRoot(createConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
