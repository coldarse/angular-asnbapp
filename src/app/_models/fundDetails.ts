export class fundDetails {
    FUNDID: string | undefined;
    UNITBALANCE: number | undefined;
    EPFUNITS: number | undefined;
    LOANUNITS: number | undefined;
    CERTUNITS: number | undefined;
    BLOCKEDUNITS: number | undefined;
    PROVISIONALUNITS: number | undefined;
    TOTALUNITS: number | undefined;
    NAV: number | undefined;
    UHHOLDINGS: number | undefined;
    UHACCOUNTSTATUS: string | undefined;
    UBBUNITS: number | undefined;
    UBCUNITS: string | undefined;
    ELIGIBLELOANUNITS: string | undefined;


    constructor(fDetails? : any){
        this.FUNDID = fDetails.fundid;
        this.UNITBALANCE = fDetails.unitbalance;
        this.EPFUNITS = fDetails.epfunits;
        this.LOANUNITS = fDetails.loanunits;
        this.CERTUNITS = fDetails.certunits;
        this.BLOCKEDUNITS = fDetails.blockedunits;
        this.PROVISIONALUNITS = fDetails.provisionalunits;
        this.TOTALUNITS = fDetails.totalunits;
        this.NAV = fDetails.nav;
        this.UHHOLDINGS = fDetails.uhholdings;
        this.UHACCOUNTSTATUS = fDetails.uhaccountstatus;
        this.UBBUNITS = fDetails.ubbunits;
        this.UBCUNITS = fDetails.ubcunits;
        this.ELIGIBLELOANUNITS = fDetails.eligibleloanunits;
    }
}