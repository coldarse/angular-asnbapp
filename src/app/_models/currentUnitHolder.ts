import { Injectable } from '@angular/core';
import { fundDetails } from './fundDetails';
import { minorDetails } from './minorDetails';

@Injectable({
    providedIn: 'root',
})

export class currentHolder {
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
    static cifstopaccountstatus: string ;
    static typeclosed : string;
    static participateinasnbmkt : string;
    static unitbalance: string;
    static funddetail : fundDetails[];
    static cifnumber: string ;
    static race: string ;
    static religion: string ;
    static uhcategory: string ;
    static title: string ;
    static accountopeningdate: string ;
    static investortype: string ;
    static maritalstatus: string ;
    static addresslinE1: string ;
    static addresslinE2: string ;
    static addresslinE3: string ;
    static addresslinE4: string ;
    static country: string ;
    static email: string ;
    static zipcode: string ;
    static contactperson: string ;
    static telephonE1: string ;
    static telephonE2: string ;
    static cellphonenumber: string ;
    static fax: string ;
    static dateofbirth: string ;
    static bankcode: string ;
    static bankbranchcode: string ;
    static accounttype: string ;
    static accountnumber: string ;
    static accountcurrency: string ;
    static fundcode: string ;
    static transactiontype: string ;
    static directdebit: string ;
    static mothername: string ;
    static portalenabled: string ;
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
    static epfnumber: string;
    static epfapplicable: string;
    static epfaccounttype: string;
    static epfaccounttypeeffdate: string;
    static agentcode : string;
    static branchcode : string;
    static occupation: string;
    static otherinfO8: string;
    static occupationsector: string;
    static occupationcategory: string;
    static natureofbusiness:string;
    static companyname: string;
    static preferredmailmode: string;
    static fatca: string;
    static crs: string;
    static pep: string;
    static riskprofile: string;
    static relationship: string;
    static lastupdatedate : string;
    static transactionchannel : string;
    static transactionstatus : string;
    static rejectcode : string;
    static rejectreason : string;

   
   
}