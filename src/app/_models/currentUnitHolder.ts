import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class currentHolder {
    static channeltype: string;
    static requestoridentification : string;
    static deviceowner : string;
    static unitholderid : string;
    static firstname : string;
    static identificationtype : string;
    static identificationnumber : number;
    static fundid : string;
    static inquirycode : number;
    static transactiondate : string;
    static transactiontime : string;
    static banktxnreferencenumber : number;
    static bankcustphonenumber : number;
    static filtrationflag : string;
    static typeclosed: string;
    static participateinasnbmkt: string;
    static totalminoraccount: number;
    static guardianid: string;
    static guardianictype: string;
    static guardianicnumber: string;
    static agentcode: string;
    static branchcode: string;
    static lastupdatedate: string;
    static transactionchannel: string;
    static transactionstatus: string;
    static rejectcode : string;
    static rejectreason : string;
}