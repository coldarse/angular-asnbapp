import { fundDetails } from "./fundDetails";

export class UnitHolder implements IUnitHolder {
    
     channeltype: string | undefined;

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
             this.channeltype = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.channeltype;
             //console.log(this.channeltype);
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
}



    // static requestoridentification : string;
    // static deviceowner : string;
    // static unitholderid : string;
    // static firstname : string;
    // static identificationtype : string;
    // static identificationnumber : number;
    // static fundid : string;
    // static inquirycode : number;
    // static transactiondate : string;
    // static transactiontime : string;
    // static banktxnreferencenumber : number;
    // static bankcustphonenumber : number;
    // static filtrationflag : string;
    // static typeclosed: string;
    // static participateinasnbmkt: string;
    // static totalminoraccount: number;
    // static guardianid: string;
    // static guardianictype: string;
    // static guardianicnumber: string;
    // static agentcode: string;
    // static branchcode: string;
    // static lastupdatedate: string;
    // static transactionchannel: string;
    // static transactionstatus: string;
    // static rejectcode : string;
    // static rejectreason : string;




        // REQUESTORIDENTIFICATION: string,
        // DEVICEOWNER: string,
        // UNITHOLDERID: string,
        // FIRSTNAME: string,
        // IDENTIFICATIONTYPE: string,
        // IDENTIFICATIONNUMBER: number,
        // FUNDID: string,
        // INQUIRYCODE: number,
        // TRANSACTIONDATE: string,
        // TRANSACTIONTIME: string,
        // BANKTXNREFERENCENUMBER: number,
        // BANKCUSTPHONENUMBER: number,
        // FILTRATIONFLAG: string,
        // TYPECLOSED: string,
        // PARTICIPATEINASNBMKT: string,    
        // TOTALMINORACCOUNT: number,
        // GUARDIANID: string,
        // GUARDIANICTYPE: string,
        // GUARDIANICNUMBER: string,
        // AGENTCODE: string,
        // BRANCHCODE: string,
        // LASTUPDATEDATE: string,
        // TRANSACTIONCHANNEL: string,
        // TRANSACTIONSTATUS: string,
        // REJECTCODE: string,
        // REJECTREASON: string
        

        //UnitHolder.channeltype = CHANNELTYPE;
        // UnitHolder.requestoridentification = REQUESTORIDENTIFICATION;
        // UnitHolder.deviceowner = DEVICEOWNER;
        // UnitHolder.unitholderid = UNITHOLDERID
        // UnitHolder.firstname = FIRSTNAME;
        // UnitHolder.identificationtype = IDENTIFICATIONTYPE;
        // UnitHolder.identificationnumber = IDENTIFICATIONNUMBER;
        // UnitHolder.fundid = FUNDID;
        // UnitHolder.inquirycode = INQUIRYCODE;
        // UnitHolder.transactiondate = TRANSACTIONDATE;
        // UnitHolder.transactiontime = TRANSACTIONTIME;
        // UnitHolder.banktxnreferencenumber = BANKTXNREFERENCENUMBER;
        // UnitHolder.bankcustphonenumber = BANKCUSTPHONENUMBER;
        // UnitHolder.filtrationflag = FILTRATIONFLAG;
        // UnitHolder.typeclosed = TYPECLOSED;
        // UnitHolder.participateinasnbmkt = PARTICIPATEINASNBMKT;
        // UnitHolder.totalminoraccount = TOTALMINORACCOUNT;
        // UnitHolder.guardianid = GUARDIANID;
        // UnitHolder.guardianictype = GUARDIANICTYPE;
        // UnitHolder.guardianicnumber = GUARDIANICNUMBER;
        // UnitHolder.agentcode = AGENTCODE;
        // UnitHolder.branchcode = BRANCHCODE;
        // UnitHolder.lastupdatedate = LASTUPDATEDATE;
        // UnitHolder.transactionchannel = TRANSACTIONCHANNEL;
        // UnitHolder.transactionstatus = TRANSACTIONSTATUS;
        // UnitHolder.rejectcode = REJECTCODE;
        // UnitHolder.rejectreason = REJECTREASON;
         

    //}

