import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class kActivity {
    trxno: string | undefined;
    kioskCode: string | undefined;
    moduleID: number | undefined;
    submoduleID?: number | undefined;
    action: string | undefined;
    startTime: Date | undefined;
    endTime: Date | undefined;
    status: boolean | undefined;
}