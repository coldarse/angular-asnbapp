import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { ServiceService } from 'src/app/_shared/service.service';
import { finalize } from 'rxjs/operators';
import { currentHolder } from 'src/app/_models/currentUnitHolder';
import { fundDetails } from '../_models/fundDetails';
import { minorDetails } from '../_models/minorDetails';
import { formatDate } from '@angular/common';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { errorCodes } from '../_models/errorCode';
import { accessToken } from '../_models/apiToken';

@Component({
  selector: 'app-checkbalance',
  templateUrl: './checkbalance.component.html',
  styleUrls: ['./checkbalance.component.css']
})
export class CheckbalanceComponent implements OnInit {

  mDetails : any = currentHolder.minordetail;
  fDetails : any;
  BTN_Cancel = "";
  BTN_MainMenu = "";

  BTN_End = "";
  BTN_ChooseOtherAccount = "";

  noAhli = "";
  namaAhli = "";
  noAhliBijak = "";
  namaAhliBijak = "";

  BTN_Print1 = "";
  BTN_Email1 = "";

  isMain = true;

  CB1_Visible = true;
  CB2_Visible = false;
  CB3_Visible = false;
  CB4_Visible = false;
  CB5_Visible = false;

  CBBijak_Visible = false;

  CB2_ErrorVisible = false;

  Print_Visible = true;
  Email_Visible = true;

  Header_Title = "";

  CB1_1 = "";
  CB1_2 = "";
  CB1_3 = "";

  CB2_1 = "";
  CB2_2 = "";
  CB2_3 = "";
  CB2_4 = "";
  CB2_5 = "";
  CB2_6 = "";
  CB2_7 = "";
  CB2_8 = "";
  CB2_9 = "";
  CB2_10 = "";

  CBTH_1 = "";
  CBTH_2 = "";
  CBTH_3 = "";
  CBTH_4 = "";
  CBTH_5 = "";
  CBTH_6 = "";
  CBTH_7 = "";
  CBTH_8 = "";
  CBTH_9 = "";
  CBTH_10 = "";

  CB3_1 = "";
  CB3_2 = "";

  CB4_1 = "";

  CB5_1 = "";
  CB5_2 = "";

  CB_GuardianID = "";


  CBError_1 = "";
  CBError_2 = "";
  CBError_3 = "";

  id: any;

  constructor(private _router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);

    this.noAhli = currentHolder.unitholderid;
    this.namaAhli = currentHolder.firstname;

    if(signalrConnection.kioskCode == 'Mobile'){
      this.Print_Visible = false;
    }
    else{
      this.Print_Visible = true;
    }

    if(currentHolder.email == ''){
      this.Email_Visible = false;
    }
    else{
      this.Email_Visible = true;
    }

