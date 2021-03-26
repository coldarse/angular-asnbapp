import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { appFunc } from '../_models/appFunctions';

@Component({
  selector: 'app-transactionmenu',
  templateUrl: './transactionmenu.component.html',
  styleUrls: ['./transactionmenu.component.css']
})
export class TransactionmenuComponent implements OnInit {

  Header_Title = "";

  BTN_End = "";

  TMS_1 = "";
  TMS_2 = "";
  TMS_3 = "";
  TMS_4 = "";
  TMS_5 = "";

  updatedDetailsEnabled : boolean = true;
  checkBalanceEnabled : boolean = true;
  financialTransactionEnabled : boolean = true;
  bijakRegistrationEnabled : boolean = true;
  portalRegistrationEnabled : boolean = true;

  id: any; 

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    for (var val of appFunc.modules){
      if(val.module.toLowerCase().includes('update')){
        if(val.isEnabled == true){
          this.updatedDetailsEnabled = false;
        }
      }
      else if(val.module.toLowerCase().includes('check')){
        if(val.isEnabled == true){
          this.checkBalanceEnabled = false;
        }
      }
      else if(val.module.toLowerCase().includes('financial')){
        if(val.isEnabled == true){
          this.financialTransactionEnabled = false;
        }
      }
      else if(val.module.toLowerCase().includes('bijak')){
        if(val.isEnabled == true){
          this.bijakRegistrationEnabled = false;
        }
      }
      else if(val.module.toLowerCase().includes('portal')){
        if(val.isEnabled == true){
          this.portalRegistrationEnabled = false;
        }
      }
    }


    this.translate.use(selectLang.selectedLang);
    this.id = setInterval(() => {
      this.DetectMyKad();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.id);
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
      }
    });
  }

}
