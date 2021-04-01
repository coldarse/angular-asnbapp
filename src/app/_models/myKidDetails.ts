export interface IMyKidDetails {
    
    VersionNo : string | undefined;
    BirthCertNo : string | undefined;
    Name : string | undefined;
    ICNo : string | undefined;
    Gender : string | undefined;
    Citizenship : string | undefined;
    SOB : string | undefined;
    Address1 : string | undefined;
    Address2 : string | undefined;
    Address3 : string | undefined;
    PostCode : string | undefined;
    City : string | undefined;
    State : string | undefined;
    DOB : Date | undefined;
    TOB : string | undefined;
    POB1 : string | undefined;
    POB2 : string | undefined;
    DOR : string | undefined;
    Country : string | undefined;
    FathersName : string | undefined;
    FathersICNo : string | undefined;
    FathersRace : string | undefined;
    FathersReligion : string | undefined;
    MothersName : string | undefined;
    MothersICNo : string | undefined;
    MothersRace : string | undefined;
    MothersReligion : string | undefined;
}

export class MyKidDetails implements IMyKidDetails {
    VersionNo : string | undefined;
    BirthCertNo : string | undefined;
    Name : string | undefined;
    ICNo : string | undefined;
    Gender : string | undefined;
    Citizenship : string | undefined;
    SOB : string | undefined;
    Address1 : string | undefined;
    Address2 : string | undefined;
    Address3 : string | undefined;
    PostCode : string | undefined;
    City : string | undefined;
    State : string | undefined;
    DOB : Date | undefined;
    TOB : string | undefined;
    POB1 : string | undefined;
    POB2 : string | undefined;
    DOR : string | undefined;
    Country : string | undefined;
    FathersName : string | undefined;
    FathersICNo : string | undefined;
    FathersRace : string | undefined;
    FathersReligion : string | undefined;
    MothersName : string | undefined;
    MothersICNo : string | undefined;
    MothersRace : string | undefined;
    MothersReligion : string | undefined;


    constructor(data?: IMyKidDetails){
        if (data)
         {
             for (var property in data){
                 if (data.hasOwnProperty(property)){
                     (<any>this)[property] = (<any>data)[property];
                 }
             }
         }
    }

    static fromJS(data: any): MyKidDetails {
        let result = new MyKidDetails();
        console.log(data["Name"]);
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
       data = typeof data === 'object' ? data : {};
       data["Name"] = this.Name;
       return data;
    }

    clone(): MyKidDetails {
        const json = this.toJSON();
        let result = new MyKidDetails();
        result.init(json);
        return result;
    }

    init(data?: any){
        if (data){
            this.VersionNo = data.VersionNo;
            this.BirthCertNo = data.BirthCertNo;
            this.Name = data.Name;
            this.ICNo = data.ICNo;
            this.Gender = data.Gender;
            this.Citizenship = data.Citizenship;
            this.SOB = data.SOB;
            this.Address1 = data.Address1;
            this.Address2 = data.Address2;
            this.Address3 = data.Address3;
            this.PostCode = data.PostCode;
            this.City = data.City;
            this.State = data.State;
            this.DOB = data.DOB;
            this.TOB = data.TOB;
            this.POB1 = data.POB1;
            this.POB2 = data.POB2;
            this.DOR = data.DOR;
            this.Country = data.Country;
            this.FathersName = data.FathersName;
            this.FathersICNo = data.FathersICNo;
            this.FathersRace = data.FathersRace;
            this.FathersReligion = data.FathersReligion;
            this.MothersName = data.MothersName;
            this.MothersICNo = data.MothersICNo;
            this.MothersRace = data.MothersRace;
            this.MothersReligion = data.MothersReligion;
        }
    }
}