import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class currentMyKadDetails {
    static resetCurrentMyKid() {
        this.Name= "";
        this.ICNo= "";
        this.OldICNo= "";
        this.DOB = new Date();
        this.POB= "";
        this.Gender= "";
        this.Citizenship= "";
        this.IssueDate = new Date();
        this.Race= "";
        this.Religion= "";
        this.Address1= "";
        this.Address2= "";
        this.Address3= "";
        this.PostCode= "";
        this.City= "";
        this.State= "";
        this.Country= "";
        this.Address= "";
        this.RJ= "";
        this.KT= "";
        this.GreenCardNationality= "";
        this.GreenCardExpiryDate = new Date();
        this.CardVersion= "";
        this.OtherID= "";
        this.CategoryType= "";
    }
    static Name : string;
    static ICNo : string;
    static OldICNo : string;
    static DOB : Date;
    static POB : string;
    static Gender : string;
    static Citizenship : string;
    static IssueDate : Date;
    static Race : string;
    static Religion : string;
    static Address1 : string;
    static Address2 : string;
    static Address3 : string;
    static PostCode : string;
    static City : string;
    static State : string;
    static Country : string;
    static Address : string;
    static RJ : string;
    static KT : string;
    static GreenCardNationality : string;
    static GreenCardExpiryDate : Date;
    static CardVersion : string;
    static OtherID : string;
    static CategoryType : string;
}