
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/_shared/service.service';
import { selectLang } from '../_models/language';
import { SignalR } from 'ng2-signalr';
import { signalrConnection } from 'src/app/_models/signalr';
import { accessToken } from 'src/app/_models/apiToken';
import { currentHolder } from '../_models/currentUnitHolder';
import { formatDate } from '@angular/common';
import { appFunc } from '../_models/appFunctions';
import { eModules } from '../_models/enabledModules';
import { errorCodes } from '../_models/errorCode';
import { ASNBFundID, bankName, businessNature, cities, fundSource, icType, monthlyIncome, occupationCategory, occupationName, occupationSector, preferredDelivery, races, reasonTransfer, relationship, religions, securityQuestions, states, thirdpartyRelationship, TitleDetails } from '../_models/dropDownLists';
import { kActivity } from '../_models/kActivity';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent implements OnInit {

  loadingDisable = true;


  

  id: any;

  card: any;

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
    if(appFunc.kioskActivity != undefined){
      this.serviceService.postKioskActivity(appFunc.kioskActivity).subscribe((res: any) => {
      });
    }

    

    currentMyKidDetails.resetCurrentMyKid();
    currentMyKadDetails.resetCurrentMyKid();
    currentBijakHolder.resetCurretnBijakHolder();
    currentHolder.resetCurrentHolder();

    signalrConnection.logsaves = [];
    appFunc.kioskActivity = [];

    
  }

  

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language Screen]" + ": " + "Cleared Interval.");
  }



  startConnection() : void {


    this._signalR.connect().then((c) => {
      console.log("API King is now Connected on " + formatDate(new Date(), 'HH:MM:ss', 'en'));
      signalrConnection.connection = c;
      signalrConnection.connection.invoke('GetKioskCode').then((data: string) => {
        signalrConnection.kioskCode = data;
      });
      signalrConnection.connection.invoke('GetKioskID').then((data: string) => {
        signalrConnection.kioskID = data;
      });
      signalrConnection.connection.invoke('isHardcodedIC').then((data: boolean) => {
        signalrConnection.isHardcodedIC = data;
      });
      signalrConnection.connection.invoke('KioskType').then((data: string) => {
        signalrConnection.kioskType = data;
      });
      signalrConnection.connection.invoke('BranchName').then((data: string) => {
        signalrConnection.branchName = data;
      });
      signalrConnection.connection.invoke('ChannelType').then((data: string) => {
        signalrConnection.channelType = data;
      });
      signalrConnection.connection.invoke('DeviceOwner').then((data: string) => {
        signalrConnection.deviceOwner = data;
      });
      signalrConnection.connection.invoke('RequestorIdentification').then((data: string) => {
        signalrConnection.requestIdentification = data;
      });
      signalrConnection.connection.invoke('AgentCode').then((data: string) => {
        signalrConnection.agentCode = data;
      });
      signalrConnection.connection.invoke('BranchCode').then((data: string) => {
        signalrConnection.branchCode = data;
      });
      // signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      //   if(data == false){
      //     signalrConnection.kioskType = 'Mobile';
      //   }
      // });
      signalrConnection.connection.invoke('GetLoginToken').then((data: string) => {
        accessToken.token = data;
        accessToken.httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + accessToken.token
          })
        };
        this.serviceService.genTrxNo(signalrConnection.kioskCode, "AK").subscribe((res: any) => {
          signalrConnection.trxno = res.result.toString();
        }, error => {
          errorCodes.code = error.status;
          errorCodes.message = "Harap Maaf, Kiosk tidak berfungsi buat sementara waktu" + '\n' + "Sorry, Kiosk is temporarily out of service";
          this.route.navigate(['outofservice']);
        });
        this.serviceService.getScreenSaver(signalrConnection.kioskCode).subscribe((res : any) => {
          appFunc.screenSaver = res.result[0].agentDownloadPath;
          appFunc.screenSaverList = res.result[0].fileList;
        });
        this.serviceService.getKioskModules(signalrConnection.kioskCode).subscribe((res: any) => {
          var areDisabled = 0
          this.loadingDisable = false;
          appFunc.modules = res.result.map((em: any) => new eModules(em));

          
          for (var val of appFunc.modules){
            if(val.enable == false){
              areDisabled += 1;
            }
          }

          console.log(signalrConnection.kioskCode);

          if(areDisabled == appFunc.modules.length){
            errorCodes.code = "0168";
            errorCodes.message = "Under Maintenance";
            this.route.navigate(['outofservice']);
          }

          setTimeout(() => {
            this.id = setInterval(() => {
              let count = 0;
              for (var val of appFunc.modules){
                if(val.moduleID == 3){//Update CIF
                  if(val.enable == true){
                    if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                      count += 1;
                    }
                  }
                }
                else if(val.moduleID == 6){//Balance Inquiry
                  if(val.enable == true){
                    if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                      count += 1;
                    }
                  }
                }
                else if(val.moduleID == 5){//Financial
                  if(val.enable == true){
                    if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                      count += 1;
                    }
                  }
                }
                else if(val.moduleID == 2){//Bijak Registration
                  if(val.enable == true){
                    if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                      count += 1;
                    }
                  }
                }
                else if(val.moduleID == 4){//Portal Registration
                  if(val.enable == true){
                    if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                      count += 1;
                    }
                  }
                }
              }
        
              if(count == 0){
                errorCodes.code = "0168";
                errorCodes.message = "Under Maintenance";
                this.route.navigate(['outofservice']);
              }
            }, 1000);
          } , 60000);
        }, error => {
          errorCodes.code = error.status;
          errorCodes.message = "Harap Maaf, Kiosk tidak berfungsi buat sementara waktu" + '\n' + "Sorry, Kiosk is temporarily out of service";
          this.route.navigate(['outofservice']);
        });
      });
      
      
    }).catch((err: any) => {
      errorCodes.code = "0167";
      errorCodes.message = "Unauthorized";
      this.route.navigate(['outofservice']);
    });
  }



  selectEnglish() {

    selectLang.selectedLang = 'en';
    this.route.navigate(['/verifymykad']);
    signalrConnection.connection.invoke('updateSelectedLang', selectLang.selectedLang);

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language]" + ": " + "Selected English.");
    this.getDropDowns();
  }
  selectMalay() {
    selectLang.selectedLang = 'ms';
    this.route.navigate(['/verifymykad']);
    signalrConnection.connection.invoke('updateSelectedLang', selectLang.selectedLang);


    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Language]" + ": " + "Selected Bahasa Malaysia.");
    this.getDropDowns();
  }

  getDropDowns(){
    this.serviceService.getAllDropDown().subscribe((res : any) => {

      appFunc.titleSalutation = res[0].result.items.map((ts: any) => new TitleDetails(ts));
      appFunc.cities = res[1].result.items.map((ct: any) => new cities(ct));
      appFunc.states = res[3].result.items.map((st: any) => new states(st));
      appFunc.bankName = res[10].result.items.map((bn: any) => new bankName(bn));
      appFunc.ASNBFundID = res[15].result.items.map((fi: any) => new ASNBFundID(fi));


      if (selectLang.selectedLang == 'ms'){
        appFunc.businessNature = res[4].result.items.map((bn: any) => 
          new businessNature({
            value: bn.value,
            text: bn.textBM,
            textBM: bn.textBM
          }));
        appFunc.occupationSector = res[5].result.items.map((os: any) => 
          new occupationSector({
            label: os.label,
            labelDesc: os.labelDesc,
            sector: os.sector,
            sectorDesc: os.sectorDescBM,
            sectorDescBM: os.sectorDescBM
          }));
        appFunc.monthlyIncome = res[2].result.items.map((mi: any) => 
          new monthlyIncome({
            label: mi.label,
            labelDesc: mi.labelDesc,
            validValue: mi.validValue,
            valueDesc: mi.valueDescBM,
            valueDescBM: mi.valueDescBM
          }));
        appFunc.occupationCategory = res[6].result.items.map((oc: any) => 
          new occupationCategory({
            code: oc.code,
            desc: oc.descBM,
            descBM: oc.descBM
          }));
        appFunc.religion = res[7].result.items.map((rg: any) => 
          new religions({
            value: rg.value,
            text: rg.textBM,
            textBM: rg.textBM
          }));
        appFunc.races = res[8].result.items.map((rc: any) => 
          new races({
            value: rc.value,
            text: rc.textBM,
            textBM: rc.textBM
          }));
        appFunc.preferredDelivery = res[9].result.items.map((pd: any) => 
          new preferredDelivery({
            value: pd.value,
            desc: pd.descBM,
            DescBM: pd.DescBM
          }));
        appFunc.occupationName = res[11].result.items.map((on: any) => 
          new occupationName({
            value: on.value,
            desc: on.descBM,
            descBM: on.descBM
          }));
        appFunc.relationship = res[12].result.items.map((rs: any) => 
          new relationship({
            code: rs.code,
            desc: rs.descBM,
            descBM: rs.descBM
          }));
        appFunc.securityQuestions = res[13].result.items.map((sq: any) => 
          new securityQuestions({
            sqCode: sq.sqCode,
            set: sq.set,
            questionEN: sq.questionBM,
            questionBM: sq.questionBM
          }));
        appFunc.fundSource = res[14].result.items.map((fs: any) => 
        new fundSource({
          code: fs.code,
          desc: fs.descBM,
          descBM: fs.descBM
        }));
        appFunc.thirdPartyRelationship = res[16].result.items.map((tpr: any) => 
        new thirdpartyRelationship({
          code: tpr.code,
          desc: tpr.descBM,
          descBM: tpr.descBM
        }));
        appFunc.reasonTransfer = res[17].result.items.map((rt: any) => 
        new reasonTransfer({
          code: rt.code,
          desc: rt.descBM,
          descBM: rt.descBM
        }));
        appFunc.ictype = res[18].result.items.map((it: any) => 
        new icType({
          code: it.code,
          desc: it.descBM,
          descBM: it.descBM
        }));

      }else{
        appFunc.monthlyIncome = res[2].result.items.map((mi: any) => new monthlyIncome(mi));
        appFunc.businessNature = res[4].result.items.map((bn: any) => new businessNature(bn));
        appFunc.occupationSector = res[5].result.items.map((os: any) => new occupationSector(os));
        appFunc.occupationCategory = res[6].result.items.map((oc: any) => new occupationCategory(oc));
        appFunc.religion = res[7].result.items.map((rg: any) => new religions(rg));
        appFunc.races = res[8].result.items.map((rc: any) => new races(rc));
        appFunc.preferredDelivery = res[9].result.items.map((pd: any) => new preferredDelivery(pd));
        appFunc.occupationName = res[11].result.items.map((on: any) => new occupationName(on));
        appFunc.relationship = res[12].result.items.map((rs: any) => new relationship(rs));
        appFunc.securityQuestions = res[13].result.items.map((sq: any) => new securityQuestions(sq));
        appFunc.fundSource = res[14].result.items.map((fs: any) => new fundSource(fs));
        appFunc.thirdPartyRelationship = res[16].result.items.map((tpr: any) => new thirdpartyRelationship(tpr));
        appFunc.reasonTransfer = res[17].result.items.map((rt: any) => new reasonTransfer(rt));
        appFunc.ictype = res[18].result.items.map((it: any) => new reasonTransfer(it));
      }

    }, error => {
      errorCodes.code = error.status;
      errorCodes.message = "Harap Maaf, Kiosk tidak berfungsi buat sementara waktu" + '\n' + "Sorry, Kiosk is temporarily out of service";
      this.route.navigate(['outofservice']);
    });
  }

  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }

}


