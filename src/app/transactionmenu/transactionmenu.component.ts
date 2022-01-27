import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { appFunc } from '../_models/appFunctions';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';
import { errorCodes } from '../_models/errorCode';
import { currentHolder } from '../_models/currentUnitHolder';
import { fundDetails } from '../_models/fundDetails';
import { ASNBFundID } from '../_models/dropDownLists';
import { ServiceService } from '../_shared/service.service';

@Component({
  selector: 'app-transactionmenu',
  templateUrl: './transactionmenu.component.html',
  styleUrls: ['./transactionmenu.component.css']
})
export class TransactionmenuComponent implements OnInit {

  Header_Title = "";

  BTN_End = "";

  TMS_1 = "";
  TMS_2 = "";
  TMS_3 = "";
  TMS_4 = "";
  TMS_5 = "";

  updateNotClicked = true;
  checkNotClicked = true;
  financialNotClicked = true;
  bijakNotClicked = true;
  portalNotClicked = true;

  updatedDetailsEnabled : boolean = true;
  checkBalanceEnabled : boolean = true;
  financialTransactionEnabled : boolean = true;
  bijakRegistrationEnabled : boolean = true;
  portalRegistrationEnabled : boolean = true;

  id: any; 

  constructor(private _router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService) { }

  ngOnInit(): void {

    signalrConnection.connection.invoke('deleteCreditCardInfo', false).then(() => {
                          
    });
    
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Start looping through module details to check each module availability during current DateTime.");
    for (var val of appFunc.modules){
      if(val.moduleID == 3){//Update CIF
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.updatedDetailsEnabled = false;
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
          }
        }else{
          if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.updatedDetailsEnabled = false;
          }
        }
      }
      else if(val.moduleID == 6){//Balance Inquiry
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.checkBalanceEnabled = false;
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
          }
        }else{
          if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.checkBalanceEnabled = false;
          }
        }
      }
      else if(val.moduleID == 5){//Financial 
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.financialTransactionEnabled = false;
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Financial Transaction Module.");
          }
        }else{
          if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.financialTransactionEnabled = false;
          }
        }
      }
      else if(val.moduleID == 2){//Bijak Registration
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.bijakRegistrationEnabled = false;
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Bijak Registration Module.");
          }
        }else{
          if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.bijakRegistrationEnabled = false;
          }
        }
      }
      else if(val.moduleID == 4){//Portal Registration
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.portalRegistrationEnabled = false;
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Portal Registration Module.");
          }
        }else{
          if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.portalRegistrationEnabled = false;
          }
        }
      }
    }

    if(
      this.updatedDetailsEnabled == true &&
      this.checkBalanceEnabled == true &&
      this.financialTransactionEnabled == true &&
      this.bijakRegistrationEnabled == true &&
      this.portalRegistrationEnabled == true
    ){
      errorCodes.code = "0168";
      errorCodes.message = "Under Maintenance";
      this._router.navigate(['outofservice']);
    }


    this.translate.use(selectLang.selectedLang);
    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Set 1 second interval to detect MyKad.");
    

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


  clickUpdate(){
    this.updateNotClicked = !this.updateNotClicked
    setTimeout(() => {
      this._router.navigate(['/updatedetails']);
    }, 150)
  }
  clickCheck(){
    this.checkNotClicked = !this.checkNotClicked
    setTimeout(() => {
      this._router.navigate(['/checkbalance']);
    }, 150)
  }
  clickFinancial(){
    this.financialNotClicked = !this.financialNotClicked
    setTimeout(() => {
      this._router.navigate(['/financialtransactionmenu']);
    }, 150)
  }
  clickBijak(){
    this.bijakNotClicked = !this.bijakNotClicked
    setTimeout(() => {
      this._router.navigate(['/bijakregistration']);
    }, 150)
  }
  clickPortal(){
    this.portalNotClicked = !this.portalNotClicked
    setTimeout(() => {
      this._router.navigate(['/portalregistration']);
    }, 150)
  }


  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }

}
