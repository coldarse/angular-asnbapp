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



