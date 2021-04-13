import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';
import { ServiceService } from '../_shared/service.service';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { currentHolder } from '../_models/currentUnitHolder';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { errorCodes } from '../_models/errorCode';

@Component({
  selector: 'app-portalregistration',
  templateUrl: './portalregistration.component.html',
  styleUrls: ['./portalregistration.component.css']
})

export class PortalregistrationComponent implements OnInit {

  form_securityQuestions = appFunc.securityQuestions;
  lang = selectLang.selectedLang;

  form_SetA : any;
  form_SetB : any;
  form_SetC : any;


  BTN_Cancel = "";
  BTN_Next = "";

  BTN_xAgree = "";
  BTN_Agree = "";

  BTN_MainMenu = "";
  BTN_LoginASNB = "";

  BTN_No = "";
  BTN_Yes = "";

  BTN_Back = "";

  BTN_Print = "";
  BTN_Email = "";

  PR_Intro = true;
  PR_TNC = false;
  PR_Details = false;
  PR_TempPass = false;
  PR_Login = false;
  PR_NewPassword = false;
  PR_Confirm = false;
  PR_Success = false;

  PR_Print1Visible = false;
  PR_Print2Visible = false;
  PR_EmailVisible = false;

  TNCAgreed = true;

  RMError4_Visible = false;
  UserError_Visible = false;

  nextDetails_disabled = true;

  generatedTAC = "";

  Header_Title = "";

  PRIntro_1 = "";
  PRIntro_2 = "";
  PRIntro_3 = "";
  PRIntro_4 = "";
  PRIntro_5 = "";
  PRIntro_6 = "";
  PRIntro_7 = "";
  PRIntro_8 = "";
  PRIntro_9 = "";

  PRTNC_1 = "";
  PRTNC_2 = "";
  PRTNC_3 = "";
  PRTNC_4 = "";
  PRTNC_5 = "";
  PRTNC_6 = "";

  PRDetails_1  = "";
  PRDetails_2  = "";
  PRDetails_3  = "";
  PRDetails_4  = "";
  PRDetails_5  = "";
  PRDetails_6  = "";
  PRDetails_7  = "";
  PRDetails_8  = "";
  PRDetails_9  = "";
  PRDetails_10 = "";
  PRDetails_11 = "";
  PRDetails_12 = "";
  PRDetails_13 = "";
  PRDetails_14 = "";
  PRDetails_15 = "";
  PRDetails_16 = "";
  PRDetails_17 = "";
  PRDetails_18 = "";
  PRDetails_19 = "";

  PRTempPass_1 = "";
  PRTempPass_2 = "";
  PRTempPass_3 = "";
  PRTempPass_4 = "";
  PRTempPass_5 = "";

  PRLogin_1 = "";
  PRLogin_2 = "";
  PRLogin_3 = "";
  PRLogin_4 = "";
  PRLogin_5 = "";
  PRLogin_6 = "";
  PRLogin_7 = "";
  PRLogin_8 = "";
  PRLogin_9 = "";
  PRLogin_10 = "";

  PRNewPassword_1 = "";
  PRNewPassword_2 = "";
  PRNewPassword_3 = "";
  PRNewPassword_4 = "";
  PRNewPassword_5 = "";
  PRNewPassword_6 = "";
  PRNewPassword_7 = "";
  PRNewPassword_8 = "";
  PRNewPassword_9 = "";
  PRNewPassword_10 = "";
  PRNewPassword_11 = "";

  PRConfirm_1 = "";
  PRConfirm_2 = "";
  PRConfirm_3 = "";

  PRSuccess_1 = "";
  PRSuccess_2 = "";
  PRSuccess_3 = "";
  PRSuccess_4 = "";

  PRPrint1_1 = "";
  PRPrint1_2 = "";

  PRPrint2_1 = ""

  PREmail_1 = "";
  PREmail_2 = "";
  
  
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

