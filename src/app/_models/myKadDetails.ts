export interface IMyKadDetails {
    Name : string | undefined;
    ICNo : string | undefined;
    OldICNo : string | undefined;
    DOB : Date | undefined;
    POB : string | undefined;
    Gender : string | undefined;
    Citizenship : string | undefined;
    IssueDate : Date | undefined;
    Race : string | undefined;
    Religion : string | undefined;
    Address1 : string | undefined;
    Address2 : string | undefined;
    Address3 : string | undefined;
    PostCode : string | undefined;
    City : string | undefined;
    State : string | undefined;
    Country : string | undefined;
    Address : string | undefined;
    RJ : string | undefined;
    KT : string | undefined;
    GreenCardNationality : string | undefined;
    GreenCardExpiryDate : Date | undefined;
    CardVersion : string | undefined;
    OtherID : string | undefined;
    CategoryType : string | undefined;
}

export class MyKadDetails implements IMyKadDetails {
    Name : string | undefined;
    ICNo : string | undefined;
    OldICNo : string | undefined;
    DOB : Date | undefined;
    POB : string | undefined;
    Gender : string | undefined;
    Citizenship : string | undefined;
    IssueDate : Date | undefined;
    Race : string | undefined;
    Religion : string | undefined;
    Address1 : string | undefined;
    Address2 : string | undefined;
    Address3 : string | undefined;
    PostCode : string | undefined;
    City : string | undefined;
    State : string | undefined;
    Country : string | undefined;
    Address : string | undefined;
    RJ : string | undefined;
    KT : string | undefined;
    GreenCardNationality : string | undefined;
    GreenCardExpiryDate : Date | undefined;
    CardVersion : string | undefined;
    OtherID : string | undefined;
    CategoryType : string | undefined;


    constructor(data?: IMyKadDetails){
        if (data)
         {
             for (var property in data){
                 if (data.hasOwnProperty(property)){
                     (<any>this)[property] = (<any>data)[property];
                 }
             }
         }
    }

    static fromJS(data: any): MyKadDetails {
        let result = new MyKadDetails();
        console.log(data["Name"]);
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
       data = typeof data === 'object' ? data : {};
       data["Name"] = this.Name;
       return data;
    }

    clone(): MyKadDetails {
        const json = this.toJSON();
        let result = new MyKadDetails();
        result.init(json);
        return result;
    }

    init(data?: any){
        if (data){
            this.Name = data.Name;
            this.ICNo = data.ICNo;
            this.OldICNo = data.OldICNo;
            this.DOB = data.DOB;
            this.POB =  data.POB;
            this.Gender = data.Gender;
            this.Citizenship = data.Citizenship;
            this.IssueDate = data.IssueDate;
            this.Race = data.Race;
            this.Religion = data.Religion;
            this.Address1 = data.Address1;
            this.Address2 = data.Address2;
            this.Address3 = data.Address3;
            this.PostCode = data.PostCode;
            this.City = data.City;
            this.State = data.State;
            this.Country = data.Country;
            this.Address = data.Address;
            this.RJ = data.RJ;
            this.KT = data.KT;
            this.GreenCardNationality = data.GreenCardNationality;
            this.GreenCardExpiryDate = data.GreenCardExpiryData;
            this.CardVersion = data.CardVersion;
            this.OtherID = data.OtherID;
            this.CategoryType = data.CategoryType;
        }
    }
}