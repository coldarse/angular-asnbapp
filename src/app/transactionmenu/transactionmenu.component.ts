import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { appFunc } from '../_models/appFunctions';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';

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
    kActivity.trxno = "";
    kActivity.kioskCode = signalrConnection.kioskCode;
    kActivity.moduleID = 0;
    kActivity.submoduleID = undefined;
    kActivity.action = "Arrived Transaction Menu.";
    kActivity.startTime = new Date();
    
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Start looping through module details to check each module availability during current DateTime.");
    for (var val of appFunc.modules){
      if(val.module.toLowerCase().includes('update')){
        if(val.isEnabled == true){
          this.updatedDetailsEnabled = false;
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
        }
      }
      else if(val.module.toLowerCase().includes('check')){
        if(val.isEnabled == true){
          this.checkBalanceEnabled = false;
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Check Balance Module.");
        }
      }
      else if(val.module.toLowerCase().includes('financial')){
        if(val.isEnabled == true){
          this.financialTransactionEnabled = false;
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Financial Transaction Module.");
        }
      }
      else if(val.module.toLowerCase().includes('bijak')){
        if(val.isEnabled == true){
          this.bijakRegistrationEnabled = false;
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Bijak Registration Module.");
        }
      }
      else if(val.module.toLowerCase().includes('portal')){
        if(val.isEnabled == true){
          this.portalRegistrationEnabled = false;
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Portal Registration Module.");
        }
      }
    }


    this.translate.use(selectLang.selectedLang);
    this.id = setInterval(() => {
      this.DetectMyKad();
    }, 1000);

    
    kActivity.endTime = new Date();
    kActivity.status = true;

    appFunc.kioskActivity.push(kActivity);
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
        kActivity.trxno = "";
        kActivity.kioskCode = signalrConnection.kioskCode;
        kActivity.moduleID = 0;
        kActivity.submoduleID = undefined;
        kActivity.action = "User Removed Identification Card.";
        kActivity.startTime = new Date();
        kActivity.endTime = new Date();
        kActivity.status = false;

        appFunc.kioskActivity.push(kActivity);
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

}
