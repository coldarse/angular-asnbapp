export class eModules {
	module: string;
	startTime: Date;
	stopTime: Date;
	isEnabled: boolean;
	
	constructor(emodule: any){
		this.module = emodule.module;
		this.startTime = emodule.startTime;
		this.stopTime = emodule.stopTime;
		this.isEnabled = emodule.isEnabled;
	}
}