    if(currentHolder.totalminoraccount == "0"){
      this.CBBijak_Visible = false;
    }
    else{
      this.CBBijak_Visible = true;
    }

    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + "Set 1 second interval to detect MyKad.");
  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      // console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }
  
  CancelCheckBalance() {
    this._router.navigate(['feedbackscreen']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + "Canceled Check Balance.");
  }

  MainMenu() {
    this._router.navigate(['transactionmenu']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + "Redirect to Transaction Menu.");
  }



  PrintStatement(selectedFundDetails: any) {
    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if (data){
        this.CB2_Visible = false;
        this.CB3_Visible = true;
    
        
        console.log(selectedFundDetails.FUNDID);
        console.log(selectedFundDetails.UNITBALANCE);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + `Selected to Print ${selectedFundDetails.FUNDID} fund with ${selectedFundDetails.UNITBALANCE} units.`);
      
        let body : any;
        if (this.isMain){
          body = {
    
            "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "FIRSTNAME": currentHolder.firstname.toString(),
            "GRANDTOTALUNITBALANCE": currentHolder.grandtotalunitbalance.toString(),
            "GRANDTOTALEPFUNITS": currentHolder.grandtotalepfunits.toString(),
            "GRANDTOTALLOANUNITS": currentHolder.grandtotalloanunits.toString(),
            "GRANDTOTALCERTUNITS": currentHolder.grandtotalcertunits.toString(),
            "GRANDTOTALBLOCKEDUNITS": currentHolder.grandtotalblockedunits.toString(),
            "GRANDTOTALPROVISIONALUNITS": currentHolder.grandtotalprovisionalunits.toString(),
            "GRANDTOTALUNITS": currentHolder.grandtotalunits.toString(),
            "GRANDTOTALUHHOLDINGS": currentHolder.grandtotaluhholdings.toString(),	
      
            "CHANNELTYPE":"ATM",
            "REQUESTORIDENTIFICATION":"TESTFDSSERVER",
            "DEVICEOWNER":"ASNB",
            "NUMBEROFTXNS":"4", 
            "REQUESTDATE":formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "REQUESTTIME":formatDate(new Date(), 'HH:MM:ss', 'en').toString(),
            "UNITHOLDERID": this.CB2_7.toString(),
            "IDENTIFICATIONTYPE":"W",
            "IDENTIFICATIONNUMBER":this.CB2_5.toString(),
            "GUARDIANIDNUMBER":this.CB_GuardianID.toString(),
            "FUNDID":selectedFundDetails.FUNDID.toString(),
      
            "UHHOLDINGS": selectedFundDetails.UHHOLDINGS.toString(),
            "UNITBALANCE": selectedFundDetails.UNITBALANCE.toString(),
            "EPFUNITS": selectedFundDetails.EPFUNITS.toString(),
            "LOANUNITS": selectedFundDetails.LOANUNITS.toString(),
            "CERTUNITS": selectedFundDetails.CERTUNITS.toString(),
            "BLOCKEDUNITS": selectedFundDetails.BLOCKEDUNITS.toString(),
            "TOTALUNITS": selectedFundDetails.TOTALUNITS.toString(),
            "POLICYTYPE":"UT"
          };
        }else{
          body = {
    
            "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "FIRSTNAME": currentBijakHolder.firstname.toString(),
            "GRANDTOTALUNITBALANCE": currentBijakHolder.grandtotalunitbalance.toString(),
            "GRANDTOTALEPFUNITS": currentBijakHolder.grandtotalepfunits.toString(),
            "GRANDTOTALLOANUNITS": currentBijakHolder.grandtotalloanunits.toString(),
            "GRANDTOTALCERTUNITS": currentBijakHolder.grandtotalcertunits.toString(),
            "GRANDTOTALBLOCKEDUNITS": currentBijakHolder.grandtotalblockedunits.toString(),
            "GRANDTOTALPROVISIONALUNITS": currentBijakHolder.grandtotalprovisionalunits.toString(),
            "GRANDTOTALUNITS": currentBijakHolder.grandtotalunits.toString(),
            "GRANDTOTALUHHOLDINGS": currentBijakHolder.grandtotaluhholdings.toString(),	
      
            "CHANNELTYPE":"ATM",
            "REQUESTORIDENTIFICATION":"TESTFDSSERVER",
            "DEVICEOWNER":"ASNB",
            "NUMBEROFTXNS":"4", 
            "REQUESTDATE":formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "REQUESTTIME":formatDate(new Date(), 'HH:MM:ss', 'en').toString(),
            "UNITHOLDERID": this.CB2_7.toString(),
            "IDENTIFICATIONTYPE":"W",
            "IDENTIFICATIONNUMBER":this.CB2_5.toString(),
            "GUARDIANIDNUMBER":currentHolder.unitholderid,
            "FUNDID":selectedFundDetails.FUNDID.toString(),
      
            "UHHOLDINGS": selectedFundDetails.UHHOLDINGS.toString(),
            "UNITBALANCE": selectedFundDetails.UNITBALANCE.toString(),
            "EPFUNITS": selectedFundDetails.EPFUNITS.toString(),
            "LOANUNITS": selectedFundDetails.LOANUNITS.toString(),
            "CERTUNITS": selectedFundDetails.CERTUNITS.toString(),
            "BLOCKEDUNITS": selectedFundDetails.BLOCKEDUNITS.toString(),
            "TOTALUNITS": selectedFundDetails.TOTALUNITS.toString(),
            "POLICYTYPE":"UT"
          };
        }
    
        console.log(body);

        let kActivit1 = new kActivity();
        kActivit1.trxno = signalrConnection.trxno;
        kActivit1.kioskCode = signalrConnection.kioskCode;
        kActivit1.moduleID = 6;
        kActivit1.submoduleID = undefined;
        kActivit1.action = "Get Latest Five Transactions";
        kActivit1.startTime = new Date();
        
        this.serviceService.postFiveTransactions(body)
        .subscribe((trans: any) => {
    
          if (trans.result.requeststatus.toLowerCase().includes('successful')){
            signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(trans.result), "GetStatementPrintout", signalrConnection.trxno, "0").then((data: any) => {
              setTimeout(()=>{   
                if (data == true){
                  kActivit1.endTime = new Date();
                  kActivit1.status = true; 
            
                  appFunc.kioskActivity.push(kActivit1);
                  this.CB3_Visible = false;
                  this.CB4_Visible = true;
                  setTimeout(()=>{   
                    this.CB4_Visible = false;
                    this._router.navigate(['transactionsuccessful']);
                  }, 3000);
                }else{
                  kActivit1.endTime = new Date();
                  kActivit1.status = false; 
            
                  appFunc.kioskActivity.push(kActivit1);
                  errorCodes.Ecode = "0068";
                  errorCodes.Emessage = "Printing Failed";
                  this._router.navigate(['errorscreen']);
                }
              }, 3000);
            });
          }
          else{
            errorCodes.Ecode = trans.result.rejectcode;
            errorCodes.Emessage = trans.result.rejectreason;
            this._router.navigate(['errorscreen']);
          }

          
        });
      }else{
        errorCodes.Ecode = "6688";
        errorCodes.Emessage = "Printer Error";
        this._router.navigate(['errorscreen']);
      }
    });
  }

  EmailStatement(selectedFundDetails: any) {
    this.CB2_Visible = false;
    this.CB5_Visible = true;

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + `Selected to Email ${selectedFundDetails.FUNDID} fund with ${selectedFundDetails.UNITBALANCE} units.`);


    let body: any;
    if (this.isMain){
      body = {
        "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "FIRSTNAME": currentHolder.firstname.toString(),
        "GRANDTOTALUNITBALANCE": currentHolder.grandtotalunitbalance.toString(),
        "GRANDTOTALEPFUNITS": currentHolder.grandtotalepfunits.toString(),
        "GRANDTOTALLOANUNITS": currentHolder.grandtotalloanunits.toString(),
        "GRANDTOTALCERTUNITS": currentHolder.grandtotalcertunits.toString(),
        "GRANDTOTALBLOCKEDUNITS": currentHolder.grandtotalblockedunits.toString(),
        "GRANDTOTALPROVISIONALUNITS": currentHolder.grandtotalprovisionalunits.toString(),
        "GRANDTOTALUNITS": currentHolder.grandtotalunits.toString(),
        "GRANDTOTALUHHOLDINGS": currentHolder.grandtotaluhholdings.toString(),
  
        "CHANNELTYPE":"ATM",
        "REQUESTORIDENTIFICATION":"TESTFDSSERVER",
        "DEVICEOWNER":"ASNB",
        "NUMBEROFTXNS":"4", 
        "REQUESTDATE":formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "REQUESTTIME":formatDate(new Date(), 'HH:MM:ss', 'en').toString(),
        "UNITHOLDERID": this.CB2_7.toString(),
        "IDENTIFICATIONTYPE":currentHolder.identificationtype,
        "IDENTIFICATIONNUMBER":this.CB2_5.toString(),
        "GUARDIANIDNUMBER":this.CB_GuardianID.toString(),
        "FUNDID":selectedFundDetails.FUNDID.toString(),
  
        "UHHOLDINGS": selectedFundDetails.UHHOLDINGS.toString(),
        "UNITBALANCE": selectedFundDetails.UNITBALANCE.toString(),
        "EPFUNITS": selectedFundDetails.EPFUNITS.toString(),
        "LOANUNITS": selectedFundDetails.LOANUNITS.toString(),
        "CERTUNITS": selectedFundDetails.CERTUNITS.toString(),
        "BLOCKEDUNITS": selectedFundDetails.BLOCKEDUNITS.toString(),
        "TOTALUNITS": selectedFundDetails.TOTALUNITS.toString(),
        "POLICYTYPE":"UT"
      };
    }else{
      body = {
        "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "FIRSTNAME": currentBijakHolder.firstname.toString(),
        "GRANDTOTALUNITBALANCE": currentBijakHolder.grandtotalunitbalance.toString(),
        "GRANDTOTALEPFUNITS": currentBijakHolder.grandtotalepfunits.toString(),
        "GRANDTOTALLOANUNITS": currentBijakHolder.grandtotalloanunits.toString(),
        "GRANDTOTALCERTUNITS": currentBijakHolder.grandtotalcertunits.toString(),
        "GRANDTOTALBLOCKEDUNITS": currentBijakHolder.grandtotalblockedunits.toString(),
        "GRANDTOTALPROVISIONALUNITS": currentBijakHolder.grandtotalprovisionalunits.toString(),
        "GRANDTOTALUNITS": currentBijakHolder.grandtotalunits.toString(),
        "GRANDTOTALUHHOLDINGS": currentBijakHolder.grandtotaluhholdings.toString(),
  
        "CHANNELTYPE":"ATM",
        "REQUESTORIDENTIFICATION":"TESTFDSSERVER",
        "DEVICEOWNER":"ASNB",
        "NUMBEROFTXNS":"4", 
        "REQUESTDATE":formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "REQUESTTIME":formatDate(new Date(), 'HH:MM:ss', 'en').toString(),
        "UNITHOLDERID": this.CB2_7.toString(),
        "IDENTIFICATIONTYPE":currentBijakHolder.identificationtype,
        "IDENTIFICATIONNUMBER":this.CB2_5.toString(),
        "GUARDIANIDNUMBER": currentHolder.unitholderid,
        "FUNDID":selectedFundDetails.FUNDID.toString(),
  
        "UHHOLDINGS": selectedFundDetails.UHHOLDINGS.toString(),
        "UNITBALANCE": selectedFundDetails.UNITBALANCE.toString(),
        "EPFUNITS": selectedFundDetails.EPFUNITS.toString(),
        "LOANUNITS": selectedFundDetails.LOANUNITS.toString(),
        "CERTUNITS": selectedFundDetails.CERTUNITS.toString(),
        "BLOCKEDUNITS": selectedFundDetails.BLOCKEDUNITS.toString(),
        "TOTALUNITS": selectedFundDetails.TOTALUNITS.toString(),
        "POLICYTYPE":"UT"
      };
    }
     
    console.log(JSON.stringify(body));


    const emailObj = {
      "Name" : currentHolder.firstname,
      "UnitHolderID" : currentHolder.unitholderid,
      "Module" : "6",
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : currentHolder.identificationnumber
    }

    this.serviceService.postFiveTransactions(body)
    .subscribe((trans: any) => {

      let kActivit1 = new kActivity();
      kActivit1.trxno = signalrConnection.trxno;
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = 6;
      kActivit1.submoduleID = undefined;
      kActivit1.action = "Get Latest Five Transactions";
      kActivit1.startTime = new Date();

      console.log(trans.result);

      if (trans.result.requeststatus.toLowerCase().includes('successful')){
        signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(trans.result), accessToken.token, currentHolder.email, "GetStatementPrintout", signalrConnection.trxno, "6", JSON.stringify(emailObj)).then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              kActivit1.endTime = new Date();
              kActivit1.status = true; 
  
              appFunc.kioskActivity.push(kActivit1);
              setTimeout(()=>{   
                this.CB5_Visible = false;
                this._router.navigate(['transactionsuccessful']);
              }, 3000);
            }else{
              kActivit1.endTime = new Date();
              kActivit1.status = false; 
  
              appFunc.kioskActivity.push(kActivit1);
              errorCodes.Ecode = "0069";
              errorCodes.Emessage = "Email Failed";
              this._router.navigate(['errorscreen']);
            }
          }, 3000);
        });
      }
      else{
        errorCodes.Ecode = trans.result.rejectcode;
        errorCodes.Emessage = trans.result.rejectreason;
        this._router.navigate(['errorscreen']);
      }

      
      
      
    });
  }

  PrintDivStatement(selectedFundDetails: any) {

    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
        this.CB2_Visible = false;
        this.CB3_Visible = true;
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + `Selected to Print ${selectedFundDetails.FUNDID} fund with ${selectedFundDetails.UNITBALANCE} units.`);
      
        let thisYear = new Date().getFullYear();
        let divYear: number = +thisYear;
        divYear = divYear - 1;

        let body : any;
        if (this.isMain){
          body = {
            "date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "firstname": currentHolder.firstname.toString(),
            "channeltype": "ATM",
            "requestoridentification": "TESTFDSSERVER",
            "deviceowner": "ASNB",
            "typeofstatement": "DIVSTMT",
            "requestdate": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "requesttime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "unitholderid": this.CB2_7.toString(),
            "identificationtype": "W",
            "identificationnumber": this.CB2_5.toString(),
            "guardianidnumber": this.CB_GuardianID.toString(),
            "fundid": selectedFundDetails.FUNDID.toString(),
            "financialyear": divYear.toString()//new Date().getFullYear().toString()
          };
        }else{
          body = {
            "date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "firstname": currentBijakHolder.firstname.toString(),
            "channeltype": "ATM",
            "requestoridentification": "TESTFDSSERVER",
            "deviceowner": "ASNB",
            "typeofstatement": "DIVSTMT",
            "requestdate": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "requesttime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "unitholderid": this.CB2_7.toString(),
            "identificationtype": "W",
            "identificationnumber": this.CB2_5.toString(),
            "guardianidnumber": this.CB_GuardianID.toString(),
            "fundid": selectedFundDetails.FUNDID.toString(),
            "financialyear": divYear.toString()
          };
        }
    
        console.log(body);
        
        this.serviceService.dividendStatement(body)
        .subscribe((trans: any) => {
    
          console.log(JSON.stringify(trans.result));
    
          let kActivit1 = new kActivity();
          kActivit1.trxno = signalrConnection.trxno;
          kActivit1.kioskCode = signalrConnection.kioskCode;
          kActivit1.moduleID = 6;
          kActivit1.submoduleID = undefined;
          kActivit1.action = "Get Dividend Statements";
          kActivit1.startTime = new Date();
          
          kActivit1.endTime = new Date();
          kActivit1.status = true; 
    
          appFunc.kioskActivity.push(kActivit1);

          if (trans.result.requeststatus.toLowerCase().includes('successful')){
            signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(trans.result), "GetDivStatementPrintout", signalrConnection.trxno, "0").then((data: any) => {
              setTimeout(()=>{   
                if (data == true){
                  kActivit1.endTime = new Date();
                  kActivit1.status = true;
              
                  appFunc.kioskActivity.push(kActivit1);
                  this.CB3_Visible = false;
                  this.CB4_Visible = true;
                  setTimeout(()=>{   
                    this.CB4_Visible = false;
                    this._router.navigate(['transactionsuccessful']);
                  }, 3000);
                }else{
                  kActivit1.endTime = new Date();
                  kActivit1.status = false;
              
                  appFunc.kioskActivity.push(kActivit1);
                  errorCodes.Ecode = "0068";
                  errorCodes.Emessage = "Printing Failed";
                  this._router.navigate(['errorscreen']);
                }
              }, 3000);
            });
          }
          else{
            errorCodes.Ecode = trans.result.rejectcode;
            errorCodes.Emessage = trans.result.rejectreason;
            this._router.navigate(['errorscreen']);
          }
    
          
        });
      }else{
        errorCodes.Ecode = "6688";
        errorCodes.Emessage = "Printer Error";
        this._router.navigate(['errorscreen']);
      }
    });
  }

  EmailDivStatement(selectedFundDetails: any) {
    this.CB2_Visible = false;
    this.CB5_Visible = true;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + `Selected to Email ${selectedFundDetails.FUNDID} fund with ${selectedFundDetails.UNITBALANCE} units.`);

    let thisYear = new Date().getFullYear();
    let divYear: number = +thisYear;
    divYear = divYear - 1;

    let body: any;
    if (this.isMain){
      body = {
        "date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "firstname": currentHolder.firstname.toString(),
        "channeltype": "ATM",
        "requestoridentification": "TESTFDSSERVER",
        "deviceowner": "ASNB",
        "typeofstatement": "DIVSTMT",
        "requestdate": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "requesttime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "unitholderid": this.CB2_7.toString(),
        "identificationtype": "W",
        "identificationnumber": this.CB2_5.toString(),
        "guardianidnumber": this.CB_GuardianID.toString(),
        "fundid": selectedFundDetails.FUNDID.toString(),
        "financialyear": divYear.toString()
      };
    }else{
      body = {
        "date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "firstname": currentBijakHolder.firstname.toString(),
        "channeltype": "ATM",
        "requestoridentification": "TESTFDSSERVER",
        "deviceowner": "ASNB",
        "typeofstatement": "DIVSTMT",
        "requestdate": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "requesttime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "unitholderid": this.CB2_7.toString(),
        "identificationtype": "W",
        "identificationnumber": this.CB2_5.toString(),
        "guardianidnumber": this.CB_GuardianID.toString(),
        "fundid": selectedFundDetails.FUNDID.toString(),
        "financialyear": divYear.toString()
      };
    }
     
    console.log(body);

    const emailObj = {
      "Name" : currentHolder.firstname,
      "UnitHolderID" : currentHolder.unitholderid,
      "Module" : "6",
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : currentHolder.identificationnumber
    }

    this.serviceService.dividendStatement(body)
    .subscribe((trans: any) => {

      console.log(JSON.stringify(trans.result));

      let kActivit1 = new kActivity();
      kActivit1.trxno = signalrConnection.trxno;
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = 6;
      kActivit1.submoduleID = undefined;
      kActivit1.action = "Get Dividend Statements";
      kActivit1.startTime = new Date();


      if (trans.result.requeststatus.toLowerCase().includes('successful')){
        signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(trans.result), accessToken.token, currentHolder.email, "GetDivStatementPrintout", signalrConnection.trxno, "6", JSON.stringify(emailObj)).then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              kActivit1.endTime = new Date();
              kActivit1.status = true; 
  
              appFunc.kioskActivity.push(kActivit1);
              setTimeout(()=>{   
                this.CB5_Visible = false;
                this._router.navigate(['transactionsuccessful']);
              }, 3000);
            }else{
              kActivit1.endTime = new Date();
              kActivit1.status = false; 
  
              appFunc.kioskActivity.push(kActivit1);
              errorCodes.Ecode = "0069";
              errorCodes.Emessage = "Email Failed";
              this._router.navigate(['errorscreen']);
            }
          }, 3000);
        });
      }
      else{
        errorCodes.Ecode = trans.result.rejectcode;
        errorCodes.Emessage = trans.result.rejectreason;
        this._router.navigate(['errorscreen']);
      }
      

     
      
      
    });
  }

  PrintAllStatement(selectedFundDetails: any) {


    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
        this.CB2_Visible = false;
        this.CB3_Visible = true;
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + `Selected to Print ${selectedFundDetails.FUNDID} fund with ${selectedFundDetails.UNITBALANCE} units.`);
    
        let body: any;
        if (this.isMain){
          body = {
            "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "UNITHOLDERID": this.CB2_7,
            "FIRSTNAME": currentHolder.firstname,
            "GRANDTOTALUNITBALANCE": currentHolder.grandtotalunitbalance,
            "GRANDTOTALEPFUNITS": currentHolder.grandtotalepfunits,
            "GRANDTOTALLOANUNITS": currentHolder.grandtotalloanunits,
            "GRANDTOTALCERTUNITS": currentHolder.grandtotalcertunits,
            "GRANDTOTALBLOCKEDUNITS": currentHolder.grandtotalblockedunits,
            "GRANDTOTALPROVISIONALUNITS": currentHolder.grandtotalprovisionalunits,
            "GRANDTOTALUNITS": currentHolder.grandtotalunits,
            "GRANDTOTALUHHOLDINGS": currentHolder.grandtotaluhholdings,
            "NRIC": currentHolder.identificationnumber,
            "FUNDS": currentHolder.funddetail
          };
        }
        else{
          body = {
            "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
            "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "UNITHOLDERID": this.CB2_7,
            "FIRSTNAME": currentBijakHolder.firstname,
            "GRANDTOTALUNITBALANCE": currentBijakHolder.grandtotalunitbalance,
            "GRANDTOTALEPFUNITS": currentBijakHolder.grandtotalepfunits,
            "GRANDTOTALLOANUNITS": currentBijakHolder.grandtotalloanunits,
            "GRANDTOTALCERTUNITS": currentBijakHolder.grandtotalcertunits,
            "GRANDTOTALBLOCKEDUNITS": currentBijakHolder.grandtotalblockedunits,
            "GRANDTOTALPROVISIONALUNITS": currentBijakHolder.grandtotalprovisionalunits,
            "GRANDTOTALUNITS": currentBijakHolder.grandtotalunits,
            "GRANDTOTALUHHOLDINGS": currentBijakHolder.grandtotaluhholdings,
            "NRIC": currentBijakHolder.identificationnumber,
            "FUNDS": currentBijakHolder.funddetail
          };
        }
    
        let kActivit1 = new kActivity();
        kActivit1.trxno = signalrConnection.trxno;
        kActivit1.kioskCode = signalrConnection.kioskCode;
        kActivit1.moduleID = 6;
        kActivit1.submoduleID = undefined;
        kActivit1.action = "Get Fund Summary";
        kActivit1.startTime = new Date();
        
        
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(body), "GetSummaryStatementPrintout", signalrConnection.trxno, "0").then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              kActivit1.endTime = new Date();
              kActivit1.status = true; 
          
              appFunc.kioskActivity.push(kActivit1);
              this.CB3_Visible = false;
              this.CB4_Visible = true;
              setTimeout(()=>{   
                this.CB4_Visible = false;
                this._router.navigate(['transactionsuccessful']);
              }, 3000);
            }else{
              kActivit1.endTime = new Date();
              kActivit1.status = false; 
          
              appFunc.kioskActivity.push(kActivit1);
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

  EmailAllStatement(selectedFundDetails: any) {
    this.CB2_Visible = false;
    this.CB5_Visible = true;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + `Selected to Email ${selectedFundDetails.FUNDID} fund with ${selectedFundDetails.UNITBALANCE} units.`);

    let body: any;
    if (this.isMain){
      body = {
        "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "UNITHOLDERID": this.CB2_7,
        "FIRSTNAME": currentHolder.firstname,
        "GRANDTOTALUNITBALANCE": currentHolder.grandtotalunitbalance,
        "GRANDTOTALEPFUNITS": currentHolder.grandtotalepfunits,
        "GRANDTOTALLOANUNITS": currentHolder.grandtotalloanunits,
        "GRANDTOTALCERTUNITS": currentHolder.grandtotalcertunits,
        "GRANDTOTALBLOCKEDUNITS": currentHolder.grandtotalblockedunits,
        "GRANDTOTALPROVISIONALUNITS": currentHolder.grandtotalprovisionalunits,
        "GRANDTOTALUNITS": currentHolder.grandtotalunits,
        "GRANDTOTALUHHOLDINGS": currentHolder.grandtotaluhholdings,
        "NRIC": currentHolder.identificationnumber,
        "FUNDS": currentHolder.funddetail
      };
    }
    else{
      body = {
        "Date": formatDate(new Date(), 'dd/MM/yyyy', 'en').toString(),
        "Time": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "UNITHOLDERID": this.CB2_7,
        "FIRSTNAME": currentBijakHolder.firstname,
        "GRANDTOTALUNITBALANCE": currentBijakHolder.grandtotalunitbalance,
        "GRANDTOTALEPFUNITS": currentBijakHolder.grandtotalepfunits,
        "GRANDTOTALLOANUNITS": currentBijakHolder.grandtotalloanunits,
        "GRANDTOTALCERTUNITS": currentBijakHolder.grandtotalcertunits,
        "GRANDTOTALBLOCKEDUNITS": currentBijakHolder.grandtotalblockedunits,
        "GRANDTOTALPROVISIONALUNITS": currentBijakHolder.grandtotalprovisionalunits,
        "GRANDTOTALUNITS": currentBijakHolder.grandtotalunits,
        "GRANDTOTALUHHOLDINGS": currentBijakHolder.grandtotaluhholdings,
        "NRIC": currentBijakHolder.identificationnumber,
        "FUNDS": currentBijakHolder.funddetail
      };
    }

    const emailObj = {
      "Name" : currentHolder.firstname,
      "UnitHolderID" : currentHolder.unitholderid,
      "Module" : "6",
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : currentHolder.identificationnumber
    }

    let kActivit1 = new kActivity();
    kActivit1.trxno = signalrConnection.trxno;
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = 6;
    kActivit1.submoduleID = undefined;
    kActivit1.action = "Get Fund Summary";
    kActivit1.startTime = new Date();
    
    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(body), accessToken.token, currentHolder.email, "GetSummaryStatementPrintout", signalrConnection.trxno, "6", JSON.stringify(emailObj)).then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          kActivit1.endTime = new Date();
          kActivit1.status = true; 

          appFunc.kioskActivity.push(kActivit1);
          setTimeout(()=>{   
            this.CB5_Visible = false;
            this._router.navigate(['transactionsuccessful']);
          }, 3000);
        }else{
          kActivit1.endTime = new Date();
          kActivit1.status = false; 

          appFunc.kioskActivity.push(kActivit1);
          errorCodes.Ecode = "0069";
          errorCodes.Emessage = "Email Failed";
          this._router.navigate(['errorscreen']);
        }
      }, 3000);
    });

  }


  MinorCheckBalance(selectedMinorDetails: any) {
    this.isMain = false;
    const body = {
      "CHANNELTYPE": "ASNB KIOSK",
      "REQUESTORIDENTIFICATION": "TESTFDSSERVER",
      "DEVICEOWNER": "ASNB",
      "UNITHOLDERID": "",
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE": selectedMinorDetails.ICTYPE,
      "IDENTIFICATIONNUMBER": selectedMinorDetails.ICNO,
      "FUNDID": "",
      "INQUIRYCODE": "5",
      "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
      "BANKTXNREFERENCENUMBER": signalrConnection.trxno,
      "BANKCUSTPHONENUMBER": "",
      "FILTRATIONFLAG": "1",
      "GUARDIANID": currentHolder.unitholderid,
      "GUARDIANICTYPE": currentHolder.identificationtype,
      "GUARDIANICNUMBER": currentHolder.identificationnumber
      };

     this.serviceService.getAccountInquiry(body)
     .subscribe((result: any) => {
        
        currentBijakHolder.channeltype = result.channeltype;
        currentBijakHolder.requestoridentification = result.requestoridentification;
        currentBijakHolder.deviceowner = result.deviceowner;
        currentBijakHolder.unitholderid = result.unitholderid;
        currentBijakHolder.firstname = result.firstname;
        currentBijakHolder.identificationtype = result.identificationtype;
        currentBijakHolder.identificationnumber = result.identificationnumber;
        currentBijakHolder.fundid = result.fundid;
        currentBijakHolder.inquirycode = result.inquirycode;
        currentBijakHolder.transactiondate = result.transactiondate;
        currentBijakHolder.transactiontime = result.transactiontime;
        currentBijakHolder.banktxnreferencenumber = result.banktxnreferencenumber;
        currentBijakHolder.bankcustphonenumber = result.bankcustphonenumber;
        currentBijakHolder.filtrationflag = result.filtrationflag;
        currentBijakHolder.typeclosed = result.typeclosed;
        currentBijakHolder.participateinasnbmkt = result.participateinasnbmkt;
        currentBijakHolder.funddetail = result.funddetail;
        currentBijakHolder.grandtotalunitbalance = result.grandtotalunitbalance;
        currentBijakHolder.grandtotalepfunits = result.grandtotalepfunits;
        currentBijakHolder.grandtotalloanunits = result.grandtotalloanunits;
        currentBijakHolder.grandtotalcertunits = result.grandtotalcertunits;
        currentBijakHolder.grandtotalblockedunits = result.grandtotalblockedunits;
        currentBijakHolder.grandtotalprovisionalunits = result.grandtotalprovisionalunits;
        currentBijakHolder.grandtotalunits = result.grandtotalunits;
        currentBijakHolder.grandtotaluhholdings = result.grandtotaluhholdings;
        currentBijakHolder.totalminoraccount = result.totalminoraccount;
        currentBijakHolder.minordetail = result.minordetail;
        currentBijakHolder.guardianid = result.guardianid;
        currentBijakHolder.guardianictype = result.guardianictype;
        currentBijakHolder.guardianicnumber = result.guardianicnumber;
        currentBijakHolder.agentcode = result.agentcode;
        currentBijakHolder.branchcode = result.branchcode;
        currentBijakHolder.lastupdatedate = result.lastupdatedate;
        currentBijakHolder.transactionchannel = result.transactionchannel;
        currentBijakHolder.transactionstatus = result.transactionstatus;
        currentBijakHolder.rejectcode = result.rejectcode;
        currentBijakHolder.rejectreason = result.rejectreason;


        this.CheckBijakAccount();
     })
  }
  

  CheckMainAccount() {
    this.isMain = true;

    this.fDetails = currentHolder.funddetail;

    console.log(this.fDetails[0].FUNDID);

    //if (this.fDetails.length == 1 || this.fDetails.length == 0){
    if(this.fDetails[0].FUNDID.length < 1){
      this.CB2_ErrorVisible = true;
    }
    else{
      this.CB1_Visible = false;
      this.CB2_Visible = true;

      this.CB2_3 = currentHolder.firstname;
      this.CB2_5 = currentHolder.identificationnumber;
      this.CB2_7 = currentHolder.unitholderid;
      this.CB_GuardianID = currentHolder.guardianid;

      this.CB2_9 = currentHolder.grandtotaluhholdings;
      this.CB2_10 = currentHolder.grandtotalunits;

      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + "Selected Main Account Balance.");
      
      if(signalrConnection.kioskType == 'Mobile'){
        this.Print_Visible = false;
      }
      else{
        this.Print_Visible = true;
      }
    }
  //   }
  //   else{
  //     this.CB1_Visible = false;
  //     this.CB2_Visible = true;

  //     this.CB2_3 = currentHolder.firstname;
  //     this.CB2_5 = currentHolder.identificationnumber;
  //     this.CB2_7 = currentHolder.unitholderid;
  //     this.CB_GuardianID = currentHolder.guardianid;

  //     this.CB2_9 = currentHolder.grandtotaluhholdings;
  //     this.CB2_10 = currentHolder.grandtotalunits;

  //     signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + "Selected Main Account Balance.");
      
  //   }
    
  // }
  }

  CheckBijakAccount() {
    this.fDetails = currentBijakHolder.funddetail;

    this.CB1_Visible = false;
    this.CB2_Visible = true;

    this.CB2_3 = currentBijakHolder.firstname;
    this.CB2_5 = currentBijakHolder.identificationnumber;
    this.CB2_7 = currentBijakHolder.unitholderid;
    this.CB_GuardianID = currentBijakHolder.guardianid;

    this.CB2_9 = currentBijakHolder.grandtotaluhholdings;
    this.CB2_10 = currentBijakHolder.grandtotalunits;

    if(signalrConnection.kioskType == 'Mobile'){
      this.Print_Visible = false;
    }
    else{
      this.Print_Visible = true;
    }

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Check Balance]" + ": " + `Selected Minor Account Balance. ${currentBijakHolder.firstname}, ${currentBijakHolder.identificationnumber}, ${currentBijakHolder.unitholderid}`);
  }
  

  ChooseOtherAccount(){
    this.CB2_ErrorVisible = false;
  }
  

}
