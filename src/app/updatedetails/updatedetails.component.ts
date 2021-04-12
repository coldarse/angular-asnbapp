import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { ServiceService } from '../_shared/service.service';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { errorCodes } from '../_models/errorCode';
import { accessToken } from '../_models/apiToken';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';


declare const loadKeyboard: any;
declare const deleteKeyboard: any;

@Component({
  selector: 'app-updatedetails',
  templateUrl: './updatedetails.component.html',
  styleUrls: ['./updatedetails.component.css']
})
export class UpdatedetailsComponent implements OnInit {

  @ViewChild('address1') add1 : ElementRef | undefined;
  @ViewChild('address2') add2 : ElementRef | undefined;
  @ViewChild('postcode') postcode : ElementRef | undefined;
  @ViewChild('homenumber') homeno : ElementRef | undefined;
  @ViewChild('telephone') phoneno : ElementRef | undefined;
  @ViewChild('email') email : ElementRef | undefined;
  @ViewChild('bankaccount') bankno : ElementRef | undefined;
  @ViewChild('companyname') compname : ElementRef | undefined;

  form_salutation : any = appFunc.titleSalutation;
  form_races : any = appFunc.races; //
  form_religion : any = appFunc.religion; //
  form_states : any = appFunc.states; 
  form_cities : any = appFunc.cities;
  form_preferredDelivery : any = appFunc.preferredDelivery;
  form_bankname : any = appFunc.bankName;
  form_occupationSector : any = appFunc.occupationSector;//
  form_occupationName : any = appFunc.occupationName;
  form_occupationCatergory : any = appFunc.occupationCategory;//
  form_businessnature : any = appFunc.businessNature;//
  form_income : any = appFunc.monthlyIncome;//

  BTN_Cancel = "";
  BTN_MainMenu = "";

  BTN_Next = "";

  BTN_No = "";
  BTN_Yes = "";

  BTN_Print = "";
  BTN_Email = "";

  isMain = false;
  Email_Visible = true;

  UD1_Visible = true;
  UDForm_Visible = false;
  UDBForm_Visible = false;
  UDConfirm_Visible = false;
  UDSuccess_Visible = false;

  UDBijak_Visible = false;

  UD_Print1Visible = false;
  UD_Print2Visible = false;
  UD_EmailVisible = false;

  checkedXEmail : boolean = false;
  checkedXTelephone : boolean = false;
  checkedMyKadAddress : boolean = true;

  ARAddress1_disabled : boolean = true;
  ARAddress2_disabled : boolean = true;
  ARPostcode_disabled : boolean = true;
  ARCity_disabled : boolean = true;
  ARState_disabled : boolean = true;


  address1_Warning : boolean = false;
  address2_Warning : boolean = false;
  postcode_Warning : boolean = false;

  telephone_Warning : boolean = false;
  email_Warning : boolean = false;
  email_Warning1 : boolean = false;
  bank_Warning : boolean = false;
  bankNo_Warning : boolean = false;
  companyName_Warning : boolean = false;

  MI_Warning : boolean = false;
  JS_Warning : boolean = false;
  NOJ_Warning : boolean = false;
  JN_Warning : boolean = false;
  JC_Warning : boolean = false;

  noAhli = "";
  namaAhli = "";
  noAhliBijak = "";
  namaAhliBijak = "";

  Header_Title = "";

  UD1_1 = "";
  UD1_2 = "";
  UD1_3 = "";


  UDConfirm_1 = "";
  UDConfirm_2 = "";
  UDConfirm_3 = "";

  UDSuccess_1 = "";

  UDPrint1_1 = "";
  UDPrint1_2 = "";

  UDPrint2_1 = "";

  UDEmail_1 = "";
  UDEmail_2 = "";

  AR1_Value = "";
  AR2_Value = "";
  AR3_Value = "";
  AR4_Value = "";
  AR5_Value = "";

  emailValue = "";
  
  ARAddress1_Value = "";
  ARAddress2_Value = "";
  ARPostcode_Value = "";
  ARCity_Value = "";
  ARState_Value = "";

  AR6_Value = "";
  AR7_Value = "";
  AR8_Value = "";
  AR9_Value = "";
  AR10_Value = "";
  AR11_Value = "";

