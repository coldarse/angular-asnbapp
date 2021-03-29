import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { formatDate } from '@angular/common';
import { appFunc } from '../_models/appFunctions';
import { eModules } from '../_models/enabledModules';
import { errorCodes } from '../_models/errorCode';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent implements OnInit {

   modis = [
    {
      module: "Update Details",
      startTime: "",
      stopTime: "",
      isEnabled: true,
    },
    {
      module: "Check Balance",
      startTime: "",
      stopTime: "",
      isEnabled: true,
    },
    {
      module: "Financial Transaction",
      startTime: "",
      stopTime: "",
      isEnabled: false,
    },
    {
      module: "Bijak Registration",
      startTime: "",
      stopTime: "",
      isEnabled: false,
    },
    {
      module: "Portal Registration",
      startTime: "",
      stopTime: "",
      isEnabled: true,
    }
  ]


  constructor(
    private serviceService : ServiceService,
    private route: Router,
    private _signalR: SignalR,
    ) { 
       this.startConnection();
    }

  
  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    var areDisabled = 0
    appFunc.modules = this.modis.map((em: any) => new eModules(em));
    console.log(appFunc.modules);
    for (var val of appFunc.modules){
      if(val.isEnabled == false){
        areDisabled += 1;
      }
    }

    if(areDisabled == appFunc.modules.length){
      errorCodes.code = "0168";
      errorCodes.message = "Under Maintenance";
      this.route.navigate(['outofservice']);
    }
  }

  

  startConnection() : void {

    this._signalR.connect().then((c) => {
      console.log("API King is now Connected on " + formatDate(new Date(), 'HH:MM:ss', 'en'));
      signalrConnection.connection = c;
      signalrConnection.connection.invoke('GetLoginToken').then((data: string) => {
        accessToken.token = data;
        accessToken.httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + accessToken.token
          })
        }

        //console.log(JSON.stringify(accessToken));
      });
      // signalrConnection.connection.invoke('GetPrinterStatus').then((data: string) => {
      //   //accessToken.token = data;
      //   console.log(data);
      // });
    }).catch((err: any) => {console.log(err)});
  }

  

  selectEnglish() {
    selectLang.selectedLang = 'en';
    this.route.navigate(['/verifymykad']);

    //signalrConnection.connection.invoke('SaveToLog', "WebApp Component [Language]" + ": " + "Selected English.");
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language]" + ": " + "Selected English.");
  }

  selectMalay() {
    selectLang.selectedLang = 'ms';
    this.route.navigate(['/verifymykad']);

    //signalrConnection.connection.invoke('SaveToLog', "WebApp Component [Language]" + ": " + "Selected Bahasa Malaysia.");
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language]" + ": " + "Selected Bahasa Malaysia.");
  }


}
