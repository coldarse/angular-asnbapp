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

const routes: Routes = [
  {path: '', redirectTo: '/transactionmenu', pathMatch: 'full'},
  {path: 'language', component: LanguageComponent},
  {path: 'verifymykad', component: VerifymykadComponent},
  {path: 'outofservice', component: OutofserviceComponent},
  {path: 'transactionmenu', component: TransactionmenuComponent},
  {path: 'checkbalance', component: CheckbalanceComponent},
  {path: 'errorscreen', component: ErrorscreenComponent},
  {path: 'transactionsuccessful', component: TransactionsuccessfulComponent},
  {path: 'accountregistration', component: AccountregistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
