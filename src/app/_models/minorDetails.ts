export class minorDetails {
    UHID: string | undefined;
    NAME: string | undefined;
    ICTYPE: string | undefined;
    ICNO: string | undefined;
    FUNDID: string[] | undefined;


    constructor(mDetails : any){
        this.UHID = mDetails.uhid;
        this.NAME = mDetails.name;
        this.ICTYPE = mDetails.ictype;
        this.ICNO = mDetails.icno;
        this.FUNDID = mDetails.fundid;
    }
}