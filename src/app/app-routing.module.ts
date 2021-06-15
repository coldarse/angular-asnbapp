import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './language/language.component';
import { VerifymykadComponent } from './verifymykad/verifymykad.component';
import { OutofserviceComponent } from './outofservice/outofservice.component';
import { TransactionmenuComponent } from './transactionmenu/transactionmenu.component';
import { CheckbalanceComponent } from './checkbalance/checkbalance.component';
import { ErrorscreenComponent } from './errorscreen/errorscreen.component';
import { TransactionsuccessfulComponent } from './transactionsuccessful/transactionsuccessful.component';
import { AccountregistrationComponent } from './accountregistration/accountregistration.component';
import { FeedbackscreenComponent } from './feedbackscreen/feedbackscreen.component';
import { BijakregistrationComponent } from './bijakregistration/bijakregistration.component';
import { UpdatedetailsComponent } from './updatedetails/updatedetails.component';
import { PortalregistrationComponent } from './portalregistration/portalregistration.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrintingemailComponent } from './printingemail/printingemail.component';
import { FinancialtransactionmenuComponent } from './financialtransactionmenu/financialtransactionmenu.component';
import { SubscriptioninvestmentComponent } from './subscriptioninvestment/subscriptioninvestment.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { TransferswitchingComponent } from './transferswitching/transferswitching.component';
import { RedemptionComponent } from './redemption/redemption.component';



const routes: Routes = [
  {path: '', redirectTo: '/screensaver', pathMatch: 'full'},
  {path: 'language', component: LanguageComponent},
  {path: 'verifymykad', component: VerifymykadComponent},
  {path: 'outofservice', component: OutofserviceComponent},
  {path: 'transactionmenu', component: TransactionmenuComponent},
  {path: 'checkbalance', component: CheckbalanceComponent},
  {path: 'errorscreen', component: ErrorscreenComponent},
  {path: 'transactionsuccessful', component: TransactionsuccessfulComponent},
  {path: 'accountregistration', component: AccountregistrationComponent},
  {path: 'feedbackscreen', component: FeedbackscreenComponent},
  {path: 'bijakregistration', component: BijakregistrationComponent},
  {path: 'updatedetails', component: UpdatedetailsComponent},
  {path: 'portalregistration', component: PortalregistrationComponent},
  {path: 'printingemail', component: PrintingemailComponent},
  {path: 'financialtransactionmenu', component: FinancialtransactionmenuComponent},
  {path: 'subscriptioninvestment', component: SubscriptioninvestmentComponent},
  {path: 'screensaver', component: ScreensaverComponent},
  {path: 'transferswitching', component: TransferswitchingComponent},
  {path: 'redemption', component: RedemptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    TranslateModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
