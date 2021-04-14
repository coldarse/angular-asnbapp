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
    cifstopaccountstatus: string | undefined;
    typeclosed: string | undefined;
    participateinasnbmkt: string | undefined;    
    unitbalance: string | undefined;
    funddetail : fundDetails[] | undefined;
    cifnumber: string | undefined;
    race: string | undefined;
    religion: string | undefined;
    uhcategory: string | undefined;
    title: string | undefined;
    accountopeningdate: string | undefined;
    investortype: string | undefined;
    maritalstatus: string | undefined;
    addresslinE1: string | undefined;
    addresslinE2: string | undefined;
    addresslinE3: string | undefined;
    addresslinE4: string | undefined;
    country: string | undefined;
    email: string | undefined;
    zipcode: string | undefined;
    contactperson: string | undefined;
    telephonE1: string | undefined;
    telephonE2: string | undefined;
    cellphonenumber: string | undefined;
    fax: string | undefined;
    dateofbirth: string | undefined;
    bankcode: string | undefined;
    bankbranchcode: string | undefined;
    accounttype: string | undefined;
    accountnumber: string | undefined;
    accountcurrency: string | undefined;
    fundcode: string | undefined;
    transactiontype: string | undefined;
    directdebit: string | undefined;
    mothername: string | undefined;
    portalenabled: string | undefined;
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
    epfnumber: string | undefined;
    epfapplicable: string | undefined;
    epfaccounttype: string | undefined;
    epfaccounttypeeffdate: string | undefined;
    agentcode : string | undefined;
    branchcode : string | undefined;
    occupation: string | undefined;
    otherinfO8: string | undefined;
    occupationsector: string | undefined;
    occupationcategory: string | undefined;
    natureofbusiness:string | undefined;
    companyname: string | undefined;
    preferredmailmode: string | undefined;
    fatca: string | undefined;
    crs: string | undefined;
    pep: string | undefined;
    riskprofile: string | undefined;
    relationship: string | undefined;
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
            this.cifstopaccountstatus = data.result.cifstopaccountstatus;
            this.typeclosed = data.result.typeclosed;
            this.participateinasnbmkt = data.result.participateinasnbmkt;
            this.unitbalance = data.result.unitbalance;
            this.funddetail = data.result.funddetail.map((fd : fundDetails) => new fundDetails(fd));
            // console.log(this.funddetail);
            this.cifnumber = data.result.cifnumber;
            this.race = data.result.race;
            this.religion = data.result.religion;
            this.uhcategory = data.result.uhcategory;
            this.title = data.result.title;
            this.accountopeningdate = data.result.accountopeningdate;
            this.investortype = data.result.investortype;
            this.maritalstatus = data.result.maritalstatus;
            this.addresslinE1 = data.result.addresslinE1;
            this.addresslinE2 = data.result.addresslinE2;
            this.addresslinE3 = data.result.addresslinE3;
            this.addresslinE4 = data.result.addresslinE4;
            this.country = data.result.country;
            this.email = data.result.email;
            this.zipcode = data.result.zipcode;
            this.contactperson = data.result.contactperson;
            this.telephonE1 = data.result.telephonE1;
            this.telephonE2 = data.result.telephonE2;
            this.cellphonenumber = data.result.cellphonenumber;
            this.fax = data.result.fax;
            this.dateofbirth = data.result.dateofbirth;
            this.bankcode = data.result.bankcode;
            this.bankbranchcode = data.result.bankbranchcode;
            this.accounttype = data.result.accounttype;
            this.accountnumber = data.result.accountnumber;
            this.accountcurrency = data.result.accountcurrency;
            this.fundcode = data.result.fundcode;
            this.transactiontype = data.result.transactiontype;
            this.directdebit = data.result.directdebit;
            this.mothername = data.result.mothername;
            this.portalenabled = data.result.portalenabled;
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
            // console.log(this.minordetail);
            this.guardianid = data.result.guardianid;
            this.guardianictype = data.result.guardianictype;
            this.guardianicnumber = data.result.guardianicnumber;
            this.epfnumber = data.result.epfnumber;
            this.epfapplicable = data.result.epfapplicable;
            this.epfaccounttype = data.result.epfaccounttype;
            this.epfaccounttypeeffdate = data.result.epfaccounttypeeffdate;
            this.agentcode = data.result.agentcode;
            this.branchcode = data.result.branchcode;
            this.occupation = data.result.occupation;
            this.otherinfO8 = data.result.otherinfO8;
            this.occupationsector = data.result.occupationsector;
            this.occupationcategory = data.result.occupationcategory;
            this.natureofbusiness = data.result.natureofbusiness;
            this.companyname = data.result.companyname;
            this.preferredmailmode = data.result.preferredmailmode;
            this.fatca = data.result.fatca;
            this.crs = data.result.crs;
            this.pep = data.result.pep;
            this.riskprofile = data.result.riskprofile;
            this.relationship = data.result.relationship;
            this.lastupdatedate = data.result.lastupdatedate;
            this.transactionchannel = data.result.transactionchannel;
            this.transactionstatus = data.result.transactionstatus;
            this.rejectcode = data.result.rejectcode;
            this.rejectreason = data.result.rejectreason;
            // console.log("Finished Mapping");
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
    cifstopaccountstatus: string | undefined;
    typeclosed: string | undefined;
    participateinasnbmkt: string | undefined;    
    unitbalance: string | undefined;
    funddetail : fundDetails[] | undefined;
    cifnumber: string | undefined;
    race: string | undefined;
    religion: string | undefined;
    uhcategory: string | undefined;
    title: string | undefined;
    accountopeningdate: string | undefined;
    investortype: string | undefined;
    maritalstatus: string | undefined;
    addresslinE1: string | undefined;
    addresslinE2: string | undefined;
    addresslinE3: string | undefined;
    addresslinE4: string | undefined;
    country: string | undefined;
    email: string | undefined;
    zipcode: string | undefined;
    contactperson: string | undefined;
    telephonE1: string | undefined;
    telephonE2: string | undefined;
    cellphonenumber: string | undefined;
    fax: string | undefined;
    dateofbirth: string | undefined;
    bankcode: string | undefined;
    bankbranchcode: string | undefined;
    accounttype: string | undefined;
    accountnumber: string | undefined;
    accountcurrency: string | undefined;
    fundcode: string | undefined;
    transactiontype: string | undefined;
    directdebit: string | undefined;
    mothername: string | undefined;
    portalenabled: string | undefined;
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
    epfnumber: string | undefined;
    epfapplicable: string | undefined;
    epfaccounttype: string | undefined;
    epfaccounttypeeffdate: string | undefined;
    agentcode : string | undefined;
    branchcode : string | undefined;
    occupation: string | undefined;
    otherinfO8: string | undefined;
    occupationsector: string | undefined;
    occupationcategory: string | undefined;
    natureofbusiness:string | undefined;
    companyname: string | undefined;
    preferredmailmode: string | undefined;
    fatca: string | undefined;
    crs: string | undefined;
    pep: string | undefined;
    riskprofile: string | undefined;
    relationship: string | undefined;
    lastupdatedate : string | undefined;
    transactionchannel : string | undefined;
    transactionstatus : string | undefined;
    rejectcode : string | undefined;
    rejectreason : string | undefined;
}




      
