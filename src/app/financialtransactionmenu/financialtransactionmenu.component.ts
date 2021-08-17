import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { appFunc } from '../_models/appFunctions';
import { selectLang } from '../_models/language';

@Component({
  selector: 'app-financialtransactionmenu',
  templateUrl: './financialtransactionmenu.component.html',
  styleUrls: ['./financialtransactionmenu.component.css']
})
export class FinancialtransactionmenuComponent implements OnInit {

  FinancialMenu = true;
  InitialInvestment = false;
  Subscription = false;
  TransferSwitch = false;
  Redemption = false;


  constructor(
    private translate: TranslateService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
  }

  FinancialMenuEvent(){
    this.FinancialMenu = true;
    this.InitialInvestment = false;
    this.Subscription = false;
    this.TransferSwitch = false;
    this.Redemption = false;
  }

  InitialInvestmentEvent(){
    this.FinancialMenu = false;
    this.InitialInvestment = true;
  }

  SubscriptionEvent(){
    this.FinancialMenu = false;
    this.Subscription = true;
  }

  TransferSwitchEvent(){
    this.FinancialMenu = false;
    this.TransferSwitch = true;
  }

  RedemptionEvent(){
    this.FinancialMenu = false;
    this.Redemption = true;
  }


  InitialInvestmentMajor(){
    appFunc.isInvesment = true;
    appFunc.isOwn = "major";
    this._router.navigate(['subscriptioninvestment']);
  }

  InitialInvestmentMinor(){
    appFunc.isInvesment = true;
    appFunc.isOwn = "bijak";
    this._router.navigate(['subscriptioninvestment']);
  }

  SubscriptionMajor(){
    appFunc.isInvesment = false;
    appFunc.isOwn = "major";
    this._router.navigate(['subscriptioninvestment']);
  }

  SubscriptionMinor(){
    appFunc.isInvesment = false;
    appFunc.isOwn = "bijak";
    this._router.navigate(['subscriptioninvestment']);
  }

  SubscriptionThird(){
    appFunc.isInvesment = false;
    appFunc.isOwn = "third";
    this._router.navigate(['subscriptioninvestment']);
  }

  TransferAndSwitchingMajor(){
    appFunc.isOwn = "major";
    this._router.navigate(['transferswitching']);
  }

  TransferAndSwitchingBijak(){
    appFunc.isOwn = "bijak";
    this._router.navigate(['transferswitching']);
  }

  RedemptionMajor(){
    appFunc.isOwn = "major";
    this._router.navigate(['redemption']);
  }

  RedemptionMinor(){
    appFunc.isOwn = "bijak";
    this._router.navigate(['redemption']);
  }

}
