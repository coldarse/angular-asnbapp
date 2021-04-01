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

    constructor(income: any){
        this.label = income.label;
        this.labelDesc = income.labelDesc;
        this.validValue = income.validValue;
        this.valueDesc = income.valueDesc;
    }
}


export class businessNature {
    value: string;
    text: string;

    constructor(nature: any){
        this.value = nature.value;
        this.text = nature.text;
    }
}


export class occupationSector {
    label: string;
    labelDesc: string;
    sector: string;
    sectorDesc: string;

    constructor(sector: any){
        this.label = sector.label;
        this.labelDesc = sector.labelDesc;
        this.sector = sector.sector;
        this.sectorDesc = sector.sectorDesc;
    }
}


export class occupationCategory {
    code: string;
    desc: string;
	
	constructor(category: any){
        this.code = category.code;
        this.desc = category.desc;
	}
}


export class races {
    value: string;
    text: string;

    constructor(race: any){
        this.value = race.value;
        this.text = race.text;
    }
}


export class religions {
    value: string;
    text: string;

    constructor(religion: any){
        this.value = religion.value;
        this.text = religion.text;
    }
}

export class occupationName {
    value: string;
    desc: string;
	
	constructor(name: any){
        this.value = name.value;
        this.desc = name.desc;
	}
}

export class preferredDelivery {
    value: string;
    desc: string;
	
	constructor(delivery: any){
        this.value = delivery.value;
        this.desc = delivery.desc;
	}
}

export class bankName {
    value: string;
    desc: string;
	
	constructor(bank: any){
        this.value = bank.value;
        this.desc = bank.desc;
	}
}

export class relationship {
    code: string;
    desc: string;
	
	constructor(relationship: any){
        this.code = relationship.code;
        this.desc = relationship.desc;
	}
}

  

