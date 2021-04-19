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
import { bankName, businessNature, cities, monthlyIncome, occupationCategory, occupationName, occupationSector, preferredDelivery, races, relationship, religions, securityQuestions, states, TitleDetails } from '../_models/dropDownLists';
import { kActivity } from '../_models/kActivity';
import { kioskActivities } from '../_models/kioskActivities';
import { AppConfiguration } from '../config/app-configuration';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';

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
      isEnabled: true,
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
    private _signalR: SignalR,) { 
      
       this.startConnection();
    }

  
  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    if(appFunc.kioskActivity != undefined){
      console.log(JSON.stringify(appFunc.kioskActivity));
      this.serviceService.postKioskActivity(appFunc.kioskActivity).subscribe((res: any) => {
        console.log(res);
      });
    }
    
    currentMyKidDetails.resetCurrentMyKid();
    currentMyKadDetails.resetCurrentMyKid();
    currentBijakHolder.resetCurretnBijakHolder();
    currentHolder.resetCurrentHolder();

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
        this.serviceService.genTrxNo(signalrConnection.kioskCode).subscribe((res: any) => {
          signalrConnection.trxno = res.result.toString();
          console.log(`The TRX No is ${res.result.toString()}`);
        });
      });
      
      
    }).catch((err: any) => {console.log(err)});
  }

  

  selectEnglish() {
    selectLang.selectedLang = 'en';
    this.route.navigate(['/verifymykad']);


    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Selected English Language.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);
    
    this.getDropDowns();

    
  }

  selectMalay() {
    selectLang.selectedLang = 'ms';
    this.route.navigate(['/verifymykad']);

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language]" + ": " + "Selected Bahasa Malaysia.");
  
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Selected Bahasa Malaysia Language.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);
    this.getDropDowns();
  }


  getDropDowns(){
    this.serviceService.getAllDropDown().subscribe((res : any) => {

      appFunc.titleSalutation = res[0].result.items.map((ts: any) => new TitleDetails(ts));
      appFunc.cities = res[1].result.items.map((ct: any) => new cities(ct));
      appFunc.monthlyIncome = res[2].result.items.map((mi: any) => new monthlyIncome(mi));
      appFunc.states = res[3].result.items.map((st: any) => new states(st));
      appFunc.businessNature = res[4].result.items.map((bn: any) => new businessNature(bn));
      appFunc.occupationSector = res[5].result.items.map((os: any) => new occupationSector(os));
      appFunc.occupationCategory = res[6].result.items.map((oc: any) => new occupationCategory(oc));
      appFunc.religion = res[7].result.items.map((rg: any) => new religions(rg));
      appFunc.races = res[8].result.items.map((rc: any) => new races(rc));
      appFunc.preferredDelivery = res[9].result.items.map((pd: any) => new preferredDelivery(pd));
      appFunc.bankName = res[10].result.items.map((bn: any) => new bankName(bn));
      appFunc.occupationName = res[11].result.items.map((on: any) => new occupationName(on));
      appFunc.relationship = res[12].result.items.map((rs: any) => new relationship(rs));
      appFunc.securityQuestions = res[13].result.items.map((sq: any) => new securityQuestions(sq));

      console.log(appFunc.titleSalutation);
      console.log(appFunc.cities);
      console.log(appFunc.monthlyIncome);
      console.log(appFunc.states);
      console.log(appFunc.businessNature);
      console.log(appFunc.occupationSector);
      console.log(appFunc.occupationCategory);
      console.log(appFunc.religion);
      console.log(appFunc.races);
      console.log(appFunc.preferredDelivery);
      console.log(appFunc.bankName);
      console.log(appFunc.occupationName);
      console.log(appFunc.relationship);
      console.log(appFunc.securityQuestions);
      
    });
  }
}


