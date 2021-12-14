import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { appFunc } from '../_models/appFunctions';
import { currentHolder } from '../_models/currentUnitHolder';
import { selectLang } from '../_models/language';
import { signalrConnection } from '../_models/signalr';
import { ServiceService } from '../_shared/service.service';

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

  isBijakDisabled = false;

  InvestmentMDisabled = true;
  SubscriptionMDisabled = true;
  SubscriptionTDisabled = true;
  TransferMDisabled = true;
  SwitchMDisabled = true;
  RedemptionMDisabled = true;

  InvestmentBDisabled = true;
  SubscriptionBDisabled = true;
  TransferBDisabled = true;
  SwitchBDisabled = true;
  RedemptionBDisabled = true;

  InvestmentDisabled = true;
  SubscriptionDisabled = true;
  TransferSwitchDisabled = true;
  RedemptionDisabled = true;

  subscriptionNotClicked = true;
  investmentNotClicked = true;
  transferswitchNotClicked = true;
  redemptionNotClicked = true;

  subscriptionMajorNotClicked = true;
  investmentMajorNotClicked = true;
  transferswitchMajorNotClicked = true;
  redemptionMajorNotClicked = true;
  subscriptionMinorNotClicked = true;
  investmentMinorNotClicked = true;
  transferswitchMinorNotClicked = true;
  redemptionMinorNotClicked = true;
  subscriptionThirdNotClicked = true;

  id: any; 

  constructor(
    private translate: TranslateService,
    private _router: Router,
    private serviceService : ServiceService
  ) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    if(currentHolder.totalminoraccount != "0"){
      this.isBijakDisabled = false;
      //Includes Bijak
      for (var val of appFunc.modules){
        if(val.moduleID == 9){//InvestmentM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.InvestmentMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.InvestmentMDisabled = false;
            }
          }
        }
        if(val.moduleID == 10){//InvestmentB
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.InvestmentBDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.InvestmentBDisabled = false;
            }
          }
        }
        else if(val.moduleID == 11){//SubscriptionM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 12){//SubscriptionB
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionBDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionBDisabled = false;
            }
          }
        }
        else if(val.moduleID == 19){//SubscriptionT
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionTDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionTDisabled = false;
            }
          }
        }
        else if(val.moduleID == 13){//TransferM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.TransferMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.TransferMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 15){//SwitchM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SwitchMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SwitchMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 14){//TransferB
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.TransferBDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.TransferBDisabled = false;
            }
          }
        }
        else if(val.moduleID == 16){//SwitchB
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SwitchBDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SwitchBDisabled = false;
            }
          }
        }
        else if(val.moduleID == 17){//RedemptionM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.RedemptionMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.RedemptionMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 18){//RedemptionB
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.RedemptionBDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.RedemptionBDisabled = false;
            }
          }
        }
      }

      //for Investment
      if(this.InvestmentMDisabled && this.InvestmentBDisabled){
        this.InvestmentDisabled = true;
      }
      else{
        this.InvestmentDisabled = false;
      }

      //for Redemption
      if(this.RedemptionMDisabled && this.RedemptionBDisabled){
        this.RedemptionDisabled = true;
      }
      else{
        this.RedemptionDisabled = false;
      }

      //for Subscription
      if(this.SubscriptionMDisabled && this.SubscriptionTDisabled && this.SubscriptionBDisabled){
        this.SubscriptionDisabled = true;
      }
      else{
        this.SubscriptionDisabled = false;
      }

      //for Transfer/Switch
      if(this.TransferMDisabled && this.SwitchMDisabled && this.TransferBDisabled && this.SwitchBDisabled){
        this.TransferSwitchDisabled = true;
      }
      else{
        this.TransferSwitchDisabled = false;
      }
    }
    else{
      this.isBijakDisabled = true;
      //No Bijak
      for (var val of appFunc.modules){
        if(val.moduleID == 9){//InvestmentM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.InvestmentMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.InvestmentMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 11){//SubscriptionM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 19){//SubscriptionT
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionTDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SubscriptionTDisabled = false;
            }
          }
        }
        else if(val.moduleID == 13){//TransferM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.TransferMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.TransferMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 15){//SwitchM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SwitchMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.SwitchMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 17){//Redemption
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.RedemptionMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              this.RedemptionMDisabled = false;
            }
          }
        }
      }

      //for Investment
      if(this.InvestmentMDisabled){
        this.InvestmentDisabled = true;
      }
      else{
        this.InvestmentDisabled = false;
      }

      //for Redemption
      if(this.RedemptionMDisabled){
        this.RedemptionDisabled = true;
      }
      else{
        this.RedemptionDisabled = false;
      }

      //for Subscription
      if(this.SubscriptionMDisabled && this.SubscriptionTDisabled){
        this.SubscriptionDisabled = true;
      }
      else{
        this.SubscriptionDisabled = false;
      }

      //for Transfer/Switch
      if(this.TransferMDisabled && this.SwitchMDisabled){
        this.TransferSwitchDisabled = true;
      }
      else{
        this.TransferSwitchDisabled = false;
      }
    }

    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }

  }

  ngOnDestroy() {
    clearInterval(this.id);
    if(appFunc.kioskActivity != undefined){
      this.serviceService.postKioskActivity(appFunc.kioskActivity).subscribe((res: any) => {
      });
    }
    appFunc.kioskActivity = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }


  FinancialMenuEvent(){
    this.FinancialMenu = true;
    this.InitialInvestment = false;
    this.Subscription = false;
    this.TransferSwitch = false;
    this.Redemption = false;
  }

  InitialInvestmentEvent(){
    this.investmentNotClicked = !this.investmentNotClicked;
    setTimeout(() => {
      this.FinancialMenu = false;
      this.InitialInvestment = true;
      this.investmentNotClicked = !this.investmentNotClicked;
    }, 150)
  }

  SubscriptionEvent(){
    this.subscriptionNotClicked = !this.subscriptionNotClicked;
    setTimeout(() => {
      this.FinancialMenu = false;
      this.Subscription = true;
      this.subscriptionNotClicked = !this.subscriptionNotClicked;
    }, 150)
  }

  TransferSwitchEvent(){
    this.transferswitchNotClicked = !this.transferswitchNotClicked;
    setTimeout(() => {
      this.FinancialMenu = false;
      this.TransferSwitch = true;
      this.transferswitchNotClicked = !this.transferswitchNotClicked;
    }, 150)
  }

  RedemptionEvent(){
    this.redemptionNotClicked = !this.redemptionNotClicked;
    setTimeout(() => {
      this.FinancialMenu = false;
      this.Redemption = true;
      this.redemptionNotClicked = !this.redemptionNotClicked;
    }, 150)
  }


  InitialInvestmentMajor(){
    this.investmentMajorNotClicked = !this.investmentMajorNotClicked;
    setTimeout(() => {
      appFunc.isInvesment = true;
      appFunc.isOwn = "major";
      this._router.navigate(['subscriptioninvestment']);
    })
  }

  InitialInvestmentMinor(){
    this.investmentMinorNotClicked = !this.investmentMinorNotClicked;
    setTimeout(() => {
      appFunc.isInvesment = true;
      appFunc.isOwn = "bijak";
      this._router.navigate(['subscriptioninvestment']);
    })
  }

  SubscriptionMajor(){
    this.subscriptionMajorNotClicked = !this.subscriptionMajorNotClicked;
    setTimeout(() => {
      appFunc.isInvesment = false;
      appFunc.isOwn = "major";
      this._router.navigate(['subscriptioninvestment']);
    })
  }

  SubscriptionMinor(){
    this.subscriptionMinorNotClicked = !this.subscriptionMinorNotClicked;
    setTimeout(() => {
      appFunc.isInvesment = false;
      appFunc.isOwn = "bijak";
      this._router.navigate(['subscriptioninvestment']);
    })
  }

  SubscriptionThird(){
    this.subscriptionThirdNotClicked = !this.subscriptionThirdNotClicked;
    setTimeout(() => {
      appFunc.isInvesment = false;
      appFunc.isOwn = "third";
      this._router.navigate(['subscriptioninvestment']);
    })
  }

  TransferAndSwitchingMajor(){
    this.transferswitchMajorNotClicked = !this.transferswitchMajorNotClicked;
    setTimeout(() => {
      appFunc.isOwn = "major";
      this._router.navigate(['transferswitching']);
    })
  }

  TransferAndSwitchingBijak(){
    this.transferswitchMinorNotClicked = !this.transferswitchMinorNotClicked;
    setTimeout(() => {
      appFunc.isOwn = "bijak";
      this._router.navigate(['transferswitching']);
    })
  }

  RedemptionMajor(){
    this.redemptionMajorNotClicked = !this.redemptionMajorNotClicked;
    setTimeout(() => {
      appFunc.isOwn = "major";
      this._router.navigate(['redemption']);
    })
  }

  RedemptionMinor(){
    this.redemptionMinorNotClicked = !this.redemptionMinorNotClicked;
    setTimeout(() => {
      appFunc.isOwn = "bijak";
      this._router.navigate(['redemption']);
    })
  }

}
