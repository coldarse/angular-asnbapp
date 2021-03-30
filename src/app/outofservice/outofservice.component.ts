import { Component, OnInit } from '@angular/core';
import { signalrConnection } from 'src/app/_models/signalr';
import { appFunc } from '../_models/appFunctions';
import { errorCodes } from '../_models/errorCode';
import { kActivity } from '../_models/kActivity';

@Component({
  selector: 'app-outofservice',
  templateUrl: './outofservice.component.html',
  styleUrls: ['./outofservice.component.css']
})
export class OutofserviceComponent implements OnInit {

  XXX1 = "";
  XXX2 = "";

  EM1 = "";
  MR1 = "";

  constructor() { }

  ngOnInit(): void {
    this.XXX1 = errorCodes.code;
    this.XXX2 = errorCodes.code;

    this.EM1 = errorCodes.message;
    this.MR1 = errorCodes.message;
    kActivity.trxno = "";
    kActivity.kioskCode = signalrConnection.kioskCode;
    kActivity.moduleID = 0;
    kActivity.submoduleID = undefined;
    kActivity.action = "Out of Service. " + errorCodes.message;
    kActivity.startTime = new Date();
    kActivity.endTime = new Date();
    kActivity.status = false;

    appFunc.kioskActivity.push(kActivity);
  }

}
