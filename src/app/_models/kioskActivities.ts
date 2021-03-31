export class kioskActivities {
    trxno: string;
    kioskCode: string;
    moduleID: number;
    submoduleID?: number;
    action: string;
    startTime: Date;
    endTime: Date;
    status: boolean;
	
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