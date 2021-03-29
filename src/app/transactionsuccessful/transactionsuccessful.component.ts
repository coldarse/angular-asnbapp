import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';

@Component({
  selector: 'app-transactionsuccessful',
  templateUrl: './transactionsuccessful.component.html',
  styleUrls: ['./transactionsuccessful.component.css']
})
export class TransactionsuccessfulComponent implements OnInit {

  TS_1 = "";

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
        this._router.navigate(['feedbackscreen']);
      }
    });
  }


  endTransaction(){
    this._router.navigate(['feedbackscreen'])
  }

  mainMenu(){
    this._router.navigate(['transactionmenu'])
  }

}
