import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accessToken } from '../_models/apiToken';
import { appFunc } from '../_models/appFunctions';
import { currentHolder } from '../_models/currentUnitHolder';
import { errorCodes } from '../_models/errorCode';
import { selectLang } from '../_models/language';
import { signalrConnection } from '../_models/signalr';

@Component({
  selector: 'app-printingemail',
  templateUrl: './printingemail.component.html',
  styleUrls: ['./printingemail.component.css']
})
export class PrintingemailComponent implements OnInit {

  Print1Visible = false;
  Print2Visible = false;
  EmailVisible = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    if(appFunc.printing){
      this.Print1Visible = true;
      this.Print2Visible = false;
      this.EmailVisible = false;
      this.Print();
    }else{
      this.Print1Visible = false;
      this.Print2Visible = false;
      this.EmailVisible = true;
      this.Email();
    }
  }


  Print(){
    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), "GetFinancialTrxPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              this.Print1Visible = false;
              this.Print2Visible = true;
              setTimeout(()=>{   
                this._router.navigate(['transactionsuccessful']);
              }, 3000);
            }else{
              errorCodes.Ecode = "0068";
              errorCodes.Emessage = "Printing Failed";
              this._router.navigate(['errorscreen']);
            }
          }, 3000);
        });
      }else{
        errorCodes.Ecode = "6688";
        errorCodes.Emessage = "Printer Error";
        this._router.navigate(['errorscreen']);
      }
    });
  }

  Email(){
    
    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, "4", JSON.stringify(appFunc.emailObj)).then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          setTimeout(()=>{   
            this.EmailVisible = false;
            this._router.navigate(['transactionsuccessful']);
          }, 3000);
        }else{
          errorCodes.Ecode = "0069";
          errorCodes.Emessage = "Email Failed";
          this._router.navigate(['errorscreen']);
        }
      }, 3000);
    });
  }

}
