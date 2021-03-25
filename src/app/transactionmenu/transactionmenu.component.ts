import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';

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


  id: any; 

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
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
        this._router.navigate(['language']);
      }
    });
  }

}
