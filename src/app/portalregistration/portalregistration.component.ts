import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppConfiguration } from '../config/app-configuration';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';
import { ServiceService } from '../_shared/service.service';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { currentHolder } from '../_models/currentUnitHolder';
import { errorCodes } from '../_models/errorCode';
import { FormBuilder, Validators } from '@angular/forms';
import { accessToken } from '../_models/apiToken';
import * as CryptoJS from 'crypto-js'; 


declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

@Component({
  selector: 'app-portalregistration',
  templateUrl: './portalregistration.component.html',
  styleUrls: ['./portalregistration.component.css']
})

export class PortalregistrationComponent implements OnInit {

  @ViewChild('uid') uid : ElementRef | undefined;
  @ViewChild('eAddress') eAddress : ElementRef | undefined;
  @ViewChild('securePhrase') securePh : ElementRef | undefined;
  @ViewChild('question1') question1 : ElementRef | undefined;
  @ViewChild('question2') question2 : ElementRef | undefined;
  @ViewChild('question3') question3 : ElementRef | undefined;
  @ViewChild('answer1') answer1 : ElementRef | undefined;
  @ViewChild('answer2') answer2 : ElementRef | undefined;
  @ViewChild('answer3') answer3 : ElementRef | undefined;
  @ViewChild('TAC') TAC : ElementRef | undefined;

  @ViewChild('uidlog') uidlog : ElementRef | undefined;
  @ViewChild('tempPass') tempPass : ElementRef | undefined;

  @ViewChild('newPass') newPass : ElementRef | undefined;
  @ViewChild('newPassR') newPassR : ElementRef | undefined;


  form_securityQuestions = appFunc.securityQuestions;
  lang = selectLang.selectedLang;

  ASNBTnC = false;
  TNCpdfsrc = "assets/Terms_N_Condition.pdf";
  ASNBPolicy = false;
  Policypdfsrc = "assets/PrivacyPolicy.pdf";

  ispopup = false;

  isRegister = true;
  isFirstLogin = false;
  isPasswordUpdate = false;

  tacEnabled = false;

  clickedTac = false;

  form_SetA : any;
  form_SetB : any;
  form_SetC : any;


  BTN_Cancel = "";
  BTN_Next = "";

  BTN_xAgree = "";
  BTN_Agree = "";

  BTN_MainMenu = "";
  BTN_LoginASNB = "";

  PRDetails_19_1 = "";

  BTN_No = "";
  BTN_Yes = "";

  BTN_Back = "";

  BTN_Print = "";
  BTN_Email = "";

  PR_Intro = false;
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
  transaction_Successful = false;
  TNCAgreed = true;

  RMError4_Visible = false;
  UserError_Visible = false;

  nextDetails_disabled = true;

  tryAgainErrorCodes = [103, 104, 105, 106, 108, 109, 122, 123, 124, 125, 126, 133, 134, 141, 142, 144];

  userid_warning = false;
  email_warning = false;
  email1_warning = false;
  securephrase_warning = false;
  answer1_warning = false;
  answer2_warning = false;
  answer3_warning = false;
  tac_warning = false;
  tac1_warning = false;

  useridlog_warning = false;
  temppass_warning = false;

  newpass_warning = false;
  newpassR_warning = false;
  newpassR1_warning = false;
  
  yesno = false;
  loginASNB_disabled = true;
  PForm_Error = false;
  PForm_Error2 = false;

  updateDisabled = true;
  financialDisabled = true;

  Print_Visible = true;
  Email_Visible = true;

  Notice_Visible = false;
  emailexist = false;

  hideTac = false;

  PFormText_1 = "";
  PFormText_2 = "";

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
  
  UnitHolderMobile = "";
  UnitHolderEmail = "";
  
  currenttempID = "";
  currenttempSecurePhrase = "";


  id: any;

  tempPassword : any;
  tempsecure : any;
  tempusername : any;

  PForm_1: any;
  PForm_2: any;
  PForm_3: any;

  transaction = "";

  constructor(private _router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService,
    private fb: FormBuilder,
    private appConfig: AppConfiguration) { }