  FL_1  : string = "";
  FL_2  : string = "";
  FL_3  : string = "";
  FL_4  : string = "";
  FL_5  : string = "";
  FL_6  : string = "";
  FL_7  : string = "";
  FL_8  : string = "";
  FL_9  : string = "";
  FL_10 : string = "";
  FL_11 : string = "";
  FL_12 : string = "";
  FL_13 : string = "";
  FL_14 : string = "";
  FL_15 : string = "";
  FL_16 : string = "";
  FL_17 : string = "";
  FL_18 : string = "";
  FL_19 : string = "";
  FL_20 : string = "";
  FL_21 : string = "";
  FL_22 : string = "";
  FL_23 : string = "";
  FL_24 : string = "";
  FL_25 : string = "";
  FL_26 : string = "";
  FL_27 : string = "";
  FL_28 : string = "";
  FL_29 : string = "";
  FL_30 : string = "";
  FL_31 : string = "";
  FL_32 : string = "";
  FL_33 : string = "";
  FL_34 : string = "";
  FL_35 : string = "";
  FL_36 : string = "";
  FL_37 : string = "";
  FL_38 : string = "";

  FLB_1 : string = "";
  FLB_2 : string = "";
  FLB_3 : string = "";
  FLB_4 : string = "";
  FLB_5 : string = "";
  FLB_6 : string = "";
  FLB_7 : string = "";
  FLB_8 : string = "";
  FLB_9 : string = "";

  mDetails : any = currentHolder.minordetail;

  AR_Form: any;
  id: any; 

  city: any;
  state: any;
  religion: any;
  race: any;

  bank: any;
  occupationCat: any;
  occupation: any;
  occupationSect: any;
  businessNature: any;
  monthlyIncome: any;
  companyName: any;

  constructor(private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private serviceService : ServiceService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);

    this.noAhli = currentHolder.unitholderid;
    this.namaAhli = currentHolder.firstname;

    if(currentHolder.totalminoraccount != "0"){
      this.UDBijak_Visible = true;
    }
    else{
      this.UDBijak_Visible = false;
    }

