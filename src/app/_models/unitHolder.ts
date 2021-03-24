import { fundDetails } from "./fundDetails";
import { minorDetails } from "./minorDetails";

export class UnitHolder implements IUnitHolder {
    
    channeltype: string | undefined;
    requestoridentification : string | undefined;
    deviceowner : string | undefined;
    unitholderid : string | undefined;
    firstname : string | undefined;
    identificationtype : string | undefined;
    identificationnumber : string | undefined;
    fundid : string | undefined;
    inquirycode : string | undefined;
    transactiondate : string | undefined;
    transactiontime : string | undefined;
    banktxnreferencenumber : string | undefined;
    bankcustphonenumber : string | undefined;
    filtrationflag : string | undefined;
    typeclosed: string | undefined;
    participateinasnbmkt: string | undefined;
    funddetail : fundDetails[] | undefined;
    grandtotalunitbalance : string | undefined
    grandtotalepfunits : string | undefined
    grandtotalloanunits : string | undefined
    grandtotalcertunits : string | undefined
    grandtotalblockedunits : string | undefined
    grandtotalprovisionalunits : string | undefined
    grandtotalunits : string | undefined
    grandtotaluhholdings : string | undefined
    totalminoraccount : string | undefined;
    minordetail : minorDetails[] | undefined;
    guardianid : string | undefined;
    guardianictype : string | undefined;
    guardianicnumber : string | undefined;
    agentcode : string | undefined;
    branchcode : string | undefined;
    lastupdatedate : string | undefined;
    transactionchannel : string | undefined;
    transactionstatus : string | undefined;
    rejectcode : string | undefined;
    rejectreason : string | undefined;

     constructor(data?: IUnitHolder){
         if (data)
         {
             for (var property in data){
                 if (data.hasOwnProperty(property)){
                     (<any>this)[property] = (<any>data)[property];
                 }
             }
         }
     }

     init(data?: any){
         if (data){
            this.channeltype = data.result.channeltype;
            this.requestoridentification = data.result.requestoridentification;
            this.deviceowner = data.result.deviceowner;
            this.unitholderid = data.result.unitholderid;
            this.firstname = data.result.firstname;
            this.identificationtype = data.result.identificationtype;
            this.identificationnumber = data.result.identificationnumber;
            this.fundid = data.result.fundid;
            this.inquirycode = data.result.inquirycode;
            this.transactiondate = data.result.transactiondate;
            this.transactiontime = data.result.transactiontime;
            this.banktxnreferencenumber = data.result.banktxnreferencenumber;
            this.bankcustphonenumber = data.result.bankcustphonenumber;
            this.filtrationflag = data.result.filtrationflag;
            this.typeclosed = data.result.typeclosed;
            this.participateinasnbmkt = data.result.participateinasnbmkt;
            this.funddetail = data.result.funddetail.map((fd : fundDetails) => new fundDetails(fd));
            console.log(this.funddetail);
            this.grandtotalunitbalance = data.result.grandtotalunitbalance;
            this.grandtotalepfunits = data.result.grandtotalepfunits;
            this.grandtotalloanunits = data.result.grandtotalloanunits;
            this.grandtotalcertunits = data.result.grandtotalcertunits;
            this.grandtotalblockedunits = data.result.grandtotalblockedunits;
            this.grandtotalprovisionalunits = data.result.grandtotalprovisionalunits;
            this.grandtotalunits = data.result.grandtotalunits;
            this.grandtotaluhholdings = data.result.grandtotaluhholdings;
            this.totalminoraccount = data.result.totalminoraccount;
            this.minordetail = data.result.minordetail.map((md : minorDetails) => new minorDetails(md));
            console.log(this.minordetail);
            this.guardianid = data.result.guardianid;
            this.guardianictype = data.result.guardianictype;
            this.guardianicnumber = data.result.guardianicnumber;
            this.agentcode = data.result.agentcode;
            this.branchcode = data.result.branchcode;
            this.lastupdatedate = data.result.lastupdatedate;
            this.transactionchannel = data.result.transactionchannel;
            this.transactionstatus = data.result.transactionstatus;
            this.rejectcode = data.result.rejectcode;
            this.rejectreason = data.result.rejectreason;
         }
     }


     static fromJS(data: any): UnitHolder {
         let result = new UnitHolder();
         result.init(data);
         return result;
     }

     toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["channeltype"] = this.channeltype;
        return data;
     }

     clone(): UnitHolder {
         const json = this.toJSON();
         let result = new UnitHolder();
         result.init(json);
         return result;
     }
}


export interface IUnitHolder {
    channeltype: string | undefined;
    requestoridentification : string | undefined;
    deviceowner : string | undefined;
    unitholderid : string | undefined;
    firstname : string | undefined;
    identificationtype : string | undefined;
    identificationnumber : string | undefined;
    fundid : string | undefined;
    inquirycode : string | undefined;
    transactiondate : string | undefined;
    transactiontime : string | undefined;
    banktxnreferencenumber : string | undefined;
    bankcustphonenumber : string | undefined;
    filtrationflag : string | undefined;
    typeclosed: string | undefined;
    participateinasnbmkt: string | undefined;
    funddetail : fundDetails[] | undefined;
    grandtotalunitbalance : string | undefined
    grandtotalepfunits : string | undefined
    grandtotalloanunits : string | undefined
    grandtotalcertunits : string | undefined
    grandtotalblockedunits : string | undefined
    grandtotalprovisionalunits : string | undefined
    grandtotalunits : string | undefined
    grandtotaluhholdings : string | undefined
    totalminoraccount : string | undefined;
    minordetail : minorDetails[] | undefined;
    guardianid : string | undefined;
    guardianictype : string | undefined;
    guardianicnumber : string | undefined;
    agentcode : string | undefined;
    branchcode : string | undefined;
    lastupdatedate : string | undefined;
    transactionchannel : string | undefined;
    transactionstatus : string | undefined;
    rejectcode : string | undefined;
    rejectreason : string | undefined;
}




      
