import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class signalrConnection {
  static connection: any;
  static cardDetect: boolean;
  static logsaves: string[];
  static kioskCode: string;
  static trxno : string;
  static isHardcodedIC : boolean;
}


