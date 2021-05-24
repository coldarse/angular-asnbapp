import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { appFunc } from '../_models/appFunctions';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';
import { errorCodes } from '../_models/errorCode';

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

  updatedDetailsEnabled : boolean = true;
  checkBalanceEnabled : boolean = true;
  financialTransactionEnabled : boolean = true;
  bijakRegistrationEnabled : boolean = true;
  portalRegistrationEnabled : boolean = true;

  id: any; 

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Start looping through module details to check each module availability during current DateTime.");
    for (var val of appFunc.modules){
      if(val.moduleName.toLowerCase().includes('update')){
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
      else if(val.moduleName.toLowerCase().includes('balance')){
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
      else if(val.moduleName.toLowerCase().includes('financial')){
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
      else if(val.moduleName.toLowerCase().includes('bijak')){
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
      else if(val.moduleName.toLowerCase().includes('portal')){
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
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
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

}
