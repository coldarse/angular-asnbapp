import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';

@Component({
  selector: 'app-transactionsuccessful',
  templateUrl: './transactionsuccessful.component.html',
  styleUrls: ['./transactionsuccessful.component.css']
})
export class TransactionsuccessfulComponent implements OnInit {

  TS_1 = "";

  id: any;

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
    this.id = setInterval(() => {
      this.DetectMyKad();
    }, 1000);

    kActivity.trxno = "";
    kActivity.kioskCode = signalrConnection.kioskCode;
    kActivity.moduleID = 0;
    kActivity.submoduleID = undefined;
    kActivity.action = "User Removed Identification Card.";
    kActivity.startTime = new Date();
    
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Set 1 second interval to detect MyKad.");
  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Cleared Interval.");
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
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }


  endTransaction(){
    kActivity.endTime = new Date();
    kActivity.status = true;

    appFunc.kioskActivity.push(kActivity);
    this._router.navigate(['feedbackscreen'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Redirect to Feedback Screen.");
  }

  mainMenu(){
    kActivity.endTime = new Date();
    kActivity.status = true;

    appFunc.kioskActivity.push(kActivity);
    this._router.navigate(['transactionmenu'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Redirect to Transaction Menu.");
  }

}
