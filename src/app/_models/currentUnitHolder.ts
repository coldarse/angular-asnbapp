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
    static identificationnumber : string;
    static fundid : string;
    static inquirycode : string;
    static transactiondate : string;
    static transactiontime : string;
    static banktxnreferencenumber : string;
    static bankcustphonenumber : string;
    static filtrationflag : string;
    static typeclosed: string;
    static participateinasnbmkt: string;
    static totalminoraccount: string;
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