    this.id = setInterval(() => {
      this.DetectMyKad();
    }, 1000);


    

    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Started Update Details.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Set 1 second interval to detect MyKad.");
  }

  ngOnDestroy() {
    clearInterval(this.id);
    deleteKeyboard();
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        let kActivit = new kActivity();
        kActivit.trxno = "";
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 0;
        kActivit.submoduleID = undefined;
        kActivit.action = "User Removed Identification Card.";
        kActivit.startTime = new Date();
        kActivit.endTime = new Date();
        kActivit.status = false;

        appFunc.kioskActivity.push(kActivit);
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  

  updateDetails1Cancel(){
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Update Details Canceled.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);
    this._router.navigate(['feedbackscreen']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Redirect to Feedback Screen.");
  }

  updateDetails1MainMenu(){
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Redirect To Transaction Menu.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);
    this._router.navigate(['transactionmenu']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Redirect to Transaction Menu.");
  }

  UpdateMainAccount(){
    this.isMain = true;
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Selected Main Account to Update";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    this.initializeForm("major");
    this.UD1_Visible = false;
    this.UDForm_Visible = true;
    setTimeout(() => {
      loadKeyboard();
    }, 2000);

    appFunc.kioskActivity.push(kActivit);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Selected Update Main Account.");
  }

  UpdateMinor(selectedMinorDetails: any) {
    this.isMain = false;
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Selected Bijak Account to Update";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);


    const body = {
      "CHANNELTYPE": "IB",
      "REQUESTORIDENTIFICATION": "RHBNOW",
      "DEVICEOWNER": "RHB",
      "UNITHOLDERID": "",
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE": "W",
      "IDENTIFICATIONNUMBER": "060915101139",
      "FUNDID": "",
      "INQUIRYCODE": "5",
      "TRANSACTIONDATE": "23/12/2019",
      "TRANSACTIONTIME": "15:43:10",
      "BANKTXNREFERENCENUMBER": "20191003001325",
      "BANKCUSTPHONENUMBER": "60173518221",
      "FILTRATIONFLAG": "",
      "GUARDIANID": "",
      "GUARDIANICTYPE": "W",
      "GUARDIANICNUMBER": "751219135506"
      };

     this.serviceService.getAccountInquiry(body)
     .subscribe((result: any) => {
        let kActivit1 = new kActivity();
        kActivit1.trxno = "";
        kActivit1.kioskCode = signalrConnection.kioskCode;
        kActivit1.moduleID = 0;
        kActivit1.submoduleID = undefined;
        kActivit1.action = "Binding Bijak Holder Details.";
        kActivit1.startTime = new Date();
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

        kActivit1.endTime = new Date();
        kActivit1.status = true;


        if (currentBijakHolder.transactionstatus.toLowerCase().includes('successful')){
        
          if (!currentBijakHolder.typeclosed.toLowerCase().includes('n')){
            errorCodes.Ecode = "0168";
            errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
            this._router.navigate(['errorscreen']);
          }
          else{

            if(currentBijakHolder.unitholderid != "" || currentBijakHolder.unitholderid != undefined){
              
              let kActivit2 = new kActivity();
              kActivit2.trxno = "";
              kActivit2.kioskCode = signalrConnection.kioskCode;
              kActivit2.moduleID = 0;
              kActivit2.submoduleID = undefined;
              kActivit2.action = "Bijak Unit Holder Exists.";
              kActivit2.startTime = new Date();
              kActivit2.endTime = new Date();
              kActivit2.status = true;

              appFunc.kioskActivity.push(kActivit2);
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update CIF]" + ": " + "Bijak Account Found.");

              
              this.initializeForm("minor");
              this.UD1_Visible = false;
              this.UDBForm_Visible = true;
              setTimeout(() => {
                loadKeyboard();
              }, 2000);
              appFunc.kioskActivity.push(kActivit1);
            }
          }

          
        }
        else{
          if (currentBijakHolder.rejectreason.includes('not exists')){
            console.log("Reached Here A");
            let kActivit1 = new kActivity();
            kActivit1.trxno = "";
            kActivit1.kioskCode = signalrConnection.kioskCode;
            kActivit1.moduleID = 0;
            kActivit1.submoduleID = undefined;
            kActivit1.action = "Bijak Unit Holder Doesn't Exist.";
            kActivit1.startTime = new Date();
            kActivit1.endTime = new Date();
            kActivit1.status = true;

            appFunc.kioskActivity.push(kActivit1);
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update CIF]" + ": " + "No Bijak account found.");

            errorCodes.Ecode = currentBijakHolder.rejectcode;
            errorCodes.Emessage = currentBijakHolder.rejectreason;
            this._router.navigate(['errorscreen']);
          }
          else{
            errorCodes.Ecode = currentBijakHolder.rejectcode;
            errorCodes.Emessage = currentBijakHolder.rejectreason;
            this._router.navigate(['errorscreen']);
          }
        }

        
     });

     signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + `Selected Minor Account Balance. ${currentBijakHolder.firstname}, ${currentBijakHolder.identificationnumber}, ${currentBijakHolder.unitholderid}`);
  }

  noEmailCheck() {
    if (this.AR_Form.controls.noemail.value == false){
      this.AR_Form.controls.email.reset();
      this.AR_Form.controls.email.disable();
      this.AR_Form.controls.deliverystate.setValue('ST');
      this.AR_Form.controls.deliverystate.disable();
      if (this.email_Warning == true) this.email_Warning = false;
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Checked No Email.");
    }
    else{
      this.AR_Form.controls.email.enable();
      this.AR_Form.controls.deliverystate.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Unchecked No Email.");
    }
  }


  noTelephoneCheck() {
    if (this.AR_Form.controls.notelephone.value == false){
      this.AR_Form.controls.telephone.reset();
      this.AR_Form.controls.telephone.disable();
      if (this.telephone_Warning == true) this.telephone_Warning = false;
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Checked No Telephone.");
    }
    else{
      this.AR_Form.controls.telephone.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Unchecked No Telephone.");
    }
  }

  myKadAddress() {
    if (this.AR_Form.controls.mykadaddress.value == false){
      if (this.address1_Warning == true) this.address1_Warning = false;
      if (this.address2_Warning == true) this.address2_Warning = false;
      if (this.postcode_Warning == true) this.postcode_Warning = false;



      this.AR_Form.controls.address1.setValue(currentMyKadDetails.Address1 + currentMyKadDetails.Address2);
      this.AR_Form.controls.address2.setValue(currentMyKadDetails.Address3);
      this.AR_Form.controls.postcode.setValue(currentMyKadDetails.PostCode);
      this.AR_Form.controls.city.setValue(this.city);
      this.AR_Form.controls.state.setValue(this.state);


      this.AR_Form.controls.address1.disable();
      this.AR_Form.controls.address2.disable();
      this.AR_Form.controls.postcode.disable();
      this.AR_Form.controls.city.disable();
      this.AR_Form.controls.state.disable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Checked MyKad Address.");
    }
    else{
      this.AR_Form.controls.address1.reset();
      this.AR_Form.controls.address2.reset();
      this.AR_Form.controls.postcode.reset();

      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Unhecked MyKad Address.");
    }
  }


  majorUpdateBack(){
    let kActivit1 = new kActivity();
    kActivit1.trxno = "";
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = 0;
    kActivit1.submoduleID = undefined;
    kActivit1.action = "Update Major Back.";
    kActivit1.startTime = new Date();
    kActivit1.endTime = new Date();
    kActivit1.status = false;

    this.UDForm_Visible = false;
    this.UD1_Visible = true;

    appFunc.kioskActivity.push(kActivit1);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Back.");
  }

  majorUpdateCancel(){
    let kActivit1 = new kActivity();
    kActivit1.trxno = "";
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = 0;
    kActivit1.submoduleID = undefined;
    kActivit1.action = "Update Major Canceled.";
    kActivit1.startTime = new Date();
    kActivit1.endTime = new Date();
    kActivit1.status = false;

    this._router.navigate(['feedbackscreen']);

    appFunc.kioskActivity.push(kActivit1);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Cancel.");
  }

  ConfirmNo(){
    this.UDConfirm_Visible = false;
  }

  ConfirmYes(){
    if(this.isMain){
      let kActivit = new kActivity();
      kActivit.trxno = "";
      kActivit.kioskCode = signalrConnection.kioskCode;
      kActivit.moduleID = 0;
      kActivit.submoduleID = undefined;
      kActivit.action = "Started Update Account.";
      kActivit.startTime = new Date();
      kActivit.endTime = new Date();
      kActivit.status = true;

      appFunc.kioskActivity.push(kActivit);

      this.AR_Form.controls.fullname.enable();
      this.AR_Form.controls.identificationcardno.enable();
      this.AR_Form.controls.dob.enable();
      this.AR_Form.controls.race.enable();
      this.AR_Form.controls.religion.enable();
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      console.log(this.AR_Form.value);


      //currentMyKadDetails.ICNo = "521030135180";
      const body = {
        "CHANNELTYPE":"ASNB KIOSK",
        "REQUESTORIDENTIFICATION":"TESTFDSSERVER",
        "DEVICEOWNER":"ASNB",
        "UNITHOLDERID":"",
        "FIRSTNAME": currentMyKadDetails.Name,
        "IDENTIFICATIONTYPE":"W",
        "IDENTIFICATIONNUMBER":currentMyKadDetails.ICNo,
        "AGENTCODE":"ASNB",
        "BRANCHCODE":"ASNBHQ001",
        "UHCATEGORY":"",
        "RACE": this.AR_Form.controls.race.value,
        "CELLPHONENUMBER": this.AR_Form.controls.telephone.value,
        "TELEPHONE1": this.AR_Form.controls.homenumber.value,
        "ADDRESSLINE1": this.AR_Form.controls.address1.value,
        "ADDRESSLINE2":this.AR_Form.controls.address2.value,
        "ADDRESSLINE3":this.AR_Form.controls.city.value,
        "ADDRESSLINE4":this.AR_Form.controls.state.value,
        "OTHERINFO10":"",
        "ZIPCODE": this.AR_Form.controls.postcode.value,
        "DATEOFBIRTH": formatDate(currentMyKadDetails.DOB, 'dd/MM/yyyy', 'en'),
        "SEX": currentMyKadDetails.Gender.substring(0, 1),
        "OCCUPATION":this.AR_Form.controls.jobname.value,             //
        "EMAIL":this.AR_Form.controls.email.value,
        "FATHER_SPOUSENAME":"",
        "OTHERINFO8":this.AR_Form.controls.monthlyincome.value,
        "OCCUPATIONSECTOR":this.AR_Form.controls.jobsector.value,
        "OCCUPATIONCATEGORY":this.AR_Form.controls.jobcategory.value,
        "NATUREOFBUSINESS":this.AR_Form.controls.natureofjob.value,
        "COMPANYNAME":this.AR_Form.controls.companyname.value,
        "TITLE":this.AR_Form.controls.salutation.value,
        "RELIGION":this.AR_Form.controls.religion.value,
        "GUARDIANID":"",
        "FATCA":this.AR_Form.controls.fatca.value,
        "CRS":this.AR_Form.controls.crs.value,
        "PEP":this.AR_Form.controls.pep.value,
        "PARTICIPATEINASNBMKT":this.AR_Form.controls.news.value,
        "BANKCODE":this.AR_Form.controls.bankname.value,
        "BANKACCOUNTNUMBER":this.AR_Form.controls.bankaccount.value,
        "RELATIONSHIP":"",
        "PREFERREDMAILMODE":this.AR_Form.controls.deliverystate.value
      }

      this.serviceService.updateDetails(body).subscribe((data: any) => {
        console.log(data);
        if(data.result.transactionstatus.toLowerCase().includes('reject')){
          errorCodes.Ecode = data.result.rejectcode;
          errorCodes.Emessage = data.result.rejectreason;
          this._router.navigate(['errorscreen']);
        }else{
          if (this.AR_Form.controls.email.value == ""){
            this.Email_Visible = false;
          }
          else{
            this.Email_Visible = true;
          }
  
          this.UDForm_Visible = false;
          this.UDSuccess_Visible = true;
        }
      });

      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update CIF]" + ": " + "Submitted Update Account Form.");
    
    }else{
      let kActivit = new kActivity();
      kActivit.trxno = "";
      kActivit.kioskCode = signalrConnection.kioskCode;
      kActivit.moduleID = 0;
      kActivit.submoduleID = undefined;
      kActivit.action = "Started Update Bijak.";
      kActivit.startTime = new Date();
      kActivit.endTime = new Date();
      kActivit.status = true;

      appFunc.kioskActivity.push(kActivit);

      this.AR_Form.controls.fullname.enable();
      this.AR_Form.controls.identificationcardno.enable();
      this.AR_Form.controls.dob.enable();
      this.AR_Form.controls.race.enable();
      this.AR_Form.controls.religion.enable();
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();


      console.log(this.AR_Form.value);

      const body = {
        "CHANNELTYPE":"ASNB KIOSK",
        "REQUESTORIDENTIFICATION":"TESTFDSSERVER",
        "DEVICEOWNER":"ASNB",
        "UNITHOLDERID":"",
        "FIRSTNAME": currentMyKidDetails.Name,
        "IDENTIFICATIONTYPE":"W",
        "IDENTIFICATIONNUMBER":currentMyKidDetails.ICNo,
        "AGENTCODE":"ASNB",
        "BRANCHCODE":"ASNBHQ001",
        "UHCATEGORY":"",
        "RACE": this.AR_Form.controls.race.value,
        "CELLPHONENUMBER": this.AR_Form.controls.telephone.value,
        "TELEPHONE1": this.AR_Form.controls.homenumber.value,
        "ADDRESSLINE1": this.AR_Form.controls.address1.value,
        "ADDRESSLINE2":this.AR_Form.controls.address2.value,
        "ADDRESSLINE3":this.AR_Form.controls.city.value,
        "ADDRESSLINE4":this.AR_Form.controls.state.value,
        "OTHERINFO10":"",
        "ZIPCODE": this.AR_Form.controls.postcode.value,
        "DATEOFBIRTH": formatDate(currentMyKidDetails.DOB, 'dd/MM/yyyy', 'en'),
        "SEX": currentMyKidDetails.Gender.substring(0, 1),
        "OCCUPATION":this.AR_Form.controls.jobname.value,             //
        "EMAIL":this.AR_Form.controls.email.value,
        "FATHER_SPOUSENAME":"",
        "OTHERINFO8":this.AR_Form.controls.monthlyincome.value,
        "OCCUPATIONSECTOR":this.AR_Form.controls.jobsector.value,
        "OCCUPATIONCATEGORY":this.AR_Form.controls.jobcategory.value,
        "NATUREOFBUSINESS":this.AR_Form.controls.natureofjob.value,
        "COMPANYNAME":this.AR_Form.controls.companyname.value,
        "TITLE":this.AR_Form.controls.salutation.value,
        "RELIGION":this.AR_Form.controls.religion.value,
        "GUARDIANID": currentHolder.unitholderid,
        "FATCA":this.AR_Form.controls.fatca.value,
        "CRS":this.AR_Form.controls.crs.value,
        "PEP":this.AR_Form.controls.pep.value,
        "PARTICIPATEINASNBMKT":this.AR_Form.controls.news.value,
        "BANKCODE":this.AR_Form.controls.bankname.value,
        "BANKACCOUNTNUMBER":this.AR_Form.controls.bankaccount.value,
        "RELATIONSHIP":this.AR_Form.controls.g_relation.value,
        "PREFERREDMAILMODE":this.AR_Form.controls.deliverystate.value
      }

      this.serviceService.updateDetails(body).subscribe((data: any) => {
        console.log(data);
        if(data.result.transactionstatus.toLowerCase().includes('reject')){
          errorCodes.Ecode = data.result.rejectcode;
          errorCodes.Emessage = data.result.rejectreason;
          this._router.navigate(['errorscreen']);
        }else{
          if (this.AR_Form.controls.email.value == ""){
            this.Email_Visible = false;
          }
          else{
            this.Email_Visible = true;
          }
  
          this.UDForm_Visible = false;
          this.UDSuccess_Visible = true;
        }
      });

      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Submitted Bijak Registration Form.");
    
    }
  }

  majorUpdateNext(){
    let a1 = this.AR_Form.get('address1').value;
    let a2 = this.AR_Form.get('address2').value;
    let postcode = this.AR_Form.get('postcode').value;
    let city = this.AR_Form.get('city').value;
    let state = this.AR_Form.get('state').value;

    this.AR_Form.controls.address1.setValue(this.add1?.nativeElement.value);
    this.AR_Form.controls.address2.setValue(this.add2?.nativeElement.value);
    this.AR_Form.controls.postcode.setValue(this.postcode?.nativeElement.value);
    this.AR_Form.controls.homenumber.setValue(this.homeno?.nativeElement.value);
    this.AR_Form.controls.telephone.setValue(this.phoneno?.nativeElement.value);
    this.AR_Form.controls.email.setValue(this.email?.nativeElement.value);
    this.AR_Form.controls.bankaccount.setValue(this.bankno?.nativeElement.value);
    this.AR_Form.controls.companyname.setValue(this.compname?.nativeElement.value);

    this.address1_Warning = false;
    this.address2_Warning = false;
    this.postcode_Warning = false;

    this.telephone_Warning = false;
    this.email_Warning = false;
    this.email_Warning1 = false;
    this.bank_Warning = false;
    this.bankNo_Warning = false;
    this.companyName_Warning = false;

    this.MI_Warning = false;
    this.JS_Warning = false;
    this.NOJ_Warning = false;
    this.JN_Warning = false;
    this.JC_Warning = false;

    this.AR_Form.controls.address1.setValue(a1);
    this.AR_Form.controls.address2.setValue(a2);
    this.AR_Form.controls.postcode.setValue(postcode);
    this.AR_Form.controls.city.setValue(city);
    this.AR_Form.controls.state.setValue(state);


    let x = 0
    Object.keys(this.AR_Form.controls).forEach(key => {
      if(this.AR_Form.controls[key].hasError('required')){
        x += 1
        if(key.includes('telephone')){
          this.telephone_Warning = true;
        }
        else if(key.includes('email')){
          this.email_Warning = true;
        }
        else if(key.includes('bankaccount')){
          this.bankNo_Warning = true;
        }
        else if(key.includes('companyname')){
          this.companyName_Warning = true;
        }

        else if(key.includes('address1')){
          if (this.AR_Form.controls.mykadaddress.value == false) this.address1_Warning = true;
        }
        else if(key.includes('address2')){
          if (this.AR_Form.controls.mykadaddress.value == false) this.address2_Warning = true;
        }
        else if(key.includes('postcode')){
          if (this.AR_Form.controls.mykadaddress.value == false) this.postcode_Warning = true;
        }
      }
      else if (this.AR_Form.controls[key].hasError('pattern')){
        if(key.includes('email')){
          this.email_Warning1 = true;
        }
      }
      else {
        if(key.includes('bankname') && (this.AR_Form.controls.bankname.value == '')){
          this.bank_Warning = true;
        }
        else if(key.includes('jobcategory') && (this.AR_Form.controls.bankname.value == '')){
          this.JC_Warning = true;
        }
        else if(key.includes('jobname') && (this.AR_Form.controls.bankname.value == '')){
          this.JN_Warning = true;
        }
        else if(key.includes('natureofjob') && (this.AR_Form.controls.bankname.value == '')){
          this.NOJ_Warning = true;
        }
        else if(key.includes('jobsector') && (this.AR_Form.controls.bankname.value == '')){
          this.JS_Warning = true;
        }
        else if(key.includes('monthlyincome') && (this.AR_Form.controls.bankname.value == '')){
          this.MI_Warning = true;
        }
      }
    })
    if (x > 0){
      console.log("Error");
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.UDConfirm_Visible = true;

      let kActivit1 = new kActivity();
      kActivit1.trxno = "";
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = 0;
      kActivit1.submoduleID = undefined;
      kActivit1.action = "Update Major Submit.";
      kActivit1.startTime = new Date();
      kActivit1.endTime = new Date();
      kActivit1.status = true;

      appFunc.kioskActivity.push(kActivit1);
      this.AR_Form.controls.fullname.enable();
      this.AR_Form.controls.identificationcardno.enable();
      this.AR_Form.controls.dob.enable();
      this.AR_Form.controls.race.enable();
      this.AR_Form.controls.religion.enable();
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      //console.log(this.AR_Form.value);

      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Submit.");
    }
  }

  bijakUpdateBack() {
    let kActivit1 = new kActivity();
    kActivit1.trxno = "";
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = 0;
    kActivit1.submoduleID = undefined;
    kActivit1.action = "Update Bijak Back.";
    kActivit1.startTime = new Date();
    kActivit1.endTime = new Date();
    kActivit1.status = false;

    this.UDBForm_Visible = false;
    this.UD1_Visible = true;

    appFunc.kioskActivity.push(kActivit1);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Cancel.");
  }

  bijakUpdateCancel(){
    let kActivit1 = new kActivity();
    kActivit1.trxno = "";
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = 0;
    kActivit1.submoduleID = undefined;
    kActivit1.action = "Update Bijak Canceled.";
    kActivit1.startTime = new Date();
    kActivit1.endTime = new Date();
    kActivit1.status = false;

    this._router.navigate(['feedbackscreen']);

    appFunc.kioskActivity.push(kActivit1);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Cancel.");
  }
  
  bijakUpdateNext(){
    let x = 0
    Object.keys(this.AR_Form.controls).forEach(key => {
      if(this.AR_Form.controls[key].hasError('required')){
        x += 1;
      }
    })
    if (x > 0){
      console.log("Error");
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + `Bijak Form: ${x} field(s) empty.`);
    }
    else{
      this.UDConfirm_Visible = true;

      let kActivit1 = new kActivity();
      kActivit1.trxno = "";
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = 0;
      kActivit1.submoduleID = undefined;
      kActivit1.action = "Update Bijak Submit.";
      kActivit1.startTime = new Date();
      kActivit1.endTime = new Date();
      kActivit1.status = true;

      appFunc.kioskActivity.push(kActivit1);
      this.AR_Form.controls.fullname.enable();
      this.AR_Form.controls.identificationcardno.enable();
      this.AR_Form.controls.dob.enable();
      this.AR_Form.controls.race.enable();
      this.AR_Form.controls.religion.enable();
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      console.log(this.AR_Form.value);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Submit.");
    }
  }

  initializeForm(acctType: string)  {
    if (acctType == 'major'){
      this.AR_Form = this.fb.group(
        {
          salutation: ['EN'],
          fullname: [{value: currentHolder.firstname, disabled: true}],
          identificationcardno: [{value: currentHolder.identificationnumber, disabled: true}],
          dob: [{value: formatDate(currentHolder.dateofbirth, 'dd MMM yyyy', 'en'), disabled: true}],
          race: [{value: this.race, disabled: true}],
          religion: [{value: this.religion, disabled: true}],

          address1 : [{value: currentHolder.addresslinE1, disabled: true}, Validators.required],
          address2 : [{value: currentHolder.addresslinE2, disabled: true}, Validators.required],
          postcode : [{value: currentHolder.zipcode, disabled: true}, Validators.required],
          city : [{value: currentHolder.addresslinE3, disabled: true}],
          state : [{value: currentHolder.addresslinE4, disabled: true}],
          mykadaddress: [{value: true, disabled: true}],

          homenumber : [currentHolder.telephonE1],
          telephone: [currentHolder.cellphonenumber , Validators.required],
          notelephone: [false],

          email: [currentHolder.email, [
            Validators.required,
            Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          noemail: [false],
          deliverystate: [currentHolder.preferredmailmode],

          bankname: [currentHolder.bankcode],
          bankaccount: [currentHolder.accountnumber, Validators.required],

          jobcategory: [currentHolder.occupationcategory],
          jobname: [currentHolder.occupation],
          natureofjob: [currentHolder.natureofbusiness],
          jobsector: [currentHolder.occupationsector],
          monthlyincome: [currentHolder.otherinfO8],
          companyname: [currentHolder.companyname, Validators.required],

          fatca: [{value: currentHolder.fatca, disabled: true}],
          pep: [{value: currentHolder.pep, disabled: true}],
          news: [{value: currentHolder.participateinasnbmkt, disabled: true}],
          crs: [{value: currentHolder.crs, disabled: true}],
        });
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Initialized Major Form")
    }
    else if (acctType == 'minor'){
      this.AR_Form = this.fb.group(
        {
          salutation: [currentBijakHolder.title],
          fullname: [{value: currentBijakHolder.firstname, disabled: true}],
          identificationcardno: [{value: currentBijakHolder.identificationnumber, disabled: true}],
          dob: [{value: formatDate(currentBijakHolder.dateofbirth, 'dd MMM yyyy', 'en'), disabled: true}],
          race: [{value: currentBijakHolder.race, disabled: true}],
          religion: [{value: currentBijakHolder.religion, disabled: true}],

          g_memberid: [{value: currentHolder.unitholderid, disabled: true}],
          g_salution: [currentHolder.title],
          g_fullname: [{value: currentHolder.firstname, disabled: true}],
          g_identificationnumber: [{value: currentHolder.identificationnumber, disabled: true}],
          g_dob: [{value: formatDate(currentHolder.dateofbirth, 'dd MMM yyyy', 'en'), disabled: true}],
          g_race: [{value: currentHolder.race, disabled: true}],
          g_religion: [{value: currentHolder.religion, disabled: true}],
          g_relation: [{value: currentBijakHolder.relationship, disabled: false}],

          address1 : [{value: currentBijakHolder.addresslinE1, disabled: true}],
          address2 : [{value: currentBijakHolder.addresslinE2, disabled: true}],
          postcode : [{value: currentBijakHolder.zipcode, disabled: true}],
          city : [{value: currentBijakHolder.addresslinE3, disabled: true}],
          state : [{value: currentBijakHolder.addresslinE4, disabled: true}],
          mykadaddress: [{value: true, disabled: true}],

          homenumber : [{value: currentBijakHolder.telephonE1, disabled: true}],
          telephone: [currentBijakHolder.cellphonenumber, Validators.required],
          notelephone: [false],

          email: [currentBijakHolder.email, [
            Validators.required,
            Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          noemail: [false],
          deliverystate: [currentBijakHolder.preferredmailmode],

          bankname: [{value: currentBijakHolder.bankcode, disabled: true}],
          bankaccount: [{value: currentBijakHolder.accountnumber, disabled: true}],

          jobcategory: [{value: currentBijakHolder.occupationcategory, disabled: true}],
          jobname: [{value: currentBijakHolder.occupation, disabled: true}],
          natureofjob: [{value: currentBijakHolder.natureofbusiness, disabled: true}],
          jobsector: [{value: currentBijakHolder.occupationsector, disabled: true}],
          monthlyincome: [{value: currentBijakHolder.otherinfO8, disabled: true}],
          companyname: [{value: currentBijakHolder.companyname, disabled: true}],

          fatca: [{value: currentBijakHolder.fatca, disabled: true}],
          pep: [{value: currentBijakHolder.pep, disabled: true}],
          news: [{value: currentBijakHolder.participateinasnbmkt, disabled: true}],
          crs: [{value: currentBijakHolder.crs, disabled: true}],
        });
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Initialized Bijak Form")
    }
    
  }  


  Print(){
    this.UDSuccess_Visible = false;
    this.UD_Print1Visible = true;

    let name = "";
    let accountNo = "";
    let accountType = "";
    
    if (this.isMain){
      name = currentMyKadDetails.Name;
      accountNo = currentHolder.unitholderid;
      accountType = "Self";
    }else{
      name = currentMyKidDetails.Name;
      accountNo = currentBijakHolder.unitholderid;
      accountType = "Bijak";
    }


    const body = {
      "Transaksi": "Pendaftaran Akaun/Account Registration",
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'h:MM:ss a', 'en'),
      "Lokasi": "KL MAIN 01",
      "Name": name,
      "NoAkaun": accountNo,
      "JenisAkaun": accountType
    }

    //GetNonFinancialTransactionPrintout

    signalrConnection.connection.invoke('PrintHelpPageAsync', body, "GetNonFinancialTransactionPrintout").then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          this.UD_Print1Visible = false;
          this.UD_Print2Visible = true;
          setTimeout(()=>{   
            this._router.navigate(['transactionsuccessful']);
          }, 3000);
        }else{
          errorCodes.Ecode = "0068";
          errorCodes.Emessage = "Printing Failed";
          this._router.navigate(['errorscreen']);
        }
      }, 3000);
    });
  }

  Email(){
    this.UDSuccess_Visible = false;
    this.UD_EmailVisible = true;

    let name = "";
    let accountNo = "";
    let accountType = "";
    
    if (this.isMain){
      name = currentMyKadDetails.Name;
      accountNo = currentHolder.unitholderid;
      accountType = "Self";
    }else{
      name = currentMyKidDetails.Name;
      accountNo = currentBijakHolder.unitholderid;
      accountType = "Bijak";
    }

    const body = {
      "Transaksi": "Pendaftaran Akaun/Account Registration",
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'h:MM:ss a', 'en'),
      "Lokasi": "KL MAIN 01",
      "Name": name,
      "NoAkaun": accountNo,
      "JenisAkaun": accountType
    }

    signalrConnection.connection.invoke('EmailHelpPageAsync', body, accessToken.token, this.AR_Form.controls.email.value, "GetNonFinancialTransactionPrintout").then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          setTimeout(()=>{   
            this.UD_EmailVisible = false;
            this._router.navigate(['transactionsuccessful']);
          }, 3000);
        }else{
          errorCodes.Ecode = "0069";
          errorCodes.Emessage = "Email Failed";
          this._router.navigate(['errorscreen']);
        }
      }, 3000);
    });
  }

  

}
