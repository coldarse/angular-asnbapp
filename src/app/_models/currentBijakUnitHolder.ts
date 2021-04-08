import { Injectable } from '@angular/core';
import { fundDetails } from './fundDetails';
import { minorDetails } from './minorDetails';

@Injectable({
    providedIn: 'root',
})

export class currentBijakHolder {
    static resetCurretnBijakHolder(){
        this.channeltype = "";
        this.requestoridentification = "";
        this.deviceowner = "";
        this.unitholderid = "";
        this.firstname = "";
        this.identificationtype = "";
        this.identificationnumber = "";
        this.fundid = "";
        this.inquirycode = "";
        this.transactiondate = "";
        this.transactiontime = "";
        this.banktxnreferencenumber = "";
        this.bankcustphonenumber = "";
        this.filtrationflag = "";
        this.typeclosed = "";
        this.participateinasnbmkt = "";
        this.funddetail = [];
        this.grandtotalunitbalance = "";
        this.grandtotalepfunits = "";
        this.grandtotalloanunits = "";
        this.grandtotalcertunits = "";
        this.grandtotalblockedunits = "";
        this.grandtotalprovisionalunits = "";
        this.grandtotalunits = "";
        this.grandtotaluhholdings = "";
        this.totalminoraccount = "";
        this.minordetail = [];
        this.guardianid = "";
        this.guardianictype = "";
        this.guardianicnumber = "";
        this.agentcode = "";
        this.branchcode = "";
        this.lastupdatedate = "";
        this.transactionchannel = "";
        this.transactionstatus = "";
        this.rejectcode = "";
        this.rejectreason = "";
    }

    static channeltype : string;
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
    static typeclosed : string;
    static participateinasnbmkt : string;
    static funddetail : fundDetails[];
    static grandtotalunitbalance : string;
    static grandtotalepfunits : string;
    static grandtotalloanunits : string;
    static grandtotalcertunits : string;
    static grandtotalblockedunits : string;
    static grandtotalprovisionalunits : string;
    static grandtotalunits : string;
    static grandtotaluhholdings : string;
    static totalminoraccount : string;
    static minordetail : minorDetails[];
    static guardianid : string;
    static guardianictype : string;
    static guardianicnumber : string;
    static agentcode : string;
    static branchcode : string;
    static lastupdatedate : string;
    static transactionchannel : string;
    static transactionstatus : string;
    static rejectcode : string;
    static rejectreason : string;
}