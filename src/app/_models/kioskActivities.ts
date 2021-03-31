export class kioskActivities {
    trxno: string | undefined;
    kioskCode: string | undefined;
    moduleID: number | undefined;
    submoduleID?: number | undefined;
    action: string | undefined;
    startTime: Date | undefined;
    endTime: Date | undefined;
    status: boolean | undefined;
	
	constructor(activity: any){
        this.trxno = activity.trxno;
        this.kioskCode = activity.kioskCode;
        this.moduleID = activity.moduleID;
        this.submoduleID = activity.submoduleID;
        this.action = activity.action;
        this.startTime = activity.startTime;
        this.endTime = activity.endTime;
        this.status = activity.status;
    }
}