    if (currentHolder.cellphonenumber == "" || currentHolder.cellphonenumber == undefined){
      this.RMError4_Visible = true;
    }else{



      const body = {
        // "idno": currentHolder.identificationnumber,
        // "idtype": currentHolder.identificationtype,
        // "uhid": currentHolder.unitholderid,
        //"language": selectLang.selectedLang
        "idno": "980112106085",
        "idtype": "W",
        "uhid": "0000130539123",
        "language": selectLang.selectedLang
      }
      this.serviceService.unitHolderVerification(body).subscribe((res: any) => {
        if (res.result.member_status == "non_member"){
          this.id = setInterval(() => {
            this.DetectMyKad();
          }, 1000);
      
          let kActivit = new kActivity();
          kActivit.trxno = signalrConnection.trxno;
          kActivit.kioskCode = signalrConnection.kioskCode;
          kActivit.moduleID = 0;
          kActivit.submoduleID = undefined;
          kActivit.action = "Arrived Portal Registration Screen.";
          kActivit.startTime = new Date();
          kActivit.endTime = new Date();
          kActivit.status = true;
      
          appFunc.kioskActivity.push(kActivit);
      
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Set 1 second interval to detect MyKad.");
          
          for (let i = 0; i < appFunc.securityQuestions.length; i++) {
            if (appFunc.securityQuestions[i].set == "A") {
                this.form_SetA.push(appFunc.securityQuestions[i]);
            }
          } 
          for (let i = 0; i < appFunc.securityQuestions.length; i++) {
            if (appFunc.securityQuestions[i].set == "B") {
                this.form_SetB.push(appFunc.securityQuestions[i]);
            }
          } 
          for (let i = 0; i < appFunc.securityQuestions.length; i++) {
            if (appFunc.securityQuestions[i].set == "C") {
                this.form_SetC.push(appFunc.securityQuestions[i]);
            }
          } 
          

        }else{
          this.UserError_Visible = true;
        }
      });
      
    }
    
   
  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Cleared Interval.");
  }

  agreeTNC(){
    this.TNCAgreed = !this.TNCAgreed;
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        let kActivit = new kActivity();
        kActivit.trxno = signalrConnection.trxno;
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 0;
        kActivit.submoduleID = undefined;
        kActivit.action = "User Removed Identification Card.";
        kActivit.startTime = new Date();
        kActivit.endTime = new Date();
        kActivit.status = false;

        appFunc.kioskActivity.push(kActivit);
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  nextToUpdate(){
    this._router.navigate(['updatedetails']);
  }

  backToMain(){
    this._router.navigate(['transactionmenu']);
  }

  introCancel(){
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Canceled Portal Introduction.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);
    this._router.navigate(['transactionmenu'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Redirect to Transaction Menu.");
  }

  introNext(){
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Portal Introduction Next.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);
    this.PR_Intro = false;
    this.PR_TNC = true;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Clicked Next on Portal Introduction.");
  }

  tncDisagree(){
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Disagreed Portal Registration TNC.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);

    this.PR_Intro = true;
    this.PR_TNC = false;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Disagreed to Portal Registration Terms and Conditions.");
  }

  tncAgree(){
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Agreed Portal Registration TNC.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);

    this.PR_TNC = false;
    this.PR_Details = true;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Agreed to Portal Registration Terms and Conditions.");
  }

  cancelDetails(){

  }

  nextDetails(){

  }

  TACClick(){
    const body = {
      "mobileno" : currentHolder.cellphonenumber,
      "moduleid" : "316",
      "message" : "ASNB KIOSK: myASNB Portal Registration TAC",
      "language" : selectLang.selectedLang
    }
    this.serviceService.tacVerification(body).subscribe((res: any) => {
      if (res.result.error_reason == ""){
        this.nextDetails_disabled = false;
        this.generatedTAC = res.result.tac;
        let expiry = parseInt(res.result.tac_expiry_duration) * 1000; 
        setTimeout(() => {
          this.nextDetails_disabled = true;
        }, expiry);
      }else{
        errorCodes.Ecode = res.result.error_code;
        errorCodes.Emessage = res.result.error_reason;
        this._router.navigate(['errorscreen']);
      }
    });
  }

  EndTransactionBtn(){
    this._router.navigate(['feedbackscreen']);
  }

  MainMenuBtn(){
    this._router.navigate(['transactionmenu']);
  }

  

}

