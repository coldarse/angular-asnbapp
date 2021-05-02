import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { FormBuilder, Validators } from '@angular/forms';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { formatDate } from '@angular/common';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { MyKidDetails } from '../_models/myKidDetails';
import { errorCodes } from '../_models/errorCode';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { ServiceService } from '../_shared/service.service';
import { accessToken } from '../_models/apiToken';

declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

@Component({
  selector: 'app-bijakregistration',
  templateUrl: './bijakregistration.component.html',
  styleUrls: ['./bijakregistration.component.css']
})
export class BijakregistrationComponent implements OnInit {

  ishardcodeic = signalrConnection.isHardcodedIC;

  @ViewChild('icnumber') icnumber : ElementRef | undefined;

  @ViewChild('address1') add1 : ElementRef | undefined;
  @ViewChild('address2') add2 : ElementRef | undefined;
  @ViewChild('postcode') postcode : ElementRef | undefined;
  @ViewChild('homenumber') homeno : ElementRef | undefined;
  @ViewChild('telephone') phoneno : ElementRef | undefined;
  @ViewChild('email') email : ElementRef | undefined;
  @ViewChild('bankaccount') bankno : ElementRef | undefined;
  @ViewChild('companyname') compname : ElementRef | undefined;

  BTN_xAgree = "";
  BTN_Agree = "";

  BTN_Cancel = "";
  BTN_Next = "";

  BTN_End = "";
  BTN_TryAgain = "";

  BTN_No = "";
  BTN_Yes = "";

  BTN_Print = "";
  BTN_Email = "";


  private CardType = "MyKid";
  myKidData: any;

  ARPopUp1_Visible = false;

  BRReminder_Visible = true;
  BRInsertMyKid_Visible = false;
  BRLoading_Visible = false;
  BRForm_Visible = false;
  BRError_Visible = false;
  BRError1_Visible = false;
  BRCancel_Visible = false;
  BRTNC_Visible = false;
  BRSuccess_Visible = false;
  BRPrint1_Visible = false;
  BRPrint2_Visible = false;
  BREmail_Visible = false;

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
  telephone_Warning1: boolean = false;
  email_Warning : boolean = false;
  email_Warning1 : boolean = false;
  bank_Warning : boolean = false;
  bankNo_Warning : boolean = false;
  bankNo_Warning1 : boolean = false;
  companyName_Warning : boolean = false;

  MI_Warning : boolean = false;
  JS_Warning : boolean = false;
  NOJ_Warning : boolean = false;
  JN_Warning : boolean = false;
  JC_Warning : boolean = false;

  Email_Visible = true;
  Print_Visible = true;

  pep = true;

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
  form_relationships : any = appFunc.relationship;

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


  Header_Title = "";

  BRReminder_1 = "";
  BRReminder_2 = "";
  BRReminder_3 = "";
  BRReminder_4 = "";

  BRInsertMyKid_1 = "";
  BRInsertMyKid_2 = "";
  BRInsertMyKid_3 = "";
  BRInsertMyKid_4 = "";

  BRLoading_1 = "";

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

  BRError_1 = "";
  BRError_2 = "";

  BRCancel_1 = "";

  BRTNC_1 = "";
  BRTNC_2 = "";
  BRTNC_3 = "";
  BRTNC_4 = "";
  BRTNC_5 = "";
  BRTNC_6 = "";
  BRTNC_7 = "";
  BRTNC_8 = "";
  BRTNC_9 = "";
  BRTNC_10 = "";
  BRTNC_11 = "";

  BRSuccess_1 = "";
  BRSuccess_2 = "";
  BRSuccess_3 = "";
  BRSuccess_4 = "";
  BRSuccess_5 = "";
  BRSuccess_6 = "";
  BRSuccess_7 = "";
  BRSuccess_8 = "";
  BRSuccess_9 = "";
  BRSuccess_10 = "";

  BRPrint1_1 = "";
  BRPrint1_2 = "";

  BRPrint2_1 = "";
  
  BREmail_1 = "";
  BREmail_2 = "";

  AR_Form: any;
  id: any;

  city: any;
  state: any;
  religion: any;
  race: any;

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
    
