import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/_shared/service.service';
import { selectLang } from '../_models/language';
import { BroadcastEventListener, ConnectionStatus, IConnectionOptions, SignalR, SignalRConnection } from 'ng2-signalr';
import { signalrConnection } from 'src/app/_models/signalr';
import { accessToken } from 'src/app/_models/apiToken';
import { UnitHolder } from '../_models/unitHolder';
import { catchError } from 'rxjs/operators';
import { currentHolder } from '../_models/currentUnitHolder';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent implements OnInit {

  constructor(
    private serviceService : ServiceService,
    private route: Router,
    private _signalR: SignalR,
    ) { 
      // this.startConnection();
    }

  
  ngOnInit(): void {
    this.getAccountInquiry();
  
  }

  getAccountInquiry(): void {
    this.serviceService.getAccountInquiry()
    .subscribe((result: any) => {
      currentHolder.channeltype = result.channeltype;
      this.route.navigate(['checkbalance']);
    })
  }

  startConnection() : void {
    this._signalR.connect().then((c) => {
      console.log("API King is now Connected");
      signalrConnection.connection = c;
      signalrConnection.connection.invoke('GetLoginToken').then((data: string) => {
        accessToken.token = data;
      });
      signalrConnection.connection.invoke('GetPrinterStatus').then((data: string) => {
        //accessToken.token = data;
        console.log(data);
      });
    }).catch((err: any) => {console.log(err)});
  }

  

  selectEnglish() {
    selectLang.selectedLang = 'en';
    //this.route.navigate(['/verifymykad']);

    // this.serviceService.getToken().subscribe(data =>
    //   console.log(data));

    // this.serviceService.getAccountInquiry()
    // .subscribe(data => console.log(JSON.stringify(data)));
    
    
  }

  selectMalay() {
    selectLang.selectedLang = 'ms';
    this.route.navigate(['/verifymykad']);
  }


}