  ngOnInit(): void {

    this.UnitHolderMobile = currentHolder.cellphonenumber;

    if (currentHolder.email == ''){
      this.emailexist = false;
    }else{
      this.emailexist = true;
      this.UnitHolderEmail = currentHolder.email;
    }
    

    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);

    if(selectLang.selectedLang == 'en'){
      this.transaction = "myASNB Portal Registration";
    }else{
      this.transaction = "Pendaftaran Portal myASNB";
    }

    for (var val of appFunc.modules){
      if(val.moduleName.toLowerCase().includes('update')){
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.updateDisabled = false;
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
          }
        }else{
          if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.updateDisabled = false;
          }
        }
      }
      else if(val.moduleName.toLowerCase().includes('financial')){
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.financialDisabled = false;
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Financial Transaction Module.");
          }
        }else{
          if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            this.financialDisabled = false;
          }
        }
      }

    this.PRDetails_19_1 = this.formatMobile(currentHolder.cellphonenumber);

    if (currentHolder.cellphonenumber == "" || currentHolder.cellphonenumber == undefined){
      this.RMError4_Visible = true;
    }else{
      if(currentHolder.funddetail[0].FUNDID == "" || currentHolder.funddetail.length == 0){
        this.PForm_Error2 = true;
      }
      else{
        if(signalrConnection.kioskType == 'Mobile'){
          if(currentHolder.email == ''){
            this.RMError4_Visible = true;
          }else{
            const body = {
              "idno": currentHolder.identificationnumber,
              "idtype": currentHolder.identificationtype,
              "uhid": currentHolder.unitholderid,
              "language": selectLang.selectedLang
            }
            console.log('B ' + body.idno + ' ' + body.idtype + ' ' + body.uhid + ' ' + body.language);
            this.serviceService.unitHolderVerification(body).subscribe((res: any) => {
              if (res.result.member_status == "non_member"){
                if (signalrConnection.isHardcodedIC != true){
                  this.id = setInterval(() => {
                    this.DetectMyKad();
                  }, 1000);
                }

                if(appFunc.isRedirectFromPortalRegistration == true){
                  this.Notice_Visible = false;
                  appFunc.isRedirectFromPortalRegistration = false;
                }
                else{
                  this.Notice_Visible = true;
                }
                
    
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
                this.PR_Intro = true;
                
              }else{
                this.UserError_Visible = true;
              }
            });
          }
        }else{
          const body = {
            "idno": currentHolder.identificationnumber,
            "idtype": currentHolder.identificationtype,
            "uhid": currentHolder.unitholderid,
            "language": selectLang.selectedLang
          }
          console.log('A ' + body.idno + ' ' + body.idtype + ' ' + body.uhid + ' ' + body.language);
          this.serviceService.unitHolderVerification(body).subscribe((res: any) => {
            if (res.result.member_status == "non_member"){
              if (signalrConnection.isHardcodedIC != true){
                this.id = setInterval(() => {
                  this.DetectMyKad();
                }, 1000);
              } 
  
              if(appFunc.isRedirectFromPortalRegistration == true){
                this.Notice_Visible = false;
                appFunc.isRedirectFromPortalRegistration = false;
              }
              else{
                this.Notice_Visible = true;
              }

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
            
              this.PR_Intro = true;

              
            }else{
              this.UserError_Visible = true;
            }
          });
       
        }
      }
    }
   }
  } 

  ClickPolicy(){
    this.ASNBPolicy = true;
    this.ispopup = true;
  }

  NextPolicy(){
    this.ASNBPolicy = false;
    this.ispopup = false;
  }

  ClickTNC(){
    this.ASNBTnC = true;
    this.ispopup = true;
  }

  NextTnc(){
    this.ASNBTnC = false;
    this.ispopup = false;
  }

  ngOnDestroy() {
    clearInterval(this.id);
    deleteKeyboard();
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Cleared Interval.");
  }

  format(value: string) {
    let mask = value.replace(/.(?=.{2})/g, "*");
    return mask;
  }

  formatMobile(value: string){
    let mask = value.replace(/.(?=.{4})/g, "X");
    return mask;
  }

  NoticeClose(){
    this.Notice_Visible = false;
  }

  agreeTNC(){
    this.TNCAgreed = !this.TNCAgreed;
  }


  initializeForm1(){
    this.PForm_1 = this.fb.group({
      userid: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      securephrase: ['', Validators.required],
      
      q1: ['1000'],
      a1: ['', Validators.required],
      q2: ['1005'],
      a2: ['', Validators.required],
      q3: ['1010'],
      a3: ['', Validators.required],

      tac: ['', Validators.required]
        
    });
  }

  initializeForm2(){
    this.PForm_2 = this.fb.group({
      useridlog: [this.currenttempID, Validators.required],
      temppass: [{value: '', disabled: true}, Validators.required],
      securep: [this.currenttempSecurePhrase]
    });
  }

  initializeForm3(){
    this.PForm_3 = this.fb.group({
      newpass: ['', Validators.required],
      newpassR: ['', Validators.required]
    });
  }





  nextDetails(){

    closeKeyboard();


    this.PForm_1.controls.userid.setValue(this.uid?.nativeElement.value);
    this.PForm_1.controls.email.setValue(this.eAddress?.nativeElement.value);
    this.PForm_1.controls.securephrase.setValue(this.securePh?.nativeElement.value);
    this.PForm_1.controls.a1.setValue(this.answer1?.nativeElement.value);
    this.PForm_1.controls.a2.setValue(this.answer2?.nativeElement.value);
    this.PForm_1.controls.a3.setValue(this.answer3?.nativeElement.value);
    this.PForm_1.controls.tac.setValue(this.TAC?.nativeElement.value);

    this.userid_warning = false;
    this.email_warning = false;
    this.securephrase_warning = false;
    this.answer1_warning = false;
    this.answer2_warning = false;
    this.answer3_warning = false;
    this.tac_warning = false;
    this.tac1_warning = false;
    this.email1_warning = false;

    let x = 0;
    Object.keys(this.PForm_1.controls).forEach(key => {
      if (this.PForm_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('userid')){
          this.userid_warning = true;
        }
        else if (key.includes('email')){
          this.email_warning = true;
        }
        else if (key.includes('securephrase')){
          this.securephrase_warning = true;
        }
        else if (key.includes('a1')){
          this.answer1_warning = true;
        }
        else if (key.includes('a2')){
          this.answer2_warning = true;
        }
        else if (key.includes('a3')){
          this.answer3_warning = true;
        }
        else if (key.includes('tac')){
          this.tac_warning = true;
        }
      }
      else if (this.PForm_1.controls[key].hasError('pattern')){
        if (key.includes('email')){
          this.email1_warning = true;
        }
      }
    });
    if (x > 0){
      window.scroll(0,0);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      if(this.generatedTAC != this.PForm_1.controls.tac.value){
        this.tac1_warning = true;
      }else{

        let kActivit = new kActivity();
        kActivit.trxno = signalrConnection.trxno;
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 4;
        kActivit.submoduleID = undefined;
        kActivit.action = "myASNB Portal Registration.";
        kActivit.startTime = new Date();
        
        this.currenttempID = this.PForm_1.controls.userid.value;
        this.currenttempSecurePhrase = this.PForm_1.controls.securephrase.value;

        const body = {
          "idno": currentHolder.identificationnumber.toString(),
          "idtype": currentHolder.identificationtype.toString(),
          "uhid": currentHolder.unitholderid.toString(),
          "username": this.PForm_1.controls.userid.value.toString(),
          "secureph": this.PForm_1.controls.securephrase.value.toString(),
          "ans1": this.PForm_1.controls.a1.value.toString(),
          "ans2": this.PForm_1.controls.a2.value.toString(),
          "ans3": this.PForm_1.controls.a3.value.toString(),
          "secq1": this.PForm_1.controls.q1.value.toString(),
          "secq2": this.PForm_1.controls.q2.value.toString(),
          "secq3": this.PForm_1.controls.q3.value.toString(),
          "email": this.PForm_1.controls.email.value.toString(),
          "typeclosed": currentHolder.typeclosed.toString(),
          "fundid": currentHolder.funddetail[0].FUNDID,
          "language": selectLang.selectedLang.toString(),
          "mobileno": currentHolder.cellphonenumber.toString(),
          "tac": this.PForm_1.controls.tac.value.toString(),
          "dateofbirth": currentHolder.dateofbirth.toString(),
          "signature": ""
        }

        let key = CryptoJS.enc.Utf8.parse(this.appConfig.AESCrpytKey);
        let encryptedBody = CryptoJS.AES.encrypt(JSON.stringify(body), key, {
          keySize: 128,
          blockSize: 128,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });

        const newBody = {
          "idno": currentHolder.identificationnumber.toString(),
          "idtype": currentHolder.identificationtype.toString(),
          "uhid": currentHolder.unitholderid.toString(),
          "username": this.PForm_1.controls.userid.value.toString(),
          "secureph": this.PForm_1.controls.securephrase.value.toString(),
          "ans1": this.PForm_1.controls.a1.value.toString(),
          "ans2": this.PForm_1.controls.a2.value.toString(),
          "ans3": this.PForm_1.controls.a3.value.toString(),
          "secq1": this.PForm_1.controls.q1.value.toString(),
          "secq2": this.PForm_1.controls.q2.value.toString(),
          "secq3": this.PForm_1.controls.q3.value.toString(),
          "email": this.PForm_1.controls.email.value.toString(),
          "typeclosed": currentHolder.typeclosed.toString(),
          "fundid": currentHolder.funddetail[0].FUNDID,
          "language": selectLang.selectedLang.toString(),
          "mobileno": currentHolder.cellphonenumber.toString(),
          "tac": this.PForm_1.controls.tac.value.toString(),
          "dateofbirth": currentHolder.dateofbirth.toString(),
          "signature": encryptedBody.toString()
        }

        console.log(JSON.stringify(newBody));

        this.serviceService.unitHolderRegistration(newBody).subscribe((data: any) => {
          if (data.result.registration_status == true){
            kActivit.endTime = new Date();
            kActivit.status = true;
        
            appFunc.kioskActivity.push(kActivit);
            this.tempPassword = data.result.temporary_password;
            this.PR_Details = false;
            this.PRTempPass_3 = this.format(this.tempPassword);
            this.PR_TempPass = true;
            deleteKeyboard();
          }else{
            kActivit.endTime = new Date();
            kActivit.status = false;
        
            appFunc.kioskActivity.push(kActivit);
            let ct = 0;
            this.tryAgainErrorCodes.forEach(elem => {
              if (data.result.error_code.toString() == elem.toString()){
                ct += 1;
              }
            });
            if(ct > 0){
              this.PForm_Error = true;
              this.hideTac = true;
              this.PFormText_1 = data.result.error_code;
              this.PFormText_2 = data.result.error_reason;
            }else{
              errorCodes.Ecode = data.result.error_code;
              errorCodes.Emessage = data.result.error_reason;
              errorCodes.accountName = currentHolder.firstname;
              errorCodes.accountNo = currentHolder.unitholderid;
              if(selectLang.selectedLang == 'ms'){
                errorCodes.accountType = "Dewasa";
              }else{
                errorCodes.accountType = "Dewasa";
              }
              errorCodes.transaction = this.transaction;
              this._router.navigate(['errorscreen']);
              clearInterval(this.id);
            }
          }
        });
        
      }
    }
  }

  nextLogin(){

    closeKeyboard();

    this.PForm_2.controls.useridlog.setValue(this.uidlog?.nativeElement.value);
    this.PForm_2.controls.temppass.setValue(this.tempPass?.nativeElement.value);

    
    this.temppass_warning = false;

    this.useridlog_warning = false;
    let x = 0;
    Object.keys(this.PForm_1.controls).forEach(key => {
      if (this.PForm_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('useridlog')){
          this.useridlog_warning = true;
        }
        else if (key.includes('temppass')){
          this.temppass_warning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.tempsecure = this.PForm_2.controls.securep.value;
      this.tempusername = this.PForm_2.controls.useridlog.value;
      const body = {
        "username": this.PForm_2.controls.useridlog.value,
        "password": this.PForm_2.controls.temppass.value,
        "language": selectLang.selectedLang,
        "secureph": this.PForm_2.controls.securep.value
      }
      this.serviceService.unitHolderCredentialVerification(body).subscribe((data: any) => {
        if(data.result.error_code == "000"){
          deleteKeyboard();
          this.PR_Login = false;
          this.PR_NewPassword = true;
          this.isFirstLogin = false;
          this.isPasswordUpdate = true;
          this.initializeForm3();

          setTimeout(() => {
            loadKeyboard();
          } , 1000);
        }else{
          let ct = 0;
          this.tryAgainErrorCodes.forEach(elem => {
            if (data.result.error_code.toString() == elem.toString()){
              ct += 1;
            }
          });
          if(ct > 0){
            this.PForm_Error = true;
            this.PFormText_1 = data.result.error_code;
            this.PFormText_2 = data.result.error_reason;
          }else{
            errorCodes.Ecode = data.result.error_code;
            errorCodes.Emessage = data.result.error_reason;
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            if(selectLang.selectedLang == 'ms'){
              errorCodes.accountType = "Dewasa";
            }else{
              errorCodes.accountType = "Dewasa";
            }
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
            clearInterval(this.id);
          }
        }
      });
      
    }
  }

  newPassNext(){

    closeKeyboard();

    this.PForm_3.controls.newpass.setValue(this.newPass?.nativeElement.value);
    this.PForm_3.controls.newpassR.setValue(this.newPassR?.nativeElement.value);

    this.newpass_warning = false;
    this.newpassR_warning = false;
    this.newpassR1_warning = false;

    let x = 0;
    Object.keys(this.PForm_1.controls).forEach(key => {
      if (this.PForm_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('newpass')){
          this.newpass_warning = true;
        }
        else if (key.includes('newpassR')){
          this.newpassR_warning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      if (this.PForm_3.controls.newpass.value == this.PForm_3.controls.newpassR.value){
        this.PR_Confirm = true;
        //deleteKeyboard();
      }
      else{
        this.newpassR1_warning = true;
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `Passwords not match`);
      }
    }
  }



  secureYes(){
    this.PForm_2.controls.temppass.enable();
    this.loginASNB_disabled = false;
  }

  secureNo(){
    this.yesno = false;
    this.PForm_2.controls.useridlog.setValue('');
    this.PForm_2.controls.temppass.setValue('');
    this.PForm_2.controls.temppass.disable();
  }

  filteritemsoftype(type: string){
    return this.form_securityQuestions.filter(x => x.set == type);
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  PMForm_tryAgain(){
    this.PForm_Error = false;
    this.hideTac = false;
  }

  nextToUpdate(){
    appFunc.isRedirectFromPortalRegistration = true;
    this._router.navigate(['updatedetails']);
  }

  backToMain(){
    this._router.navigate(['transactionmenu']);
  }

  introCancel(){
    this._router.navigate(['transactionmenu'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Redirect to Transaction Menu.");
  }

  introNext(){
    this.PR_Intro = false;
    this.PR_TNC = true;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Clicked Next on Portal Introduction.");
  }


  
  tncDisagree(){

    // this.PR_Intro = true;
    // this.PR_TNC = false;
    this._router.navigate(['/transactionmenu'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Disagreed to Portal Registration Terms and Conditions.");
  }

  tncAgree(){

    this.PR_TNC = false;
    this.PR_Details = true;
    this.initializeForm1();
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + "Agreed to Portal Registration Terms and Conditions.");

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }


  
  usernameVerify(){
    this.PForm_2.controls.useridlog.setValue(this.uidlog?.nativeElement.value);
    this.useridlog_warning = false;

    let x = 0;
    Object.keys(this.PForm_1.controls).forEach(key => {
      if (this.PForm_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('useridlog')){
          this.useridlog_warning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      const body = {
        "username" : this.PForm_2.controls.useridlog.value,
        "language" : selectLang.selectedLang
      }
      this.serviceService.unitHolderUsernameVerification(body).subscribe((data: any) => {
        if(data.result.error_code == "000"){
          this.PForm_2.controls.securep.setValue(data.result.secureph);
          this.yesno = false;
        }else{
          errorCodes.Ecode = data.result.error_code;
          errorCodes.Emessage = data.result.error_reason;
          errorCodes.accountName = currentHolder.firstname;
          errorCodes.accountNo = currentHolder.unitholderid;
          if(selectLang.selectedLang == 'ms'){
            errorCodes.accountType = "Dewasa";
          }else{
            errorCodes.accountType = "Dewasa";
          }
          errorCodes.transaction = this.transaction;
          this._router.navigate(['errorscreen']);
          clearInterval(this.id);
        }
      });
    }
  }

  TACClick(){
    const body = {
      "mobileno" : currentHolder.cellphonenumber,
      "moduleid" : "316",
      "message" : "ASNB KIOSK: myASNB Portal Registration",
      "language" : selectLang.selectedLang,
      "signature": ""
    }

    let key = CryptoJS.enc.Utf8.parse(this.appConfig.AESCrpytKey);
    let encryptedbody = CryptoJS.AES.encrypt(JSON.stringify(body), key, {
      keySize: 128,
      blockSize: 128,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    const newbody = {
      "mobileno" : currentHolder.cellphonenumber,
      "moduleid" : "316",
      "message" : "ASNB KIOSK: myASNB Portal Registration",
      "language" : selectLang.selectedLang,
      "signature": encryptedbody.toString()
    }


    this.serviceService.tacVerification(newbody).subscribe((res: any) => {
      if (res.result.error_reason == ""){
        this.nextDetails_disabled = false;
        this.tacEnabled = true;
        this.clickedTac = true;
        this.generatedTAC = res.result.tac;
        let expiry = parseInt(res.result.tac_expiry_duration) * 1000; 
        setTimeout(() => {
          this.nextDetails_disabled = true;
          this.clickedTac = false;
        }, expiry);
      }else{
        errorCodes.Ecode = res.result.error_code;
        errorCodes.Emessage = res.result.error_reason;
        errorCodes.accountName = currentHolder.firstname;
        errorCodes.accountNo = currentHolder.unitholderid;
        if(selectLang.selectedLang == 'ms'){
          errorCodes.accountType = "Dewasa";
        }else{
          errorCodes.accountType = "Dewasa";
        }
        errorCodes.transaction = this.transaction;
        this._router.navigate(['errorscreen']);
        clearInterval(this.id);
      }
    });
  }

  loginASNB(){
    this.isRegister = false;
    this.isFirstLogin = true;
    this.PR_TempPass = false;
    this.PR_Login = true;
    this.initializeForm2();
    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  EndTransactionBtn(){
    this._router.navigate(['feedbackscreen']);
  }

  MainMenuBtn(){
    this._router.navigate(['transactionmenu']);
  }




  confirmYes(){
    let key = CryptoJS.enc.Utf8.parse(this.appConfig.AESCrpytKey);
    let encryptedpass = CryptoJS.AES.encrypt(this.PForm_3.controls.newpass.value, key, {
      keySize: 128,
      blockSize: 128,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    const body = {
      "username": this.tempusername,
      "currentpwd": this.tempPassword,
      "secureph": this.tempsecure,
      "language": selectLang.selectedLang,
      "newPassword": encryptedpass.toString()
    }
    this.serviceService.unitHolderChangePassword(body).subscribe((data: any) => {
      if (data.result.error_code == "000"){

        
        if(signalrConnection.kioskType == 'Mobile'){
          this.Print_Visible = false;
        }
        else{
          this.Print_Visible = true;
        }


        this.PR_Confirm = false;
        this.PR_Success = true;
        deleteKeyboard();
      }else{
        let ct = 0;
        this.tryAgainErrorCodes.forEach(elem => {
          if (data.result.error_code.toString() == elem.toString()){
            ct += 1;
          }
        });
        if(ct > 0){
          this.PR_Confirm = false;
          this.PForm_Error = true;
          this.PFormText_1 = data.result.error_code;
          this.PFormText_2 = data.result.error_reason;
        }else{
          errorCodes.Ecode = data.result.error_code;
          errorCodes.Emessage = data.result.error_reason;
          errorCodes.accountName = currentHolder.firstname;
          errorCodes.accountNo = currentHolder.unitholderid;
          if(selectLang.selectedLang == 'ms'){
            errorCodes.accountType = "Dewasa";
          }else{
            errorCodes.accountType = "Dewasa";
          }
          errorCodes.transaction = this.transaction;
          this._router.navigate(['errorscreen']);
          clearInterval(this.id);
        }
      }
    });
  }

  confirmNo(){
    this.PR_Confirm = false;
  }

  successPrint(){

    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
        this.PR_Success = false;
        this.PR_NewPassword = false;
        this.PR_Print1Visible = true;

        let accountType = "";
        let transaction = "";
        if(selectLang.selectedLang == 'en'){
          transaction = "myASNB Portal Registration";
          accountType = "Dewasa";
        }else{
          transaction = "Pendaftaran Portal myASNB";
          accountType = "Dewasa";
        }
    
        const body = {
          "Transaksi": transaction,
          "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Lokasi": signalrConnection.branchName,
          "Name": currentHolder.firstname,
          "NoAkaun": currentHolder.unitholderid,
          "JenisAkaun": accountType
        }
    
        //GetNonFinancialTransactionPrintout
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(body), "GetPortalRegistrationPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              this.PR_Print1Visible = false;
              this.PR_Print2Visible = true;
              setTimeout(()=>{   
                this.PR_Print1Visible = false;
                this.PR_Print2Visible = false;
                this.PR_EmailVisible = false;

                this.transaction_Successful = true;
              }, 3000);
            }else{
              errorCodes.Ecode = "0068";
              errorCodes.Emessage = "Printing Failed";
              this._router.navigate(['errorscreen']);
              clearInterval(this.id);
            }
          }, 3000);
        });
      }else{
        errorCodes.Ecode = "6688";
        errorCodes.Emessage = "Printer Error";
        this._router.navigate(['errorscreen']);
        clearInterval(this.id);
      }
    });
  }

  successEmail(){
    this.PR_Success = false;
    this.PR_NewPassword = false;
    this.PR_EmailVisible = true;

    let accountType = "";
    let transaction = "";
    if(selectLang.selectedLang == 'en'){
      transaction = "myASNB Portal Registration";
      accountType = "Dewasa";
    }else{
      transaction = "Pendaftaran Portal myASNB";
      accountType = "Dewasa";
    }

    const body = {
      "Transaksi": transaction,
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Lokasi": signalrConnection.branchName,
      "Name": currentHolder.firstname,
      "NoAkaun": currentHolder.unitholderid,
      "JenisAkaun": accountType
    }

    const emailObj = {
      "Name" : currentHolder.firstname,
      "UnitHolderID" : currentHolder.unitholderid,
      "Module" : "4",
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : currentHolder.identificationnumber
    }

    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(body), accessToken.token, currentHolder.email, "GetPortalRegistrationPrintout", signalrConnection.trxno, "4", JSON.stringify(emailObj)).then((data: any) => {
      // setTimeout(()=>{   
      //   if (data == true){
      //     setTimeout(()=>{   
      //       this.PR_Print1Visible = false;
      //       this.PR_Print2Visible = false;
      //       this.PR_EmailVisible = false;

      //       this.transaction_Successful = true;
      //     }, 3000);
      //   }else{
      //     errorCodes.Ecode = "0069";
      //     errorCodes.Emessage = "Email Failed";
      //     this._router.navigate(['errorscreen']);
      //     clearInterval(this.id);
      //   }
      // }, 3000);
    });

    setTimeout(()=>{   
      this.PR_Print1Visible = false;
      this.PR_Print2Visible = false;
      this.PR_EmailVisible = false;

      this.transaction_Successful = true;
    }, 5000);
  }



  PMForm2_Financial(){
    this._router.navigate(['/screensaver']);
  }

  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }


  endTransaction(){
    this._router.navigate(['feedbackscreen'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Redirect to Feedback Screen.");
  }

  mainMenu(){
    this._router.navigate(['transactionmenu'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Redirect to Transaction Menu.");
  }

}

