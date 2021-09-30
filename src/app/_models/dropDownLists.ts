export class cities {
    name: string;
	
	constructor(city: any){
        this.name = city.name;
	}
}


export class states {
    value: string;
    text: string;
	
	constructor(state: any){
        this.value = state.value;
        this.text = state.text;
	}
}


export class TitleDetails {
    value: string;
    text: string;

    constructor(title: any){
        this.value = title.value;
        this.text = title.text;
    }
}


export class monthlyIncome {
    label: string;
    labelDesc: string;
    validValue: string;
    valueDesc: string;
    valueDescBM: string;

    constructor(income: any){
        this.label = income.label;
        this.labelDesc = income.labelDesc;
        this.validValue = income.validValue;
        this.valueDesc = income.valueDesc;
        this.valueDescBM = income.valueDescBM;
    }
}


export class businessNature {
    value: string;
    text: string;
    textBM: string;

    constructor(nature: any){
        this.value = nature.value;
        this.text = nature.text;
        this.textBM = nature.textBM;
    }
}


export class occupationSector {
    label: string;
    labelDesc: string;
    sector: string;
    sectorDesc: string;
    sectorDescBM: string;

    constructor(sector: any){
        this.label = sector.label;
        this.labelDesc = sector.labelDesc;
        this.sector = sector.sector;
        this.sectorDesc = sector.sectorDesc;
        this.sectorDescBM = sector.sectorDescBM;
    }
}


export class occupationCategory {
    code: string;
    desc: string;
    descBM: string;
	
	constructor(category: any){
        this.code = category.code;
        this.desc = category.desc;
        this.descBM = category.descBM;
	}
}


export class races {
    value: string;
    text: string;
    textBM: string;

    constructor(race: any){
        this.value = race.value;
        this.text = race.text;
        this.textBM = race.textBM;
    }
}


export class religions {
    value: string;
    text: string;
    textBM: string;

    constructor(religion: any){
        this.value = religion.value;
        this.text = religion.text;
        this.textBM = religion.textBM;
    }
}

export class occupationName {
    value: string;
    desc: string;
    descBM: string;
	
	constructor(name: any){
        this.value = name.value;
        this.desc = name.desc;
        this.descBM = name.descBM;
	}
}

export class preferredDelivery {
    value: string;
    desc: string;
    DescBM: string;
	
	constructor(delivery: any){
        this.value = delivery.value;
        this.desc = delivery.desc;
        this.DescBM = delivery.DescBM;
	}
}

export class bankName {
    name: string;
    code: string;
    bankBranchCode : string;
	
	constructor(bank: any){
        this.name = bank.name;
        this.code = bank.code;
        this.bankBranchCode = bank.bankBranchCode;
	}
}

export class relationship {
    code: string;
    desc: string;
    descBM: string;
	
	constructor(relationship: any){
        this.code = relationship.code;
        this.desc = relationship.desc;
        this.descBM = relationship.descBM;
	}
}


export class securityQuestions {
    sqCode: number;
    set: string;
    questionEN: string;
    questionBM: string;

    constructor(securityQuestions: any){
        this.sqCode = securityQuestions.sqCode;
        this.set = securityQuestions.set;
        this.questionEN = securityQuestions.questionEN;
        this.questionBM = securityQuestions.questionBM;
    }
}

export class fundSource {
    code: string;
    desc: string;
    descBM: string;
	
	constructor(delivery: any){
        this.code = delivery.code;
        this.desc = delivery.desc;
        this.descBM = delivery.descBM;
	}
}

export class ASNBFundID {
    code: string;
    value: string;
    desc: string;
    minorInvestmentLimit_min: number;
    minorInvestmentLimit_max: number;
    minorSubscriptionLimit_min: number;
    minorSubscriptionLimit_max: number;
    minorRedemptionLimit_min: number;
    minorRedemptionLimit_max: number;
    minorTransferLimit_min: number;
    minorTransferLimit_max: number;
    minorSwitchingLimit_min: number;
    minorSwitchingLimit_max: number;
    majorInvestmentLimit_min: number;
    majorInvestmentLimit_max: number;
    majorSubscriptionLimit_min: number;
    majorSubscriptionLimit_max: number;
    majorRedemptionLimit_min: number;
    majorRedemptionLimit_max: number;
    majorTransferLimit_min: number;
    majorTransferLimit_max: number;
    majorSwitchingLimit_min: number;
    majorSwitchingLimit_max: number;
    fundType: string;
    iscLink: string;
    pricingType: string;

    constructor(fundid: any){
        this.code = fundid.code;
        this.value = fundid.value;
        this.desc = fundid.desc;
        this.minorInvestmentLimit_min = fundid.minorInvestmentLimit_min;
        this.minorInvestmentLimit_max = fundid.minorInvestmentLimit_max;
        this.minorSubscriptionLimit_min = fundid.minorSubscriptionLimit_min;
        this.minorSubscriptionLimit_max = fundid.minorSubscriptionLimit_max;
        this.minorRedemptionLimit_min = fundid.minorRedemptionLimit_min;
        this.minorRedemptionLimit_max = fundid.minorRedemptionLimit_max;
        this.minorTransferLimit_min = fundid.minorTransferLimit_min;
        this.minorTransferLimit_max = fundid.minorTransferLimit_max;
        this.minorSwitchingLimit_min = fundid.minorSwitchingLimit_min;
        this.minorSwitchingLimit_max = fundid.minorSwitchingLimit_max;
        this.majorInvestmentLimit_min = fundid.majorInvestmentLimit_min;
        this.majorInvestmentLimit_max = fundid.majorInvestmentLimit_max;
        this.majorSubscriptionLimit_min = fundid.majorSubscriptionLimit_min;
        this.majorSubscriptionLimit_max = fundid.majorSubscriptionLimit_max;
        this.majorRedemptionLimit_min = fundid.majorRedemptionLimit_min;
        this.majorRedemptionLimit_max = fundid.majorRedemptionLimit_max;
        this.majorTransferLimit_min = fundid.majorTransferLimit_min;
        this.majorTransferLimit_max = fundid.majorTransferLimit_max;
        this.majorSwitchingLimit_min = fundid.majorSwitchingLimit_min;
        this.majorSwitchingLimit_max = fundid.majorSwitchingLimit_max;
        this.fundType = fundid.fundType;
        this.iscLink = fundid.iscLink;
        this.pricingType = fundid.pricingType;
    }
} 

export class thirdpartyRelationship {
    code: string;
    desc: string;
    descBM: string;
	
	constructor(thirdparty: any){
        this.code = thirdparty.code;
        this.desc = thirdparty.desc;
        this.descBM = thirdparty.descBM;
	}
}

export class reasonTransfer {
    code: string;
    desc: string;
    descBM: string;
	
	constructor(reasonTransfer: any){
        this.code = reasonTransfer.code;
        this.desc = reasonTransfer.desc;
        this.descBM = reasonTransfer.descBM;
	}
}


export class icType {
    code: string;
    desc: string;
    descBM: string;
	
	constructor(ictype: any){
        this.code = ictype.code;
        this.desc = ictype.desc;
        this.descBM = ictype.descBM;
	}
}



