import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { errorCodes } from '../_models/errorCode';

@Component({
  selector: 'app-errorscreen',
  templateUrl: './errorscreen.component.html',
  styleUrls: ['./errorscreen.component.css']
})
export class ErrorscreenComponent implements OnInit {

  BTN_End = "";

  nonPrintableError = ['0068', '6688', '0069', '7788', '0222', '0168', '0111']

  ES_1 = "";
  ES_2 = "";
  ES_3 = "";
  ES_4 = "";
  ES_5 = "";

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);

    this.ES_3 = "Error Code"
    this.ES_5 = errorCodes.Ecode;
    this.ES_4 = errorCodes.Emessage;
    if(signalrConnection.kioskType != 'Mobile'){
      let ct = 0;
      this.nonPrintableError.forEach(elem => {
        if(errorCodes.Ecode.toString() == elem.toString()){
          ct += 1;
        }
      });
      if(ct == 0){
        this.Print();
      }
    }

  }

  endTransaction(){
    if(signalrConnection.isVerifyMyKad == true){
      this._router.navigate(['feedbackscreen']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Error Screen]" + ": " + "Redirect to Feedback Screen.");
    }else{
      this._router.navigate(['transactionmenu']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Error Screen]" + ": " + "Redirect to Transaction Menu Screen.");
    }
  }


  Print(){
    console.log("Init printing");
    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
        const body = {
          "Transaksi": errorCodes.transaction,
          "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Lokasi": signalrConnection.branchName,
          "Name": errorCodes.accountName,
          "NoAkaun": errorCodes.accountNo,
          "JenisAkaun": errorCodes.accountType,
          "ErrorCode": errorCodes.Ecode
        }
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(body), "GetNonFinancialTransactionFailPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
        });
      }
    });

    
  }


}
