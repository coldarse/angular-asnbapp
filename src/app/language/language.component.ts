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
import { fundDetails } from '../_models/fundDetails';
import { businessNature, cities, monthlyIncome, occupationCategory, occupationSector, races, relationship, religions, states, TitleDetails } from '../_models/dropDownLists';
import { kActivity } from '../_models/kActivity';
import { kioskActivities } from '../_models/kioskActivities';


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
    appFunc.kioskActivity = [];
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
      signalrConnection.connection.invoke('GetKioskCode').then((data: string) => {
        signalrConnection.kioskCode = data;
      });
      signalrConnection.connection.invoke('GetLoginToken').then((data: string) => {
        accessToken.token = data;
        accessToken.httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + accessToken.token
          })
        };
      });
    }).catch((err: any) => {console.log(err)});
  }

  

  selectEnglish() {
    selectLang.selectedLang = 'en';
    this.route.navigate(['/verifymykad']);

    kActivity.trxno = "";
    kActivity.kioskCode = signalrConnection.kioskCode;
    kActivity.moduleID = 0;
    kActivity.submoduleID = undefined;
    kActivity.action = "Selected English Language.";
    kActivity.startTime = new Date();
    kActivity.endTime = new Date();
    kActivity.status = true;

    appFunc.kioskActivity.push(kActivity);

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language]" + ": " + "Selected English.");
  }

  selectMalay() {
    selectLang.selectedLang = 'ms';
    this.route.navigate(['/verifymykad']);

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language]" + ": " + "Selected Bahasa Malaysia.");
  

    kActivity.trxno = "";
    kActivity.kioskCode = signalrConnection.kioskCode;
    kActivity.moduleID = 0;
    kActivity.submoduleID = undefined;
    kActivity.action = "Selected Bahasa Malaysia Language.";
    kActivity.startTime = new Date();
    kActivity.endTime = new Date();
    kActivity.status = true;

    appFunc.kioskActivity.push(kActivity);

    
    // this.serviceService.getAllDropDown().subscribe((res : any) => {

    //   appFunc.titleSalutation = res[0].result.items.map((ts: any) => new TitleDetails(ts));
    //   appFunc.cities = res[1].result.items.map((ct: any) => new cities(ct));
    //   appFunc.monthlyIncome = res[2].result.items.map((mi: any) => new monthlyIncome(mi));
    //   appFunc.states = res[3].result.items.map((st: any) => new states(st));
    //   appFunc.businessNature = res[4].result.items.map((bn: any) => new businessNature(bn));
    //   appFunc.occupationSector = res[5].result.items.map((os: any) => new occupationSector(os));
    //   appFunc.occupationCategory = res[6].result.items.map((oc: any) => new occupationCategory(oc));
    //   appFunc.religion = res[7].result.items.map((rg: any) => new religions(rg));
    //   appFunc.races = res[8].result.items.map((rc: any) => new races(rc));
    //   //appFunc.relationship = res[9].result.itmes.map((rs: any) => new relationship(rs));
    //   // appFunc.titleSalutation = res.result.items.map((ts: any) => new TitleDetails(ts));
    //   // appFunc.titleSalutation = res.result.items.map((ts: any) => new TitleDetails(ts));
    //   // appFunc.titleSalutation = res.result.items.map((ts: any) => new TitleDetails(ts));
      

    //   console.log(appFunc.titleSalutation);
    //   console.log(appFunc.cities);
    //   console.log(appFunc.monthlyIncome);
    //   console.log(appFunc.states);
    //   console.log(appFunc.businessNature);
    //   console.log(appFunc.occupationSector);
    //   console.log(appFunc.occupationCategory);
    //   console.log(appFunc.religion);
    //   console.log(appFunc.races);
    //   //console.log(appFunc.relationship);
    //   // console.log(res[9]);
    //   // console.log(res[10]);
    //   // console.log(res[11]);
    // });
  }
}


