import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class currentMyKidDetails {
    static resetCurrentMyKid() {
        this.VersionNo = "";
        this.BirthCertNo = "";
        this.Name = "";
        this.ICNo = "";
        this.Gender = "";
        this.Citizenship = "";
        this.SOB = "";
        this.Address1 = "";
        this.Address2 = "";
        this.Address3 = "";
        this.PostCode = "";
        this.City = "";
        this.State = "";
        this.DOB = new Date();
        this.TOB = "";
        this.POB1 = "";
        this.POB2 = "";
        this.DOR = "";
        this.Country = "";
        this.FathersName = "";
        this.FathersICNo = "";
        this.FathersRace = "";
        this.FathersReligion = "";
        this.MothersName = "";
        this.MothersICNo = "";
        this.MothersRace = "";
        this.MothersReligion = "";
    }
    static VersionNo : string;
    static BirthCertNo : string;
    static Name : string;
    static ICNo : string;
    static Gender : string;
    static Citizenship : string;
    static SOB : string;
    static Address1 : string;
    static Address2 : string;
    static Address3 : string;
    static PostCode : string;
    static City : string;
    static State : string;
    static DOB : Date;
    static TOB : string;
    static POB1 : string;
    static POB2 : string;
    static DOR : string;
    static Country : string;
    static FathersName : string;
    static FathersICNo : string;
    static FathersRace : string;
    static FathersReligion : string;
    static MothersName : string;
    static MothersICNo : string;
    static MothersRace : string;
    static MothersReligion : string;
}



