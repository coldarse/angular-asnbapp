import { keyframes } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectLang } from '../_models/language';
import { signalrConnection } from 'src/app/_models/signalr';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { formatDate } from '@angular/common';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { appFunc } from '../_models/appFunctions';
import { ServiceService } from '../_shared/service.service';
import { Observable, forkJoin } from 'rxjs';
import { kActivity } from '../_models/kActivity';
import { SelectorContext } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { errorCodes } from '../_models/errorCode';
import { accessToken } from '../_models/apiToken';


declare const loadKeyboard: any;
declare const deleteKeyboard: any;

@Component({
  selector: 'app-accountregistration',
  templateUrl: './accountregistration.component.html',
  styleUrls: ['./accountregistration.component.css']
})
export class AccountregistrationComponent implements OnInit {


  @ViewChild('address1') add1 : ElementRef | undefined;
  @ViewChild('address2') add2 : ElementRef | undefined;
  @ViewChild('postcode') postcode : ElementRef | undefined;
  @ViewChild('homenumber') homeno : ElementRef | undefined;
  @ViewChild('telephone') phoneno : ElementRef | undefined;
  @ViewChild('email') email : ElementRef | undefined;
  @ViewChild('bankaccount') bankno : ElementRef | undefined;
  @ViewChild('companyname') compname : ElementRef | undefined;
  
  BTN_Cancel = "";
  BTN_Next = "";

  BTN_xAgree = "";
  BTN_Agree = "";

  BTN_Print = "";
  BTN_Email = "";

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

  defLang = selectLang.selectedLang;

  //Visible Page Elements
  ARForm_Visible = true;
  ARTNC_Visible = false;
  ARSuccess_Visible = false;

  ARPrint1_Visible = false;
  ARPrint2_Visible = false;
  AREmail_Visible = false;

  //Diabled Elements
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

  Email_Visible : boolean = true;

  //Page Elements Fixed Values from API and MyKad
  Header_Title = "";

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


  //Page Elements Translations
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

 

  ARTNC_1 = "";
  ARTNC_2 = "";
  ARTNC_3 = "";
  ARTNC_4 = "";
  ARTNC_5 = "";
  ARTNC_6 = "";
  ARTNC_7 = "";
  ARTNC_8 = "";
  ARTNC_9 = "";
  ARTNC_10 = "";
  ARTNC_11 = "";

  ARSuccess_1 = "";
  ARSuccess_2 = "";
  ARSuccess_3 = "";
  ARSuccess_4 = "";
  ARSuccess_5 = "";
  ARSuccess_6 = "";
  ARSuccess_7 = "";
  ARSuccess_8 = "";
  ARSuccess_9 = "";
  ARSuccess_10 = "";

  ARPrint1_1 = "";
  ARPrint1_2 = "";
  ARPrint2_1 = "";
  AREmail_1 = "";
  AREmail_2 = "";


  AR_Form: any;
  id:any;

  city: any;
  state: any;
  religion: any;
  race: any;

  constructor(private elementRef: ElementRef,
    private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private serviceService : ServiceService) {
     
      this.initializeForm();
      
    }

