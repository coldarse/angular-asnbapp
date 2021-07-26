import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectLang } from '../_models/language';
import { signalrConnection } from 'src/app/_models/signalr';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { formatDate } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { appFunc } from '../_models/appFunctions';
import { ServiceService } from '../_shared/service.service';
import { kActivity } from '../_models/kActivity';
import { errorCodes } from '../_models/errorCode';
import { accessToken } from '../_models/apiToken';
import { currentHolder } from '../_models/currentUnitHolder';


declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

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
  
  pdfsrc = "assets/ASNB_MasterProspectus.pdf";
  pdfsrc1 = "assets/ASNB_MasterProspectus.pdf";
  ASNBProspectus = false;
  ASNBYuran = false;
  
  ASNBTnC = false;
  TNCpdfsrc = "assets/Terms_N_Condition.pdf";
  ASNBPolicy = false;
  Policypdfsrc = "assets/PrivacyPolicy.pdf";
  ASNBRegDeclaration = false;
  regpdfsrc = "assets/REGISTRATION_DECLARATION.pdf";
  ASNBAdditionalProspectus = false;
  additionalpdfsrc = "assets/Prospectus_ASN_IMBANG_3_GLOBAL.pdf";

  ispopup = false;
  transaction_Successful = false;


  BTN_Cancel = "";
  BTN_Next = "";

  BTN_xAgree = "";
  BTN_Agree = "";

  BTN_Print = "";
  BTN_Email = "";

  form_salutation : any = appFunc.titleSalutation;
  form_races : any = appFunc.races; 
  form_religion : any = appFunc.religion; 
  form_states : any = appFunc.states; 
  form_cities : any = appFunc.cities;
  form_preferredDelivery : any = appFunc.preferredDelivery;
  form_bankname : any = appFunc.bankName;
  form_occupationSector : any = appFunc.occupationSector;
  form_occupationName : any = appFunc.occupationName;
  form_occupationCatergory : any = appFunc.occupationCategory;
  form_businessnature : any = appFunc.businessNature;
  form_income : any = appFunc.monthlyIncome;

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
  telephone_Warning1 : boolean = false;
  homephone_Warning : boolean  = false;
  email_Warning : boolean = false;
  email_Warning1 : boolean = false;
  bank_Warning : boolean = false;
  bankNo_Warning : boolean = false;
  bankNo_Warning1 : boolean = false;
  companyName_Warning : boolean = false;

  MI_Warning : boolean = false;
  MI_Warning2 : boolean = false;
  JS_Warning : boolean = false;
  NOJ_Warning : boolean = false;
  JN_Warning : boolean = false;
  JC_Warning : boolean = false;

  Email_Visible = true;
  Print_Visible = true;

  ARPopUp1_Visible = false;

  TNCAgreed = true;

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

  transaction = "";

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
    this.state = currentMyKadDetails.State.toString().replace(" ", "");
    for(var y of this.form_states){
      if (y.text.toLowerCase().includes(this.state.toLowerCase())){
        this.state = y.value;
        break;
      }else{
        this.state = currentMyKadDetails.State.toString().replace(" ", "");
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
    let ismobile = false;
    if(signalrConnection.kioskType == 'Mobile'){
      ismobile = true;
    }

    let tempadd1 = "";
    let tempadd2 = "";
    if(currentMyKadDetails.Address3 == ""){
      tempadd1 = currentMyKadDetails.Address1;
      tempadd2 = currentMyKadDetails.Address2;
    }else{
      tempadd1 = currentMyKadDetails.Address1 + ", " + currentMyKadDetails.Address2;
      tempadd2 = currentMyKadDetails.Address3;
    }


    this.AR_Form = this.fb.group(
      {
        salutation: ['EN'],
        fullname: [{value: currentMyKadDetails.Name, disabled: true}],
        identificationcardno: [{value: currentMyKadDetails.ICNo, disabled: true}],
        dob: [{value: formatDate(currentMyKadDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
        race: [{value: this.race, disabled: true}],
        religion: [{value: this.religion, disabled: true}],

        address1 : [{value: tempadd1, disabled: true}, Validators.required],
        address2 : [{value: tempadd2, disabled: true}, Validators.required],
        postcode : [{value: currentMyKadDetails.PostCode, disabled: true}, Validators.required],
        city : [{value: currentMyKadDetails.City, disabled: true}],
        state : [{value: this.state, disabled: true}],
        mykadaddress: [true],

        homenumber : ['', Validators.minLength(5)],
        telephone: ['', [
          Validators.required,
          Validators.minLength(5)
        ]],
        notelephone: [false],

        email: ['', [
          Validators.required,
          Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        noemail: [{value: false, disabled: ismobile}],
        deliverystate: ['ST'],

        bankname: [''],
        bankaccount: ['', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(5)
        ]],

        jobcategory: ['NA'],
        jobname: ['NA'],
        natureofjob: ['NA'],
        jobsector: ['NA'],
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
    signalrConnection.isVerifyMyKad = true;
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Set translation page to selected language.");
    
    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }

    
    if(selectLang.selectedLang == 'ms'){
      this.ARSuccess_10 = "Dewasa";
      this.transaction = "Pendaftaran Akaun";
    }
    else{
      this.ARSuccess_10 = "Dewasa";
      this.transaction = "Account Registration";
    }
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
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  noEmailCheck() {
    if (this.AR_Form.controls.noemail.value == false){
      this.AR_Form.controls.email.setValue("NA");
      this.AR_Form.controls.email.disable();
      this.AR_Form.controls.deliverystate.setValue('ST');
      this.AR_Form.controls.deliverystate.disable();
      if (this.email_Warning == true) this.email_Warning = false;
      if (this.email_Warning1 == true) this.email_Warning1 = false;
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Checked No Email.");
    }
    else{
      this.AR_Form.controls.email.enable();
      this.AR_Form.controls.email.reset();
      this.AR_Form.controls.deliverystate.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Unchecked No Email.");
    }
  }


  noTelephoneCheck() {
    if (this.AR_Form.controls.notelephone.value == false){
      this.AR_Form.controls.telephone.setValue("NA");
      this.AR_Form.controls.telephone.disable();
      if (this.telephone_Warning == true) this.telephone_Warning = false;
      if (this.telephone_Warning1 == true) this.telephone_Warning1 = false;
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Checked No Telephone.");
    }
    else{
      this.AR_Form.controls.telephone.enable();
      this.AR_Form.controls.telephone.reset();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Unchecked No Telephone.");
    }
  }

  myKadAddress() {
    if (this.AR_Form.controls.mykadaddress.value == false){
      if (this.address1_Warning == true) this.address1_Warning = false;
      if (this.address2_Warning == true) this.address2_Warning = false;
      if (this.postcode_Warning == true) this.postcode_Warning = false;

      let tempadd1 = "";
      let tempadd2 = "";
      if(currentMyKadDetails.Address3 == ""){
        tempadd1 = currentMyKadDetails.Address1;
        tempadd2 = currentMyKadDetails.Address2;
      }else{
        tempadd1 = currentMyKadDetails.Address1 + ", " + currentMyKadDetails.Address2;
        tempadd2 = currentMyKadDetails.Address3;
      }


      this.AR_Form.controls.address1.setValue(tempadd1);
      this.AR_Form.controls.address2.setValue(tempadd2);
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
      this.AR_Form.controls.city.reset()
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
    kActivit.moduleID = 1;
    kActivit.submoduleID = undefined;
    kActivit.action = "Major Account Registration";
    kActivit.startTime = new Date();
    

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


    if(this.AR_Form.controls.homenumber.value == ""){
      this.AR_Form.controls.homenumber.value = 'NA';
    }

    //currentMyKadDetails.ICNo = "521030135180";
    const body = {
      "CHANNELTYPE":signalrConnection.channelType,
      "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
      "DEVICEOWNER":signalrConnection.deviceOwner,
      "UNITHOLDERID":"",
      "FIRSTNAME": currentMyKadDetails.Name,
      "IDENTIFICATIONTYPE":currentHolder.identificationtype,
      "IDENTIFICATIONNUMBER":currentMyKadDetails.ICNo,
      "AGENTCODE":signalrConnection.agentCode,
      "BRANCHCODE":signalrConnection.branchCode,
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
      "OCCUPATION":this.AR_Form.controls.jobname.value,             
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
      "PREFERREDMAILMODE":this.AR_Form.controls.deliverystate.value,
    }


    let withMinInvestment = false;
    for (var val of appFunc.modules){
      if(val.moduleName.toLowerCase().includes('financial')){
        if(val.enable == true){
          if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
            withMinInvestment = true;
          }else{
            withMinInvestment = false;
          }
        }
        else{
          withMinInvestment = false;
        }
      }
    }

    
    if (withMinInvestment){
      this.serviceService.postAccountRegistrationWithInvestment(body).subscribe((data: any) => {
        if(data.result.transactionstatus.toLowerCase().includes('successful')){
          this.ARSuccess_4 = currentMyKadDetails.Name;
          this.ARSuccess_6 = data.result.unitholderid;
          this.ARSuccess_8 = formatDate(new Date(), 'dd/MM/yyyy', 'en');
          kActivit.endTime = new Date();
          kActivit.status = true;
  
          appFunc.kioskActivity.push(kActivit);
  
          this.ARTNC_Visible = false;
  
          if (this.AR_Form.controls.email.value == ""){
            this.Email_Visible = false;
          }
          else{
            this.Email_Visible = true;
          }
  
          if(signalrConnection.kioskType == 'Mobile'){
            this.Print_Visible = false;
          }
          else{
            this.Print_Visible = true;
          }
  
          this.ARSuccess_Visible = true;
          this.ARPopUp1_Visible = true;
        }else{
          errorCodes.Ecode = data.result.rejectcode;
          errorCodes.Emessage = data.result.rejectreason;
          errorCodes.accountName = currentMyKadDetails.Name;
          errorCodes.accountNo = "";
          errorCodes.accountType = this.ARSuccess_10;
          errorCodes.transaction = this.transaction;

          this._router.navigate(['errorscreen']);
          kActivit.endTime = new Date();
          kActivit.status = false;
  
          appFunc.kioskActivity.push(kActivit);
        }
        
  
      });
    }
    else{
      this.serviceService.postAccountRegistration(body).subscribe((data: any) => {
        if(data.result.transactionstatus.toLowerCase().includes('successful')){
          this.ARSuccess_4 = currentMyKadDetails.Name;
          this.ARSuccess_6 = data.result.unitholderid;
          this.ARSuccess_8 = formatDate(new Date(), 'dd/MM/yyyy', 'en');
          if(selectLang.selectedLang == 'ms'){
            this.ARSuccess_10 = "Dewasa";
          }
          else{
            this.ARSuccess_10 = "Dewasa";
          }
          kActivit.endTime = new Date();
          kActivit.status = true;
  
          appFunc.kioskActivity.push(kActivit);
  
          this.ARTNC_Visible = false;
  
          if (this.AR_Form.controls.email.value == ""){
            this.Email_Visible = false;
          }
          else{
            this.Email_Visible = true;
          }
  
          if(signalrConnection.kioskType == 'Mobile'){
            this.Print_Visible = false;
          }
          else{
            this.Print_Visible = true;
          }
  
          this.ARSuccess_Visible = true;
          this.ARPopUp1_Visible = true;
        }else{
          errorCodes.Ecode = data.result.rejectcode;
          errorCodes.Emessage = data.result.rejectreason;
          errorCodes.accountName = currentMyKadDetails.Name;
          errorCodes.accountNo = "";
          errorCodes.accountType = this.ARSuccess_10;
          errorCodes.transaction = this.transaction;
          this._router.navigate(['errorscreen']);
          kActivit.endTime = new Date();
          kActivit.status = false;
  
          appFunc.kioskActivity.push(kActivit);
        }
        
  
      });
    }

    

    

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Submitted Account Registration Form.");
  
  }

  agreeTNC(){
    this.TNCAgreed = !this.TNCAgreed;
  }

  NextAdditionalProspectus(){
    this.ASNBAdditionalProspectus = false;
    this.ispopup = false;
  }

  ClickAdditionalProspectus(){
    this.ASNBAdditionalProspectus = true;
    this.ispopup = true;
  }

  NextProspectus(){
    this.ASNBProspectus = false;
    this.ispopup = false;
  }

  ClickNextRegDeclaration(){
    this.ASNBRegDeclaration = true;
    this.ispopup = true;
  }

  NextRegDeclaration(){
    this.ASNBRegDeclaration = false;
    this.ispopup = false;
  }

  ClickProspectus(){
    this.ASNBProspectus = true;
    this.ispopup = true;
  }

  NextYuran(){
    this.ASNBYuran = false;
    this.ispopup = false;
  }

  ClickYuran(){
    this.ASNBYuran = true;
    this.ispopup = true;
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


  Next(){
    this.ARPopUp1_Visible = false;
  }

  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }

  Print(){

    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if (data){
        this.ARSuccess_Visible = false;
        this.ARPrint1_Visible = true;

        let transaction = "";
        if(selectLang.selectedLang == 'en'){
          transaction = "Account Registration";
        }else{
          transaction = "Pendaftaran Akaun";
        }
    
        const body = {
          "Transaksi": transaction,
          "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Lokasi": signalrConnection.branchName,
          "Name": currentMyKadDetails.Name,
          "NoAkaun": this.ARSuccess_6,
          "JenisAkaun": this.ARSuccess_10
        }
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(body), "GetNonFinancialTransactionPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              this.ARPrint1_Visible = false;
              this.ARPrint2_Visible = true;
              this.getAccountInquiry();
            }else{
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

  Email(){
    this.ARSuccess_Visible = false;
    this.AREmail_Visible = true;

    let transaction = "";
    if(selectLang.selectedLang == 'en'){
      transaction = "Account Registration";
    }else{
      transaction = "Pendaftaran Akaun";
    }
    
    const body = {
      "Transaksi": transaction,
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Lokasi": signalrConnection.branchName,
      "Name": currentMyKadDetails.Name,
      "NoAkaun": this.ARSuccess_6,
      "JenisAkaun": this.ARSuccess_10
    }

    const emailObj = {
      "Name" : currentMyKadDetails.Name,
      "UnitHolderID" : this.ARSuccess_6,
      "Module" : "1",
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : currentMyKadDetails.ICNo
    }

    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(body), accessToken.token, this.AR_Form.controls.email.value, "GetNonFinancialTransactionPrintout", signalrConnection.trxno, "1", JSON.stringify(emailObj)).then((data: any) => {
      
    });

    setTimeout(()=>{   
      this.AREmail_Visible = false;
      this.getAccountInquiry();
    }, 5000);
  }

  TNCDisgree(){
    this.ARForm_Visible = true;
    this.ARTNC_Visible = false;


    setTimeout(() => {
      loadKeyboard();
    }, 1000);
  }

  registrationNext() {
    
    closeKeyboard();

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
    this.telephone_Warning1 = false;
    this.homephone_Warning = false;
    this.email_Warning = false;
    this.email_Warning1 = false;
    this.bank_Warning = false;
    this.bankNo_Warning = false;
    this.bankNo_Warning1 = false;
    this.companyName_Warning = false;

    this.MI_Warning = false;
    this.MI_Warning2 = false;
    this.JS_Warning = false;
    this.NOJ_Warning = false;
    this.JN_Warning = false;
    this.JC_Warning = false;

    let x = 0
    Object.keys(this.AR_Form.controls).forEach(key => {
      if(this.AR_Form.controls[key].hasError('required')){
        x += 1;
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
        x += 1; 
        if(key.includes('email')){
          this.email_Warning1 = true;
        }
      }
      else if(this.AR_Form.controls[key].hasError('minlength')){
        x += 1;
        if(key.includes('bankaccount')){
          this.bankNo_Warning1 = true;
        }
        else if(key.includes('telephone')){
          if(this.AR_Form.controls[key].value != 'NA'){
            this.telephone_Warning1 = true;
          }
        }
        else if(key.includes('homenumber')){
          if(this.AR_Form.controls[key].value != 'NA'){
            this.homephone_Warning = true;
          }
        }
      }
      else {
        if(key.includes('bankname') && (this.AR_Form.controls.bankname.value == '')){
          x += 1;
          this.bank_Warning = true;
        }
        else if(key.includes('jobcategory') && (this.AR_Form.controls.jobcategory.value == 'NA')){
          x += 1;
          this.JC_Warning = true;
        }
        else if(key.includes('jobname') && (this.AR_Form.controls.jobname.value == 'NA')){
          if(
            this.AR_Form.controls.jobcategory.value != 'SE' &&
            this.AR_Form.controls.jobcategory.value != 'HM' &&
            this.AR_Form.controls.jobcategory.value != 'RY' &&
            this.AR_Form.controls.jobcategory.value != 'UM' 
            ){
              console.log(this.AR_Form.controls.jobcategory.value);
              x += 1;
              this.JN_Warning = true;
            }
        }
        else if(key.includes('natureofjob') && (this.AR_Form.controls.natureofjob.value == 'NA')){
          if(
            this.AR_Form.controls.jobcategory.value != 'EM' &&
            this.AR_Form.controls.jobcategory.value != 'HM' &&
            this.AR_Form.controls.jobcategory.value != 'RY' &&
            this.AR_Form.controls.jobcategory.value != 'UM' 
            ){
              console.log(this.AR_Form.controls.jobcategory.value);
              x += 1;
              this.NOJ_Warning = true;
            }
        }
        else if(key.includes('jobsector') && (this.AR_Form.controls.jobsector.value == 'NA')){
          if(
            this.AR_Form.controls.jobcategory.value != 'SE' &&
            this.AR_Form.controls.jobcategory.value != 'HM' &&
            this.AR_Form.controls.jobcategory.value != 'RY' &&
            this.AR_Form.controls.jobcategory.value != 'UM' 
            ){
              console.log(this.AR_Form.controls.jobcategory.value);
              x += 1;
              this.JS_Warning = true;
            }
        }
        else if(key.includes('monthlyincome') && (this.AR_Form.controls.monthlyincome.value == '7')){
          if(
            this.AR_Form.controls.jobcategory.value != 'UM'
          ){
            x += 1;
            this.MI_Warning = true;
          }
        }
        else if(key.includes('monthlyincome') && (this.AR_Form.controls.monthlyincome.value == '7')){
          if(this.AR_Form.controls.jobcategory.value == "HM"){
            x += 1;
            this.MI_Warning2 = true;
          }
        }
      }
    });
    if (x > 0){
      window.scroll(0,0);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      if(this.AR_Form.controls.pep.value == 'Y' || this.AR_Form.controls.fatca.value == 'Y' || this.AR_Form.controls.crs.value == 'Y'){
        errorCodes.Ecode = "0118";
        errorCodes.Emessage = "FATCA/PEP/CRS selected.";
        errorCodes.accountName = currentMyKadDetails.Name;
        errorCodes.accountNo = "";
        errorCodes.accountType = this.ARSuccess_10;
        errorCodes.transaction = this.transaction;
        this._router.navigate(['errorscreen']);
      }else{
        this.ARForm_Visible = false;
        this.ARTNC_Visible = true;
        deleteKeyboard();
      }
    }
  }

  filterJobCategory(category: any) {
    this.enableJob();

    let code = category.target.value;

    if (code.includes('EM')){
      this.AR_Form.controls.natureofjob.setValue('NA');
      this.AR_Form.controls.natureofjob.disable();
    }
    else if (code.includes('SE')){
      this.AR_Form.controls.jobname.setValue('NA');
      this.AR_Form.controls.jobsector.setValue('NA');
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
    }
    else if (code.includes('HM')){
      this.AR_Form.controls.jobname.setValue('NA');
      this.AR_Form.controls.jobsector.setValue('NA');
      this.AR_Form.controls.natureofjob.setValue('NA');
      this.AR_Form.controls.companyname.setValue('');
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
      this.AR_Form.controls.natureofjob.disable();
      this.AR_Form.controls.companyname.disable();
    }
    else if (code.includes('RY')){
      this.AR_Form.controls.jobname.setValue('NA');
      this.AR_Form.controls.jobsector.setValue('NA');
      this.AR_Form.controls.natureofjob.setValue('NA');
      this.AR_Form.controls.companyname.setValue('');
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
      this.AR_Form.controls.natureofjob.disable();
      this.AR_Form.controls.companyname.disable();
    }
    else if (code.includes('UM')){
      this.AR_Form.controls.jobname.setValue('NA');
      this.AR_Form.controls.jobsector.setValue('NA');
      this.AR_Form.controls.natureofjob.setValue('NA');
      this.AR_Form.controls.companyname.setValue('');
      this.AR_Form.controls.monthlyincome.setValue('7');
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
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Canceled Account Registration.");
    this._router.navigate(['language']);
  
  }

  getAccountInquiry(): void {
    try{
      
      const body = { 

        "CHANNELTYPE": signalrConnection.channelType,
        "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
        "DEVICEOWNER": signalrConnection.deviceOwner,
        "UNITHOLDERID": "",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": currentMyKadDetails.CategoryType,
        "IDENTIFICATIONNUMBER": currentMyKadDetails.ICNo,
        "FUNDID": "",
        "INQUIRYCODE": "5",
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
        "BANKTXNREFERENCENUMBER": signalrConnection.trxno ,
        "BANKCUSTPHONENUMBER": "",
        "FILTRATIONFLAG": "1",
        "GUARDIANID": "",
        "GUARDIANICTYPE": "",
        "GUARDIANICNUMBER": ""

       };

  
      this.serviceService.getAccountInquiry(body)
      .subscribe((result: any) => {
        

        currentHolder.channeltype = result.channeltype;
        currentHolder.requestoridentification = result.requestoridentification;
        currentHolder.deviceowner = result.deviceowner;
        currentHolder.unitholderid = result.unitholderid;
        currentHolder.firstname = result.firstname;
        currentHolder.identificationtype = result.identificationtype;
        currentHolder.identificationnumber = result.identificationnumber;
        currentHolder.fundid = result.fundid;
        currentHolder.inquirycode = result.inquirycode;
        currentHolder.transactiondate = result.transactiondate;
        currentHolder.transactiontime = result.transactiontime;
        currentHolder.banktxnreferencenumber = result.banktxnreferencenumber;
        currentHolder.bankcustphonenumber = result.bankcustphonenumber;
        currentHolder.filtrationflag = result.filtrationflag;      		
        currentHolder.cifstopaccountstatus = result.cifstopaccountstatus
        currentHolder.typeclosed = result.typeclosed;
        currentHolder.participateinasnbmkt = result.participateinasnbmkt;
        currentHolder.unitbalance = result.unitbalance;
        currentHolder.funddetail = result.funddetail;
        currentHolder.cifnumber = result.cifnumber;
        currentHolder.race = result.race;
        currentHolder.religion = result.religion;
        currentHolder.uhcategory = result.uhcategory;
        currentHolder.title = result.title;
        currentHolder.accountopeningdate = result.accountopeningdate;
        currentHolder.investortype = result.investortype;
        currentHolder.maritalstatus = result.maritalstatus;
        currentHolder.addresslinE1 = result.addresslinE1;
        currentHolder.addresslinE2 = result.addresslinE2;
        currentHolder.addresslinE3 = result.addresslinE3;
        currentHolder.addresslinE4 = result.addresslinE4;
        currentHolder.country = result.country;
        currentHolder.email = result.email;
        currentHolder.zipcode = result.zipcode;
        currentHolder.contactperson = result.contactperson;
        currentHolder.telephonE1 = result.telephonE1;
        currentHolder.telephonE2 = result.telephonE2;
        currentHolder.cellphonenumber = result.cellphonenumber;
        currentHolder.fax = result.fax;
        currentHolder.dateofbirth = result.dateofbirth;
        currentHolder.bankcode = result.bankcode;
        currentHolder.bankbranchcode = result.bankbranchcode;
        currentHolder.accounttype = result.accounttype;
        currentHolder.accountnumber = result.accountnumber;
        currentHolder.accountcurrency = result.accountcurrency;
        currentHolder.fundcode = result.fundcode;
        currentHolder.transactiontype = result.transactiontype;
        currentHolder.directdebit = result.directdebit;
        currentHolder.mothername = result.mothername;
        currentHolder.portalenabled = result.portalenabled;				
        currentHolder.grandtotalunitbalance = result.grandtotalunitbalance;
        currentHolder.grandtotalepfunits = result.grandtotalepfunits;
        currentHolder.grandtotalloanunits = result.grandtotalloanunits;
        currentHolder.grandtotalcertunits = result.grandtotalcertunits;
        currentHolder.grandtotalblockedunits = result.grandtotalblockedunits;
        currentHolder.grandtotalprovisionalunits = result.grandtotalprovisionalunits;
        currentHolder.grandtotalunits = result.grandtotalunits;
        currentHolder.grandtotaluhholdings = result.grandtotaluhholdings;
        currentHolder.totalminoraccount = result.totalminoraccount;
        currentHolder.minordetail = result.minordetail;
        currentHolder.guardianid = result.guardianid;
        currentHolder.guardianictype = result.guardianictype;
        currentHolder.guardianicnumber = result.guardianicnumber;
        currentHolder.epfnumber = result.epfnumber;
        currentHolder.epfapplicable = result.epfapplicable;
        currentHolder.epfaccounttype = result.epfaccounttype;
        currentHolder.epfaccounttypeeffdate = result.epfaccounttypeeffdate;
        currentHolder.agentcode  = result.agentcode;
        currentHolder.branchcode  = result.branchcode;
        currentHolder.occupation = result.occupation;
        currentHolder.otherinfO8 = result.otherinfO8;
        currentHolder.occupationsector = result.occupationsector;
        currentHolder.occupationcategory = result.occupationcategory;
        currentHolder.natureofbusiness = result.natureofbusiness;
        currentHolder.companyname = result.companyname;
        currentHolder.preferredmailmode = result.preferredmailmode;
        currentHolder.fatca = result.fatca;
        currentHolder.crs = result.crs;
        currentHolder.pep = result.pep;
        currentHolder.riskprofile = result.riskprofile;
        currentHolder.relationship = result.relationship;
        currentHolder.agentcode = result.agentcode;
        currentHolder.branchcode = result.branchcode;
        currentHolder.lastupdatedate = result.lastupdatedate;
        currentHolder.transactionchannel = result.transactionchannel;
        currentHolder.transactionstatus = result.transactionstatus;
        currentHolder.rejectcode = result.rejectcode;
        currentHolder.rejectreason = result.rejectreason;




        if (currentHolder.transactionstatus.toLowerCase().includes('successful')){

          if (!currentHolder.typeclosed.toLowerCase().includes('n')){
            errorCodes.Ecode = "0168";
            errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
            errorCodes.accountName = currentMyKadDetails.Name;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.accountType = this.ARSuccess_10;
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
          else{
            if(currentHolder.unitholderid != "" || currentHolder.unitholderid != undefined){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Account Found.");


              this.ARPrint1_Visible = false;
              this.ARPrint2_Visible = false;
              this.AREmail_Visible = false;

              this.transaction_Successful = true;
              //this._router.navigate(['transactionsuccessful']);
            }
          }
        }
        else{
          if (currentHolder.rejectreason.includes('not exists')){
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "No account found.");

            
            this._router.navigate(['feedbackscreen']);
          }
          else{
            errorCodes.Ecode = currentHolder.rejectcode;
            errorCodes.Emessage = currentHolder.rejectreason;
            errorCodes.accountName = currentMyKadDetails.Name;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.accountType = this.ARSuccess_10;
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
        }
      });
    }
    catch (e){
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
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