    this.initializeForm();
  }

  ngAfterViewInit(){
    try{
      
    }catch(e){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Error initializing keyboard." + e.toString());
    }
  }

  ngOnDestroy() {
    clearInterval(this.id);
    deleteKeyboard();
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  initializeForm()  {
    
    if(currentHolder.pep == 'Y'){
      this.pep = false
    }

    let isMobile = false;
    let disableEmail = true;
    if (signalrConnection.kioskType == 'Mobile'){
      isMobile = true;
      if(currentHolder.email == ''){
        disableEmail = false;
      }
    }

    this.AR_Form = this.fb.group(
      {
        salutation: ['EN'],
        fullname: [{value: currentMyKidDetails.Name, disabled: true}],
        identificationcardno: [{value: currentMyKidDetails.ICNo, disabled: true}],
        dob: [{value: formatDate(currentMyKidDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
        race: [{value: this.race, disabled: true}],
        religion: [{value: this.religion, disabled: true}],

        g_memberid: [{value: currentHolder.unitholderid, disabled: true}],
        g_salution: [{value: currentHolder.title}],
        g_fullname: [{value: currentHolder.firstname, disabled: true}],
        g_identificationnumber: [{value: currentMyKadDetails.ICNo, disabled: true}],
        g_dob: [{value: formatDate(currentMyKadDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
        g_race: [{value: currentMyKadDetails.Race, disabled: true}],
        g_religion: [{value: currentMyKadDetails.Religion, disabled: true}],
        g_relation: [{value: 'F', disabled: false}],

        address1 : [{value: currentMyKadDetails.Address1 + currentMyKadDetails.Address2, disabled: true}],
        address2 : [{value: currentMyKadDetails.Address3, disabled: true}],
        postcode : [{value: currentMyKadDetails.PostCode, disabled: true}],
        city : [{value: currentMyKadDetails.City, disabled: true}],
        state : [{value: currentMyKadDetails.State, disabled: true}],
        mykadaddress: [{value: true, disabled: true}],

        homenumber : [{value: currentHolder.telephonE1, disabled: true}],
        telephone: [{value: currentHolder.cellphonenumber, disabled: true}, [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]],
        notelephone: [{value: false, disabled: true}],

        email: [{value: currentHolder.email, disabled: disableEmail}, [
          Validators.required,
          Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        noemail: [{value: false, disabled: isMobile}],
        deliverystate: [{value: currentHolder.preferredmailmode, disabled: true}],

        bankname: [{value: currentHolder.bankcode, disabled: true}],
        bankaccount: [{value: currentHolder.accountnumber, disabled: true}, [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]],

        jobcategory: [{value: currentHolder.occupationcategory, disabled: true}],
        jobname: [{value: currentHolder.occupation, disabled: true}],
        natureofjob: [{value: currentHolder.natureofbusiness, disabled: true}],
        jobsector: [{value: currentHolder.occupationsector, disabled: true}],
        monthlyincome: [{value: currentHolder.otherinfO8, disabled: true}],
        companyname: [{value: currentHolder.companyname, disabled: true}, Validators.required],

        fatca: ['N'],
        pep: [{value: currentHolder.pep, disabled: this.pep}],
        news: ['Y'],
        crs: ['N'],
    });
    signalrConnection.logsaves.push("WebApp Component [Bijak Registration]" + ": " + "Initialized Form.");
  }  

  bijakDisagree(){
    this._router.navigate(['transactionmenu']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Redirected back to Transaction Menu.");
  }

  bijakAgree(){
    this.BRReminder_Visible = false;
    this.BRInsertMyKid_Visible = true;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Agreed on Bijak Registration Terms and Conditions.");
  }

  BRErrorEnd(){
    this._router.navigate(['feedbackscreen']);
  }

  BRErrorTryAgain(){
    this.BRError_Visible = false;
  }

  verify() {
    try{
      if(signalrConnection.isHardcodedIC){
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKid]" + ": " + "Verify MyKid Hardcoded.");

        this.bindMyKidDataHardcoded();
      }else{
        this.BRInsertMyKid_Visible = false;
        this.BRLoading_Visible = true;
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Start Verifying MyKid.");
  
        let status = "";
  
        signalrConnection.connection.invoke('myKidRequest', this.CardType).then((data: any) => {
          console.log(data);
          status = data;
  
          if (status.toLowerCase().includes('removecard')){
            this.myKidData = Object.assign(new MyKidDetails(), JSON.parse(data));
            this.bindMyKidData();
          }
          else{
            console.log(data);
            this.BRError_Visible = true;
          }
  
        });
      }
      

    }catch (e){

    }
  }

  calculateAge(birthdate: Date) {
    let age = 13;
    if (birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      return age;
    }
    return age;
  }

  bindMyKidData(): void {
    try {
      let age = this.calculateAge(this.myKidData['DOB']);

      if (age <= 12){
        //Mapping happens here.
        currentMyKidDetails.VersionNo = this.myKidData['VersionNo'];
        currentMyKidDetails.BirthCertNo = this.myKidData['BirthCertNo'];
        currentMyKidDetails.Name = this.myKidData['Name'];
        currentMyKidDetails.ICNo = this.myKidData['ICNo'];
        currentMyKidDetails.Gender = this.myKidData['Gender'];
        currentMyKidDetails.Citizenship = this.myKidData['Citizenship'];
        currentMyKidDetails.SOB = this.myKidData['SOB'];
        currentMyKidDetails.Address1 = this.myKidData['Address1'];
        currentMyKidDetails.Address2 = this.myKidData['Address2'];
        currentMyKidDetails.Address3 = this.myKidData['Address3'];
        currentMyKidDetails.PostCode = this.myKidData['PostCode'];
        currentMyKidDetails.City = this.myKidData['City'];
        currentMyKidDetails.State = this.myKidData['State'];
        currentMyKidDetails.DOB = this.myKidData['DOB'];
        currentMyKidDetails.TOB = this.myKidData['TOB'];
        currentMyKidDetails.POB1 = this.myKidData['POB1'];
        currentMyKidDetails.POB2 = this.myKidData['POB2'];
        currentMyKidDetails.DOR = this.myKidData['DOR'];
        currentMyKidDetails.Country = this.myKidData['Country'];
        currentMyKidDetails.FathersName = this.myKidData['FathersName'];
        currentMyKidDetails.FathersICNo = this.myKidData['FathersICNo'];
        currentMyKidDetails.FathersRace = this.myKidData['FathersRace'];
        currentMyKidDetails.FathersReligion = this.myKidData['FathersReligion'];
        currentMyKidDetails.MothersName = this.myKidData['MothersName'];
        currentMyKidDetails.MothersICNo = this.myKidData['MothersICNo'];
        currentMyKidDetails.MothersRace = this.myKidData['MothersRace'];
        currentMyKidDetails.MothersReligion = this.myKidData['MothersReligion'];
        
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `Mapped ${currentMyKadDetails.Name}'s MyKid details to Web App Object Class`);
    
        this.getAccountInquiry();
      }
      else{
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `MyKid Returned Age is more than 12 years old`);
        this.BRError_Visible = true;
      }
    }
    catch(e) {
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
  }

  bindMyKidDataHardcoded(): void {
    try {
      let age = this.calculateAge(new Date("2019-08-31"));

      if (age <= 12){
        //Mapping happens here.
        currentMyKidDetails.VersionNo = "";
        currentMyKidDetails.BirthCertNo = "123456";
        currentMyKidDetails.Name = "John Smith Jr.";
        currentMyKidDetails.ICNo = this.icnumber?.nativeElement.value;
        currentMyKidDetails.Gender = "Male";
        currentMyKidDetails.Citizenship = "WARGANEGARA";
        currentMyKidDetails.SOB = "SELANGOR";
        currentMyKidDetails.Address1 = "6 Jln 14/70A";
        currentMyKidDetails.Address2 = "";
        currentMyKidDetails.Address3 = "Sri Hartamas";
        currentMyKidDetails.PostCode = "50480";
        currentMyKidDetails.City = "Kuala Lumpur";
        currentMyKidDetails.State = "W. PERSEKUTUAN(KL)";
        currentMyKidDetails.DOB = new Date("2019-08-31");
        currentMyKidDetails.TOB = "";
        currentMyKidDetails.POB1 = "";
        currentMyKidDetails.POB2 = "";
        currentMyKidDetails.DOR = "";
        currentMyKidDetails.Country = "Malaysia";
        currentMyKidDetails.FathersName = "John Smith";
        currentMyKidDetails.FathersICNo = "666666224444";
        currentMyKidDetails.FathersRace = "CINA";
        currentMyKidDetails.FathersReligion = "ISLAM";
        currentMyKidDetails.MothersName = "Joanna Smith";
        currentMyKidDetails.MothersICNo = "777777335555";
        currentMyKidDetails.MothersRace = "CINA";
        currentMyKidDetails.MothersReligion = "ISLAM";
        
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `Mapped ${currentMyKadDetails.Name}'s MyKid details to Web App Object Class`);
    

        
        this.getAccountInquiry();
      }
      else{
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `MyKid Returned Age is more than 12 years old`);
        this.BRError_Visible = true;
      }
    }
    catch(e) {
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
  }

  filterJobCategory(category: any) {
    this.enableJob();

    let code = category.target.value;

    if (code.includes('EM')){
      this.AR_Form.controls.natureofjob.setValue('');
      this.AR_Form.controls.natureofjob.disable();
    }
    else if (code.includes('SE')){
      this.AR_Form.controls.jobname.setValue('');
      this.AR_Form.controls.jobsector.setValue('');
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
    }
    else if (code.includes('HM')){
      this.AR_Form.controls.jobname.setValue('');
      this.AR_Form.controls.jobsector.setValue('');
      this.AR_Form.controls.natureofjob.setValue('');
      this.AR_Form.controls.companyname.setValue('');
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
      this.AR_Form.controls.natureofjob.disable();
      this.AR_Form.controls.companyname.disable();
    }
    else if (code.includes('RY')){
      this.AR_Form.controls.jobname.setValue('');
      this.AR_Form.controls.jobsector.setValue('');
      this.AR_Form.controls.natureofjob.setValue('');
      this.AR_Form.controls.companyname.setValue('');
      this.AR_Form.controls.jobname.disable();
      this.AR_Form.controls.jobsector.disable();
      this.AR_Form.controls.natureofjob.disable();
      this.AR_Form.controls.companyname.disable();
    }
    else if (code.includes('UM')){
      this.AR_Form.controls.jobname.setValue('');
      this.AR_Form.controls.jobsector.setValue('');
      this.AR_Form.controls.natureofjob.setValue('');
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

  getAccountInquiry(): void {
    try{
      const body = { 

        "CHANNELTYPE": "ASNB KIOSK",
        "REQUESTORIDENTIFICATION": "TESTFDSSERVER",
        "DEVICEOWNER": "ASNB",
        "UNITHOLDERID": "",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": "W",
        "IDENTIFICATIONNUMBER": currentMyKidDetails.ICNo,
        "FUNDID": "",
        "INQUIRYCODE": "5",
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
        "BANKTXNREFERENCENUMBER": formatDate(new Date(), 'ddMMyyyy', 'en'),
        "BANKCUSTPHONENUMBER": "",
        "FILTRATIONFLAG": "1",
        "GUARDIANID": currentHolder.unitholderid,
        "GUARDIANICTYPE": currentMyKadDetails.CategoryType,
        "GUARDIANICNUMBER":  currentHolder.identificationnumber
  
       };


  
  
       this.serviceService.getAccountInquiry(body)
       .subscribe((result: any) => {

        console.log("Subscribing");
        
        //Mapping Happens Here
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
        currentBijakHolder.funddetail = result.fundetail;
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


        if (currentBijakHolder.transactionstatus.toLowerCase().includes('successful')){
          if (!currentBijakHolder.typeclosed.toLowerCase().includes('n')){
            errorCodes.Ecode = "0168";
            errorCodes.Emessage = "Your Bijak Account has been closed. Akaun anda telah ditutup.";
            this._router.navigate(['errorscreen']);
          }
          else{
            if (currentBijakHolder.funddetail.length == 0 && currentBijakHolder.unitholderid != undefined){
              console.log("Reached Here B");
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "BijakAccount Found, But no Fund.");
              this.BRError1_Visible = true;
            }
            //Scenario 3: FundID & Bijak UnitHolderID exists
            else if (currentBijakHolder.funddetail.length > 0 && currentBijakHolder.unitholderid != undefined){
              console.log("Reached Here C");
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Bijak Account Found.");
              this.BRError1_Visible = true;
            }
    
            else{
              console.log("Reached Here D");
            }
          }
        }
        else{
          if (currentBijakHolder.rejectreason.includes('not exists')){
            console.log("Reached Here A");
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "No bijak account found.");

            this.city = currentMyKidDetails.City;
            for(var x of this.form_cities){
              if (x.name.toLowerCase().includes(this.city.toLowerCase())){
                this.city = x.name;
                break;
              }else{
                this.city = currentMyKidDetails.City;
              }
            }
            this.state = currentMyKidDetails.State;
            for(var y of this.form_states){
              if (y.text.toLowerCase().includes(this.state.toLowerCase())){
                this.state = y.value;
                break;
              }else{
                this.state = currentMyKidDetails.State;
              }
            }
            this.religion = currentMyKidDetails.FathersReligion;
            if(this.religion.toLowerCase().includes('islam')){
              this.religion = "M"
            }
            else{
              this.religion = "N"
            }
            this.race = currentMyKidDetails.FathersRace;
            for(var y of this.form_races){
              if (y.textBM.toLowerCase().includes(this.race.toLowerCase())){
                this.race = y.value;
                break;
              }else{
                this.race = currentMyKidDetails.FathersRace;
              }
            }

            this.AR_Form.controls.fullname.setValue(currentMyKidDetails.Name);
            this.AR_Form.controls.identificationcardno.setValue(currentMyKidDetails.ICNo);
            this.AR_Form.controls.dob.setValue(formatDate(currentMyKidDetails.DOB, 'dd MMM yyyy', 'en'));
            this.AR_Form.controls.race.setValue(this.race);
            this.AR_Form.controls.religion.setValue(this.religion);

            this.AR_Form.controls.address1.setValue(currentMyKidDetails.Address1 + ", " + currentMyKidDetails.Address2);
            this.AR_Form.controls.address2.setValue(currentMyKidDetails.Address3);
            this.AR_Form.controls.postcode.setValue(currentMyKidDetails.PostCode);
            this.AR_Form.controls.city.setValue(currentMyKidDetails.City);
            this.AR_Form.controls.state.setValue(this.state);

            this.BRInsertMyKid_Visible = false;
            this.BRLoading_Visible = false;
            this.BRForm_Visible = true;


            setTimeout(() => {
              loadKeyboard();
            } , 2000);
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "After form is loaded, initialized keyboard");
          }
          else{
            errorCodes.Ecode = currentHolder.rejectcode;
            errorCodes.Emessage = currentHolder.rejectreason;
            this._router.navigate(['errorscreen']);
          }
        }

      });
    }
    catch (e){
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
  }

  noEmailCheck() {
    if (this.AR_Form.controls.noemail.value == false){
      this.AR_Form.controls.email.reset();
      this.AR_Form.controls.email.disable();
      this.AR_Form.controls.deliverystate.setValue('ST');
      this.AR_Form.controls.deliverystate.disable();
      if (this.email_Warning == true) this.email_Warning = false;
      if (this.email_Warning1 == true) this.email_Warning1 = false;
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
      if (this.telephone_Warning1 == true) this.telephone_Warning1 = false;
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

      this.AR_Form.controls.address1.setValue(currentMyKidDetails.Address1 + currentMyKadDetails.Address2);
      this.AR_Form.controls.address2.setValue(currentMyKidDetails.Address3);
      this.AR_Form.controls.postcode.setValue(currentMyKidDetails.PostCode);
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

  bijakregistrationCancel() {
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Canceled Bijak Account Registration.");
    
    this.BRForm_Visible = false;
    this.BRReminder_Visible = true;
  }

  bijakregistrationNext() {
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
    this.email_Warning = false;
    this.email_Warning1 = false;
    this.bank_Warning = false;
    this.bankNo_Warning = false;
    this.bankNo_Warning1 = false;
    this.companyName_Warning = false;

    this.MI_Warning = false;
    this.JS_Warning = false;
    this.NOJ_Warning = false;
    this.JN_Warning = false;
    this.JC_Warning = false;



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
        else if(key.includes('telephone')){
          this.telephone_Warning1 = true;
        }
        else if(key.includes('bankaccount')){
          this.bankNo_Warning1 = true;
        }
      }
      else {
        if(key.includes('bankname') && (this.AR_Form.controls.bankname.value == '')){
          this.bank_Warning = true;
        }
        else if(key.includes('jobcategory') && (this.AR_Form.controls.jobcategory.value == '')){
          this.JC_Warning = true;
        }
        else if(key.includes('jobname') && (this.AR_Form.controls.jobname.value == '')){
          this.JN_Warning = true;
        }
        else if(key.includes('natureofjob') && (this.AR_Form.controls.natureofjob.value == '')){
          this.NOJ_Warning = true;
        }
        else if(key.includes('jobsector') && (this.AR_Form.controls.jobsector.value == '')){
          this.JS_Warning = true;
        }
        else if(key.includes('monthlyincome') && (this.AR_Form.controls.monthlyincome.value == '')){
          this.MI_Warning = true;
        }
      }
    })
    if (x > 0){
      window.scroll(0,0);
      console.log("Error");
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.BRForm_Visible = false;
      this.BRTNC_Visible = true;
    }
  }

  TNCDisagree(){
    this.BRForm_Visible = true;
    this.BRTNC_Visible = false;
  }

  TNCAgree(){
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 2;
    kActivit.submoduleID = undefined;
    kActivit.action = "Bijak Account Registration.";
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

    this.serviceService.postAccountRegistration(body).subscribe((data: any) => {
      console.log(data);
      if(data.result.transactionstatus.toLowerCase().includes('reject')  || data.result.rejectcode != ""){
        errorCodes.Ecode = data.result.rejectcode;
        errorCodes.Emessage = data.result.rejectreason;
        this._router.navigate(['errorscreen']);
        kActivit.endTime = new Date();
        kActivit.status = false;

        appFunc.kioskActivity.push(kActivit);
      }else{
        this.BRSuccess_4 = currentMyKidDetails.Name;
        this.BRSuccess_6 = data.result.unitholderid;
        this.BRSuccess_8 = formatDate(new Date(), 'dd/MM/yyyy', 'en');
        this.BRSuccess_10 = "Bijak";
        kActivit.endTime = new Date();
        kActivit.status = true;

        appFunc.kioskActivity.push(kActivit);
      }
      this.BRTNC_Visible = false;

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

      this.BRSuccess_Visible = true;
      this.ARPopUp1_Visible = true;
    });

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Submitted Bijak Registration Form.");
  
  }

  Next(){
    this.ARPopUp1_Visible = false;
  }

  Print(){
    

    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if (data){
        this.BRSuccess_Visible = false;
        this.BRPrint1_Visible = true;
    
        const body = {
          "Transaksi": "Pendaftaran Akaun/Account Registration",
          "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Masa": formatDate(new Date(), 'h:MM:ss a', 'en'),
          "Lokasi": "KL MAIN 01",
          "Name": currentMyKidDetails.Name,
          "NoAkaun": this.BRSuccess_6,
          "JenisAkaun": this.BRSuccess_10
        }
    
        //GetNonFinancialTransactionPrintout
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(body), "GetNonFinancialTransactionPrintout", signalrConnection.trxno, "0").then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              this.BRPrint1_Visible = false;
              this.BRPrint2_Visible = true;
              this.getAccountInquiryRetry();
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
    this.BRSuccess_Visible = false;
    this.BREmail_Visible = true;

    const body = {
      "Transaksi": "Pendaftaran Akaun/Account Registration",
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'h:MM:ss a', 'en'),
      "Lokasi": "KL MAIN 01",
      "Name": currentMyKidDetails.Name,
      "NoAkaun": this.BRSuccess_6,
      "JenisAkaun": this.BRSuccess_10
    }

    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(body), accessToken.token, this.AR_Form.controls.email.value, "GetNonFinancialTransactionPrintout", signalrConnection.trxno, "0").then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          setTimeout(()=>{   
            this.BREmail_Visible = false;
            this.getAccountInquiryRetry();
          }, 3000);
        }else{
          errorCodes.Ecode = "0069";
          errorCodes.Emessage = "Email Failed";
          this._router.navigate(['errorscreen']);
        }
      }, 3000);
    });
  }

  getAccountInquiryRetry(): void {
    try{

      
      const body = { 

        "CHANNELTYPE": "ASNB KIOSK",
        "REQUESTORIDENTIFICATION": "TESTFDSSERVER",
        "DEVICEOWNER": "ASNB",
        "UNITHOLDERID": "",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": "W",
        "IDENTIFICATIONNUMBER": currentMyKidDetails.ICNo,
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
        currentBijakHolder.funddetail = result.fundetail;
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

        console.log(currentBijakHolder.occupationcategory);

        if (currentBijakHolder.transactionstatus.toLowerCase().includes('successful')){

          if (!currentBijakHolder.typeclosed.toLowerCase().includes('n')){
            errorCodes.Ecode = "0168";
            errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
            this._router.navigate(['errorscreen']);
          }
          else{
            if(currentBijakHolder.unitholderid != "" || currentBijakHolder.unitholderid != undefined){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "Account Found.");
              this._router.navigate(['transactionsuccessful']);
            }
          }
        }
        else{
          if (currentBijakHolder.rejectreason.includes('not exists')){
            console.log("Reached Here A");
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "No account found.");

            
            this._router.navigate(['feedbackscreen']);
          }
          else{
            errorCodes.Ecode = currentBijakHolder.rejectcode;
            errorCodes.Emessage = currentBijakHolder.rejectreason;
            this._router.navigate(['errorscreen']);
          }
        }
      });
    }
    catch (e){
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }


    
  }

}
