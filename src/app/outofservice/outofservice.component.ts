import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _router: Router,) { }

  ngOnInit(): void {
    signalrConnection.isVerifyMyKad = false;
    this.XXX1 = errorCodes.code;
    this.XXX2 = errorCodes.code;

    this.EM1 = errorCodes.message;
    this.MR1 = errorCodes.message;
  }

}
