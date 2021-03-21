import { fundDetails } from "./fundDetails";

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
    totalminoraccount: string | undefined;
    guardianid: string | undefined;
    guardianictype: string | undefined;
    guardianicnumber: string | undefined;
    agentcode: string | undefined;
    branchcode: string | undefined;
    lastupdatedate: string | undefined;
    transactionchannel: string | undefined;
    transactionstatus: string | undefined;
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
             this.channeltype = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.channeltype;
             this.requestoridentification = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.requestoridentification,
             this.deviceowner = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.deviceowner,
             this.unitholderid = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.unitholderid,
             this.firstname = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.firstname,
             this.identificationtype = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.identificationtype,
             this.identificationnumber = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.identificationnumber,
             this.fundid = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.fundid,
             this.inquirycode = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.inquirycode,
             this.transactiondate = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.transactiondate,
             this.transactiontime = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.transactiontime,
             this.banktxnreferencenumber = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.banktxnreferencenumber,
             this.bankcustphonenumber = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.bankcustphonenumber,
             this.filtrationflag = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.filtrationflag,
             this.typeclosed = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.typeclosed,
             this.participateinasnbmkt = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.participateinasnbmkt,
             this.totalminoraccount = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.totalminoraccount,
             this.guardianid = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.guardianid,
             this.guardianictype = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.guardianictype,
             this.guardianicnumber = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.guardianicnumber,
             this.agentcode = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.agentcode,
             this.branchcode = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.branchcode,
             this.lastupdatedate = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.lastupdatedate,
             this.transactionchannel = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.transactionchannel,
             this.transactionstatus = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.transactionstatus,
             this.rejectcode = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.rejectcode,
             this.rejectreason = data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.rejectreason
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
    totalminoraccount: string | undefined;
    guardianid: string | undefined;
    guardianictype: string | undefined;
    guardianicnumber: string | undefined;
    agentcode: string | undefined;
    branchcode: string | undefined;
    lastupdatedate: string | undefined;
    transactionchannel: string | undefined;
    transactionstatus: string | undefined;
    rejectcode : string | undefined;
    rejectreason : string | undefined;
}




      
