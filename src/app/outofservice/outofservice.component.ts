import { Component, OnInit } from '@angular/core';
import { signalrConnection } from 'src/app/_models/signalr';
import { errorCodes } from '../_models/errorCode';

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
  }

}
