import { fundDetails } from "./fundDetails";

export class UnitHolder {
       
    public channeltype : string;
    public requestoridentification : string;
    public deviceowner : string;
    public unitholderid : string;
    public firstname : string;
    public identificationtype : string;
    public identificationnumber : number;
    public fundid : string;
    public inquirycode : number;
    public transactiondate : string;
    public transactiontime : string;
    public banktxnreferencenumber : number;
    public bankcustphonenumber : number;
    public filtrationflag : string;
    public typeclosed: string;
    public participateinasnbmkt: string;
    public totalminoraccount: number;
    public guardianid: string;
    public guardianictype: string;
    public guardianicnumber: string;
    public agentcode: string;
    public branchcode: string;
    public lastupdatedate: string;
    public transactionchannel: string;
    public transactionstatus: string;
    public rejectcode : string;
    public rejectreason : string;

    constructor(
        CHANNELTYPE: string,
        REQUESTORIDENTIFICATION: string,
        DEVICEOWNER: string,
        UNITHOLDERID: string,
        FIRSTNAME: string,
        IDENTIFICATIONTYPE: string,
        IDENTIFICATIONNUMBER: number,
        FUNDID: string,
        INQUIRYCODE: number,
        TRANSACTIONDATE: string,
        TRANSACTIONTIME: string,
        BANKTXNREFERENCENUMBER: number,
        BANKCUSTPHONENUMBER: number,
        FILTRATIONFLAG: string,
        TYPECLOSED: string,
        PARTICIPATEINASNBMKT: string,    
        TOTALMINORACCOUNT: number,
        GUARDIANID: string,
        GUARDIANICTYPE: string,
        GUARDIANICNUMBER: string,
        AGENTCODE: string,
        BRANCHCODE: string,
        LASTUPDATEDATE: string,
        TRANSACTIONCHANNEL: string,
        TRANSACTIONSTATUS: string,
        REJECTCODE: string,
        REJECTREASON: string) {

        this.channeltype = CHANNELTYPE;
        this.requestoridentification = REQUESTORIDENTIFICATION;
        this.deviceowner = DEVICEOWNER;
        this.unitholderid = UNITHOLDERID
        this.firstname = FIRSTNAME;
        this.identificationtype = IDENTIFICATIONTYPE;
        this.identificationnumber = IDENTIFICATIONNUMBER;
        this.fundid = FUNDID;
        this.inquirycode = INQUIRYCODE;
        this.transactiondate = TRANSACTIONDATE;
        this.transactiontime = TRANSACTIONTIME;
        this.banktxnreferencenumber = BANKTXNREFERENCENUMBER;
        this.bankcustphonenumber = BANKCUSTPHONENUMBER;
        this.filtrationflag = FILTRATIONFLAG;
        this.typeclosed = TYPECLOSED;
        this.participateinasnbmkt = PARTICIPATEINASNBMKT;
        this.totalminoraccount = TOTALMINORACCOUNT;
        this.guardianid = GUARDIANID;
        this.guardianictype = GUARDIANICTYPE;
        this.guardianicnumber = GUARDIANICNUMBER;
        this.agentcode = AGENTCODE;
        this.branchcode = BRANCHCODE;
        this.lastupdatedate = LASTUPDATEDATE;
        this.transactionchannel = TRANSACTIONCHANNEL;
        this.transactionstatus = TRANSACTIONSTATUS;
        this.rejectcode = REJECTCODE;
        this.rejectreason = REJECTREASON;
         

    }

}