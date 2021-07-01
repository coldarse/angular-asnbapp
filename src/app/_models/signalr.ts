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
  static kioskType: string;
  static branchName: string;
  static channelType: string = "ASNB KIOSK";
  static deviceOwner: string = "ASNB";
  static requestIdentification: string = "TESTFDSSERVER";
  static agentCode: string = "ASNB";
  static branchCode: string = "ASNBHQ001";
  static isVerifyMyKad = false;
}


