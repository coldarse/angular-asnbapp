import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/_shared/service.service';
import { selectLang } from '../_models/language';
import { BroadcastEventListener, ConnectionStatus, IConnectionOptions, SignalR, SignalRConnection } from 'ng2-signalr';
import { signalrConnection } from 'src/app/_models/signalr';
import { accessToken } from 'src/app/_models/apiToken';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent implements OnInit {
  constructor(
    private serviceService : ServiceService,
    private route: Router,
    private _signalR: SignalR
    ) { 
      this.startConnection();
    }


  ngOnInit(): void {
    
  }

  startConnection() : void {
    this._signalR.connect().then((c) => {
      console.log("API King is now Connected");
      signalrConnection.connection = c;
      signalrConnection.connection.invoke('GetLoginToken').then((data: string) => {
        accessToken.token = data;
        //console.log('The token received is: ' + accessToken.token);
      });
    }).catch((err: any) => {console.log(err)});
  }

  
  selectEnglish() {
    selectLang.selectedLang = 'en';
    this.route.navigate(['/verifymykad']);
  }

  selectMalay() {
    selectLang.selectedLang = 'ms';
    this.route.navigate(['/verifymykad']);
  }


}
