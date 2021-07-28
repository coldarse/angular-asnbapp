import { Component, ElementRef, OnInit, ViewChild, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { ServiceService } from '../_shared/service.service';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { errorCodes } from '../_models/errorCode';
import { accessToken } from '../_models/apiToken';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { WindowInterruptSource } from '@ng-idle/core';


declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

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

  transaction = "";

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
  form_relationships : any = appFunc.relationship;

  BTN_Cancel = "";
  BTN_MainMenu = "";

  BTN_Next = "";

  BTN_No = "";
  BTN_Yes = "";

  BTN_Print = "";
  BTN_Email = "";

  isMain = false;
  Email_Visible = true;
  Print_Visible = true;

  UD1_Visible = true;
  UDForm_Visible = false;
  UDBForm_Visible = false;
  UDConfirm_Visible = false;
  UDSuccess_Visible = false;

  UDBijak_Visible = false;

  UD_Print1Visible = false;
  UD_Print2Visible = false;
  UD_EmailVisible = false;
  transaction_Successful = false;


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
  homephone_Warning : boolean = false;
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

  pep = true;


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

    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Set 1 second interval to detect MyKad.");


    if(appFunc.isUpdateMajor == true){
      this.UpdateMainAccount();
      appFunc.isUpdateMajor = false;
    }

    if(appFunc.isRedirectFromPortalRegistration == true){
      this.UpdateMainAccount();
    }

    if(selectLang.selectedLang == 'en'){
      this.transaction = "Update Information";
    }else{
      this.transaction = "Kemaskini Maklumat";
    }

  }

  ngOnDestroy() {
    clearInterval(this.id);
    deleteKeyboard();
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
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

  disableJob() {
    this.AR_Form.controls.jobname.disable();
    this.AR_Form.controls.natureofjob.disable();
    this.AR_Form.controls.jobsector.disable();
    this.AR_Form.controls.monthlyincome.disable();
    this.AR_Form.controls.companyname.disable();
  }

  updateDetails1Cancel(){
    this._router.navigate(['feedbackscreen']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Redirect to Feedback Screen.");
  }

  updateDetails1MainMenu(){
    this._router.navigate(['transactionmenu']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Redirect to Transaction Menu.");
  }

  UpdateMainAccount(){
    this.isMain = true;

    this.initializeForm("major");
    this.UD1_Visible = false;
    this.UDForm_Visible = true;
    setTimeout(() => {
      loadKeyboard();
    }, 1000);

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Selected Update Main Account.");
  }

  UpdateMinor(selectedMinorDetails: any) {
    this.isMain = false;
    
    const body = {
      "CHANNELTYPE": signalrConnection.channelType,
      "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
      "DEVICEOWNER": signalrConnection.deviceOwner,
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
      let kActivit1 = new kActivity();
      kActivit1.trxno = signalrConnection.trxno;
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
      currentBijakHolder.cifstopaccountstatus = result.cifstopaccountstatus
      currentBijakHolder.typeclosed = result.typeclosed;
      currentBijakHolder.participateinasnbmkt = result.participateinasnbmkt;
      currentBijakHolder.unitbalance = result.unitbalance;
      currentBijakHolder.funddetail = result.funddetail;
      currentBijakHolder.cifnumber = result.cifnumber;
      currentBijakHolder.race = result.race;
      currentBijakHolder.religion = result.religion;
      currentBijakHolder.uhcategory = result.uhcategory;
      currentBijakHolder.title = result.title;
      currentBijakHolder.accountopeningdate = result.accountopeningdate;
      currentBijakHolder.investortype = result.investortype;
      currentBijakHolder.maritalstatus = result.maritalstatus;
      currentBijakHolder.addresslinE1 = result.addresslinE1;
      currentBijakHolder.addresslinE2 = result.addresslinE2;
      currentBijakHolder.addresslinE3 = result.addresslinE3;
      currentBijakHolder.addresslinE4 = result.addresslinE4;
      currentBijakHolder.country = result.country;
      currentBijakHolder.email = result.email;
      currentBijakHolder.zipcode = result.zipcode;
      currentBijakHolder.contactperson = result.contactperson;
      currentBijakHolder.telephonE1 = result.telephonE1;
      currentBijakHolder.telephonE2 = result.telephonE2;
      currentBijakHolder.cellphonenumber = result.cellphonenumber;
      currentBijakHolder.fax = result.fax;
      currentBijakHolder.dateofbirth = result.dateofbirth;
      currentBijakHolder.bankcode = result.bankcode;
      currentBijakHolder.bankbranchcode = result.bankbranchcode;
      currentBijakHolder.accounttype = result.accounttype;
      currentBijakHolder.accountnumber = result.accountnumber;
      currentBijakHolder.accountcurrency = result.accountcurrency;
      currentBijakHolder.fundcode = result.fundcode;
      currentBijakHolder.transactiontype = result.transactiontype;
      currentBijakHolder.directdebit = result.directdebit;
      currentBijakHolder.mothername = result.mothername;
      currentBijakHolder.portalenabled = result.portalenabled;				
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
      currentBijakHolder.epfnumber = result.epfnumber;
      currentBijakHolder.epfapplicable = result.epfapplicable;
      currentBijakHolder.epfaccounttype = result.epfaccounttype;
      currentBijakHolder.epfaccounttypeeffdate = result.epfaccounttypeeffdate;
      currentBijakHolder.agentcode  = result.agentcode;
      currentBijakHolder.branchcode  = result.branchcode;
      currentBijakHolder.occupation = result.occupation;
      currentBijakHolder.otherinfO8 = result.otherinfO8;
      currentBijakHolder.occupationsector = result.occupationsector;
      currentBijakHolder.occupationcategory = result.occupationcategory;
      currentBijakHolder.natureofbusiness = result.natureofbusiness;
      currentBijakHolder.companyname = result.companyname;
      currentBijakHolder.preferredmailmode = result.preferredmailmode;
      currentBijakHolder.fatca = result.fatca;
      currentBijakHolder.crs = result.crs;
      currentBijakHolder.pep = result.pep;
      currentBijakHolder.riskprofile = result.riskprofile;
      currentBijakHolder.relationship = result.relationship;
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
          errorCodes.accountName = currentBijakHolder.firstname;
          errorCodes.accountNo = currentBijakHolder.unitholderid;
          errorCodes.accountType = "Bijak/Remaja";
          errorCodes.transaction = this.transaction;
          this._router.navigate(['errorscreen']);
        }
        else{

          if(currentBijakHolder.unitholderid != "" || currentBijakHolder.unitholderid != undefined){
            
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update CIF]" + ": " + "Bijak Account Found.");
            this.initializeForm("minor");
            this.UD1_Visible = false;
            this.UDBForm_Visible = true;
            setTimeout(() => {
              loadKeyboard();
            }, 1000);
            appFunc.kioskActivity.push(kActivit1);
          }
        }

        
      }
      else{
        if (currentBijakHolder.rejectreason.includes('not exists')){
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update CIF]" + ": " + "No Bijak account found.");

          errorCodes.Ecode = currentBijakHolder.rejectcode;
          errorCodes.Emessage = currentBijakHolder.rejectreason;
          errorCodes.accountName = currentBijakHolder.firstname;
          errorCodes.accountNo = currentBijakHolder.unitholderid;
          errorCodes.accountType = "Bijak/Remaja";
          errorCodes.transaction = this.transaction;
          this._router.navigate(['errorscreen']);
        }
        else{
          errorCodes.Ecode = currentBijakHolder.rejectcode;
          errorCodes.Emessage = currentBijakHolder.rejectreason;
          errorCodes.accountName = currentBijakHolder.firstname;
          errorCodes.accountNo = currentBijakHolder.unitholderid;
          errorCodes.accountType = "Bijak/Remaja";
          errorCodes.transaction = this.transaction;
          this._router.navigate(['errorscreen']);
        }
      }

        
     });

     signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + `Selected Minor Account Balance. ${currentBijakHolder.firstname}, ${currentBijakHolder.identificationnumber}, ${currentBijakHolder.unitholderid}`);
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

      if(this.isMain){
        if(currentMyKadDetails.Address3 == ""){
          tempadd1 = currentMyKadDetails.Address1;
          tempadd2 = currentMyKadDetails.Address2;
        }else{
          tempadd1 = currentMyKadDetails.Address1 + ", " + currentMyKadDetails.Address2;
          tempadd2 = currentMyKadDetails.Address3;
        }
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
          }else if(this.state.toLowerCase().includes('persekutuan')){
            this.state = 'WI';
            break;
          }else{
            this.state = currentMyKadDetails.State.toString().replace(" ", "");
          }
        }
      }else{
        if(currentMyKidDetails.Address3 == ""){
          tempadd1 = currentMyKidDetails.Address1;
          tempadd2 = currentMyKidDetails.Address2;
        }else{
          tempadd1 = currentMyKidDetails.Address1 + ", " + currentMyKidDetails.Address2;
          tempadd2 = currentMyKidDetails.Address3;
        }
        this.city = currentMyKidDetails.City;
        for(var x of this.form_cities){
          if (x.name.toLowerCase().includes(this.city.toLowerCase())){
            this.city = x.name;
            break;
          }else{
            this.city = currentMyKidDetails.City;
          }
        }
        this.state = currentMyKidDetails.State.toString().replace(" ", "");
        for(var y of this.form_states){
          if (y.text.toLowerCase().includes(this.state.toLowerCase())){
            this.state = y.value;
            break;
          }
          else if(this.state.toLowerCase().includes('persekutuan')){
            this.state = 'WI';
            break;
          }else{
            this.state = currentMyKidDetails.State.toString().replace(" ", "");
          }
        }
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


  majorUpdateBack(){
    this.UDForm_Visible = false;
    this.UD1_Visible = true;

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Back.");
  }

  majorUpdateCancel(){
    this._router.navigate(['transactionmenu']);

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Cancel.");
  }

  ConfirmNo(){
    this.UDConfirm_Visible = false;
  }

  ConfirmYes(){
    if(this.AR_Form.controls.fatca.value == 'Y' || this.AR_Form.controls.crs.value == 'Y'){
      errorCodes.Ecode = "0118";
      errorCodes.Emessage = "FATCA/PEP/CRS selected.";
      if(this.isMain){
        errorCodes.accountName = currentHolder.firstname;
        errorCodes.accountNo = currentHolder.unitholderid;
        if(selectLang.selectedLang == 'ms'){
          errorCodes.accountType = "Dewasa";
        }else{
          errorCodes.accountType = "Dewasa";
        }
        errorCodes.transaction = this.transaction;
        this._router.navigate(['errorscreen']);
      }else{
        errorCodes.accountName = currentBijakHolder.firstname;
        errorCodes.accountNo = currentBijakHolder.unitholderid;
        errorCodes.accountType = "Bijak/Remaja";
        errorCodes.transaction = this.transaction;
        this._router.navigate(['errorscreen']);
      }
    }else{
      if(this.isMain){
        let kActivit = new kActivity();
        kActivit.trxno = signalrConnection.trxno;
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 3;
        kActivit.submoduleID = undefined;
        kActivit.action = "Update Major CIF.";
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

        if(this.AR_Form.controls.city.value == ""){
          this.AR_Form.controls.city.value = 'NA';
        }

        const body = {
          "CHANNELTYPE":signalrConnection.channelType,
          "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
          "DEVICEOWNER":signalrConnection.deviceOwner,
          "UNITHOLDERID": currentHolder.unitholderid,
          "IDENTIFICATIONTYPE":currentMyKadDetails.CategoryType,
          "IDENTIFICATIONNUMBER":currentMyKadDetails.ICNo,
          "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
          "OCCUPATION":this.AR_Form.controls.jobname.value,
          "EMAIL":this.AR_Form.controls.email.value,
          "OTHERINFO8":this.AR_Form.controls.monthlyincome.value,
          "OCCUPATIONSECTOR":this.AR_Form.controls.jobsector.value,
          "OCCUPATIONCATEGORY":this.AR_Form.controls.jobcategory.value,
          "NATUREOFBUSINESS":this.AR_Form.controls.natureofjob.value,
          "CELLPHONENUMBER" :this.AR_Form.controls.telephone.value,
          "TELEPHONE1": this.AR_Form.controls.homenumber.value,
          "ADDRESSLINE1": this.AR_Form.controls.address1.value,
          "ADDRESSLINE2":this.AR_Form.controls.address2.value,
          "ADDRESSLINE3":this.AR_Form.controls.city.value,
          "ADDRESSLINE4":this.AR_Form.controls.state.value,
          "ZIPCODE":this.AR_Form.controls.postcode.value,
          "COMPANYNAME": this.AR_Form.controls.companyname.value,
          "TITLE":this.AR_Form.controls.salutation.value,
          "BANKCODE":this.AR_Form.controls.bankname.value,
          "ACCOUNTNUMBER":this.AR_Form.controls.bankaccount.value,
          "GUARDIANID":"",
          "FATCA":this.AR_Form.controls.fatca.value,
          "CRS":this.AR_Form.controls.crs.value,
          "PEP":this.AR_Form.controls.pep.value,
          "PARTICIPATEINASNBMKT":this.AR_Form.controls.news.value,
          "PREFERREDMAILMODE":this.AR_Form.controls.deliverystate.value,
          "AGENTCODE":signalrConnection.agentCode,
          "BRANCHCODE":signalrConnection.branchCode,
          "BANKBRANCHCODE": this.AR_Form.controls.bankname.value + "14001"
        }

        this.serviceService.updateDetails(body).subscribe((data: any) => {
          if(data.result.transactionstatus.toLowerCase().includes('successful')){
            kActivit.endTime = new Date();
            kActivit.status = true;

            appFunc.kioskActivity.push(kActivit);
            if (this.AR_Form.controls.email.value == "NA"){
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
    
            this.UDForm_Visible = false;
            this.UDSuccess_Visible = true;
            this.UDConfirm_Visible = false;
          }else{
            kActivit.endTime = new Date();
            kActivit.status = false;

            appFunc.kioskActivity.push(kActivit);
            errorCodes.Ecode = data.result.rejectcode;
            errorCodes.Emessage = data.result.rejectreason;
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            if(selectLang.selectedLang == 'ms'){
              errorCodes.accountType = "Dewasa";
            }else{
              errorCodes.accountType = "Dewasa";
            }
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
        });

        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update CIF]" + ": " + "Submitted Update Account Form.");
      
      }else{
        let kActivit = new kActivity();
        kActivit.trxno = signalrConnection.trxno;
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 3;
        kActivit.submoduleID = undefined;
        kActivit.action = "Update Bijak CIF.";
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

        if(this.AR_Form.controls.city.value == ""){
          this.AR_Form.controls.city.value = 'NA';
        }

        const body = {
          "CHANNELTYPE":signalrConnection.channelType,
          "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
          "DEVICEOWNER":signalrConnection.deviceOwner,
          "UNITHOLDERID": currentBijakHolder.unitholderid,
          "IDENTIFICATIONTYPE":"W",
          "IDENTIFICATIONNUMBER":currentBijakHolder.identificationnumber,
          "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
          "OCCUPATION":this.AR_Form.controls.jobname.value,
          "EMAIL":this.AR_Form.controls.email.value,
          "OTHERINFO8":this.AR_Form.controls.monthlyincome.value,
          "OCCUPATIONSECTOR":this.AR_Form.controls.jobsector.value,
          "OCCUPATIONCATEGORY":this.AR_Form.controls.jobcategory.value,
          "NATUREOFBUSINESS":this.AR_Form.controls.natureofjob.value,
          "CELLPHONENUMBER" :this.AR_Form.controls.telephone.value,
          "TELEPHONE1": this.AR_Form.controls.homenumber.value,
          "ADDRESSLINE1": this.AR_Form.controls.address1.value,
          "ADDRESSLINE2":this.AR_Form.controls.address2.value,
          "ADDRESSLINE3":this.AR_Form.controls.city.value,
          "ADDRESSLINE4":this.AR_Form.controls.state.value,
          "ZIPCODE":this.AR_Form.controls.postcode.value,
          "COMPANYNAME": this.AR_Form.controls.companyname.value,
          "TITLE":this.AR_Form.controls.salutation.value,
          "BANKCODE":this.AR_Form.controls.bankname.value,
          "ACCOUNTNUMBER":this.AR_Form.controls.bankaccount.value,
          "GUARDIANID":currentBijakHolder.guardianid,
          "FATCA":this.AR_Form.controls.fatca.value,
          "CRS":this.AR_Form.controls.crs.value,
          "PEP":this.AR_Form.controls.pep.value,
          "PARTICIPATEINASNBMKT":this.AR_Form.controls.news.value,
          "PREFERREDMAILMODE":this.AR_Form.controls.deliverystate.value,
          "AGENTCODE":signalrConnection.agentCode,
          "BRANCHCODE":signalrConnection.branchCode,
          "BANKBRANCHCODE": this.AR_Form.controls.bankname.value + "14001",
          "RELATIONSHIP":this.AR_Form.controls.g_relation.value,
        }

        this.serviceService.updateDetails(body).subscribe((data: any) => {
          if(data.result.transactionstatus.toLowerCase().includes('successful')){
            kActivit.endTime = new Date();
            kActivit.status = true;

            appFunc.kioskActivity.push(kActivit);
            if (this.AR_Form.controls.email.value == "NA"){
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
    
            this.UDBForm_Visible = false;
            this.UDSuccess_Visible = true;
            this.UDConfirm_Visible = false;
          }else{
            kActivit.endTime = new Date();
            kActivit.status = false;

            appFunc.kioskActivity.push(kActivit);
            errorCodes.Ecode = data.result.rejectcode;
            errorCodes.Emessage = data.result.rejectreason;
            errorCodes.accountName = currentBijakHolder.firstname;
            errorCodes.accountNo = currentBijakHolder.unitholderid;
            errorCodes.accountType = "Bijak/Remaja";
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
        });

        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Registration]" + ": " + "Submitted Bijak Registration Form.");
      
      }
    }
  }

  majorUpdateNext(){
    closeKeyboard();
    // let a1 = this.AR_Form.get('address1').value;
    // let a2 = this.AR_Form.get('address2').value;
    // let postcode = this.AR_Form.get('postcode').value;
    // let city = this.AR_Form.get('city').value;
    // let state = this.AR_Form.get('state').value;

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

    // this.AR_Form.controls.address1.setValue(a1);
    // this.AR_Form.controls.address2.setValue(a2);
    // this.AR_Form.controls.postcode.setValue(postcode);
    // this.AR_Form.controls.city.setValue(city);
    // this.AR_Form.controls.state.setValue(state);


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
    })
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      window.scroll(0,0);
      this.UDConfirm_Visible = true;
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

      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Submit.");
    }
  }

  bijakUpdateBack(){
    this.UDBForm_Visible = false;
    this.UD1_Visible = true;

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Cancel.");
  }

  bijakUpdateCancel(){
    this._router.navigate(['transactionmenu']);

    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Cancel.");
  }
  
  bijakUpdateNext(){
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
    })
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + `Bijak Form: ${x} field(s) empty.`);
    }
    else{
      window.scroll(0,0);
      this.UDConfirm_Visible = true;
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
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Submit.");
    }
  }

  formHandling(code: any){
    this.enableJob();



    if(currentHolder.telephonE1 == "null"){
      this.AR_Form.controls.homenumber.setValue("");
    }

    if(currentHolder.cellphonenumber == ""){
      this.AR_Form.controls.telephone.setValue("");
      this.AR_Form.controls.telephone.disable();
      this.AR_Form.controls.notelephone.setValue(true);
    }

    if(currentHolder.email == ""){
      if(signalrConnection.kioskType == 'Mobile'){
        this.AR_Form.controls.email.setValue("");
        this.AR_Form.controls.email.enable();
      }else{
        this.AR_Form.controls.email.setValue("");
        this.AR_Form.controls.email.disable();
        this.AR_Form.controls.noemail.setValue(true);
        this.AR_Form.controls.deliverystate.setValue('ST');
        this.AR_Form.controls.deliverystate.disable();
      }
    }

    if(currentHolder.pep == 'Y'){
      this.AR_Form.controls.pep.disable();
    }else{
      this.AR_Form.controls.pep.enable();
    }

    if(this.isMain){
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
    }else{
      this.disableJob();
    }
    

  }

  initializeForm(acctType: string){

    if(currentHolder.pep == 'Y'){
      this.pep = true
    }
    else{
      this.pep = false;
    }


    
    let isMobile = false;
    if(signalrConnection.kioskType == 'Mobile'){
      isMobile = true;
    }

    

    if (acctType == 'major'){

    

      let fatca = false;
      if(currentHolder.fatca == 'Y'){
        fatca = true
      }
      else{
        fatca = false;
      }

      let crs = false;
      if(currentHolder.crs == 'Y'){
        crs = true
      }
      else{
        crs = false;
      }

      let isNaMobile = currentHolder.cellphonenumber;
      if(isNaMobile == 'NA'){
        isNaMobile = "";
      }

      let isNaHome = currentHolder.telephonE1;
      if(isNaHome == 'NA'){
        isNaHome = "";
      }

      let isNaEmail = currentHolder.email;
      if(isNaEmail == 'NA'){
        isNaEmail = "";
      }

      let isNACity = currentHolder.addresslinE3;
      if(isNACity == 'NA'){
        isNACity = "";
      }


      this.AR_Form = this.fb.group(
        {
          uhid: [{value: currentHolder.unitholderid, disabled: true}],
          salutation: [currentHolder.title],
          fullname: [{value: currentHolder.firstname, disabled: true}],
          identificationcardno: [{value: currentHolder.identificationnumber, disabled: true}],
          dob: [{value: currentHolder.dateofbirth, disabled: true}],
          race: [{value: currentHolder.race, disabled: true}],
          religion: [{value: currentHolder.religion, disabled: true}],

          address1 : [{value: currentHolder.addresslinE1, disabled: false}, Validators.required],
          address2 : [{value: currentHolder.addresslinE2, disabled: false}, Validators.required],
          postcode : [{value: currentHolder.zipcode, disabled: false}, Validators.required],
          city : [{value: isNACity, disabled: false}],
          state : [{value: currentHolder.addresslinE4, disabled: false}],
          mykadaddress: [false],

          homenumber : [isNaHome, Validators.minLength(6)],
          telephone: [isNaMobile , [Validators.required, Validators.minLength(6)]],
          notelephone: [false],

          email: [{value: isNaEmail, disabled: false}, [
            Validators.required,
            Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          noemail: [{value: false, disabled: isMobile}],
          deliverystate: [currentHolder.preferredmailmode],

          bankname: [currentHolder.bankcode == undefined ? "" : currentHolder.bankcode],
          bankaccount: [currentHolder.accountnumber, (Validators.required, Validators.minLength(6))],

          jobcategory: [currentHolder.occupationcategory],
          jobname: [currentHolder.occupation],
          natureofjob: [currentHolder.natureofbusiness],
          jobsector: [currentHolder.occupationsector],
          monthlyincome: [currentHolder.otherinfO8],
          companyname: [currentHolder.companyname, Validators.required],

          fatca: [{value: currentHolder.fatca, disabled: fatca}],
          pep: [currentHolder.pep],
          news: [{value: currentHolder.participateinasnbmkt, disabled: false}],
          crs: [{value: currentHolder.crs, disabled: crs}],
        });
        this.formHandling(currentHolder.occupationcategory);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Initialized Major Form")
    }
    else if (acctType == 'minor'){

      let fatca = false;
      if(currentBijakHolder.fatca == 'Y'){
        fatca = true
      }
      else{
        fatca = false;
      }

      let crs = false;
      if(currentBijakHolder.crs == 'Y'){
        crs = true
      }
      else{
        crs = false;
      }

      let isNaMobile = currentBijakHolder.cellphonenumber;
      if(isNaMobile == 'NA'){
        isNaMobile = "";
      }

      let isNaHome = currentBijakHolder.telephonE1;
      if(isNaHome == 'NA'){
        isNaHome = "";
      }

      let isNaEmail = currentBijakHolder.email;
      if(isNaEmail == 'NA'){
        isNaEmail = "";
      }

      let isNACity = currentHolder.addresslinE3;
      if(isNACity == 'NA'){
        isNACity = "";
      }

      this.AR_Form = this.fb.group(
        {
          uhid: [{value: currentBijakHolder.unitholderid, disabled: true}],
          salutation: [currentBijakHolder.title],
          fullname: [{value: currentBijakHolder.firstname, disabled: true}],
          identificationcardno: [{value: currentBijakHolder.identificationnumber, disabled: true}],
          dob: [{value: currentBijakHolder.dateofbirth, disabled: true}],
          race: [{value: currentBijakHolder.race, disabled: true}],
          religion: [{value: currentBijakHolder.religion, disabled: true}],

          g_memberid: [{value: currentHolder.unitholderid, disabled: true}],
          g_salution: [currentHolder.title],
          g_fullname: [{value: currentHolder.firstname, disabled: true}],
          g_identificationnumber: [{value: currentHolder.identificationnumber, disabled: true}],
          g_dob: [{value: currentHolder.dateofbirth, disabled: true}],
          g_race: [{value: currentHolder.race, disabled: true}],
          g_religion: [{value: currentHolder.religion, disabled: true}],
          g_relation: [{value: currentBijakHolder.relationship == undefined || currentBijakHolder.relationship == "" ? 'F' : currentBijakHolder.relationship, disabled: false}],

          address1 : [{value: currentHolder.addresslinE1, disabled: true}],
          address2 : [{value: currentHolder.addresslinE2, disabled: true}],
          postcode : [{value: currentHolder.zipcode, disabled: true}],
          city : [{value: isNACity, disabled: true}],
          state : [{value: currentHolder.addresslinE4, disabled: true}],
          mykadaddress: [{value: true, disabled: true}],

          homenumber : [{value: isNaHome, disabled: true}],
          telephone: [isNaMobile, Validators.required],

          notelephone: [false],

          email: [{value: isNaEmail, disabled: false}, [
            Validators.required,
            Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          noemail: [{value: false, disabled: isMobile}],
          deliverystate: [currentBijakHolder.preferredmailmode],

          bankname: [{value: currentHolder.bankcode == undefined ? "" : currentHolder.bankcode, disabled: true}],
          bankaccount: [{value: currentHolder.accountnumber, disabled: true}],

          jobcategory: [{value: currentHolder.occupationcategory, disabled: true}],
          jobname: [{value: currentHolder.occupation, disabled: true}],
          natureofjob: [{value: currentHolder.natureofbusiness, disabled: true}],
          jobsector: [{value: currentHolder.occupationsector, disabled: true}],
          monthlyincome: [{value: currentHolder.otherinfO8, disabled: true}],
          companyname: [{value: currentHolder.companyname, disabled: true}],

          fatca: [{value: currentBijakHolder.fatca, disabled: fatca}],
          pep: [currentHolder.pep],
          news: [{value: currentHolder.participateinasnbmkt, disabled: false}],
          crs: [{value: currentBijakHolder.crs, disabled: crs}],
        });
        this.formHandling(currentHolder.occupationcategory);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Initialized Bijak Form")
    }
    
  }  

  Print(){

    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
        this.UDSuccess_Visible = false;
        this.UD_Print1Visible = true;
    
        let name = "";
        let accountNo = "";
        let accountType = "";
        
        if (this.isMain){
          name = currentHolder.firstname;
          accountNo = currentHolder.unitholderid;
          if(selectLang.selectedLang == 'en'){
            accountType = "Dewasa";
          }else{
            accountType = "Dewasa";
          }
        }else{
          name = currentBijakHolder.firstname;
          accountNo = currentBijakHolder.unitholderid;
          accountType = "Bijak/Remaja";
        }

        let transaction = "";
        if(selectLang.selectedLang == 'en'){
          transaction = "Update Information";
        }else{
          transaction = "Kemaskini Maklumat";
        }
    
        const body = {
          "Transaksi": transaction,
          "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Lokasi": signalrConnection.branchName,
          "Name": name,
          "NoAkaun": accountNo,
          "JenisAkaun": accountType
        }
    
        //GetNonFinancialTransactionPrintout
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(body), "GetNonFinancialTransactionPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              this.UD_Print1Visible = false;
              this.UD_Print2Visible = true;
              setTimeout(()=>{   
                if(this.isMain){
                  this.getAccountInquiryMajor();
                }
                else{
                  this.getAccountInquiryMinor();
                }
              }, 3000);
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
    this.UDSuccess_Visible = false;
    this.UD_EmailVisible = true;

    let name = "";
    let accountNo = "";
    let accountType = "";
    
    if (this.isMain){
      name = currentMyKadDetails.Name;
      accountNo = currentHolder.unitholderid;
      if(selectLang.selectedLang == 'en'){
        accountType = "Dewasa";
      }else{
        accountType = "Dewasa";
      }
    }else{
      name = currentBijakHolder.firstname;
      accountNo = currentBijakHolder.unitholderid;
      accountType = "Bijak/Remaja";
    }

    let transaction = "";
    if(selectLang.selectedLang == 'en'){
      transaction = "Update Information";
    }else{
      transaction = "Kemaskini Maklumat";
    }

    const body = {
      "Transaksi": transaction,
      "Tarikh": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Masa": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Lokasi": signalrConnection.branchName,
      "Name": name,
      "NoAkaun": accountNo,
      "JenisAkaun": accountType
    }

    const emailObj = {
      "Name" : currentHolder.firstname,
      "UnitHolderID" : currentHolder.unitholderid,
      "Module" : "3",
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : currentHolder.identificationnumber
    }

    let tempEmail = "";
    if(this.isMain){
      tempEmail = this.AR_Form.controls.email.value;
    }
    else{
      tempEmail = currentHolder.email;
    }

    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(body), accessToken.token, tempEmail, "GetNonFinancialTransactionPrintout", signalrConnection.trxno, "3", JSON.stringify(emailObj)).then((data: any) => {
      // setTimeout(()=>{   
      //   if (data == true){
      //     setTimeout(()=>{   
      //       this.UD_EmailVisible = false;
      //       if(this.isMain){
      //         this.getAccountInquiryMajor();
      //       }
      //       else{
      //         this.getAccountInquiryMinor();
      //       }
      //     }, 3000);
      //   }else{
      //     errorCodes.Ecode = "0069";
      //     errorCodes.Emessage = "Email Failed";
      //     this._router.navigate(['errorscreen']);
      //   }
      // }, 3000);
    });

    setTimeout(()=>{   
      this.UD_EmailVisible = false;
      if(this.isMain){
        this.getAccountInquiryMajor();
      }
      else{
        this.getAccountInquiryMinor();
      }
    }, 5000);
  }

  getAccountInquiryMajor(): void{
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
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            if(selectLang.selectedLang == 'ms'){
              errorCodes.accountType = "Dewasa";
            }else{
              errorCodes.accountType = "Dewasa";
            }
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
          else{
            if(currentHolder.unitholderid != "" || currentHolder.unitholderid != undefined){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Account Found.");

              if(appFunc.isRedirectFromPortalRegistration == true){
                this._router.navigate(['portalregistration']);
              }
              else if(appFunc.isRedirectFromRedemption == true){
                this._router.navigate(['redemption']);
              }
              else{
                this.UD_Print1Visible = false;
                this.UD_Print2Visible = false;
                this.UD_EmailVisible = false;

                this.transaction_Successful = true;
                //this._router.navigate(['transactionsuccessful']);
              }
              
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
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            if(selectLang.selectedLang == 'ms'){
              errorCodes.accountType = "Dewasa";
            }else{
              errorCodes.accountType = "Dewasa";
            }
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

  getAccountInquiryMinor(): void{
    try{

      const body = { 

        "CHANNELTYPE":signalrConnection.channelType,
        "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
        "DEVICEOWNER": signalrConnection.deviceOwner,
        "UNITHOLDERID": "",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": "W",
        "IDENTIFICATIONNUMBER": currentBijakHolder.identificationnumber,
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

        if (currentBijakHolder.transactionstatus.toLowerCase().includes('successful')){

          if (!currentBijakHolder.typeclosed.toLowerCase().includes('n')){
            errorCodes.Ecode = "0168";
            errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
            errorCodes.accountName = currentBijakHolder.firstname;
            errorCodes.accountNo = currentBijakHolder.unitholderid;
            errorCodes.accountType = "Bijak/Remaja";
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
          else{
            if(currentBijakHolder.unitholderid != "" || currentBijakHolder.unitholderid != undefined){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "Account Found.");

              
              this.UD_Print1Visible = false;
              this.UD_Print2Visible = false;
              this.UD_EmailVisible = false;

              this.transaction_Successful = true;
              //this._router.navigate(['transactionsuccessful']);
            }
          }
        }
        else{
          if (currentBijakHolder.rejectreason.includes('not exists')){
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "No account found.");

            
            this._router.navigate(['feedbackscreen']);
          }
          else{
            errorCodes.Ecode = currentBijakHolder.rejectcode;
            errorCodes.Emessage = currentBijakHolder.rejectreason;
            errorCodes.accountName = currentBijakHolder.firstname;
            errorCodes.accountNo = currentBijakHolder.unitholderid;
            errorCodes.accountType = "Bijak/Remaja";
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
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
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
