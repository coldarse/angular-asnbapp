import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-bijakregistration',
  templateUrl: './bijakregistration.component.html',
  styleUrls: ['./bijakregistration.component.css']
})
export class BijakregistrationComponent implements OnInit {

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
  serviceService: any;

  constructor(private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
    
    //this.initializeForm();

    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Started Bijak Registration.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);

  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Cleared Interval.");
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
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  initializeForm()  {
    this.AR_Form = this.fb.group(
      {
        salutation: ['Datuk'],
        fullname: [{value: currentMyKidDetails.Name, disabled: true}],
        identificationcardno: [{value: currentMyKidDetails.ICNo, disabled: true}],
        dob: [{value: formatDate(currentMyKidDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
        race: [{value: currentMyKidDetails.FathersRace, disabled: true}],
        religion: [{value: currentMyKidDetails.FathersReligion, disabled: true}],

        g_memberid: [{value: currentHolder.unitholderid, disabled: true}],
        g_salution: [{value: 'Datuk', disabled: false}],
        g_fullname: [{value: currentMyKadDetails.Name, disabled: true}],
        g_identificationnumber: [{value: currentMyKadDetails.ICNo, disabled: true}],
        g_dob: [{value: currentMyKadDetails.DOB, disabled: true}],
        g_race: [{value: currentMyKadDetails.Race, disabled: true}],
        g_religion: [{value: currentMyKadDetails.Religion, disabled: true}],
        g_relation: [{value: 'Sila Pilih Satu', disabled: false}],

        address1 : [{value: currentMyKidDetails.Address1 + currentMyKidDetails.Address2, disabled: true}],
        address2 : [{value: currentMyKidDetails.Address3, disabled: true}],
        postcode : [{value: currentMyKidDetails.PostCode, disabled: true}],
        city : [{value: currentMyKidDetails.City, disabled: true}],
        state : [{value: currentMyKidDetails.State, disabled: true}],
        mykadaddress: [true],

        homenumber : ['', Validators.required],
        telephone: ['', Validators.required],
        notelephone: [false],

        email: ['', Validators.required],
        noemail: [false],
        deliverystate: ['Sila Pilih Satu'],

        bankname: ['Sila Pilih Satu'],
        bankaccount: ['', Validators.required],

        jobcategory: ['Sila Pilih Satu'],
        jobname: ['Sila Pilih Satu'],
        natureofjob: ['Sila Pilih Satu'],
        jobsector: ['Sila Pilih Satu'],
        monthlyincome: ['Sila Pilih Satu'],
        companyname: ['', Validators.required],

        fatca: ['No'],
        pep: ['No'],
        news: ['No'],
        crs: ['No'],
    });
    signalrConnection.logsaves.push("WebApp Component [Bijak Registration]" + ": " + "Initialized Form.");
  }  

  bijakDisagree(){
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Bijak Registration Disagreed.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = false;

    appFunc.kioskActivity.push(kActivit);

    this._router.navigate(['transactionmenu']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Redirected back to Transaction Menu.");
  }

  bijakAgree(){
    let kActivit = new kActivity();
    kActivit.trxno = "";
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Bijak Registration Agreed";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);

    this.BRReminder_Visible = false;
    this.BRInsertMyKid_Visible = true;
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Agreed on Bijak Registration Terms and Conditions.");
  }

  BRErrorEnd(){
    this._router.navigate(['feedbackscreen']);
  }

  BRErrorMainMenu(){
    this._router.navigate(['transactionmenu']);
  }

  verify() {
    try{
      this.BRInsertMyKid_Visible = false;
      this.BRLoading_Visible = true;

      let kActivit = new kActivity();
      kActivit.trxno = "";
      kActivit.kioskCode = signalrConnection.kioskCode;
      kActivit.moduleID = 0;
      kActivit.submoduleID = undefined;
      kActivit.action = "Bijak Verify MyKid.";
      kActivit.startTime = new Date();
      kActivit.endTime = new Date();
      kActivit.status = true;

      appFunc.kioskActivity.push(kActivit);
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
      let kActivit = new kActivity();
      kActivit.trxno = "";
      kActivit.kioskCode = signalrConnection.kioskCode;
      kActivit.moduleID = 0;
      kActivit.submoduleID = undefined;
      kActivit.action = "Binding MyKid Details";
      kActivit.startTime = new Date();

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
    

        kActivit.endTime = new Date();
        kActivit.status = true;

        appFunc.kioskActivity.push(kActivit);
        this.getAccountInquiry();
      }
      else{
        kActivit.endTime = new Date();
        kActivit.status = false;
  
        appFunc.kioskActivity.push(kActivit);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `MyKid Returned Age is more than 12 years old`);
        this.BRError_Visible = true;
      }
    }
    catch(e) {
      let kActivit = new kActivity();
      kActivit.trxno = "";
      kActivit.kioskCode = signalrConnection.kioskCode;
      kActivit.moduleID = 0;
      kActivit.submoduleID = undefined;
      kActivit.action = "Binding MyKid Details";
      kActivit.startTime = new Date();
      kActivit.endTime = new Date();
      kActivit.status = false;

      appFunc.kioskActivity.push(kActivit);
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
  }

  getAccountInquiry(): void {
    try{


      const body = { 

        "CHANNELTYPE": "ASNB KIOSK",
        "REQUESTORIDENTIFICATION": "TESTFDSSERVER",
        "DEVICEOWNER": "ASNB",
        "UNITHOLDERID": "000013053909",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": "W",
        "IDENTIFICATIONNUMBER": "521030135188",
        "FUNDID": "",
        "INQUIRYCODE": "4",
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
        "BANKTXNREFERENCENUMBER": formatDate(new Date(), 'ddMMyyyy', 'en'),
        "BANKCUSTPHONENUMBER": "",
        "FILTRATIONFLAG": "1",
        "GUARDIANID": "",
        "GUARDIANICTYPE": "",
        "GUARDIANICNUMBER": ""
  
       };


  
  
      this.serviceService.getAccountInquiry(body)
      .subscribe((result: any) => {
        let kActivit = new kActivity();
        kActivit.trxno = "";
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 0;
        kActivit.submoduleID = undefined;
        kActivit.action = "Binding Bijak Unit Holder";
        kActivit.startTime = new Date();

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

        kActivit.endTime = new Date();
        kActivit.status = true;

        appFunc.kioskActivity.push(kActivit);

        //Scenario 1: Bijak Unit Holder Not Exist
        if (currentHolder.rejectreason.includes('not exists')){
          console.log("Reached Here A");
          this.BRLoading_Visible = false;
          this.BRForm_Visible = true;
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
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "No account found.");
        }
        //Scenario 2: FundID = ""
        else if (currentHolder.funddetail.length == 0 && currentHolder.unitholderid != undefined){
          console.log("Reached Here B");
          let kActivit2 = new kActivity();
          kActivit2.trxno = "";
          kActivit2.kioskCode = signalrConnection.kioskCode;
          kActivit2.moduleID = 0;
          kActivit2.submoduleID = undefined;
          kActivit2.action = "Bijak Unit Holder Exists but does not have any Funds.";
          kActivit2.startTime = new Date();
          kActivit2.endTime = new Date();
          kActivit2.status = true;

          appFunc.kioskActivity.push(kActivit2);
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "BijakAccount Found, But no Fund.");
          this.BRError1_Visible = true;
        }
        //Scenario 3: FundID & Bijak UnitHolderID exists
        else if (currentHolder.funddetail.length > 0 && currentHolder.unitholderid != undefined){
          console.log("Reached Here C");
          let kActivit3 = new kActivity();
          kActivit3.trxno = "";
          kActivit3.kioskCode = signalrConnection.kioskCode;
          kActivit3.moduleID = 0;
          kActivit3.submoduleID = undefined;
          kActivit3.action = "Bijak Unit Holder Exists.";
          kActivit3.startTime = new Date();
          kActivit3.endTime = new Date();
          kActivit3.status = true;

          appFunc.kioskActivity.push(kActivit3);
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Bijak Account Found.");
          this.BRError1_Visible = true;
        }

        else{
          console.log("Reached Here D");
        }
  
      })
    }
    catch (e){
      let kActivit = new kActivity();
      kActivit.trxno = "";
      kActivit.kioskCode = signalrConnection.kioskCode;
      kActivit.moduleID = 0;
      kActivit.submoduleID = undefined;
      kActivit.action = "Unit Holder Exists.";
      kActivit.startTime = new Date();
      kActivit.endTime = new Date();
      kActivit.status = false;

      appFunc.kioskActivity.push(kActivit);
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
  }

  noEmailCheck() {
    if (this.AR_Form.controls.noemail.value == false){
      this.AR_Form.controls.email.disable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Checked No Email.");
    }
    else{
      this.AR_Form.controls.email.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Unchecked No Email.");
    }
  }


  noTelephoneCheck() {
    if (this.AR_Form.controls.notelephone.value == false){
      this.AR_Form.controls.telephone.disable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Checked No Telephone.");
    }
    else{
      this.AR_Form.controls.telephone.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Unchecked No Telephone.");
    }
  }

  myKadAddress() {
    if (this.AR_Form.controls.mykadaddress.value == false){
      this.AR_Form.controls.address1.disable();
      this.AR_Form.controls.address2.disable();
      this.AR_Form.controls.postcode.disable();
      this.AR_Form.controls.city.disable();
      this.AR_Form.controls.state.disable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Checked MyKad Address.");
    }
    else{
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Unhecked MyKad Address.");
    }
  }

  bijakregistrationCancel() {
    this.BRForm_Visible = false;
    this.BRTNC_Visible = true;
  }

  bijakregistrationNext() {
    let x = 0
    Object.keys(this.AR_Form.controls).forEach(key => {
      if(this.AR_Form.controls[key].hasError('required')){
        x += 1;
      }
    })
    if (x > 0){
      console.log("Error");
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + `${x} field(s) empty.`);
    }
    else{
      let kActivit = new kActivity();
      kActivit.trxno = "";
      kActivit.kioskCode = signalrConnection.kioskCode;
      kActivit.moduleID = 0;
      kActivit.submoduleID = undefined;
      kActivit.action = "Bijak Registration Submit";
      kActivit.startTime = new Date();
      kActivit.endTime = new Date();
      kActivit.status = true;

      appFunc.kioskActivity.push(kActivit);
      this.AR_Form.controls.fullname.enable();
      this.AR_Form.controls.identificationcardno.enable();
      this.AR_Form.controls.dob.enable();
      this.AR_Form.controls.race.enable();
      this.AR_Form.controls.religion.enable();
      this.AR_Form.controls.g_memberid.enable();
      this.AR_Form.controls.g_fullname.enable();
      this.AR_Form.controls.g_identificationnumber.enable();
      this.AR_Form.controls.g_dob.enable();
      this.AR_Form.controls.g_race.enable();
      this.AR_Form.controls.g_religion.enable();
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      console.log(this.AR_Form.value);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Submitted Account Registration Form.");
    }
  }

}
