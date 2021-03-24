export interface IAccountInquiry {
    CHANNELTYPE: string | undefined;
    REQUESTORIDENTIFICATION: string | undefined;
    DEVICEOWNER: string | undefined;
    UNITHOLDERID: string | undefined;
    FIRSTNAME: string | undefined;
    IDENTIFICATIONTYPE: string | undefined;
    IDENTIFICATIONNUMBER: string | undefined;
    FUNDID: string | undefined;
    INQUIRYCODE: string | undefined;
    TRANSACTIONDATE: string | undefined;
    TRANSACTIONTIME: string | undefined;
    BANKTXNREFERENCENUMBER: string | undefined;
    BANKCUSTPHONENUMBER: string | undefined;
    FILTRATIONFLAG: string | undefined;
    GUARDIANID: string | undefined;
    GUARDIANICTYPE: string | undefined;
    GUARDIANICNUMBER: string | undefined;
}

export class AccountInquiry implements IAccountInquiry {

    CHANNELTYPE: string | undefined;
    REQUESTORIDENTIFICATION: string | undefined;
    DEVICEOWNER: string | undefined;
    UNITHOLDERID: string | undefined;
    FIRSTNAME: string | undefined;
    IDENTIFICATIONTYPE: string | undefined;
    IDENTIFICATIONNUMBER: string | undefined;
    FUNDID: string | undefined;
    INQUIRYCODE: string | undefined;
    TRANSACTIONDATE: string | undefined;
    TRANSACTIONTIME: string | undefined;
    BANKTXNREFERENCENUMBER: string | undefined;
    BANKCUSTPHONENUMBER: string | undefined;
    FILTRATIONFLAG: string | undefined;
    GUARDIANID: string | undefined;
    GUARDIANICTYPE: string | undefined;
    GUARDIANICNUMBER: string | undefined;

    constructor(data?: IAccountInquiry){
        if (data)
        {
            for (var property in data){
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): AccountInquiry {
        let result = new AccountInquiry();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
       data = typeof data === 'object' ? data : {};
       //data["channeltype"] = this.channeltype;
       return data;
    }

    clone(): AccountInquiry {
        const json = this.toJSON();
        let result = new AccountInquiry();
        result.init(json);
        return result;
    }

    init(data?: any){
        if (data){
            //
        }
    }
}