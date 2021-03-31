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
    kActivity.trxno = "";
    kActivity.kioskCode = signalrConnection.kioskCode;
    kActivity.moduleID = 0;
    kActivity.submoduleID = undefined;
    kActivity.action = "Transaction Unsuccessful.";
    kActivity.startTime = new Date();
  }

  endTransaction(){
    kActivity.endTime = new Date();
    kActivity.status = false;

    appFunc.kioskActivity.push(kActivity);
    this._router.navigate(['feedbackscreen']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Error Screen]" + ": " + "Redirect to Feedback Screen.");
  }

}
