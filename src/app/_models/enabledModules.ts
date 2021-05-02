export class eModules {
	moduleID: number;
	moduleName: string;
	operationStart: Date;
	operationEnd: Date;
	enable: boolean;
	
	constructor(emodule: any){
		this.moduleID = emodule.moduleID;
		this.moduleName = emodule.moduleName;
		this.operationStart = emodule.operationStart;
		this.operationEnd = emodule.operationEnd;
		this.enable = emodule.enable;
	}
}
