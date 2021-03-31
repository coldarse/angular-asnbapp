import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class kActivity {
    static trxno: string;
    static kioskCode: string;
    static moduleID: number;
    static submoduleID?: number;
    static action: string;
    static startTime: Date;
    static endTime: Date;
    static status: boolean;
}