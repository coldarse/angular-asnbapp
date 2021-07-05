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
    
        const body = {
          "Transaksi": "Pendaftaran Portal myASNB/myASNB Portal Registration",
          "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Lokasi": "KL MAIN 01",
          "Name": currentHolder.firstname,
          "NoAkaun": currentHolder.unitholderid,
          "JenisAkaun": "Self/Sendiri"
        }
    
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(body), appFunc.receiptFunction, signalrConnection.trxno, "0").then((data: any) => {
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
    const body = {
      "Transaksi": "Pendaftaran Portal myASNB/myASNB Portal Registration",
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Lokasi": "KL MAIN 01",
      "Name": currentHolder.firstname,
      "NoAkaun": currentHolder.unitholderid,
      "JenisAkaun": "Self/Sendiri"
    }

    const emailObj = {
      "Name" : currentHolder.firstname,
      "UnitHolderID" : currentHolder.unitholderid,
      "Module" : "4",
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : currentHolder.identificationnumber
    }

    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, "4", JSON.stringify(emailObj)).then((data: any) => {
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
