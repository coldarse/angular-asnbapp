import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';

@Component({
  selector: 'app-errorscreen',
  templateUrl: './errorscreen.component.html',
  styleUrls: ['./errorscreen.component.css']
})
export class ErrorscreenComponent implements OnInit {

  BTN_End = "";

  ES_1 = "";
  ES_2 = "";
  ES_3 = "";
  ES_4 = "";
  ES_5 = "";

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Transaction Unsuccessful.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);
  }

  endTransaction(){
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Redirect to Feedback Screen.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);
    this._router.navigate(['feedbackscreen']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Error Screen]" + ": " + "Redirect to Feedback Screen.");
  }

}
