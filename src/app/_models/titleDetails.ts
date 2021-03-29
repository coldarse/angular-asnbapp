export class TitleDetails {
    
    CODE : string | undefined;
    VALUE : string | undefined;
    TEXT : string | undefined;
    CREATEDATE : string | undefined;
    CREATEBY : string | undefined;
    UPDATEDATE : string | undefined;
    UPDATEBY : string | undefined;
    ID : number | undefined;

    constructor(tDetails : any){
      this.ID = tDetails.code;
      this.VALUE = tDetails.value;
      this.TEXT = tDetails.text;
      this.CREATEDATE = tDetails.createdate;
      this.CREATEBY = tDetails.createby;
      this.UPDATEDATE = tDetails.updatedate;
      this.UPDATEBY = tDetails.updateby;
      this.ID = tDetails.id;
    }
}
  