  initializeForm()  {
    this.city = currentMyKadDetails.City;
    for(var x of this.form_cities){
      if (x.name.toLowerCase().includes(this.city.toLowerCase())){
        this.city = x.name;
        break;
      }else{
        this.city = currentMyKadDetails.City;
      }
    }
    this.state = currentMyKadDetails.State;
    for(var y of this.form_states){
      if (y.text.toLowerCase().includes(this.state.toLowerCase())){
        this.state = y.value;
        break;
      }else{
        this.state = currentMyKadDetails.State;
      }
    }
    this.religion = currentMyKadDetails.Religion;
    if(this.religion.toLowerCase().includes('islam')){
      this.religion = "M"
    }
    else{
      this.religion = "N"
    }
    this.race = currentMyKadDetails.Race;
    for(var y of this.form_races){
      if (y.textBM.toLowerCase().includes(this.race.toLowerCase())){
        this.race = y.value;
        break;
      }else{
        this.race = currentMyKadDetails.Race;
      }
    }
    this.AR_Form = this.fb.group(
      {
        salutation: ['EN'],
        fullname: [{value: currentMyKadDetails.Name, disabled: true}],
        identificationcardno: [{value: currentMyKadDetails.ICNo, disabled: true}],
        dob: [{value: formatDate(currentMyKadDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
        race: [{value: this.race, disabled: true}],
        religion: [{value: this.religion, disabled: true}],

        address1 : [{value: currentMyKadDetails.Address1 + ", " + currentMyKadDetails.Address2, disabled: true}, Validators.required],
        address2 : [{value: currentMyKadDetails.Address3, disabled: true}, Validators.required],
        postcode : [{value: currentMyKadDetails.PostCode, disabled: true}, Validators.required],
        city : [{value: currentMyKadDetails.City, disabled: true}],
        state : [{value: this.state, disabled: true}],
        mykadaddress: [true],

        homenumber : [''],
        telephone: ['', Validators.required],
        notelephone: [false],

        email: ['', [
          Validators.required,
          Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        noemail: [false],
        deliverystate: [''],

        bankname: [''],
        bankaccount: ['', Validators.required],

        jobcategory: [''],
        jobname: [''],
        natureofjob: [''],
        jobsector: [''],
        monthlyincome: ['7'],
        companyname: ['', Validators.required],

        fatca: ['N'],
        pep: ['N'],
        news: ['Y'],
        crs: ['N'],
    });
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Initialized Form.");
  }  

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Set translation page to selected language.");
    
    this.id = setInterval(() => {
      this.DetectMyKad();
    }, 1000);

    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Started Account Registration.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Set 1 second interval to detect MyKad.");
  }

  ngAfterViewInit(){
    try{
      loadKeyboard();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "After form is loaded, initialized keyboard");
    }catch(e){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Error initializing keyboard." + e.toString());
    }
  }


  ngOnDestroy() {
    try{
      clearInterval(this.id);
      deleteKeyboard();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Cleared Interval and removed keyboard.");
    }catch(e){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Error clearing interval and/or removing keyboard." + e.toString());
    }
    
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
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  usekeyboardinput(event: any) {
    console.log(event);
  }

  get primAddress1(){
    return this.AR_Form.get('address1');
  }

  get primAddress2(){
    return this.AR_Form.get('address2');
  }

  get primPostcode(){
    return this.AR_Form.get('postcode');
  }

  get primTelephone(){
    return this.AR_Form.get('telephone');
  }

  get primEmail(){
    return this.AR_Form.get('email');
  }

  get primBankNo(){
    return this.AR_Form.get('bankaccount');
  }

  get primCompName(){
    return this.AR_Form.get('companyname');
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

  TNCAgree(){
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Started Account Registration.";
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

    this.serviceService.postAccountRegistration(body).subscribe((data: any) => {
      console.log(data);
      if(data.result.transactionstatus.toLowerCase().includes('reject')){
        errorCodes.Ecode = data.result.rejectcode;
        errorCodes.Emessage = data.result.rejectreason;
        this._router.navigate(['errorscreen']);
      }else{
        this.ARSuccess_4 = currentMyKadDetails.Name;
        this.ARSuccess_6 = data.result.unitholderid;
        this.ARSuccess_8 = formatDate(new Date(), 'dd/MM/yyyy', 'en');
        this.ARSuccess_10 = "Sendiri/Self";
      }
      this.ARTNC_Visible = false;

      if (this.AR_Form.controls.email.value == ""){
        this.Email_Visible = false;
      }
      else{
        this.Email_Visible = true;
      }

      this.ARSuccess_Visible = true;

    });

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Submitted Account Registration Form.");
  
  }

  Print(){
    this.ARSuccess_Visible = false;
    this.ARPrint1_Visible = true;

    const body = {
      "Transaksi": "Pendaftaran Akaun/Account Registration",
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'h:MM:ss a', 'en'),
      "Lokasi": "KL MAIN 01",
      "Name": currentMyKadDetails.Name,
      "NoAkaun": this.ARSuccess_6,
      "JenisAkaun": this.ARSuccess_10
    }

    //GetNonFinancialTransactionPrintout

    signalrConnection.connection.invoke('PrintHelpPageAsync', body, "GetNonFinancialTransactionPrintout").then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          this.ARPrint1_Visible = false;
          this.ARPrint2_Visible = true;
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
    this.ARSuccess_Visible = false;
    this.AREmail_Visible = true;

    const body = {
      "Transaksi": "Pendaftaran Akaun/Account Registration",
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'h:MM:ss a', 'en'),
      "Lokasi": "KL MAIN 01",
      "Name": currentMyKadDetails.Name,
      "NoAkaun": this.ARSuccess_6,
      "JenisAkaun": this.ARSuccess_10
    }

    signalrConnection.connection.invoke('EmailHelpPageAsync', body, accessToken.token, this.AR_Form.controls.email.value, "GetNonFinancialTransactionPrintout").then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          setTimeout(()=>{   
            this.AREmail_Visible = false;
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

  TNCDisgree(){
    this.ARForm_Visible = true;
    this.ARTNC_Visible = false;
  }

  registrationNext() {
    
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
      this.ARForm_Visible = false;
      this.ARTNC_Visible = true;
    }
  }

  filterJobCategory(category: any) {
    this.enableJob();

    let code = category.target.value;

    if (code.includes('EM')){
      this.AR_Form.controls.natureofjob.disable();
    }
    else if (code.includes('SE')){
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
    }
    else if (code.includes('HM')){
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
      this.AR_Form.controls.natureofjob.disable();
      this.AR_Form.controls.companyname.disable();
    }
    else if (code.includes('RY')){
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
      this.AR_Form.controls.natureofjob.disable();
      this.AR_Form.controls.companyname.disable();
    }
    else if (code.includes('UM')){
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.natureofjob.disable();
      this.AR_Form.controls.jobsector.disable();
      this.AR_Form.controls.monthlyincome.disable();
      this.AR_Form.controls.companyname.disable();
    }

  }

  enableJob() {
    this.AR_Form.controls.jobname.enable();
    this.AR_Form.controls.natureofjob.enable();
    this.AR_Form.controls.jobsector.enable();
    this.AR_Form.controls.monthlyincome.enable();
    this.AR_Form.controls.companyname.enable();
  }

  registrationCancel() {
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Cancel Registration";
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Canceled Account Registration.");
    this._router.navigate(['language']);
  
  }

  
  

}


