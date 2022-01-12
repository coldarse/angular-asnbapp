import { formatDate } from '@angular/common';
import { Component, ElementRef, ModuleWithComponentFactories, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { FakeMissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import { SignalR } from 'ng2-signalr';
import * as CryptoJS from 'crypto-js'; 

import { AppConfiguration } from '../config/app-configuration';
import { accessToken } from '../_models/apiToken';
import { appFunc } from '../_models/appFunctions';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { ASNBFundID, icType, reasonTransfer, thirdpartyRelationship } from '../_models/dropDownLists';
import { errorCodes } from '../_models/errorCode';
import { kActivity } from '../_models/kActivity';
import { selectLang } from '../_models/language';
import { signalrConnection } from '../_models/signalr';
import { ServiceService } from '../_shared/service.service';

declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

@Component({
  selector: 'app-subscriptioninvestment',
  templateUrl: './subscriptioninvestment.component.html',
  styleUrls: ['./subscriptioninvestment.component.css']
})
export class SubscriptioninvestmentComponent implements OnInit {

  @ViewChild('amount') amount : ElementRef | undefined;
  @ViewChild('source') source : ElementRef | undefined;
  @ViewChild('fundername') fundername : ElementRef | undefined;

  @ViewChild('thirdictype') thirdictype : ElementRef | undefined;
  @ViewChild('thirdicno') thirdicno : ElementRef | undefined;
  @ViewChild('thirduhid') thirduhid : ElementRef | undefined;
  @ViewChild('thirdname') thirdname : ElementRef | undefined;
  @ViewChild('thirdreason') thirdreason : ElementRef | undefined;
  @ViewChild('thirdrelationship') thirdrelationship : ElementRef | undefined;
  @ViewChild('thirdfundname') thirdfundname : ElementRef | undefined;
  @ViewChild('thirdamount') thirdamount : ElementRef | undefined;
  @ViewChild('thirdsource') thirdsource : ElementRef | undefined;
  @ViewChild('othersource') othersource : ElementRef | undefined;

  pdfsrc1 = "assets/Kiosk_TnC_Financial_Transaction_V.01_2021.pdf";
  pdfsrc2 = "assets/Investment_Notice_Kiosk_v4.pdf";
  pdfsrc3 = "assets/ASNB_MasterProspectus.pdf";
  TermsAndConditions = false;
  InvestmentDisclaimer = false;
  MinimumCriteria = false;
  isHistorical = true;

  isSubscriptionMajor = false;
  isSubscriptionMinor = false;
  isSubscriptionThird = false;
  isInvestmentMajor = false;
  isInvestmentMinor = false;

  displayReason = "";
  displayRelationship = "";
  displayFundname = "";
  displayICType = "";

  isSubscription = false;
  isInvestment = false;
  isOwn = false;
  isBijak = false;
  isThird = false;

  BijakVisible = false;

  ic12digit = false;
  id12digit = false;


  SIStep1 = false;
  SIStep2 = false;
  SIStep3 = false;
  SIStep4 = false;
  SIStep5 = false;
  SIStep6 = false;

  Print1_Visible = false;
  Print2_Visible = false;
  EmailPage_Visible = false;
  transaction_Successful = false;

  tempCardInfo: any;
  
  STPStep1 = false;
  STPStep2 = false;
  STPStep3 = false;

  Print_Visible = true;
  Email_Visible = true;

  disagreedTNC = false;

  amountWarning = false;
  amountWarning1 = false;
  amountWarning2 = false;
  funderWarning = false;

  thirdicnoWarning = false;
  thirduhidWarning = false;
  thirdnameWarning = false;
  thirdamountWarning = false;
  thirdreasonWarning = false;
  thirdrelationshipWarning = false;
  thirdfundWarning = false;
  sourceFundWarning = false;
  thirdictypeWarning = false;
  otherWarning = false;

  unitholderid = "";  
  unitholdername = "";
  unitholderic = "";

  fundSource = appFunc.fundSource;
  reason = appFunc.reasonTransfer;
  relationship = appFunc.thirdPartyRelationship;
  ictype = appFunc.ictype;
  fundnamelist: any;

  isGetInfo = false;

  
  status = "Successful";
  approvalcode = "";
  accounttype = "";
  amountKeyed = 0;
  fundid = "ASN";
  fundname = "";
  refno = "";
  nav = 0;
  sst = 0;
  unitsalloted = 0;
  initialcharges = 0;
  feepercentage = "";
  sourceOfFund = "";
  otherSourceOfFund = "";
  sourceOther = "";

  ispopup = false;

  sameUH = false;
  

  paymentStep1 = true;
  paymentStep2 = false;
  paymentStep3 = false;
  paymentStep4 = false;

  thirdictypekeyed = "";
  thirdicnokeyed = "";
  thirduhidkeyed = "";
  thirdnamekeyed = "";
  thirdreasonkeyed = "";
  thirdrelationshipkeyed = "";
  thirdfundnamekeyed = "";
  thirdamountkeyed = 0;

  transaction = "";
  currentBijakUHID = "";
  currentBijakIDNO = "";
  currentBijakIDType = "";
  currentBijakName = "";

  InvestmentMinValue = 0.00;
  InvestmentMaxValue = 0.00;
  SubscriptionMinValue = 0.00;
  SubscriptionMaxValue = 0.00;

  uhNotExist = false;

  isClicked = false;

  Form_1: any;
  Form_2: any;
  Form_3: any;
  Form_4: any;

  showSOF = false;
  showFunderName = false;
  showOtherSource = true;

  variableFunds: any = [];
  fixedFunds: any = [];

  testing = [];

  moduleid = 0;
  action = "";


  isloadedfunds = false;

  mDetails = currentHolder.minordetail;

  amountOrunit = false;
  CCinformation : any;

  requeryInfo: any;

  id: any; 

  isRequery = false;

  isInvest = false;

  
  constructor(
    private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private serviceService : ServiceService,
    private appConfig: AppConfiguration
  ) { }


  checkAMLA(){
    let faultCode = "";
    let faultString = "";

    if(appFunc.isOwn == "bijak"){
      if(currentBijakHolder.riskprofile == ""){
        const AMLABody = 
        {
          "AuthUser": "AMLSVC",
          "AuthPswd": "AMLSVC",
          "Username": "Kiosk",
          "BrCode": signalrConnection.branchCode,
          "SysName": "Kiosk",
          "ScanOption": "5",
          "UniqueNo": currentBijakHolder.unitholderid,
          "SearchName": currentBijakHolder.firstname,
          "SearchCountry": "MY",
          "SearchDOB": currentBijakHolder.dateofbirth,
          "SearchID": currentBijakHolder.identificationnumber,
          "PassportVerify": "0",
          "SecurityNo1": "0",
          "PassExpiryDtVerify": "0",
          "PassExpiryDate": "0",
          "SecurityNo2": "0",
          "RiskFactors": `1#${currentBijakHolder.occupation}|${currentBijakHolder.occupationsector}|${currentBijakHolder.occupationcategory}|${currentBijakHolder.natureofbusiness}|${currentBijakHolder.otherinfO8}|${currentBijakHolder.pep}|${this.fundid}|${currentBijakHolder.branchcode}||`, 
          "Content": "",
          "RtnHit": "",
          "RtnScanID": 0,
          "RtnEnCryptScanID": ""
        }

        this.serviceService.postAMLA(AMLABody).subscribe((data: any) => {
          faultCode = data.result.faultCode;
          faultString = data.result.faultString;
          currentBijakHolder.riskprofile = data.result.rtnHit;
          if(currentBijakHolder.riskprofile == "HI"){
            //Error screen?
            errorCodes.Ecode = currentBijakHolder.riskprofile;
            errorCodes.Emessage = currentBijakHolder.riskprofile;
            errorCodes.accountType = "Bijak/Remaja";
            errorCodes.accountName = currentBijakHolder.firstname;
            errorCodes.accountNo = currentBijakHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
          else if(!data.result.rtnHit){
            errorCodes.Ecode = faultCode;
            errorCodes.Emessage = faultString;
            errorCodes.accountType = "Dewasa";
            errorCodes.accountName = currentBijakHolder.firstname;
            errorCodes.accountNo = currentBijakHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
        });
      }
      else if(currentBijakHolder.riskprofile == "HI"){
        //Error screen?
        errorCodes.Ecode = currentBijakHolder.riskprofile;
        errorCodes.Emessage = currentBijakHolder.riskprofile;
        errorCodes.accountType = "Bijak/Remaja";
        errorCodes.accountName = currentBijakHolder.firstname;
        errorCodes.accountNo = currentBijakHolder.unitholderid;
        errorCodes.transaction = this.transaction;
        this._router.navigate(['errorscreen']);
      }
    }
    else{
      if(currentHolder.riskprofile == ""){
        const AMLABody = 
        {
          "AuthUser": "AMLSVC",
          "AuthPswd": "AMLSVC",
          "Username": "Kiosk",
          "BrCode": signalrConnection.branchCode,
          "SysName": "Kiosk",
          "ScanOption": "5",
          "UniqueNo": currentHolder.unitholderid,
          "SearchName": currentHolder.firstname,
          "SearchCountry": "MY",
          "SearchDOB": currentHolder.dateofbirth,
          "SearchID": currentHolder.identificationnumber,
          "PassportVerify": "0",
          "SecurityNo1": "0",
          "PassExpiryDtVerify": "0",
          "PassExpiryDate": "0",
          "SecurityNo2": "0",
          "RiskFactors": `1#${currentHolder.occupation}|${currentHolder.occupationsector}|${currentHolder.occupationcategory}|${currentHolder.natureofbusiness}|${currentHolder.otherinfO8}|${currentHolder.pep}|${this.fundid}|${currentHolder.branchcode}||`, 
          "Content": "",
          "RtnHit": "",
          "RtnScanID": 0,
          "RtnEnCryptScanID": ""
        }

        this.serviceService.postAMLA(AMLABody).subscribe((data: any) => {
          faultCode = data.result.faultCode;
          faultString = data.result.faultString;
          currentHolder.riskprofile = data.result.rtnHit;
          if(data.result.rtnHit == "HI"){
            //Error screen?
            errorCodes.Ecode = currentHolder.riskprofile;
            errorCodes.Emessage = currentHolder.riskprofile;
            errorCodes.accountType = "Dewasa";
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
          else if(!data.result.rtnHit){
            errorCodes.Ecode = faultCode;
            errorCodes.Emessage = faultString;
            errorCodes.accountType = "Dewasa";
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
        });
      }
      else if(currentHolder.riskprofile == "HI"){
        //Error screen?
        errorCodes.Ecode = currentHolder.riskprofile;
        errorCodes.Emessage = currentHolder.riskprofile;
        errorCodes.accountType = "Dewasa";
        errorCodes.accountName = currentHolder.firstname;
        errorCodes.accountNo = currentHolder.unitholderid;
        errorCodes.transaction = this.transaction;
        this._router.navigate(['errorscreen']);
      }
    }
  }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    this.initializeForm1();
    this.fundnamelist = [];

    this.isInvest = appFunc.isInvesment;


    currentHolder.funddetail.forEach((elem: any) => {
      appFunc.ASNBFundID.forEach((element: any) => {
        if(elem.FUNDID != undefined){
          if(elem.FUNDID.toString().toLowerCase() == element.code.toString().toLowerCase()){
            this.fundnamelist.push(element);
          }
        }
      })
    });

    if(selectLang.selectedLang == 'en'){
      if(appFunc.isInvesment){
        this.transaction = "Initial Investment";
      }else{
        this.transaction = "Additional Investment";
      }
    }else{
      if(appFunc.isInvesment){
        this.transaction = "Pelaburan Permulaan";
      }else{
        this.transaction = "Pelaburan Tambahan";
      }
    }

    
    if(appFunc.isInvesment){
      this.isInvestment = true;
      this.disagreedTNC = true;
      
      if(appFunc.isOwn == "major"){
        this.moduleid = 9;
        this.action = "Perform Initial Investment for Major";
        this.checkAMLA();
        this.isInvestmentMajor = true;
        this.isOwn = true;
        this.SIStep1 = true;

        const body =
        {
          "CHANNELTYPE": signalrConnection.channelType,
          "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
          "DEVICEOWNER": signalrConnection.deviceOwner,
          "REQUESTDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "REQUESTTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "UNITHOLDERID": currentHolder.unitholderid,
          "IDENTIFICATIONTYPE": currentHolder.identificationtype,
          "IDENTIFICATIONNUMBER": currentHolder.identificationnumber,
          "FUNDLISTTYPE":"N",
          "LANGUAGE": selectLang.selectedLang
        }

        this.variableFunds = [];
        this.fixedFunds = [];


        this.serviceService.postEligibleFunds(body)
        .subscribe((result: any) => {
          
          result.result.fundid.forEach((elem1: string) => {
            appFunc.ASNBFundID.forEach((elem2: ASNBFundID) => {
              if(elem1.toString() == elem2.code.toString()){
                if(elem2.fundType == "Variable"){
                  this.variableFunds.push(elem1);
                }else{
                  this.fixedFunds.push(elem1);
                }
              }
            });
          });

          console.log(this.variableFunds);
          console.log(this.fixedFunds);
          this.isloadedfunds = true;
        });
        
      }else if(appFunc.isOwn == "bijak"){
        this.moduleid = 10;
        this.action = "Perform Initial Investment for Minor";
        this.isInvestmentMinor = true;
        this.isBijak = true;
        if(appFunc.isFromReg){
          appFunc.isFromReg = !appFunc.isFromReg;
          const minorbody = {
            "ICTYPE": currentBijakHolder.identificationtype,
            "ICNO": currentBijakHolder.identificationnumber,
            "UHID": currentBijakHolder.unitholderid,
            "NAME": currentBijakHolder.firstname,
          }

          this.Minor(minorbody);
        }
        else{
          this.BijakVisible = true;
        }
      }
    }else{

      this.isSubscription = true;
      if(appFunc.isOwn == "major"){
        this.disagreedTNC = true;
        this.moduleid = 11;
        this.action = "Perform Additional Investment for Major";
        let tempFundDetail: any[] = [];
        currentHolder.funddetail.forEach((elem1: any) => {
          tempFundDetail.push(elem1.FUNDID);
        });

        tempFundDetail.forEach((element: any) => {
          appFunc.ASNBFundID.forEach((elem2: ASNBFundID) => {
            if(element.toString() == elem2.code.toString()){
              if(elem2.fundType == "Variable"){
                this.variableFunds.push(element);
              }else{
                this.fixedFunds.push(element);
              }
            }
          });
        })
        
        console.log(this.variableFunds);
        console.log(this.fixedFunds);
        this.isloadedfunds = true;
        this.isSubscriptionMajor = true;
        this.isOwn = true;
        this.SIStep1 = true;
        this.checkAMLA();
      }
      else if(appFunc.isOwn == "bijak"){
        this.disagreedTNC = true;
        this.moduleid = 12;
        this.action = "Perform Additional Investment for Minor";
        this.isSubscriptionMinor = true;
        this.isBijak = true;
        this.BijakVisible = true;
      }
      else{

        this.fundnamelist = [];
        appFunc.ASNBFundID.forEach((element: any) => {
          this.fundnamelist.push(element);
        })

        if(selectLang.selectedLang == 'en'){
          this.transaction = "Additional Investment (Third Party Account)";
        }
        else{
          this.transaction = "Pelaburan Tambahan (Akaun Pihak Ketiga)";
        }
        this.disagreedTNC = false;
        this.moduleid = 19;
        this.action = "Perform Additional Investment for Third Party";
        this.isSubscriptionThird = true;
        this.isThird = true;
        //this.checkAMLA();
        this.initializeForm3();
        setTimeout(() => {
          loadKeyboard();
        } , 1000);

        
        this.STPStep1 = true;
        
      }
    }

    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }
  }

  sourceOnChange(event: any, isThird: boolean){
    if(isThird){
      if(event.target.value == "OTH"){
        this.Form_4.controls.othersource.setValidators([Validators.required]);
        this.showOtherSource = false;
      }
      else{
        this.Form_4.controls.othersource.clearValidators();
        this.showOtherSource = true;
      }
    }else{
      if(event.target.value == "OTH"){
        this.Form_2.controls.othersource.setValidators([Validators.required]);
        this.showOtherSource = false;
      }
      else{
        this.Form_2.controls.othersource.clearValidators();
        this.showOtherSource = true;
      }
    }
    
  }

  fundOnChange(event: any){
    appFunc.ASNBFundID.forEach((elements: ASNBFundID) => {
      if(event.target.value == elements.code){
        this.pdfsrc3 = "assets/SUBSCRIPTION/" + elements.iscLink + ".pdf";
      }
    });
  }

  selectedFund(fund: any){
    this.SIStep1 = false;
    this.SIStep2 = true;



    if(appFunc.isOwn == "major"){
      this.unitholdername = currentHolder.firstname;
      this.unitholderid = currentHolder.unitholderid;
      this.fundid = fund;
    }else{
      this.unitholdername = this.currentBijakName;
      this.unitholderid = this.currentBijakUHID;
      this.fundid = fund;
    }


    appFunc.ASNBFundID.forEach((elements: ASNBFundID) => {
      if(elements.code.toString().toLowerCase() == fund.toLowerCase()){
        this.fundname = elements.value;
        if(appFunc.isOwn == "major"){
          if(appFunc.isInvesment){ //Investment Major
            this.InvestmentMinValue = elements.majorInvestmentLimit_min;
            this.InvestmentMaxValue = elements.majorInvestmentLimit_max;
            this.pdfsrc3 = "assets/INITIAL_INVESTMENT/" + elements.iscLink + ".pdf";
          }else{ //Subscription Major
            this.SubscriptionMaxValue = elements.majorSubscriptionLimit_max;
            this.SubscriptionMinValue = elements.majorSubscriptionLimit_min;
            this.pdfsrc3 = "assets/SUBSCRIPTION/" + elements.iscLink + ".pdf";
          }
        }else if(appFunc.isOwn == "bijak"){
          if(appFunc.isInvesment){ //Investment Minor
            this.InvestmentMinValue = elements.minorInvestmentLimit_min;
            this.InvestmentMaxValue = elements.minorInvestmentLimit_max;
            this.pdfsrc3 = "assets/INITIAL_INVESTMENT/" + elements.iscLink + ".pdf";
          }else{ //Subscription Minor
            this.SubscriptionMaxValue = elements.minorSubscriptionLimit_max;
            this.SubscriptionMinValue = elements.minorSubscriptionLimit_min;
            this.pdfsrc3 = "assets/SUBSCRIPTION/" + elements.iscLink + ".pdf";
          }
        }else{ //Subscription Third Party
          this.SubscriptionMaxValue = elements.majorSubscriptionLimit_max;
          this.SubscriptionMinValue = elements.majorSubscriptionLimit_min;
          this.pdfsrc3 = "assets/SUBSCRIPTION/" + elements.iscLink + ".pdf";
        }

        if(elements.pricingType.toString().toLowerCase() == "amount"){
          this.amountOrunit = true;
        }
        else{
          this.amountOrunit = false;
        }
      }
    })
    

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  ngOnDestroy() {
    clearInterval(this.id);
    deleteKeyboard();
    if(appFunc.kioskActivity != undefined){
      this.serviceService.postKioskActivity(appFunc.kioskActivity).subscribe((res: any) => {
      });
    }
    appFunc.kioskActivity = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Additional Invesment/Initial Investment]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  initializeForm1(){
    this.Form_1 = this.fb.group({
      amount: ['', Validators.required]
    });
  }

  initializeForm2(){
    this.Form_2 = this.fb.group({
      sourceoffund: [''],
      fundername: [''],
      othersource:['']
    });
  }

  initializeForm3(){
    this.Form_3 = this.fb.group({
      ictype: ['', Validators.required],
      icno: ['', [Validators.required, Validators.minLength(12)]],
      uhid: ['', [Validators.required, Validators.minLength(12)]],
      name: ['', Validators.required],
      reason: ['', Validators.required],
      relationship: ['', Validators.required],
      fund: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  initializeForm4(){
    this.Form_4 = this.fb.group({
      sourceoffund:['', Validators.required],
      othersource:['']
    });
  }

  SIStep1Back(){
    if(appFunc.isOwn == "bijak"){
      this.BijakVisible = true;
      this.SIStep1 = false;
    }else{
      this.Back();
    }
  }

  Back(){
    this._router.navigate(['financialtransactionmenu']);
  }

  Minor(minor: any){
    const body = {
      "CHANNELTYPE": signalrConnection.channelType,
      "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
      "DEVICEOWNER": signalrConnection.deviceOwner,
      "UNITHOLDERID": "",
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE": minor.ICTYPE,
      "IDENTIFICATIONNUMBER": minor.ICNO,
      "FUNDID": "",
      "INQUIRYCODE": "9",
      "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en'),
      "BANKTXNREFERENCENUMBER": signalrConnection.trxno,
      "BANKCUSTPHONENUMBER": "",
      "FILTRATIONFLAG": "1",
      "GUARDIANID": currentHolder.unitholderid,
      "GUARDIANICTYPE": currentHolder.identificationtype,
      "GUARDIANICNUMBER": currentHolder.identificationnumber,
      "LANGUAGE": selectLang.selectedLang
      };
      this.serviceService.getAccountInquiry(body)
      .subscribe((result: any) => {
        currentBijakHolder.riskprofile = result.riskprofile;
        this.checkAMLA();

        if(this.isSubscriptionMinor){
          this.variableFunds = [];
          this.fixedFunds = [];
          minor.FUNDID.forEach((elem1: string) => {
            appFunc.ASNBFundID.forEach((elem2: ASNBFundID) => {
              if(elem1.toString() == elem2.code.toString()){
                if(elem2.fundType == "Variable"){
                  this.variableFunds.push(elem1);
                }else{
                  this.fixedFunds.push(elem1);
                }
              }
            });
          });
          
          console.log(this.variableFunds);
          console.log(this.fixedFunds);
    
          this.currentBijakUHID = minor.UHID;
          this.currentBijakIDNO = minor.ICNO;
          this.currentBijakIDType = minor.ICTYPE;
          this.currentBijakName = minor.NAME;
          
          this.isloadedfunds = true;
          this.BijakVisible = false;
          this.SIStep1 = true;
        }else{
          const body =
          {
            "CHANNELTYPE": signalrConnection.channelType,
            "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
            "DEVICEOWNER": signalrConnection.deviceOwner,
            "REQUESTDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
            "REQUESTTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "UNITHOLDERID": minor.UHID,
            "IDENTIFICATIONTYPE": minor.ICTYPE,
            "IDENTIFICATIONNUMBER": minor.ICNO,
            "FUNDLISTTYPE":"N",
            "LANGUAGE": selectLang.selectedLang
          }
    
          this.currentBijakUHID = minor.UHID;
          this.currentBijakIDNO = minor.ICNO;
          this.currentBijakIDType = minor.ICTYPE;
          this.currentBijakName = minor.NAME;
    
          this.variableFunds = [];
          this.fixedFunds = [];
    
          this.serviceService.postEligibleFunds(body)
          .subscribe((result: any) => {
            result.result.fundid.forEach((elem1: string) => {
              appFunc.ASNBFundID.forEach((elem2: ASNBFundID) => {
                if(elem1.toString() == elem2.code.toString()){
                  if(elem2.fundType == "Variable"){
                    this.variableFunds.push(elem1);
                  }else{
                    this.fixedFunds.push(elem1);
                  }
                }
              });
            });
            
            console.log(this.variableFunds);
            console.log(this.fixedFunds);
            this.isloadedfunds = true;
          });
    
          this.BijakVisible = false;
          this.SIStep1 = true;
        }
      });

    
  }

  SIStep2Back(){
    this.amountWarning = false;
    this.amountWarning1 = false;
    this.Form_1.controls.amount.reset();
    
    this.SIStep2 = false;
    this.SIStep1 = true;
  }

  SIStep2Next(){
    console.log(currentHolder.riskprofile);
    this.Form_1.controls.amount.setValue(this.amount?.nativeElement.value);

    this.amountWarning = false;
    this.amountWarning1 = false;

    let x = 0;
    Object.keys(this.Form_1.controls).forEach(key => {
      if (this.Form_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('amount')){
          this.amountWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.amountKeyed = this.Form_1.controls.amount.value;
      
      if(appFunc.isInvesment){ //Investment Major
        if(this.InvestmentMaxValue == 0.00 && this.InvestmentMinValue == 0.00 ){
          this.amountWarning1 = false;
        }else{
          if(Number(this.amountKeyed) < this.InvestmentMinValue){
            this.amountWarning1 = true;
          }
          else if(Number(this.amountKeyed) > this.InvestmentMaxValue){
            this.amountWarning1 = true;
          }
          else{
            this.amountWarning1 = false;
          }
        }
      }else{ //Subscription Major
        if(this.SubscriptionMaxValue == 0.00 && this.SubscriptionMinValue == 0.00 ){
          this.amountWarning1 = false;
        }else{
          if(Number(this.amountKeyed) < this.SubscriptionMinValue){
            this.amountWarning1 = true;
          }
          else if(Number(this.amountKeyed) > this.SubscriptionMaxValue){
            this.amountWarning1 = true;
          }
          else{
            this.amountWarning1 = false;
          }
        }
      }

      if(this.amountWarning1 == false){
        deleteKeyboard();

        console.log(this.appConfig.thresholdForAdditionalInfo1);//25000
        console.log(this.appConfig.thresholdForAdditionalInfo2);//15000
        console.log(this.appConfig.thresholdForAdditionalInfo3);//10000
        console.log(this.amountKeyed);

        if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1)){ //More than 25K
  
          
          this.SIStep2 = false;
          this.SIStep3 = true;
    
          this.initializeForm2();

          if(appFunc.isOwn == "bijak"){
            if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
              if(currentBijakHolder.riskprofile == "HC"){
                this.showSOF = true;
                this.showFunderName = false;
  
                this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
              }
              else{
                this.showSOF = true;
                this.showFunderName = true;
  
                this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
                this.Form_2.controls.fundername.setValidators([Validators.required]);
              }
            }
            else{
              this.showSOF = true;
              this.showFunderName = false;

              this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
        
            }
          }else{
            if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){ //student
              if(currentHolder.riskprofile == "HC"){
                this.showSOF = true;
                this.showFunderName = false;
  
                this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
              }
              else{
                this.showSOF = true;
                this.showFunderName = true;
  
                this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
                this.Form_2.controls.fundername.setValidators([Validators.required]);
              }
            }
            else{
              this.showSOF = true;
              this.showFunderName = false;

              this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
        
            }
          }
    
          setTimeout(() => {
            loadKeyboard();
          } , 1000);
        }
        else if(Number(this.amountKeyed) < Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){//Between 20k and 10k
          if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3) && Number(this.amountKeyed) < Number(this.appConfig.thresholdForAdditionalInfo2)){
            //Between 10K and 15K
            if(appFunc.isOwn == "bijak"){
              if(currentBijakHolder.riskprofile == "HC"){
                if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
                  this.SIStep2 = false;
                  this.SIStep3 = true;
            
                  this.initializeForm2();
  
                  this.showSOF = true;
                  this.showFunderName = false;
  
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
            
                  setTimeout(() => {
                    loadKeyboard();
                  } , 1000);
                }
                else{
                  this.SIStep2 = false;
                  this.SIStep3 = true;
            
                  this.initializeForm2();
  
                  this.showSOF = true;
                  this.showFunderName = false;
  
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
            
                  setTimeout(() => {
                    loadKeyboard();
                  } , 1000);
                }
              }else{
                this.SIStep2 = false;
                this.SIStep4 = true;
              }
            }
            else{
              if(currentHolder.riskprofile == "HC"){
                if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
                  this.SIStep2 = false;
                  this.SIStep3 = true;
            
                  this.initializeForm2();
  
                  this.showSOF = true;
                  this.showFunderName = false;
  
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
            
                  setTimeout(() => {
                    loadKeyboard();
                  } , 1000);
                }
                else{
                  this.SIStep2 = false;
                  this.SIStep3 = true;
            
                  this.initializeForm2();
  
                  this.showSOF = true;
                  this.showFunderName = false;
  
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
            
                  setTimeout(() => {
                    loadKeyboard();
                  } , 1000);
                }
              }
              else{
               
                this.SIStep2 = false;
                this.SIStep4 = true;
              }
            }
          }//Between 10k and 15k
          else{//Between 15k and 25k
            console.log("termasuk sini");
            if(appFunc.isOwn == "bijak"){
              if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
                this.initializeForm2();
                if(currentBijakHolder.riskprofile == "HC"){
                  this.showSOF = true;
                  this.showFunderName = false;
    
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
                }
                else{
                  this.showSOF = true;
                  this.showFunderName = true;
    
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
                  this.Form_2.controls.fundername.setValidators([Validators.required]);
                } 
                

                this.SIStep2 = false;
                this.SIStep3 = true;
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else{
                if(currentBijakHolder.riskprofile == "HC"){
                  this.initializeForm2();
                  this.showSOF = true;
                  this.showFunderName = false;

                  this.SIStep2 = false;
                  this.SIStep3 = true;
    
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);

                
                  setTimeout(() => {
                    loadKeyboard();
                  } , 1000);
                }
                else{
                  this.SIStep2 = false;
                  this.SIStep4 = true;
                } 
              }
            }else{
              if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
                this.initializeForm2();
                if(currentHolder.riskprofile == "HC"){
                  this.showSOF = true;
                  this.showFunderName = false;
                  this.SIStep2 = false;
                  this.SIStep3 = true;
    
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
                }
                else{
                  this.showSOF = true;
                  this.showFunderName = true;
                  this.SIStep2 = false;
                  this.SIStep3 = true;
    
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);
                  this.Form_2.controls.fundername.setValidators([Validators.required]);
                } 

                
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else {
                if(currentHolder.riskprofile == "HC"){
                  this.initializeForm2();
                  this.showSOF = true;
                  this.showFunderName = false;
                  this.SIStep2 = false;
                  this.SIStep3 = true;
    
                  this.Form_2.controls.sourceoffund.setValidators([Validators.required]);

          
                  setTimeout(() => {
                    loadKeyboard();
                  } , 1000);
                }
                else{
                  this.SIStep2 = false;
                  this.SIStep4 = true;
                } 
              }
            }
          }
        }
        else{
          this.SIStep2 = false;
          this.SIStep4 = true;
        }
      }
      
    }
  }

  SIStep3Back(){
    this.SIStep3 = false;
    this.SIStep2 = true;
    this.disagreedTNC = true;

    setTimeout(() => {  
      loadKeyboard();
    } , 1000);
  }

  SIStep3Next(){

    this.Form_2.controls.sourceoffund.setValue(this.source?.nativeElement.value);
    this.Form_2.controls.fundername.setValue(this.fundername?.nativeElement.value);
    this.Form_2.controls.othersource.setValue(this.othersource?.nativeElement.value);

    
    this.funderWarning = false;
    this.sourceFundWarning = false;
    this.otherWarning = false;
    
    let x = 0;
    Object.keys(this.Form_2.controls).forEach(key => {
      if (this.Form_2.controls[key].hasError('required')){
        
        if(key.includes('fundername')){
          x += 1;
          this.funderWarning = true;
        }
        else if(key.includes('sourceoffund')){
          x += 1;
          this.sourceFundWarning = true;
        }
        else if(key.includes('othersource')){
          if(this.showOtherSource == false){
            x += 1;
            this.otherWarning = true;
          }
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{

      this.sourceOfFund = this.Form_2.controls.sourceoffund.value;
      this.otherSourceOfFund = this.Form_2.controls.fundername.value;
      this.sourceOther = this.Form_2.controls.othersource.value;
      this.SIStep3 = false;
      this.SIStep4 = true;
      deleteKeyboard();
    }

  }

  SIStep4Back(){
      if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1)){ //More than 25K

        this.SIStep4 = false;
        this.SIStep3 = true;

        if(appFunc.isOwn == "bijak"){
          if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
            if(currentBijakHolder.riskprofile == "HC"){
              this.showSOF = true;
              this.showFunderName = false;
            }
            else{
              this.showSOF = true;
              this.showFunderName = true;
            }
            
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
          else{
            this.showSOF = true;
            this.showFunderName = false;
      
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
        }
        }else{
          if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
            if(currentHolder.riskprofile == "HC"){
              this.showSOF = true;
              this.showFunderName = false;
            }
            else{
              this.showSOF = true;
              this.showFunderName = true;
            }


            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
          else{
            this.showSOF = true;
            this.showFunderName = false;

      
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
        }
  
        
      }
      else if(Number(this.amountKeyed) < Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){//Between 20k and 10k
        if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3) && Number(this.amountKeyed) < Number(this.appConfig.thresholdForAdditionalInfo2)){//Between 10k and 15k
          //Between 10K and 15K
          if(appFunc.isOwn == "bijak"){
            if(currentBijakHolder.riskprofile == "HC"){
              if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
                this.SIStep4 = false;
                this.SIStep3 = true;
  
                this.showSOF = true;
                this.showFunderName = false;
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else{
                this.SIStep4 = false;
                this.SIStep3 = true;

                this.showSOF = true;
                this.showFunderName = false;
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
            }
            else{
              this.SIStep4 = false;
              this.SIStep2 = true;

              this.disagreedTNC = true;
            }
          }
          else{
            if(currentHolder.riskprofile == "HC"){
              if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
                this.SIStep4 = false;
                this.SIStep3 = true;
  
                this.showSOF = true;
                this.showFunderName = false;
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else{
                this.SIStep4 = false;
                this.SIStep3 = true;

                this.showSOF = true;
                this.showFunderName = false;
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
            }
            else{
              this.SIStep4 = false;
              this.SIStep2 = true;

              this.disagreedTNC = true;
            }
          }
        }
        else{//Between 15k and 20k
          if(appFunc.isOwn == "bijak"){
            if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
              if(currentBijakHolder.riskprofile == "HC"){
                this.showSOF = true;
                this.showFunderName = false;
              }
              else{
                this.showSOF = true;
                this.showFunderName = true;
              }

              this.SIStep4 = false;
              this.SIStep3 = true;

              setTimeout(() => {
                loadKeyboard();
              } , 1000);
            }
            else{
              if(currentBijakHolder.riskprofile == "HC"){
                this.showSOF = true;
                this.showFunderName = false;

                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else{
                this.SIStep4 = false;
                this.SIStep2 = true;

                this.disagreedTNC = true;
              }
            }
          }else{
            if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
              this.SIStep4 = false;
              this.SIStep3 = true;

              if(currentHolder.riskprofile == "HC"){
                this.showSOF = true;
                this.showFunderName = false;
              }
              else{
                this.showSOF = true;
                this.showFunderName = true;
              }
        
              setTimeout(() => {
                loadKeyboard();
              } , 1000);
            }
            else{
              if(currentHolder.riskprofile == "HC"){
                this.showSOF = true;
                this.showFunderName = false;

                this.SIStep4 = false;
                this.SIStep3 = true;

                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else{
                this.SIStep4 = false;
                this.SIStep2 = true;

                this.disagreedTNC = true;
              }
            }
          }
        }
      }
      else{
        this.SIStep4 = false;
        this.SIStep2 = true;

        this.disagreedTNC = true;
      }
    
    
  }

  SIStep4Next(){

    this.isClicked = true;

    let ictype = "";
    let icno = "";
    let uhid = "";
    let name = "";
    let email = "";

    let guardianID = "";
    let guardianIC = "";
    let guardianICtype = "";

    if(appFunc.isOwn == "major"){
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
      uhid = currentHolder.unitholderid;
      name = currentHolder.firstname;
      email = currentHolder.email;
    }
    else if(appFunc.isOwn == "bijak"){
      uhid = this.currentBijakUHID;
      icno = this.currentBijakIDNO;
      ictype = this.currentBijakIDType;
      name = this.currentBijakName;
      guardianID = currentHolder.unitholderid;
      guardianIC = currentHolder.identificationnumber;
      guardianICtype = currentHolder.identificationtype;
      email = currentBijakHolder.email;
    }
    else{
      email = currentHolder.email;
    }

    this.SIStep4 = false;
    this.SIStep5 = true;
    //let PaymentAmt = parseFloat(this.amountKeyed.toString()).toFixed(2);

    if(signalrConnection.isHardcodedIC){

      let kActivit1 = new kActivity();
      kActivit1.trxno = signalrConnection.trxno;
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = this.moduleid;
      kActivit1.submoduleID = undefined;
      kActivit1.action = this.action + " - Hardcoded";
      kActivit1.startTime = new Date();

      this.paymentStep1 = false;
      this.paymentStep3 = true;

      const body = 
        {
          "CHANNELTYPE": signalrConnection.channelType,
          "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
          "DEVICEOWNER": signalrConnection.deviceOwner,
          "UNITHOLDERID":uhid,
          "FIRSTNAME": "",
          "IDENTIFICATIONTYPE":ictype,
          "IDENTIFICATIONNUMBER":icno,
          "FUNDID":this.fundid,
          "AMOUNTAPPLIED":this.amountKeyed,
          "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "CUSTOMERICNUMBER":"",
          "CUSTOMERNAME":"",
          "AGENTCODE":signalrConnection.agentCode,
          "BRANCHCODE":signalrConnection.branchCode,
          "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
          "BANKCUSTPHONENUMBER":"",
          "PAYMENTTYPE":"T",
          "BANKACCOUNTNUMBER":"",
          "GUARDIANID":guardianID,
          "GUARDIANICTYPE":guardianICtype,
          "GUARDIANICNUMBER":guardianIC,
          "THIRDPARTYINVESTMENT":"",
          "THIRDPARTYNAME":"",
          "THIRDPARTYICTYPE":"",
          "THIRDPARTYICNUMBER":"",
          "THIRDPARTYRELATIONSHIP":"",
          "REASONFORTRANSFER":"",
          "SOURCEOFFUND":this.sourceOfFund,
          "OTHERSOURCEOFFUND":this.sourceOther,
          "FUNDERNAME":this.otherSourceOfFund,
          "LANGUAGE": selectLang.selectedLang,
          "signature": ""
        }

        this.requeryInfo = 
        {
          "CHANNELTYPE": signalrConnection.channelType,
          "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
          "DEVICEOWNER": signalrConnection.deviceOwner,
          "UNITHOLDERID":uhid,
          "FIRSTNAME": "",
          "IDENTIFICATIONTYPE":ictype,
          "IDENTIFICATIONNUMBER":icno,
          "FUNDID":this.fundid,
          "AMOUNTAPPLIED":this.amountKeyed,
          "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "CUSTOMERICNUMBER":"",
          "CUSTOMERNAME":"",
          "AGENTCODE":signalrConnection.agentCode,
          "BRANCHCODE":signalrConnection.branchCode,
          "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
          "BANKCUSTPHONENUMBER":"",
          "PAYMENTTYPE":"T",
          "BANKACCOUNTNUMBER":"",
          "GUARDIANID":guardianID,
          "GUARDIANICTYPE":guardianICtype,
          "GUARDIANICNUMBER":guardianIC,
          "THIRDPARTYINVESTMENT":"",
          "THIRDPARTYNAME":"",
          "THIRDPARTYICTYPE":"",
          "THIRDPARTYICNUMBER":"",
          "THIRDPARTYRELATIONSHIP":"",
          "REASONFORTRANSFER":"",
          "SOURCEOFFUND":this.sourceOfFund,
          "OTHERSOURCEOFFUND":this.sourceOther,
          "FUNDERNAME":this.otherSourceOfFund
        }

        let key = CryptoJS.enc.Utf8.parse(this.appConfig.AESCrpytKey);
        let encryptedBody = CryptoJS.AES.encrypt(JSON.stringify(body), key, {
          keySize: 128,
          blockSize: 128,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });

        const newbody = 
        {
          "CHANNELTYPE": signalrConnection.channelType,
          "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
          "DEVICEOWNER": signalrConnection.deviceOwner,
          "UNITHOLDERID":uhid,
          "FIRSTNAME": "",
          "IDENTIFICATIONTYPE":ictype,
          "IDENTIFICATIONNUMBER":icno,
          "FUNDID":this.fundid,
          "AMOUNTAPPLIED":this.amountKeyed,
          "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "CUSTOMERICNUMBER":"",
          "CUSTOMERNAME":"",
          "AGENTCODE":signalrConnection.agentCode,
          "BRANCHCODE":signalrConnection.branchCode,
          "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
          "BANKCUSTPHONENUMBER":"",
          "PAYMENTTYPE":"T",
          "BANKACCOUNTNUMBER":"",
          "GUARDIANID":guardianID,
          "GUARDIANICTYPE":guardianICtype,
          "GUARDIANICNUMBER":guardianIC,
          "THIRDPARTYINVESTMENT":"",
          "THIRDPARTYNAME":"",
          "THIRDPARTYICTYPE":"",
          "THIRDPARTYICNUMBER":"",
          "THIRDPARTYRELATIONSHIP":"",
          "REASONFORTRANSFER":"",
          "SOURCEOFFUND":this.sourceOfFund,
          "OTHERSOURCEOFFUND":this.sourceOther,
          "FUNDERNAME":this.otherSourceOfFund,
          "LANGUAGE": selectLang.selectedLang,
          "signature": encryptedBody.toString()
        }

        console.log(JSON.stringify(newbody));

        let module = "";
        if(appFunc.isOwn == "major"){
          if(appFunc.isInvesment){
            module = "9";
          }else{
            module = "11";
          }
        }else if(appFunc.isOwn == "bijak"){
          if(appFunc.isInvesment){
            module = "10";
          }else{
            module = "12";
          }
        }else{
          module = "19";
        }

        const FTBody =
        {
          "trxNo": signalrConnection.trxno,
          "kioskCode": signalrConnection.kioskCode,
          "unitHolderID": uhid,
          "firstName": name,
          "identificationType": ictype,
          "identificationNumber": icno,
          "fundID": this.fundid,
          "amountApplied": this.amountKeyed,
          "transactionDate": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "transactionTime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "transactionType": module,
          "customerICNumber": "",
          "customerName": "",
          "agentCode": signalrConnection.agentCode,
          "referenceNo": "",
          "bankTxnReferenceNumber": "",
          "bankCustPhoneNumber": "",
          "paymentType": "T",
          "bankAccountNumber": "",
          "bankBranchCode": "",
          "chequeNumber": "",
          "chequeDate": "",
          "guardianID": guardianID,
          "guardianicType": guardianICtype,
          "guardianicNumber": guardianIC,
          "policyNumber": "",
          "epfNumber": "",
          "subPaymentType": "",
          "ewgateway": "",
          "thirdPartyInvestment": "",
          "thirdPartyName": "",
          "thirdPartyICNumber": "",
          "thirdPartyRelationship": "",
          "reasonForTransfer": "",
          "sourceOfFund": this.sourceOfFund,
          "otherSourceOfFund": this.sourceOther,
          "funderName": this.otherSourceOfFund,
          "transactionStatus": "Pending",
          "transactionNumber": "",
          "taxInvoiceNumber": "",
          "confirmedUnits": "",
          "unitBalance": "",
          "operation": "",
          "remark": "",
          "creditNoteNumber": email,
          "rejectCode": "",
          "rejectReason": "",
          "itemno": signalrConnection.itemNo,
          "nav": "",
          "fee": "",
          "sst": ""
        }

        console.log(JSON.stringify(FTBody));
        this.serviceService.createFundTransaction(FTBody).subscribe(() => {});

        this.serviceService.postSubscriptionWithoutProvision(newbody)
        .subscribe((result: any) => {
          console.log(result.result.transactionstatus);
          console.log(result.result.transactionnumber);
          if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
            

            signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
            });
            
            this.unitholdername = name;
            this.unitholderid = uhid;
            this.unitholderic = icno;
            this.refno = result.result.transactionnumber;
         
            this.approvalcode = "Approval Code";
            if(appFunc.isOwn == "major"){
              this.accounttype = "Dewasa"
            }else if(appFunc.isOwn == "bijak"){
              this.accounttype = "Bijak/Remaja"
            }else{
              if(selectLang.selectedLang == 'ms'){
                this.accounttype = "Pihak Ketiga"
              }else{
                this.accounttype = "Third Party"
              }
            }
            this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
            this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
            this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
            this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
            this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
            

            this.isHistorical = this.isBefore4pm();

            if(selectLang.selectedLang == 'ms'){
              if(this.amountOrunit){
                this.status = "Berjaya";
              }
              else{
                this.status = "Diproses";
                this.isHistorical = false;
              }
            }else{
              if(this.amountOrunit){
                this.status = "Successful";
              }
              else{
                this.status = "Processing";
                this.isHistorical = false;
              }
            }

            if (currentHolder.email == ""){
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

            let module = "";
            if(appFunc.isOwn == "major"){
              if(appFunc.isInvesment){
                module = "9";
              }else{
                module = "11";
              }
            }else if(appFunc.isOwn == "bijak"){
              if(appFunc.isInvesment){
                module = "10";
              }else{
                module = "12";
              }
            }else{
              module = "19";
            }

            const FTBody =
            {
              "trxNo": signalrConnection.trxno,
              "kioskCode": signalrConnection.kioskCode,
              "unitHolderID": result.result.unitholderid,
              "firstName": result.result.firstname,
              "identificationType": result.result.identificationtype,
              "identificationNumber": result.result.identificationnumber,
              "fundID": result.result.fundid,
              "amountApplied": result.result.amountapplied,
              "transactionDate": result.result.transactiondate,
              "transactionTime": result.result.transactiontime,
              "transactionType": module,
              "customerICNumber": result.result.customericnumber,
              "customerName": result.result.customername,
              "agentCode": result.result.agentCode,
              "referenceNo": result.result.transactionnumber,
              "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
              "bankCustPhoneNumber": result.result.bankcustphonenumber,
              "paymentType": result.result.paymenttype,
              "bankAccountNumber": result.result.bankaccountnumber,
              "bankBranchCode": result.result.bankbranchcode,
              "chequeNumber": result.result.chequenumber,
              "chequeDate": result.result.chequedate,
              "guardianID": result.result.guardianid,
              "guardianicType": result.result.guardianictype,
              "guardianicNumber": result.result.guardianicnumber,
              "policyNumber": result.result.policynumber,
              "epfNumber": result.result.epfnumber,
              "subPaymentType": result.result.subpaymenttype,
              "ewgateway": result.result.ewgateway,
              "thirdPartyInvestment": result.result.thirdpartyinvestment,
              "thirdPartyName": result.result.thirdpartyname,
              "thirdPartyICNumber": result.result.thirdpartyicnumber,
              "thirdPartyRelationship": result.result.thirdpartyrelationship,
              "reasonForTransfer": result.result.reasonfortransfer,
              "sourceOfFund": result.result.sourceoffund,
              "otherSourceOfFund": result.result.othersourceoffund,
              "funderName": result.result.fundname,
              "transactionStatus": result.result.transactionstatus,
              "transactionNumber": result.result.transactionnumber,
              "taxInvoiceNumber": result.result.taxinvoicenumber,
              "confirmedUnits": result.result.unitsalloted,
              "unitBalance": "",
              "operation": "",
              "remark": "",
              "creditNoteNumber": email,
              "rejectCode": result.result.rejectcode,
              "rejectReason": result.result.rejectreason,
              "itemno": signalrConnection.itemNo,
              "nav": result.result.fundprice,
              "fee": result.result.salescharge,
              "sst": result.result.gstamount
            }

            console.log(JSON.stringify(FTBody));

            this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});

            kActivit1.endTime = new Date();
            kActivit1.status = true;
            appFunc.kioskActivity.push(kActivit1);

            this.paymentStep3 = false;
            this.paymentStep4 = true;

            this.isClicked = false;

            setTimeout(() => {
              this.SIStep5 = false;
              this.SIStep6 = true;
            }, 5000);
          }
          else if(result.result.transactionstatus.toString() == "" && result.result.transactionnumber.toString() == "" && result.result.rejectcode.toString() == ""){
                  
            
            signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
            });

            this.isRequery = true;        
            this.unitholdername = name;
            this.unitholderid = uhid;
            this.unitholderic = icno;
            this.refno = result.result.transactionnumber;
        

            this.approvalcode = "1234";
            if(appFunc.isOwn == "major"){
              this.accounttype = "Dewasa"
            }else if(appFunc.isOwn == "bijak"){
              this.accounttype = "Bijak/Remaja"
            }else{
              if(selectLang.selectedLang == 'ms'){
                this.accounttype = "Pihak Ketiga"
              }else{
                this.accounttype = "Third Party"
              }
            }

            this.isHistorical = this.isBefore4pm();

            if(selectLang.selectedLang == 'ms'){
              this.status = "Diproses";
              this.isHistorical = false;
            }else{
              this.status = "Processing";
              this.isHistorical = false;
            }

            this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
            this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
            this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
            this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
            this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
           

            let module = "";
            if(appFunc.isOwn == "major"){
              if(appFunc.isInvesment){
                module = "9";
              }else{
                module = "11";
              }
            }else if(appFunc.isOwn == "bijak"){
              if(appFunc.isInvesment){
                module = "10";
              }else{
                module = "12";
              }
            }else{
              module = "19";
            }

            if (currentHolder.email == ""){
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

            this.requeryInfo = {
              "channeltype": signalrConnection.channelType,
              "requestoridentification": signalrConnection.requestIdentification,
              "deviceowner": signalrConnection.deviceOwner,
              "agentcode": signalrConnection.agentCode,
              "branchcode": signalrConnection.branchCode,
              "banktrxreferencenumber": body.BANKTXNREFERENCENUMBER,
              "txnreferencenumber": "",
              "transactiondate": body.TRANSACTIONDATE,
              "unitholderid": uhid,
              "identificationtype": ictype,
              "identificationnumber": icno,
              "fundid": this.fundid,
              "guardianid": guardianID,
              "guardianictype": guardianICtype,
              "guardianicnumber": guardianIC,
              "firstname": name,
              "email": "",
              "module": module,
              "language": selectLang.selectedLang,
              "url": "",
            }

            const FTBody =
            {
              "trxNo": signalrConnection.trxno,
              "kioskCode": signalrConnection.kioskCode,
              "unitHolderID": result.result.unitholderid,
              "firstName": result.result.firstname,
              "identificationType": result.result.identificationtype,
              "identificationNumber": result.result.identificationnumber,
              "fundID": result.result.fundid,
              "amountApplied": result.result.amountapplied,
              "transactionDate": result.result.transactiondate,
              "transactionTime": result.result.transactiontime,
              "transactionType": module,
              "customerICNumber": result.result.customericnumber,
              "customerName": result.result.customername,
              "agentCode": result.result.agentCode,
              "referenceNo": result.result.transactionnumber,
              "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
              "bankCustPhoneNumber": result.result.bankcustphonenumber,
              "paymentType": result.result.paymenttype,
              "bankAccountNumber": result.result.bankaccountnumber,
              "bankBranchCode": result.result.bankbranchcode,
              "chequeNumber": result.result.chequenumber,
              "chequeDate": result.result.chequedate,
              "guardianID": result.result.guardianid,
              "guardianicType": result.result.guardianictype,
              "guardianicNumber": result.result.guardianicnumber,
              "policyNumber": result.result.policynumber,
              "epfNumber": result.result.epfnumber,
              "subPaymentType": result.result.subpaymenttype,
              "ewgateway": result.result.ewgateway,
              "thirdPartyInvestment": result.result.thirdpartyinvestment,
              "thirdPartyName": result.result.thirdpartyname,
              "thirdPartyICNumber": result.result.thirdpartyicnumber,
              "thirdPartyRelationship": result.result.thirdpartyrelationship,
              "reasonForTransfer": result.result.reasonfortransfer,
              "sourceOfFund": result.result.sourceoffund,
              "otherSourceOfFund": result.result.othersourceoffund,
              "funderName": result.result.fundname,
              "transactionStatus": result.result.transactionstatus,
              "transactionNumber": result.result.transactionnumber,
              "taxInvoiceNumber": result.result.taxinvoicenumber,
              "confirmedUnits": result.result.unitsalloted,
              "unitBalance": "",
              "operation": "",
              "remark": "",
              "creditNoteNumber": email,
              "rejectCode": result.result.rejectcode,
              "rejectReason": result.result.rejectreason,
              "itemno": signalrConnection.itemNo,
              "nav": result.result.fundprice,
              "fee": result.result.salescharge,
              "sst": result.result.gstamount
            }


            this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});
            signalrConnection.itemNo += 1;
            kActivit1.endTime = new Date();
            kActivit1.status = true;
            appFunc.kioskActivity.push(kActivit1);

            this.paymentStep3 = false;
            this.paymentStep4 = true;

            this.isClicked = false;

            setTimeout(() => {
              this.SIStep5 = false;
              this.SIStep6 = true;
            }, 5000);
          }
          else{

            this.isClicked = false;
            errorCodes.Ecode = result.result.rejectcode;
            errorCodes.Emessage = result.result.rejectreason;
            if(selectLang.selectedLang == 'ms'){
              if(appFunc.isOwn == "major"){
                errorCodes.accountType = "Dewasa";
                errorCodes.accountName = currentHolder.firstname;
                errorCodes.accountNo = currentHolder.unitholderid;
              }else if(appFunc.isOwn == "bijak"){
                errorCodes.accountType = "Bijak/Remaja";
                errorCodes.accountName = name;
                errorCodes.accountNo = uhid;
              }else{
                errorCodes.accountType = "Pihak Ketiga";
                errorCodes.accountName = currentHolder.firstname;
                errorCodes.accountNo = currentHolder.unitholderid;
              }
            }else{
              if(appFunc.isOwn == "major"){
                errorCodes.accountType = "Dewasa";
                errorCodes.accountName = currentHolder.firstname;
                errorCodes.accountNo = currentHolder.unitholderid;
              }else if(appFunc.isOwn == "bijak"){
                errorCodes.accountType = "Bijak/Remaja";
                errorCodes.accountName = name;
                errorCodes.accountNo = uhid;
              }else{
                errorCodes.accountType = "Pihak Ketiga";
                errorCodes.accountName = currentHolder.firstname;
                errorCodes.accountNo = currentHolder.unitholderid;
              }
            }
            errorCodes.transaction = this.transaction;
            kActivit1.endTime = new Date();
            kActivit1.status = false;
            appFunc.kioskActivity.push(kActivit1);
            this._router.navigate(['errorscreen']);
          }
        });
    }
    else{

      
      let kActivit1 = new kActivity();
      kActivit1.trxno = signalrConnection.trxno;
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = this.moduleid;
      kActivit1.submoduleID = undefined;
      kActivit1.action = this.action;
      kActivit1.startTime = new Date();


      let PaymentAmt = parseFloat(this.amountKeyed.toString()).toFixed(2);

      signalrConnection.connection.invoke('ECRConnection', PaymentAmt).then((data: string) => {
        let statusCode = "";
        let theLoop: (code: string) => void = (code: string) => {
          setTimeout(() => {
            signalrConnection.connection.invoke('getCardInfo').then((cardInfo: any) => {
              this.tempCardInfo = cardInfo;
              statusCode = cardInfo.StatusCode;
              if (statusCode == "00") {
                const CCInfo =
                {
                  "trxNo": signalrConnection.trxno,
                  "cardNo": cardInfo.CardNo,
                  "expiryDate": cardInfo.ExpiryDate,
                  "statusCode": cardInfo.StatusCode,
                  "approvalCode": cardInfo.ApprovalCode,
                  "rrn": cardInfo.RRN,
                  "transactionTrace": cardInfo.TransactionTrace, 
                  "batchNumber": cardInfo.BatchNumber,
                  "hostNo": cardInfo.HostNo,
                  "tid": cardInfo.TID,
                  "mid": cardInfo.MID,
                  "aid": cardInfo.AID,
                  "tc": cardInfo.TC,
                  "cardHolderName": cardInfo.CardholderName,
                  "cardType": cardInfo.CardType,
                  "applicationLabel": cardInfo.ApplicationLabel,
                  "createDate": formatDate(new Date(), 'MM/dd/yyyy HH:mm:ss', 'en'),
                  "itemno": signalrConnection.itemNo
                }

                this.CCinformation = CCInfo;
  
                this.serviceService.createCustCreditCardInfo(CCInfo).subscribe(() => {});
  
                this.paymentStep1 = false;
                this.paymentStep3 = true;

                
  
                signalrConnection.connection.invoke('deleteCreditCardInfo', true).then((data: string) => {
                  const body = 
                  {
                    "CHANNELTYPE": signalrConnection.channelType,
                    "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
                    "DEVICEOWNER": signalrConnection.deviceOwner,
                    "UNITHOLDERID":uhid,
                    "FIRSTNAME": "",
                    "IDENTIFICATIONTYPE":ictype,
                    "IDENTIFICATIONNUMBER":icno,
                    "FUNDID":this.fundid,
                    "AMOUNTAPPLIED":this.amountKeyed,
                    "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "CUSTOMERICNUMBER":"",
                    "CUSTOMERNAME":"",
                    "AGENTCODE":signalrConnection.agentCode,
                    "BRANCHCODE":signalrConnection.branchCode,
                    "BANKTXNREFERENCENUMBER":formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "BANKCUSTPHONENUMBER":"",
                    "PAYMENTTYPE":"T",
                    "BANKACCOUNTNUMBER":"",
                    "GUARDIANID":guardianID,
                    "GUARDIANICTYPE":guardianICtype,
                    "GUARDIANICNUMBER":guardianIC,
                    "THIRDPARTYINVESTMENT":"",
                    "THIRDPARTYNAME":"",
                    "THIRDPARTYICTYPE":"",
                    "THIRDPARTYICNUMBER":"",
                    "THIRDPARTYRELATIONSHIP":"",
                    "REASONFORTRANSFER":"",
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":this.sourceOther,
                    "FUNDERNAME":this.otherSourceOfFund,
                    "LANGUAGE": selectLang.selectedLang,
                    "signature": ""
                  }

                  this.requeryInfo = 
                  {
                    "CHANNELTYPE": signalrConnection.channelType,
                    "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
                    "DEVICEOWNER": signalrConnection.deviceOwner,
                    "UNITHOLDERID":uhid,
                    "FIRSTNAME": "",
                    "IDENTIFICATIONTYPE":ictype,
                    "IDENTIFICATIONNUMBER":icno,
                    "FUNDID":this.fundid,
                    "AMOUNTAPPLIED":this.amountKeyed,
                    "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "CUSTOMERICNUMBER":"",
                    "CUSTOMERNAME":"",
                    "AGENTCODE":signalrConnection.agentCode,
                    "BRANCHCODE":signalrConnection.branchCode,
                    "BANKTXNREFERENCENUMBER":formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "BANKCUSTPHONENUMBER":"",
                    "PAYMENTTYPE":"T",
                    "BANKACCOUNTNUMBER":"",
                    "GUARDIANID":guardianID,
                    "GUARDIANICTYPE":guardianICtype,
                    "GUARDIANICNUMBER":guardianIC,
                    "THIRDPARTYINVESTMENT":"",
                    "THIRDPARTYNAME":"",
                    "THIRDPARTYICTYPE":"",
                    "THIRDPARTYICNUMBER":"",
                    "THIRDPARTYRELATIONSHIP":"",
                    "REASONFORTRANSFER":"",
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":this.sourceOther,
                    "FUNDERNAME":this.otherSourceOfFund
                  }

                  let key = CryptoJS.enc.Utf8.parse(this.appConfig.AESCrpytKey);
                  let encryptedBody = CryptoJS.AES.encrypt(JSON.stringify(body), key, {
                    keySize: 128,
                    blockSize: 128,
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                  });

                  const newbody = 
                  {
                    "CHANNELTYPE": signalrConnection.channelType,
                    "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
                    "DEVICEOWNER": signalrConnection.deviceOwner,
                    "UNITHOLDERID":uhid,
                    "FIRSTNAME": "",
                    "IDENTIFICATIONTYPE":ictype,
                    "IDENTIFICATIONNUMBER":icno,
                    "FUNDID":this.fundid,
                    "AMOUNTAPPLIED":this.amountKeyed,
                    "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "CUSTOMERICNUMBER":"",
                    "CUSTOMERNAME":"",
                    "AGENTCODE":signalrConnection.agentCode,
                    "BRANCHCODE":signalrConnection.branchCode,
                    "BANKTXNREFERENCENUMBER":formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "BANKCUSTPHONENUMBER":"",
                    "PAYMENTTYPE":"T",
                    "BANKACCOUNTNUMBER":"",
                    "GUARDIANID":guardianID,
                    "GUARDIANICTYPE":guardianICtype,
                    "GUARDIANICNUMBER":guardianIC,
                    "THIRDPARTYINVESTMENT":"",
                    "THIRDPARTYNAME":"",
                    "THIRDPARTYICTYPE":"",
                    "THIRDPARTYICNUMBER":"",
                    "THIRDPARTYRELATIONSHIP":"",
                    "REASONFORTRANSFER":"",
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":this.sourceOther,
                    "FUNDERNAME":this.otherSourceOfFund,
                    "LANGUAGE": selectLang.selectedLang,
                    "signature": encryptedBody.toString()
                  }

                  let module = "";
                  if(appFunc.isOwn == "major"){
                    if(appFunc.isInvesment){
                      module = "9";
                    }else{
                      module = "11";
                    }
                  }else if(appFunc.isOwn == "bijak"){
                    if(appFunc.isInvesment){
                      module = "10";
                    }else{
                      module = "12";
                    }
                  }else{
                    module = "19";
                  }

                  const FTBody =
                  {
                    "trxNo": signalrConnection.trxno,
                    "kioskCode": signalrConnection.kioskCode,
                    "unitHolderID": uhid,
                    "firstName": name,
                    "identificationType": ictype,
                    "identificationNumber": icno,
                    "fundID": this.fundid,
                    "amountApplied": this.amountKeyed,
                    "transactionDate": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "transactionTime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "transactionType": module,
                    "customerICNumber": "",
                    "customerName": "",
                    "agentCode": signalrConnection.agentCode,
                    "referenceNo": "",
                    "bankTxnReferenceNumber": formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "bankCustPhoneNumber": "",
                    "paymentType": "T",
                    "bankAccountNumber": "",
                    "bankBranchCode": "",
                    "chequeNumber": "",
                    "chequeDate": "",
                    "guardianID": guardianID,
                    "guardianicType": guardianICtype,
                    "guardianicNumber": guardianIC,
                    "policyNumber": "",
                    "epfNumber": "",
                    "subPaymentType": "",
                    "ewgateway": "",
                    "thirdPartyInvestment": "",
                    "thirdPartyName": "",
                    "thirdPartyICNumber": "",
                    "thirdPartyRelationship": "",
                    "reasonForTransfer": "",
                    "sourceOfFund": this.sourceOfFund,
                    "otherSourceOfFund": this.sourceOther,
                    "funderName": this.otherSourceOfFund,
                    "transactionStatus": "Pending",
                    "transactionNumber": "",
                    "taxInvoiceNumber": "",
                    "confirmedUnits": "",
                    "unitBalance": "",
                    "operation": "",
                    "remark": "",
                    "creditNoteNumber": email,
                    "rejectCode": "",
                    "rejectReason": "",
                    "itemno": signalrConnection.itemNo,
                    "nav": "",
                    "fee": "",
                    "sst": ""
                  }

                  this.serviceService.createFundTransaction(FTBody).subscribe(() => {});
  
                  this.serviceService.postSubscriptionWithoutProvision(newbody)
                  .subscribe((result: any) => {
                    if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
                      
                      signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
                      });

                      this.unitholdername = name;
                      this.unitholderid = uhid;
                      this.unitholderic = icno;
                      this.refno = result.result.transactionnumber;
                      
                      this.approvalcode = CCInfo.approvalCode;
                      if(appFunc.isOwn == "major"){
                        this.accounttype = "Dewasa"
                      }else if(appFunc.isOwn == "bijak"){
                        this.accounttype = "Bijak/Remaja"
                      }else{
                        if(selectLang.selectedLang == 'ms'){
                          this.accounttype = "Pihak Ketiga"
                        }else{
                          this.accounttype = "Third Party"
                        }
                      }

                      if (currentHolder.email == ""){
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

                      this.isHistorical = this.isBefore4pm();

                      if(selectLang.selectedLang == 'ms'){
                        if(this.amountOrunit){
                          this.status = "Berjaya";
                        }
                        else{
                          this.status = "Diproses";
                          this.isHistorical = false;
                        }
                      }else{
                        if(this.amountOrunit){
                          this.status = "Successful";
                        }
                        else{
                          this.status = "Processing";
                          this.isHistorical = false;
                        }
                      }

                      this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
                      this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                      this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                      this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                      this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
                 

                      let module = "";
                      if(appFunc.isOwn == "major"){
                        if(appFunc.isInvesment){
                          module = "9";
                        }else{
                          module = "11";
                        }
                      }else if(appFunc.isOwn == "bijak"){
                        if(appFunc.isInvesment){
                          module = "10";
                        }else{
                          module = "12";
                        }
                      }else{
                        module = "19";
                      }

                      const FTBody =
                      {
                        "trxNo": signalrConnection.trxno,
                        "kioskCode": signalrConnection.kioskCode,
                        "unitHolderID": result.result.unitholderid,
                        "firstName": result.result.firstname,
                        "identificationType": result.result.identificationtype,
                        "identificationNumber": result.result.identificationnumber,
                        "fundID": result.result.fundid,
                        "amountApplied": result.result.amountapplied,
                        "transactionDate": result.result.transactiondate,
                        "transactionTime": result.result.transactiontime,
                        "transactionType": module,
                        "customerICNumber": result.result.customericnumber,
                        "customerName": result.result.customername,
                        "agentCode": result.result.agentCode,
                        "referenceNo": result.result.transactionnumber,
                        "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
                        "bankCustPhoneNumber": result.result.bankcustphonenumber,
                        "paymentType": result.result.paymenttype,
                        "bankAccountNumber": result.result.bankaccountnumber,
                        "bankBranchCode": result.result.bankbranchcode,
                        "chequeNumber": result.result.chequenumber,
                        "chequeDate": result.result.chequedate,
                        "guardianID": result.result.guardianid,
                        "guardianicType": result.result.guardianictype,
                        "guardianicNumber": result.result.guardianicnumber,
                        "policyNumber": result.result.policynumber,
                        "epfNumber": result.result.epfnumber,
                        "subPaymentType": result.result.subpaymenttype,
                        "ewgateway": result.result.ewgateway,
                        "thirdPartyInvestment": result.result.thirdpartyinvestment,
                        "thirdPartyName": result.result.thirdpartyname,
                        "thirdPartyICNumber": result.result.thirdpartyicnumber,
                        "thirdPartyRelationship": result.result.thirdpartyrelationship,
                        "reasonForTransfer": result.result.reasonfortransfer,
                        "sourceOfFund": result.result.sourceoffund,
                        "otherSourceOfFund": result.result.othersourceoffund,
                        "funderName": result.result.fundname,
                        "transactionStatus": result.result.transactionstatus,
                        "transactionNumber": result.result.transactionnumber,
                        "taxInvoiceNumber": result.result.taxinvoicenumber,
                        "confirmedUnits": result.result.unitsalloted,
                        "unitBalance": "",
                        "operation": "",
                        "remark": "",
                        "creditNoteNumber": email,
                        "rejectCode": result.result.rejectcode,
                        "rejectReason": result.result.rejectreason,
                        "itemno": signalrConnection.itemNo,
                        "nav": result.result.fundprice,
                        "fee": result.result.salescharge,
                        "sst": result.result.gstamount
                      }


                      this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});
                      signalrConnection.itemNo += 1;
                      kActivit1.endTime = new Date();
                      kActivit1.status = true;
                      appFunc.kioskActivity.push(kActivit1);

                      this.paymentStep3 = false;
                      this.paymentStep4 = true;

                      this.isClicked = false;

                      setTimeout(() => {
                        this.SIStep5 = false;
                        this.SIStep6 = true;
                      }, 5000);

                    }
                    else if(result.result.transactionstatus.toString() == "" && result.result.transactionnumber.toString() == "" && result.result.rejectcode.toString() == ""){
                      

                      signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
                      });

                      this.isRequery = true;  
                      this.unitholdername = name;
                      this.unitholderid = uhid;
                      this.unitholderic = icno;
                      this.refno = result.result.transactionnumber;
                  

                      this.approvalcode = CCInfo.approvalCode;
                      if(appFunc.isOwn == "major"){
                        this.accounttype = "Dewasa"
                      }else if(appFunc.isOwn == "bijak"){
                        this.accounttype = "Bijak/Remaja"
                      }else{
                        if(selectLang.selectedLang == 'ms'){
                          this.accounttype = "Pihak Ketiga"
                        }else{
                          this.accounttype = "Third Party"
                        }
                      }

                      this.isHistorical = this.isBefore4pm();

                      if(selectLang.selectedLang == 'ms'){
                        this.status = "Diproses";
                        this.isHistorical = false;
                      }else{
                        this.status = "Processing";
                        this.isHistorical = false;
                      }

                      this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
                      this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                      this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                      this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                      this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
                     

                      let module = "";
                      if(appFunc.isOwn == "major"){
                        if(appFunc.isInvesment){
                          module = "9";
                        }else{
                          module = "11";
                        }
                      }else if(appFunc.isOwn == "bijak"){
                        if(appFunc.isInvesment){
                          module = "10";
                        }else{
                          module = "12";
                        }
                      }else{
                        module = "19";
                      }

                      


                      if (currentHolder.email == ""){
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

                      this.requeryInfo = {
                        "channeltype": signalrConnection.channelType,
                        "requestoridentification": signalrConnection.requestIdentification,
                        "deviceowner": signalrConnection.deviceOwner,
                        "agentcode": signalrConnection.agentCode,
                        "branchcode": signalrConnection.branchCode,
                        "banktrxreferencenumber": body.BANKTXNREFERENCENUMBER,
                        "txnreferencenumber": "",
                        "transactiondate": body.TRANSACTIONDATE,
                        "unitholderid": uhid,
                        "identificationtype": ictype,
                        "identificationnumber": icno,
                        "fundid": this.fundid,
                        "guardianid": guardianID,
                        "guardianictype": guardianICtype,
                        "guardianicnumber": guardianIC,
                        "firstname": name,
                        "email": "",
                        "module": module,
                        "language": selectLang.selectedLang,
                        "url": "",
                      }

                      const FTBody =
                      {
                        "trxNo": signalrConnection.trxno,
                        "kioskCode": signalrConnection.kioskCode,
                        "unitHolderID": result.result.unitholderid,
                        "firstName": result.result.firstname,
                        "identificationType": result.result.identificationtype,
                        "identificationNumber": result.result.identificationnumber,
                        "fundID": result.result.fundid,
                        "amountApplied": result.result.amountapplied,
                        "transactionDate": result.result.transactiondate,
                        "transactionTime": result.result.transactiontime,
                        "transactionType": module,
                        "customerICNumber": result.result.customericnumber,
                        "customerName": result.result.customername,
                        "agentCode": result.result.agentCode,
                        "referenceNo": result.result.transactionnumber,
                        "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
                        "bankCustPhoneNumber": result.result.bankcustphonenumber,
                        "paymentType": result.result.paymenttype,
                        "bankAccountNumber": result.result.bankaccountnumber,
                        "bankBranchCode": result.result.bankbranchcode,
                        "chequeNumber": result.result.chequenumber,
                        "chequeDate": result.result.chequedate,
                        "guardianID": result.result.guardianid,
                        "guardianicType": result.result.guardianictype,
                        "guardianicNumber": result.result.guardianicnumber,
                        "policyNumber": result.result.policynumber,
                        "epfNumber": result.result.epfnumber,
                        "subPaymentType": result.result.subpaymenttype,
                        "ewgateway": result.result.ewgateway,
                        "thirdPartyInvestment": result.result.thirdpartyinvestment,
                        "thirdPartyName": result.result.thirdpartyname,
                        "thirdPartyICNumber": result.result.thirdpartyicnumber,
                        "thirdPartyRelationship": result.result.thirdpartyrelationship,
                        "reasonForTransfer": result.result.reasonfortransfer,
                        "sourceOfFund": result.result.sourceoffund,
                        "otherSourceOfFund": result.result.othersourceoffund,
                        "funderName": result.result.fundname,
                        "transactionStatus": result.result.transactionstatus,
                        "transactionNumber": result.result.transactionnumber,
                        "taxInvoiceNumber": result.result.taxinvoicenumber,
                        "confirmedUnits": result.result.unitsalloted,
                        "unitBalance": "",
                        "operation": "",
                        "remark": "",
                        "creditNoteNumber": email,
                        "rejectCode": result.result.rejectcode,
                        "rejectReason": result.result.rejectreason,
                        "itemno": signalrConnection.itemNo,
                        "nav": result.result.fundprice,
                        "fee": result.result.salescharge,
                        "sst": result.result.gstamount
                      }


                      this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});
                      signalrConnection.itemNo += 1;
                      kActivit1.endTime = new Date();
                      kActivit1.status = true;
                      appFunc.kioskActivity.push(kActivit1);

                      this.paymentStep3 = false;
                      this.paymentStep4 = true;

                      this.isClicked = false;

                      setTimeout(() => {
                        this.SIStep5 = false;
                        this.SIStep6 = true;
                      }, 5000);
                    }
                    else{

                      const FTBody =
                      {
                        "trxNo": signalrConnection.trxno,
                        "kioskCode": signalrConnection.kioskCode,
                        "unitHolderID": uhid,
                        "firstName": name,
                        "identificationType": ictype,
                        "identificationNumber": icno,
                        "fundID": this.fundid,
                        "amountApplied": this.amountKeyed,
                        "transactionDate": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                        "transactionTime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                        "transactionType": module,
                        "customerICNumber": "",
                        "customerName": "",
                        "agentCode": signalrConnection.agentCode,
                        "referenceNo": "",
                        "bankTxnReferenceNumber": formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                        "bankCustPhoneNumber": "",
                        "paymentType": "T",
                        "bankAccountNumber": "",
                        "bankBranchCode": "",
                        "chequeNumber": "",
                        "chequeDate": "",
                        "guardianID": guardianID,
                        "guardianicType": guardianICtype,
                        "guardianicNumber": guardianIC,
                        "policyNumber": "",
                        "epfNumber": "",
                        "subPaymentType": "",
                        "ewgateway": "",
                        "thirdPartyInvestment": "",
                        "thirdPartyName": "",
                        "thirdPartyICNumber": "",
                        "thirdPartyRelationship": "",
                        "reasonForTransfer": "",
                        "sourceOfFund": this.sourceOfFund,
                        "otherSourceOfFund": this.sourceOther,
                        "funderName": this.otherSourceOfFund,
                        "transactionStatus": "Failed",
                        "transactionNumber": "",
                        "taxInvoiceNumber": "",
                        "confirmedUnits": "",
                        "unitBalance": "",
                        "operation": "",
                        "remark": "",
                        "creditNoteNumber": email,
                        "rejectCode": "",
                        "rejectReason": "",
                        "itemno": signalrConnection.itemNo,
                        "nav": "",
                        "fee": "",
                        "sst": ""
                      }

                      signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
                      });

                      this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});

                      this.isClicked = false;
                      errorCodes.Ecode = result.result.rejectcode;
                      errorCodes.Emessage = result.result.rejectreason;
                      if(selectLang.selectedLang == 'ms'){
                        if(appFunc.isOwn == "major"){
                          errorCodes.accountType = "Dewasa";
                          errorCodes.accountName = currentHolder.firstname;
                          errorCodes.accountNo = currentHolder.unitholderid;
                        }else if(appFunc.isOwn == "bijak"){
                          errorCodes.accountType = "Bijak/Remaja";
                          errorCodes.accountName = name;
                          errorCodes.accountNo = uhid;
                        }else{
                          errorCodes.accountType = "Pihak Ketiga";
                          errorCodes.accountName = currentHolder.firstname;
                          errorCodes.accountNo = currentHolder.unitholderid;
                        }
                      }else{
                        if(appFunc.isOwn == "major"){
                          errorCodes.accountType = "Dewasa";
                          errorCodes.accountName = currentHolder.firstname;
                          errorCodes.accountNo = currentHolder.unitholderid;
                        }else if(appFunc.isOwn == "bijak"){
                          errorCodes.accountType = "Bijak/Remaja";
                          errorCodes.accountName = name;
                          errorCodes.accountNo = uhid;
                        }else{
                          errorCodes.accountType = "Pihak Ketiga";
                          errorCodes.accountName = currentHolder.firstname;
                          errorCodes.accountNo = currentHolder.unitholderid;
                        }
                      }
                      errorCodes.transaction = this.transaction;
                      signalrConnection.connection.invoke('DoVoid', PaymentAmt, cardInfo.HostNo, cardInfo.TransactionTrace, signalrConnection.trxno).then(() => {
                  
                      });
                      kActivit1.endTime = new Date();
                      kActivit1.status = false;
                      appFunc.kioskActivity.push(kActivit1);
                      this._router.navigate(['errorscreen']);
                    }
                  });
                });
              }
              else if(this.checkTerminalErrorCodes(statusCode)){

                this.isClicked = false;
                signalrConnection.connection.invoke('deleteCreditCardInfo', false).then(() => {
                  
                });
                errorCodes.Ecode = statusCode;
                errorCodes.Emessage = `Terminal Status Code ${statusCode}`;
                if(selectLang.selectedLang == 'ms'){
                  if(appFunc.isOwn == "major"){
                    errorCodes.accountType = "Dewasa";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }else if(appFunc.isOwn == "bijak"){
                    errorCodes.accountType = "Bijak/Remaja";
                    errorCodes.accountName = name;
                    errorCodes.accountNo = uhid;
                  }else{
                    errorCodes.accountType = "Pihak Ketiga";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }
                }else{
                  if(appFunc.isOwn == "major"){
                    errorCodes.accountType = "Dewasa";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }else if(appFunc.isOwn == "bijak"){
                    errorCodes.accountType = "Bijak/Remaja";
                    errorCodes.accountName = name;
                    errorCodes.accountNo = uhid;
                  }else{
                    errorCodes.accountType = "Pihak Ketiga";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }
                }
                errorCodes.transaction = this.transaction;
                kActivit1.endTime = new Date();
                kActivit1.status = false;
                appFunc.kioskActivity.push(kActivit1);
                this._router.navigate(['errorscreen']);
              }
            
              else{
                theLoop(statusCode);
              }
            });
          }, 3000);
        };
        theLoop(statusCode);
      });
    }

    
  }

  checkTerminalErrorCodes(statusCode: string){
    
    if(statusCode == "01" || 
       statusCode == "02" ||
       statusCode == "03" ||
       statusCode == "05" ||
       statusCode == "12" ||
       statusCode == "13" ||
       statusCode == "14" ||
       statusCode == "19" ||
       statusCode == "25" ||
       statusCode == "30" ||
       statusCode == "31" ||
       statusCode == "41" ||
       statusCode == "51" ||
       statusCode == "54" ||
       statusCode == "55" ||
       statusCode == "58" ||
       statusCode == "75" ||
       statusCode == "76" ||
       statusCode == "77" ||
       statusCode == "78" ||
       statusCode == "80" ||
       statusCode == "89" ||
       statusCode == "91" ||
       statusCode == "94" ||
       statusCode == "95" ||
       statusCode == "96" ||
       statusCode == "Y1" ||
       statusCode == "Y3" ||
       statusCode == "Z1" ||
       statusCode == "Z3" ||
       statusCode == "SE" ||
       statusCode == "PE" ||
       statusCode == "IC" ||
       statusCode == "EC" ||
       statusCode == "ZE" ||
       statusCode == "BU" ||
       statusCode == "CE" ||
       statusCode == "RE" ||
       statusCode == "HE" ||
       statusCode == "LE" ||
       statusCode == "VB" ||
       statusCode == "FE" ||
       statusCode == "WC" ||
       statusCode == "TA" ||
       statusCode == "AE" ||
       statusCode == "KE" ||
       statusCode == "VT" 
    ){
      return true;
    }
    else{
      return false;
    }
  }

  SIStep5Cancel(){
    if(signalrConnection.isHardcodedIC == false){
      signalrConnection.connection.invoke('CancelECR').then(() => {
                  
      });
    }
    if(appFunc.isOwn == "third"){
      this.STPStep3 = true;
      this.SIStep5 = false;
    }else{
      this.SIStep4 = true;
      this.SIStep5 = false;
    }
  }

  STPStep1Back(){
    this.Back();
  }

  STPStep1Next(){
    this.Form_3.controls.icno.setValue(this.thirdicno?.nativeElement.value);
    this.Form_3.controls.uhid.setValue(this.thirduhid?.nativeElement.value);
    this.Form_3.controls.name.setValue(this.thirdname?.nativeElement.value);
    this.Form_3.controls.amount.setValue(this.thirdamount?.nativeElement.value);

    console.log(this.Form_3.controls.icno);

    this.thirdicnoWarning = false;
    this.thirduhidWarning = false;
    this.thirdnameWarning = false;
    this.thirdamountWarning = false;
    this.thirdictypeWarning = false;
    this.thirdreasonWarning = false;
    this.thirdrelationshipWarning = false;
    this.thirdfundWarning = false;
    this.id12digit = false;
    this.ic12digit = false;

    this.sameUH = false;

    let x = 0;
    Object.keys(this.Form_3.controls).forEach(key => {
      if (this.Form_3.controls[key].hasError('required')){
        x += 1;
        if(key.includes('icno')){
          this.thirdicnoWarning = true;
        }
        else if(key.includes('uhid')){
          this.thirduhidWarning = true;
        }
        else if(key.includes('name')){
          this.thirdnameWarning = true;
        }
        else if(key.includes('amount')){
          this.thirdamountWarning = true;
        }
        else if(key.includes('ictype')){
          this.thirdictypeWarning = true;
        }
        else if(key.includes('reason')){
          this.thirdreasonWarning = true;
        }
        else if(key.includes('relationship')){
          this.thirdrelationshipWarning = true;
        }
        else if(key.includes('fund')){
          this.thirdfundWarning = true;
        }
      }
      else if(this.Form_3.controls[key].hasError('minlength')){
        
        if(key.includes('uhid')){
          x += 1;
          this.id12digit = true;
        }
        else if(key.includes('icno')){
          x += 1;
          this.ic12digit = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{

      
      if(this.Form_3.controls.icno.value == currentHolder.identificationnumber || this.Form_3.controls.uhid.value == currentHolder.unitholderid){
        this.sameUH = true;
      }
      else{
        this.thirdictypekeyed = this.Form_3.controls.ictype.value;
        this.thirdicnokeyed = this.Form_3.controls.icno.value;
        this.thirduhidkeyed = this.Form_3.controls.uhid.value;
        this.thirdnamekeyed = this.Form_3.controls.name.value;
        this.thirdreasonkeyed = this.Form_3.controls.reason.value;
        this.thirdrelationshipkeyed = this.Form_3.controls.relationship.value;
        this.thirdfundnamekeyed = this.Form_3.controls.fund.value;
        this.thirdamountkeyed = this.Form_3.controls.amount.value;
  
        this.reason.forEach((element: reasonTransfer) => {
          if(element.code == this.thirdreasonkeyed){
            this.displayReason = element.desc;
          }
        });
  
        this.ictype.forEach((element: icType) => {
          if(element.code == this.thirdictypekeyed){
            this.displayICType = element.desc;
          }
        })
  
        this.relationship.forEach((elem: thirdpartyRelationship) => {
          if(elem.code == this.thirdrelationshipkeyed){
            this.displayRelationship = elem.desc;
          }
        });
  
        appFunc.ASNBFundID.forEach((elem: ASNBFundID) => {
          if(elem.code.toLowerCase() == this.thirdfundnamekeyed.toLowerCase()){
            this.fundname = elem.value;
            this.displayFundname = elem.value;
            this.fundid = this.thirdfundnamekeyed;
          }
        });
  
        appFunc.ASNBFundID.forEach((elements: ASNBFundID) => {
          if(elements.code.toString().toLowerCase() == this.thirdfundnamekeyed.toLowerCase()){
              //Subscription Third Party
            this.SubscriptionMaxValue = elements.majorSubscriptionLimit_max;
            this.SubscriptionMinValue = elements.majorSubscriptionLimit_min;
            this.pdfsrc3 = "assets/SUBSCRIPTION/" + elements.iscLink + ".pdf";
    
            if(elements.pricingType.toString().toLowerCase() == "amount"){
              this.amountOrunit = true;
            }
            else{
              this.amountOrunit = false;
            }
          }
        })
  
        if(appFunc.isInvesment){ //Investment Major
          
          if(this.InvestmentMaxValue == 0.00 && this.InvestmentMinValue == 0.00 ){
            this.amountWarning2 = false;
          }else{
            if(Number(this.thirdamountkeyed) < this.InvestmentMinValue){
              this.amountWarning2 = true;
            }
            else if(Number(this.thirdamountkeyed) > this.InvestmentMaxValue){
              this.amountWarning2 = true;
            }
            else{
              this.amountWarning2 = false;
            }
          }
        }else{ //Subscription Major
          if(this.SubscriptionMaxValue == 0.00 && this.SubscriptionMinValue == 0.00 ){
            this.amountWarning2 = false;
          }else{
            if(Number(this.thirdamountkeyed) < this.SubscriptionMinValue){
              this.amountWarning2 = true;
            }
            else if(Number(this.thirdamountkeyed) > this.SubscriptionMaxValue){
              this.amountWarning2 = true;
            }
            else{
              this.amountWarning2 = false;
            }
          }
        }
  
  
        if(this.amountWarning2 == false){
          deleteKeyboard();
  
          if(Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){ //More than equal 10K
            this.STPStep1 = false;
            this.STPStep2 = true;
  
            this.initializeForm4();
      
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
          else{
            this.STPStep1 = false;
            this.STPStep3 = true; 
          }
  
        }
      }
    }
    
  }

  STPStep2Back(){
    this.STPStep2 = false;
    this.STPStep1 = true;

    this.disagreedTNC = true;
  }

  STPStep2Next(){
    this.Form_4.controls.sourceoffund.setValue(this.thirdsource?.nativeElement.value);
    this.Form_4.controls.othersource.setValue(this.othersource?.nativeElement.value);

    this.sourceFundWarning = false;
    this.otherWarning = false;

    let x = 0;
    Object.keys(this.Form_4.controls).forEach(key => {
      if (this.Form_4.controls[key].hasError('required')){
        x += 1;
        if(key.includes('sourceoffund')){
          this.sourceFundWarning = true;
        }
        else if(key.includes('othersource')){
          this.otherWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.sourceOfFund = this.Form_4.controls.sourceoffund.value;
      this.sourceOther = this.Form_4.controls.othersource.value;
      this.otherSourceOfFund = "";
      this.STPStep2 = false;
      this.STPStep3 = true;
    }
    
  }

  NextTNC(){
    this.TermsAndConditions = false;
    this.ispopup = false;
  }
  NextID(){
    this.InvestmentDisclaimer = false;
    this.ispopup = false;
  }
  NextMC(){
    this.MinimumCriteria = false;
    this.ispopup = false;
  }
  ClickTNC(){
    this.TermsAndConditions = true;
    this.ispopup = true;

  }
  ClickInvesmtentDisclaimer(){
    this.InvestmentDisclaimer = true;
    this.ispopup = true;
  }
  ClickMinimumCriteria(){
    this.MinimumCriteria = true;
    this.ispopup = true;
  }

  SIStep5End(){
    if(signalrConnection.isHardcodedIC == false){
      signalrConnection.connection.invoke('CancelECR').then(() => {
                  
      });
    }
    this._router.navigate(['feedbackscreen']);
  }

  STPStep3Back(){

    if(Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){ //More than equal 10K
      this.STPStep3 = false;
      this.STPStep2 = true;

      setTimeout(() => {
        loadKeyboard();
      } , 1000);
    }
    else{
      this.STPStep3 = false;
      this.STPStep1 = true;

      this.disagreedTNC = true;

      setTimeout(() => {  
        loadKeyboard();
      } , 1000);
    }

    
  }

  STPStep3Next(){

    this.isClicked = true;
    let ictype = "";
    let icno = "";
    let uhid = "";
    let name = "";
    let email = "";

    ictype = currentHolder.identificationtype;
    icno = currentHolder.identificationnumber;
    uhid = currentHolder.unitholderid;
    name = currentHolder.firstname;
    email = currentHolder.email;


    //let PaymentAmt = parseFloat(this.thirdamountkeyed.toString()).toFixed(2);

    this.STPStep3 = false;
    this.SIStep5 = true;
    

    if(signalrConnection.isHardcodedIC){

      let kActivit1 = new kActivity();
      kActivit1.trxno = signalrConnection.trxno;
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = this.moduleid;
      kActivit1.submoduleID = undefined;
      kActivit1.action = this.action + " - Hardcoded";
      kActivit1.startTime = new Date();
      

      this.paymentStep1 = false;
      this.paymentStep3 = true;

      const body = 
      {
        "CHANNELTYPE": signalrConnection.channelType,
        "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
        "DEVICEOWNER": signalrConnection.deviceOwner,
        "UNITHOLDERID":this.thirduhidkeyed,
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": this.thirdictypekeyed,
        "IDENTIFICATIONNUMBER": this.thirdicnokeyed,
        "FUNDID":this.thirdfundnamekeyed,
        "AMOUNTAPPLIED":this.thirdamountkeyed,
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "CUSTOMERICNUMBER":"",
        "CUSTOMERNAME":"",
        "AGENTCODE":signalrConnection.agentCode,
        "BRANCHCODE":signalrConnection.branchCode,
        "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
        "BANKCUSTPHONENUMBER":"",
        "PAYMENTTYPE":"T",
        "BANKACCOUNTNUMBER":"",
        "GUARDIANID":"",
        "GUARDIANICTYPE":"",
        "GUARDIANICNUMBER":"",
        "THIRDPARTYINVESTMENT": "Y",
        "THIRDPARTYNAME": name,
        "THIRDPARTYICTYPE": ictype,
        "THIRDPARTYICNUMBER": icno,
        "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
        "REASONFORTRANSFER":this.thirdreasonkeyed,
        "SOURCEOFFUND":this.sourceOfFund,
        "OTHERSOURCEOFFUND":this.sourceOther,
        "FUNDERNAME":this.otherSourceOfFund,
        "LANGUAGE": selectLang.selectedLang,
        "signature": ""
      }

      this.requeryInfo = 
      {
        "CHANNELTYPE": signalrConnection.channelType,
        "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
        "DEVICEOWNER": signalrConnection.deviceOwner,
        "UNITHOLDERID":this.thirduhidkeyed,
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": this.thirdictypekeyed,
        "IDENTIFICATIONNUMBER": this.thirdicnokeyed,
        "FUNDID":this.thirdfundnamekeyed,
        "AMOUNTAPPLIED":this.thirdamountkeyed,
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "CUSTOMERICNUMBER":"",
        "CUSTOMERNAME":"",
        "AGENTCODE":signalrConnection.agentCode,
        "BRANCHCODE":signalrConnection.branchCode,
        "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
        "BANKCUSTPHONENUMBER":"",
        "PAYMENTTYPE":"T",
        "BANKACCOUNTNUMBER":"",
        "GUARDIANID":"",
        "GUARDIANICTYPE":"",
        "GUARDIANICNUMBER":"",
        "THIRDPARTYINVESTMENT": "Y",
        "THIRDPARTYNAME": name,
        "THIRDPARTYICTYPE": ictype,
        "THIRDPARTYICNUMBER": icno,
        "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
        "REASONFORTRANSFER":this.thirdreasonkeyed,
        "SOURCEOFFUND":this.sourceOfFund,
        "OTHERSOURCEOFFUND":this.sourceOther,
        "FUNDERNAME":this.otherSourceOfFund
      }

      let key = CryptoJS.enc.Utf8.parse(this.appConfig.AESCrpytKey);
      let encryptedBody = CryptoJS.AES.encrypt(JSON.stringify(body), key, {
        keySize: 128,
        blockSize: 128,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      const newbody = 
      {
        "CHANNELTYPE": signalrConnection.channelType,
        "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
        "DEVICEOWNER": signalrConnection.deviceOwner,
        "UNITHOLDERID":this.thirduhidkeyed,
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": this.thirdictypekeyed,
        "IDENTIFICATIONNUMBER": this.thirdicnokeyed,
        "FUNDID":this.thirdfundnamekeyed,
        "AMOUNTAPPLIED":this.thirdamountkeyed,
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "CUSTOMERICNUMBER":"",
        "CUSTOMERNAME":"",
        "AGENTCODE":signalrConnection.agentCode,
        "BRANCHCODE":signalrConnection.branchCode,
        "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
        "BANKCUSTPHONENUMBER":"",
        "PAYMENTTYPE":"T",
        "BANKACCOUNTNUMBER":"",
        "GUARDIANID":"",
        "GUARDIANICTYPE":"",
        "GUARDIANICNUMBER":"",
        "THIRDPARTYINVESTMENT": "Y",
        "THIRDPARTYNAME": name,
        "THIRDPARTYICTYPE": ictype,
        "THIRDPARTYICNUMBER": icno,
        "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
        "REASONFORTRANSFER":this.thirdreasonkeyed,
        "SOURCEOFFUND":this.sourceOfFund,
        "OTHERSOURCEOFFUND":this.sourceOther,
        "FUNDERNAME":this.otherSourceOfFund,
        "LANGUAGE": selectLang.selectedLang,
        "signature": encryptedBody.toString()
      }

      

      console.log(JSON.stringify(newbody));

      this.serviceService.postSubscriptionWithoutProvision(newbody)
      .subscribe((result: any) => {
        // console.log(result.result.transactionstatus);
        // console.log(result.result.transactionnumber);
        if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){

          signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
          });

          this.STPStep3 = false;
          this.SIStep5 = true;
          this.thirdnamekeyed = result.result.firstname;
          this.unitholdername = this.thirdnamekeyed;
          this.unitholderid = this.thirduhidkeyed;
          this.unitholderic = this.thirdicnokeyed;
          this.refno = result.result.transactionnumber;

          this.amountKeyed = Number(this.thirdamountkeyed);
         
          this.approvalcode = formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en');
          if(appFunc.isOwn == "major"){
            this.accounttype = "Dewasa"
          }else if(appFunc.isOwn == "bijak"){
            this.accounttype = "Bijak/Remaja"
          }else{
            if(selectLang.selectedLang == 'ms'){
              this.accounttype = "Pihak Ketiga"
            }else{
              this.accounttype = "Third Party"
            }
          }

          if (currentHolder.email == ""){
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

          this.isHistorical = this.isBefore4pm();

          if(selectLang.selectedLang == 'ms'){
            if(this.amountOrunit){
              this.status = "Berjaya";
            }
            else{
              this.status = "Diproses";
              this.isHistorical = false;
            }
          }else{
            if(this.amountOrunit){
              this.status = "Successful";
            }
            else{
              this.status = "Processing";
              this.isHistorical = false;
            }
          }

          this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
          this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
          this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
          this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
          this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
       

          kActivit1.endTime = new Date();
          kActivit1.status = true;
          appFunc.kioskActivity.push(kActivit1);

          this.paymentStep3 = false;
          this.paymentStep4 = true;

          this.isClicked = false;

          setTimeout(() => {
            this.SIStep5 = false;
            this.SIStep6 = true;
          }, 5000);

        }
        else if(result.result.transactionstatus.toString() == "" && result.result.transactionnumber.toString() == "" && result.result.rejectcode.toString() == ""){
                    
          signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
          });
                    
          this.isRequery = true;       
          this.STPStep3 = false;
          this.SIStep5 = true;
          this.thirdnamekeyed = result.result.firstname;
          this.unitholdername = this.thirdnamekeyed;
          this.unitholderid = this.thirduhidkeyed;
          this.unitholderic = this.thirdicnokeyed;
          this.refno = result.result.transactionnumber;


          

          this.approvalcode = "1234";
          if(appFunc.isOwn == "major"){
            this.accounttype = "Dewasa"
          }else if(appFunc.isOwn == "bijak"){
            this.accounttype = "Bijak/Remaja"
          }else{
            if(selectLang.selectedLang == 'ms'){
              this.accounttype = "Pihak Ketiga"
            }else{
              this.accounttype = "Third Party"
            }
          }

          this.isHistorical = this.isBefore4pm();

          if(selectLang.selectedLang == 'ms'){
            this.status = "Diproses";
            this.isHistorical = false;
          }else{
            this.status = "Processing";
            this.isHistorical = false;
          }

          this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
          this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
          this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
          this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
          this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
 
          let module = "";
          if(appFunc.isOwn == "major"){
            if(appFunc.isInvesment){
              module = "9";
            }else{
              module = "11";
            }
          }else if(appFunc.isOwn == "bijak"){
            if(appFunc.isInvesment){
              module = "10";
            }else{
              module = "12";
            }
          }else{
            module = "19";
          }

          if (currentHolder.email == ""){
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

          this.requeryInfo = {
            "channeltype": signalrConnection.channelType,
            "requestoridentification": signalrConnection.requestIdentification,
            "deviceowner": signalrConnection.deviceOwner,
            "agentcode": signalrConnection.agentCode,
            "branchcode": signalrConnection.branchCode,
            "banktrxreferencenumber": body.BANKTXNREFERENCENUMBER,
            "txnreferencenumber": "",
            "transactiondate": body.TRANSACTIONDATE,
            "unitholderid": uhid,
            "identificationtype": ictype,
            "identificationnumber": icno,
            "fundid": this.fundid,
            "guardianid": "",
            "guardianictype": "",
            "guardianicnumber": "",
            "firstname": name,
            "email": "",
            "module": module,
            "language": selectLang.selectedLang,
            "url": "",
          }

          const FTBody =
          {
            "trxNo": signalrConnection.trxno,
            "kioskCode": signalrConnection.kioskCode,
            "unitHolderID": result.result.unitholderid,
            "firstName": result.result.firstname,
            "identificationType": result.result.identificationtype,
            "identificationNumber": result.result.identificationnumber,
            "fundID": result.result.fundid,
            "amountApplied": result.result.amountapplied,
            "transactionDate": result.result.transactiondate,
            "transactionTime": result.result.transactiontime,
            "transactionType": module,
            "customerICNumber": result.result.customericnumber,
            "customerName": result.result.customername,
            "agentCode": result.result.agentCode,
            "referenceNo": result.result.transactionnumber,
            "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
            "bankCustPhoneNumber": result.result.bankcustphonenumber,
            "paymentType": result.result.paymenttype,
            "bankAccountNumber": result.result.bankaccountnumber,
            "bankBranchCode": result.result.bankbranchcode,
            "chequeNumber": result.result.chequenumber,
            "chequeDate": result.result.chequedate,
            "guardianID": result.result.guardianid,
            "guardianicType": result.result.guardianictype,
            "guardianicNumber": result.result.guardianicnumber,
            "policyNumber": result.result.policynumber,
            "epfNumber": result.result.epfnumber,
            "subPaymentType": result.result.subpaymenttype,
            "ewgateway": result.result.ewgateway,
            "thirdPartyInvestment": result.result.thirdpartyinvestment,
            "thirdPartyName": result.result.thirdpartyname,
            "thirdPartyICNumber": result.result.thirdpartyicnumber,
            "thirdPartyRelationship": result.result.thirdpartyrelationship,
            "reasonForTransfer": result.result.reasonfortransfer,
            "sourceOfFund": result.result.sourceoffund,
            "otherSourceOfFund": result.result.othersourceoffund,
            "funderName": result.result.fundname,
            "transactionStatus": result.result.transactionstatus,
            "transactionNumber": result.result.transactionnumber,
            "taxInvoiceNumber": result.result.taxinvoicenumber,
            "confirmedUnits": result.result.unitsalloted,
            "unitBalance": "",
            "operation": "",
            "remark": "",
            "creditNoteNumber": email,
            "rejectCode": result.result.rejectcode,
            "rejectReason": result.result.rejectreason,
            "itemno": signalrConnection.itemNo,
            "nav": result.result.fundprice,
            "fee": result.result.salescharge,
            "sst": result.result.gstamount
          }

          this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});
          signalrConnection.itemNo += 1;
          kActivit1.endTime = new Date();
          kActivit1.status = true;
          appFunc.kioskActivity.push(kActivit1);

          this.isClicked = false;

          setTimeout(() => {
            this.SIStep5 = false;
            this.SIStep6 = true;
          }, 5000);
        }
        else{
          signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
          });

          this.isClicked = false;
          errorCodes.Ecode = result.result.rejectcode;
          errorCodes.Emessage = result.result.rejectreason;
          if(selectLang.selectedLang == 'ms'){
            if(appFunc.isOwn == "major"){
              errorCodes.accountType = "Dewasa";
              errorCodes.accountName = currentHolder.firstname;
              errorCodes.accountNo = currentHolder.unitholderid;
            }else if(appFunc.isOwn == "bijak"){
              errorCodes.accountType = "Bijak/Remaja";
              errorCodes.accountName = name;
              errorCodes.accountNo = uhid;
            }else{
              errorCodes.accountType = "Pihak Ketiga";
              errorCodes.accountName = currentHolder.firstname;
              errorCodes.accountNo = currentHolder.unitholderid;
            }
          }else{
            if(appFunc.isOwn == "major"){
              errorCodes.accountType = "Dewasa";
              errorCodes.accountName = currentHolder.firstname;
              errorCodes.accountNo = currentHolder.unitholderid;
            }else if(appFunc.isOwn == "bijak"){
              errorCodes.accountType = "Bijak/Remaja";
              errorCodes.accountName = name;
              errorCodes.accountNo = uhid;
            }else{
              errorCodes.accountType = "Pihak Ketiga";
              errorCodes.accountName = currentHolder.firstname;
              errorCodes.accountNo = currentHolder.unitholderid;
            }
          }
          errorCodes.transaction = this.transaction;
          kActivit1.endTime = new Date();
          kActivit1.status = false;
          appFunc.kioskActivity.push(kActivit1);
          this._router.navigate(['errorscreen']);
        }
      });
    }
    else{

      let kActivit1 = new kActivity();
      kActivit1.trxno = signalrConnection.trxno;
      kActivit1.kioskCode = signalrConnection.kioskCode;
      kActivit1.moduleID = this.moduleid;
      kActivit1.submoduleID = undefined;
      kActivit1.action = this.action
      kActivit1.startTime = new Date();

      let PaymentAmt = parseFloat(this.thirdamountkeyed.toString()).toFixed(2);

      signalrConnection.connection.invoke('ECRConnection', PaymentAmt).then((data: string) => {
        let statusCode = "";
        let theLoop: (code: string) => void = (code: string) => {
          setTimeout(() => {
            signalrConnection.connection.invoke('getCardInfo').then((cardInfo: any) => {
              this.tempCardInfo = cardInfo;
              statusCode = cardInfo.StatusCode;
              if (statusCode == "00") {
                const CCInfo =
                {
                  "trxNo": signalrConnection.trxno,
                  "cardNo": cardInfo.CardNo,
                  "expiryDate": cardInfo.ExpiryDate,
                  "statusCode": cardInfo.StatusCode,
                  "approvalCode": cardInfo.ApprovalCode,
                  "rrn": cardInfo.RRN,
                  "transactionTrace": cardInfo.TransactionTrace, 
                  "batchNumber": cardInfo.BatchNumber,
                  "hostNo": cardInfo.HostNo,
                  "tid": cardInfo.TID,
                  "mid": cardInfo.MID,
                  "aid": cardInfo.AID,
                  "tc": cardInfo.TC,
                  "cardHolderName": cardInfo.CardholderName,
                  "cardType": cardInfo.CardType,
                  "applicationLabel": cardInfo.ApplicationLabel,
                  "createDate": formatDate(new Date(), 'MM/dd/yyyy HH:mm:ss', 'en'),
                  "itemno": signalrConnection.itemNo

                }

                this.CCinformation = CCInfo;
  
                this.serviceService.createCustCreditCardInfo(CCInfo).subscribe(() => {});
  
                this.paymentStep1 = false;
                this.paymentStep3 = true;
  
                signalrConnection.connection.invoke('deleteCreditCardInfo', true).then((data: string) => {
                  const body = 
                  {
                    "CHANNELTYPE": signalrConnection.channelType,
                    "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
                    "DEVICEOWNER": signalrConnection.deviceOwner,
                    "UNITHOLDERID":this.thirduhidkeyed,
                    "FIRSTNAME": "",
                    "IDENTIFICATIONTYPE": this.thirdictypekeyed,
                    "IDENTIFICATIONNUMBER": this.thirdicnokeyed,
                    "FUNDID":this.thirdfundnamekeyed,
                    "AMOUNTAPPLIED":this.thirdamountkeyed,
                    "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "CUSTOMERICNUMBER":"",
                    "CUSTOMERNAME":"",
                    "AGENTCODE":signalrConnection.agentCode,
                    "BRANCHCODE":signalrConnection.branchCode,
                    "BANKTXNREFERENCENUMBER":formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "BANKCUSTPHONENUMBER":"",
                    "PAYMENTTYPE":"T",
                    "BANKACCOUNTNUMBER":"",
                    "GUARDIANID":"",
                    "GUARDIANICTYPE":"",
                    "GUARDIANICNUMBER":"",
                    "THIRDPARTYINVESTMENT":"Y",
                    "THIRDPARTYNAME": name,
                    "THIRDPARTYICTYPE": ictype,
                    "THIRDPARTYICNUMBER": icno,
                    "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
                    "REASONFORTRANSFER":this.thirdreasonkeyed,
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":this.sourceOther,
                    "FUNDERNAME":this.otherSourceOfFund,
                    "LANGUAGE": selectLang.selectedLang,
                    "signature": ""
                  }

                  this.requeryInfo =
                  {
                    "CHANNELTYPE": signalrConnection.channelType,
                    "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
                    "DEVICEOWNER": signalrConnection.deviceOwner,
                    "UNITHOLDERID":this.thirduhidkeyed,
                    "FIRSTNAME": "",
                    "IDENTIFICATIONTYPE": this.thirdictypekeyed,
                    "IDENTIFICATIONNUMBER": this.thirdicnokeyed,
                    "FUNDID":this.thirdfundnamekeyed,
                    "AMOUNTAPPLIED":this.thirdamountkeyed,
                    "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "CUSTOMERICNUMBER":"",
                    "CUSTOMERNAME":"",
                    "AGENTCODE":signalrConnection.agentCode,
                    "BRANCHCODE":signalrConnection.branchCode,
                    "BANKTXNREFERENCENUMBER":formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "BANKCUSTPHONENUMBER":"",
                    "PAYMENTTYPE":"T",
                    "BANKACCOUNTNUMBER":"",
                    "GUARDIANID":"",
                    "GUARDIANICTYPE":"",
                    "GUARDIANICNUMBER":"",
                    "THIRDPARTYINVESTMENT":"Y",
                    "THIRDPARTYNAME": name,
                    "THIRDPARTYICTYPE": ictype,
                    "THIRDPARTYICNUMBER": icno,
                    "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
                    "REASONFORTRANSFER":this.thirdreasonkeyed,
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":this.sourceOther,
                    "FUNDERNAME":this.otherSourceOfFund
                  }

                  let key = CryptoJS.enc.Utf8.parse(this.appConfig.AESCrpytKey);
                  let encryptedBody = CryptoJS.AES.encrypt(JSON.stringify(body), key, {
                    keySize: 128,
                    blockSize: 128,
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                  });

                  const newbody = 
                  {
                    "CHANNELTYPE": signalrConnection.channelType,
                    "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
                    "DEVICEOWNER": signalrConnection.deviceOwner,
                    "UNITHOLDERID":this.thirduhidkeyed,
                    "FIRSTNAME": "",
                    "IDENTIFICATIONTYPE": this.thirdictypekeyed,
                    "IDENTIFICATIONNUMBER": this.thirdicnokeyed,
                    "FUNDID":this.thirdfundnamekeyed,
                    "AMOUNTAPPLIED":this.thirdamountkeyed,
                    "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "CUSTOMERICNUMBER":"",
                    "CUSTOMERNAME":"",
                    "AGENTCODE":signalrConnection.agentCode,
                    "BRANCHCODE":signalrConnection.branchCode,
                    "BANKTXNREFERENCENUMBER":formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "BANKCUSTPHONENUMBER":"",
                    "PAYMENTTYPE":"T",
                    "BANKACCOUNTNUMBER":"",
                    "GUARDIANID":"",
                    "GUARDIANICTYPE":"",
                    "GUARDIANICNUMBER":"",
                    "THIRDPARTYINVESTMENT":"Y",
                    "THIRDPARTYNAME": name,
                    "THIRDPARTYICTYPE": ictype,
                    "THIRDPARTYICNUMBER": icno,
                    "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
                    "REASONFORTRANSFER":this.thirdreasonkeyed,
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":this.sourceOther,
                    "FUNDERNAME":this.otherSourceOfFund,
                    "LANGUAGE": selectLang.selectedLang,
                    "signature": encryptedBody.toString()
                  }

                  let module = "";
                  if(appFunc.isOwn == "major"){
                    if(appFunc.isInvesment){
                      module = "9";
                    }else{
                      module = "11";
                    }
                  }else if(appFunc.isOwn == "bijak"){
                    if(appFunc.isInvesment){
                      module = "10";
                    }else{
                      module = "12";
                    }
                  }else{
                    module = "19";
                  }

                  const FTBody =
                  {
                    "trxNo": signalrConnection.trxno,
                    "kioskCode": signalrConnection.kioskCode,
                    "unitHolderID": this.thirduhidkeyed,
                    "firstName": "",
                    "identificationType": this.thirdictypekeyed,
                    "identificationNumber": this.thirdicnokeyed,
                    "fundID": this.thirdfundnamekeyed,
                    "amountApplied": this.thirdamountkeyed,
                    "transactionDate": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                    "transactionTime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                    "transactionType": module,
                    "customerICNumber": "",
                    "customerName": "",
                    "agentCode": signalrConnection.agentCode,
                    "referenceNo": "",
                    "bankTxnReferenceNumber": formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                    "bankCustPhoneNumber": "",
                    "paymentType": "T",
                    "bankAccountNumber": "",
                    "bankBranchCode": "",
                    "chequeNumber": "",
                    "chequeDate": "",
                    "guardianID": "",
                    "guardianicType": "",
                    "guardianicNumber": "",
                    "policyNumber": "",
                    "epfNumber": "",
                    "subPaymentType": "",
                    "ewgateway": "",
                    "thirdPartyInvestment": "Y",
                    "thirdPartyName": name,
                    "thirdPartyICNumber": icno,
                    "thirdPartyRelationship": this.thirdrelationshipkeyed,
                    "reasonForTransfer": this.thirdreasonkeyed,
                    "sourceOfFund": this.sourceOfFund,
                    "otherSourceOfFund": this.sourceOther,
                    "funderName": this.otherSourceOfFund,
                    "transactionStatus": "Pending",
                    "transactionNumber": "",
                    "taxInvoiceNumber": "",
                    "confirmedUnits": "",
                    "unitBalance": "",
                    "operation": "",
                    "remark": "",
                    "creditNoteNumber": email,
                    "rejectCode": "",
                    "rejectReason": "",
                    "itemno": signalrConnection.itemNo,
                    "nav": "",
                    "fee": "",
                    "sst": ""
                  }

                  this.serviceService.createFundTransaction(FTBody).subscribe(() => {});

                  this.serviceService.postSubscriptionWithoutProvision(newbody)
                  .subscribe((result: any) => {
                  // console.log(result.result.transactionstatus);
                  // console.log(result.result.transactionnumber);
                  // console.log(result.result);
                  if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){


                    signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
                    });

                    this.thirdnamekeyed = result.result.firstname;
                    this.unitholdername = this.thirdnamekeyed;
                    this.unitholderid = this.thirduhidkeyed;
                    this.unitholderic = this.thirdicnokeyed;
                    this.refno = result.result.transactionnumber;
               
                    this.approvalcode = CCInfo.approvalCode;
                    if(appFunc.isOwn == "major"){
                      this.accounttype = "Dewasa"
                    }else if(appFunc.isOwn == "bijak"){
                      this.accounttype = "Bijak/Remaja"
                    }else{
                      if(selectLang.selectedLang == 'ms'){
                        this.accounttype = "Pihak Ketiga"
                      }else{
                        this.accounttype = "Third Party"
                      }
                    }

                    if (currentHolder.email == ""){
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

                    this.isHistorical = this.isBefore4pm();

                    if(selectLang.selectedLang == 'ms'){
                      if(this.amountOrunit){
                        this.status = "Berjaya";
                      }
                      else{
                        this.status = "Diproses";
                        this.isHistorical = false;
                      }
                    }else{
                      if(this.amountOrunit){
                        this.status = "Successful";
                      }
                      else{
                        this.status = "Processing";
                        this.isHistorical = false;
                      }
                    }

                    this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
                    this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                    this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                    this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                    this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
     
                    let module = "";
                    if(appFunc.isOwn == "major"){
                      if(appFunc.isInvesment){
                        module = "9";
                      }else{
                        module = "11";
                      }
                    }else if(appFunc.isOwn == "bijak"){
                      if(appFunc.isInvesment){
                        module = "10";
                      }else{
                        module = "12";
                      }
                    }else{
                      module = "19";
                    }

                    const FTBody =
                    {
                      "trxNo": signalrConnection.trxno,
                      "kioskCode": signalrConnection.kioskCode,
                      "unitHolderID": result.result.unitholderid,
                      "firstName": result.result.firstname,
                      "identificationType": result.result.identificationtype,
                      "identificationNumber": result.result.identificationnumber,
                      "fundID": result.result.fundid,
                      "amountApplied": result.result.amountapplied,
                      "transactionDate": result.result.transactiondate,
                      "transactionTime": result.result.transactiontime,
                      "transactionType": module,
                      "customerICNumber": result.result.customericnumber,
                      "customerName": result.result.customername,
                      "agentCode": result.result.agentCode,
                      "referenceNo": result.result.transactionnumber,
                      "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
                      "bankCustPhoneNumber": result.result.bankcustphonenumber,
                      "paymentType": result.result.paymenttype,
                      "bankAccountNumber": result.result.bankaccountnumber,
                      "bankBranchCode": result.result.bankbranchcode,
                      "chequeNumber": result.result.chequenumber,
                      "chequeDate": result.result.chequedate,
                      "guardianID": result.result.guardianid,
                      "guardianicType": result.result.guardianictype,
                      "guardianicNumber": result.result.guardianicnumber,
                      "policyNumber": result.result.policynumber,
                      "epfNumber": result.result.epfnumber,
                      "subPaymentType": result.result.subpaymenttype,
                      "ewgateway": result.result.ewgateway,
                      "thirdPartyInvestment": result.result.thirdpartyinvestment,
                      "thirdPartyName": result.result.thirdpartyname,
                      "thirdPartyICNumber": result.result.thirdpartyicnumber,
                      "thirdPartyRelationship": result.result.thirdpartyrelationship,
                      "reasonForTransfer": result.result.reasonfortransfer,
                      "sourceOfFund": result.result.sourceoffund,
                      "otherSourceOfFund": result.result.othersourceoffund,
                      "funderName": result.result.fundname,
                      "transactionStatus": result.result.transactionstatus,
                      "transactionNumber": result.result.transactionnumber,
                      "taxInvoiceNumber": result.result.taxinvoicenumber,
                      "confirmedUnits": result.result.unitsalloted,
                      "unitBalance": "",
                      "operation": "",
                      "remark": "",
                      "creditNoteNumber": email,
                      "rejectCode": result.result.rejectcode,
                      "rejectReason": result.result.rejectreason,
                      "itemno": signalrConnection.itemNo,
                      "nav": result.result.fundprice,
                      "fee": result.result.salescharge,
                      "sst": result.result.gstamount
                    }

                    this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});
                    signalrConnection.itemNo += 1;
                    kActivit1.endTime = new Date();
                    kActivit1.status = true;
                    appFunc.kioskActivity.push(kActivit1);

                    this.paymentStep3 = false;
                    this.paymentStep4 = true;

                    this.isClicked = false;

                    setTimeout(() => {
                      this.SIStep5 = false;
                      this.SIStep6 = true;
                    }, 5000);
                  }
                  else if(result.result.transactionstatus.toString() == "" && result.result.transactionnumber.toString() == "" && result.result.rejectcode.toString() == ""){
                    
                    signalrConnection.connection.invoke('deleteCurrCreditCardVoid').then(() => {
                  
                    });
                    
                    this.isRequery = true;  
                    this.STPStep3 = false;
                    this.SIStep5 = true;
                    this.thirdnamekeyed = result.result.firstname;
                    this.unitholdername = this.thirdnamekeyed;
                    this.unitholderid = this.thirduhidkeyed;
                    this.unitholderic = this.thirdicnokeyed;
                    this.refno = result.result.transactionnumber;


                    

                    this.approvalcode = CCInfo.approvalCode;
                    if(appFunc.isOwn == "major"){
                      this.accounttype = "Dewasa"
                    }else if(appFunc.isOwn == "bijak"){
                      this.accounttype = "Bijak/Remaja"
                    }else{
                      if(selectLang.selectedLang == 'ms'){
                        this.accounttype = "Pihak Ketiga"
                      }else{
                        this.accounttype = "Third Party"
                      }
                    }

                    this.isHistorical = this.isBefore4pm();

                    if(selectLang.selectedLang == 'ms'){
                      this.status = "Diproses";
                      this.isHistorical = false;
                    }else{
                      this.status = "Processing";
                      this.isHistorical = false;
                    }

                    this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
                    this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                    this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                    this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
          


                    let module = "";
                    if(appFunc.isOwn == "major"){
                      if(appFunc.isInvesment){
                        module = "9";
                      }else{
                        module = "11";
                      }
                    }else if(appFunc.isOwn == "bijak"){
                      if(appFunc.isInvesment){
                        module = "10";
                      }else{
                        module = "12";
                      }
                    }else{
                      module = "19";
                    }

                    if (currentHolder.email == ""){
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

                    this.requeryInfo = {
                      "channeltype": signalrConnection.channelType,
                      "requestoridentification": signalrConnection.requestIdentification,
                      "deviceowner": signalrConnection.deviceOwner,
                      "agentcode": signalrConnection.agentCode,
                      "branchcode": signalrConnection.branchCode,
                      "banktrxreferencenumber": body.BANKTXNREFERENCENUMBER,
                      "txnreferencenumber": "",
                      "transactiondate": body.TRANSACTIONDATE,
                      "unitholderid": uhid,
                      "identificationtype": ictype,
                      "identificationnumber": icno,
                      "fundid": this.fundid,
                      "guardianid": "",
                      "guardianictype": "",
                      "guardianicnumber": "",
                      "firstname": name,
                      "email": "",
                      "module": module,
                      "language": selectLang.selectedLang,
                      "url": "",
                    }

                    const FTBody =
                    {
                      "trxNo": signalrConnection.trxno,
                      "kioskCode": signalrConnection.kioskCode,
                      "unitHolderID": result.result.unitholderid,
                      "firstName": result.result.firstname,
                      "identificationType": result.result.identificationtype,
                      "identificationNumber": result.result.identificationnumber,
                      "fundID": result.result.fundid,
                      "amountApplied": result.result.amountapplied,
                      "transactionDate": result.result.transactiondate,
                      "transactionTime": result.result.transactiontime,
                      "transactionType": module,
                      "customerICNumber": result.result.customericnumber,
                      "customerName": result.result.customername,
                      "agentCode": result.result.agentCode,
                      "referenceNo": result.result.transactionnumber,
                      "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
                      "bankCustPhoneNumber": result.result.bankcustphonenumber,
                      "paymentType": result.result.paymenttype,
                      "bankAccountNumber": result.result.bankaccountnumber,
                      "bankBranchCode": result.result.bankbranchcode,
                      "chequeNumber": result.result.chequenumber,
                      "chequeDate": result.result.chequedate,
                      "guardianID": result.result.guardianid,
                      "guardianicType": result.result.guardianictype,
                      "guardianicNumber": result.result.guardianicnumber,
                      "policyNumber": result.result.policynumber,
                      "epfNumber": result.result.epfnumber,
                      "subPaymentType": result.result.subpaymenttype,
                      "ewgateway": result.result.ewgateway,
                      "thirdPartyInvestment": result.result.thirdpartyinvestment,
                      "thirdPartyName": result.result.thirdpartyname,
                      "thirdPartyICNumber": result.result.thirdpartyicnumber,
                      "thirdPartyRelationship": result.result.thirdpartyrelationship,
                      "reasonForTransfer": result.result.reasonfortransfer,
                      "sourceOfFund": result.result.sourceoffund,
                      "otherSourceOfFund": result.result.othersourceoffund,
                      "funderName": result.result.fundname,
                      "transactionStatus": result.result.transactionstatus,
                      "transactionNumber": result.result.transactionnumber,
                      "taxInvoiceNumber": result.result.taxinvoicenumber,
                      "confirmedUnits": result.result.unitsalloted,
                      "unitBalance": "",
                      "operation": "",
                      "remark": "",
                      "creditNoteNumber": email,
                      "rejectCode": result.result.rejectcode,
                      "rejectReason": result.result.rejectreason,
                      "itemno": signalrConnection.itemNo,
                      "nav": result.result.fundprice,
                      "fee": result.result.salescharge,
                      "sst": result.result.gstamount
                    }

                    this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});
                    signalrConnection.itemNo += 1;
                    kActivit1.endTime = new Date();
                    kActivit1.status = true;
                    appFunc.kioskActivity.push(kActivit1);

                    this.isClicked = false;

                    setTimeout(() => {
                      this.SIStep5 = false;
                      this.SIStep6 = true;
                    }, 5000);
                  }
                  else{

                    const FTBody =
                    {
                      "trxNo": signalrConnection.trxno,
                      "kioskCode": signalrConnection.kioskCode,
                      "unitHolderID": this.thirduhidkeyed,
                      "firstName": "",
                      "identificationType": this.thirdictypekeyed,
                      "identificationNumber": this.thirdicnokeyed,
                      "fundID": this.thirdfundnamekeyed,
                      "amountApplied": this.thirdamountkeyed,
                      "transactionDate": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
                      "transactionTime": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
                      "transactionType": module,
                      "customerICNumber": "",
                      "customerName": "",
                      "agentCode": signalrConnection.agentCode,
                      "referenceNo": "",
                      "bankTxnReferenceNumber": formatDate(new Date(), 'ddMMyy', 'en') + cardInfo.RRN.toString().substring(cardInfo.RRN.length - 10),
                      "bankCustPhoneNumber": "",
                      "paymentType": "T",
                      "bankAccountNumber": "",
                      "bankBranchCode": "",
                      "chequeNumber": "",
                      "chequeDate": "",
                      "guardianID": "",
                      "guardianicType": "",
                      "guardianicNumber": "",
                      "policyNumber": "",
                      "epfNumber": "",
                      "subPaymentType": "",
                      "ewgateway": "",
                      "thirdPartyInvestment": "Y",
                      "thirdPartyName": name,
                      "thirdPartyICNumber": icno,
                      "thirdPartyRelationship": this.thirdrelationshipkeyed,
                      "reasonForTransfer": this.thirdreasonkeyed,
                      "sourceOfFund": this.sourceOfFund,
                      "otherSourceOfFund": this.sourceOther,
                      "funderName": this.otherSourceOfFund,
                      "transactionStatus": "Failed",
                      "transactionNumber": "",
                      "taxInvoiceNumber": "",
                      "confirmedUnits": "",
                      "unitBalance": "",
                      "operation": "",
                      "remark": "",
                      "creditNoteNumber": email,
                      "rejectCode": "",
                      "rejectReason": "",
                      "itemno": signalrConnection.itemNo,
                      "nav": "",
                      "fee": "",
                      "sst": ""
                    }

                    this.serviceService.updateFundTransaction(FTBody).subscribe(() => {});

                    this.isClicked = false;
                    errorCodes.Ecode = result.result.rejectcode;
                    errorCodes.Emessage = result.result.rejectreason;
                    if(selectLang.selectedLang == 'ms'){
                      if(appFunc.isOwn == "major"){
                        errorCodes.accountType = "Dewasa";
                        errorCodes.accountName = currentHolder.firstname;
                        errorCodes.accountNo = currentHolder.unitholderid;
                      }else if(appFunc.isOwn == "bijak"){
                        errorCodes.accountType = "Bijak/Remaja";
                        errorCodes.accountName = name;
                        errorCodes.accountNo = uhid;
                      }else{
                        errorCodes.accountType = "Pihak Ketiga";
                        errorCodes.accountName = currentHolder.firstname;
                        errorCodes.accountNo = currentHolder.unitholderid;
                      }
                    }else{
                      if(appFunc.isOwn == "major"){
                        errorCodes.accountType = "Dewasa";
                        errorCodes.accountName = currentHolder.firstname;
                        errorCodes.accountNo = currentHolder.unitholderid;
                      }else if(appFunc.isOwn == "bijak"){
                        errorCodes.accountType = "Bijak/Remaja";
                        errorCodes.accountName = name;
                        errorCodes.accountNo = uhid;
                      }else{
                        errorCodes.accountType = "Pihak Ketiga";
                        errorCodes.accountName = currentHolder.firstname;
                        errorCodes.accountNo = currentHolder.unitholderid;
                      }
                    }
                    errorCodes.transaction = this.transaction;
                    signalrConnection.connection.invoke('DoVoid', PaymentAmt, cardInfo.HostNo, cardInfo.TransactionTrace, signalrConnection.trxno).then(() => {
                  
                    });
                    kActivit1.endTime = new Date();
                    kActivit1.status = false;
                    appFunc.kioskActivity.push(kActivit1);
                    this._router.navigate(['errorscreen']);
                  }
                  });
                });
              }
              else if(this.checkTerminalErrorCodes(statusCode)){
                this.isClicked = false;
                signalrConnection.connection.invoke('deleteCreditCardInfo', false).then(() => {
                  
                });
                errorCodes.Ecode = statusCode;
                errorCodes.Emessage = `Terminal Status Code ${statusCode}`;
                if(selectLang.selectedLang == 'ms'){
                  if(appFunc.isOwn == "major"){
                    errorCodes.accountType = "Dewasa";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }else if(appFunc.isOwn == "bijak"){
                    errorCodes.accountType = "Bijak/Remaja";
                    errorCodes.accountName = name;
                    errorCodes.accountNo = uhid;
                  }else{
                    errorCodes.accountType = "Pihak Ketiga";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }
                }else{
                  if(appFunc.isOwn == "major"){
                    errorCodes.accountType = "Dewasa";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }else if(appFunc.isOwn == "bijak"){
                    errorCodes.accountType = "Bijak/Remaja";
                    errorCodes.accountName = name;
                    errorCodes.accountNo = uhid;
                  }else{
                    errorCodes.accountType = "Pihak Ketiga";
                    errorCodes.accountName = currentHolder.firstname;
                    errorCodes.accountNo = currentHolder.unitholderid;
                  }
                }
                errorCodes.transaction = this.transaction;
                kActivit1.endTime = new Date();
                kActivit1.status = false;
                appFunc.kioskActivity.push(kActivit1);
                this._router.navigate(['errorscreen']);
              }
              else{
                theLoop(statusCode);
              }
            });
          }, 3000);
        };
        theLoop(statusCode);
      });
    }
    
  }

  Print(){
    this.SIStep6 = false;
    this.Print1_Visible = true;

    let selectedUnitHolder = "";
    let selectedUnitHolderID = "";
    let selectedUnitHolderIC = "";

    if(appFunc.isOwn == "major"){
      selectedUnitHolder = currentHolder.firstname;
      selectedUnitHolderID = currentHolder.unitholderid;
      selectedUnitHolderIC = currentHolder.identificationnumber;
    }
    else if(appFunc.isOwn == "bijak"){
      selectedUnitHolder = this.currentBijakName;
      selectedUnitHolderID = this.currentBijakUHID;
      selectedUnitHolderIC = this.currentBijakIDNO;
    }
    else{
      selectedUnitHolder = currentHolder.firstname;
      selectedUnitHolderID = currentHolder.unitholderid;
      selectedUnitHolderIC = currentHolder.identificationnumber;
    }


    let fundname = "";
    appFunc.ASNBFundID.forEach((element: ASNBFundID) => {
      if(this.fundid.toLowerCase() == element.code.toString().toLowerCase()){
        fundname = element.value;
      }
    });

    let paidamount = 0;
    if(appFunc.isOwn == "major" || appFunc.isOwn == "bijak"){
      paidamount = this.amountKeyed;
    }
    else{
      paidamount = this.thirdamountkeyed;
    }

    

    if(signalrConnection.isHardcodedIC){
      const objCardInfo = 
      [{
        "DateTime" : formatDate(new Date(), 'dd/MM/yyyy h:MM:ss a', 'en'),
        "BatchNum" : "",
        "Invoice" : "",
        "MID" : "",
        "TID" : "",
        "Type" : "",
        "CardName" : "",
        "CardNumber" : "",
        "ExpDate" : "",
        "ApprovalCode" : "",
        "ReferenceNumber" : "",
        "TotalAmount" : paidamount,
        "ApplicationLabel": "",
        "TransactionTrace": "",
        "HostNo": ""
      }]

      let accountType = "";
      if(selectLang.selectedLang == 'ms'){
        if(appFunc.isOwn == "major"){
          accountType = "Dewasa";
        }else if(appFunc.isOwn == "bijak"){
          accountType = "Bijak/Remaja";
        }else{
          accountType = "Pihak Ketiga";
        }
      }else{
        if(appFunc.isOwn == "major"){
          accountType = "Dewasa";
        }else if(appFunc.isOwn == "bijak"){
          accountType = "Bijak/Remaja";
        }else{
          accountType = "Third Party";
        }
      }
      
      // if(this.thirduhidkeyed == ""){
        appFunc.body = 
        {
          "Transaction" : this.transaction.toUpperCase(),
          "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Location" : signalrConnection.branchName,
          "Name" : selectedUnitHolder,
          "UHID" : selectedUnitHolderID,
          "NRIC" : selectedUnitHolderIC,
          "AccountType" : accountType,
          "TransactionNumber" : this.refno,
          "FUNDID" : fundname,
          "FUNDPRICE" : this.nav,
          "UNITSALLOTED" : this.unitsalloted,
          "FEEPERCENTAGE" : this.feepercentage,
          "SALESCHARGE" : this.initialcharges,
          "GSTAMOUNT" : this.sst,
          "UHIDTHIRDPARTY": this.thirduhidkeyed,
          "NAMETHIRDPARTY": this.thirdnamekeyed,
          "CARDINFO" : objCardInfo,
          "Language" : selectLang.selectedLang,
          "Signature" : ""
        }
      // }
      // else{
      //   appFunc.body = 
      //   {
      //     "Transaction" : this.transaction.toUpperCase(),
      //     "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      //     "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      //     "Location" : signalrConnection.branchName,
      //     "Name" : this.thirdnamekeyed,
      //     "UHID" : this.thirduhidkeyed,
      //     "NRIC" : selectedUnitHolderIC,
      //     "AccountType" : accountType,
      //     "TransactionNumber" : this.refno,
      //     "FUNDID" : fundname,
      //     "FUNDPRICE" : this.nav,
      //     "UNITSALLOTED" : this.unitsalloted,
      //     "FEEPERCENTAGE" : this.feepercentage,
      //     "SALESCHARGE" : this.initialcharges,
      //     "GSTAMOUNT" : this.sst,
      //     "UHIDTHIRDPARTY": selectedUnitHolderID,
      //     "NAMETHIRDPARTY": selectedUnitHolder,
      //     "CARDINFO" : objCardInfo,
      //     "Language" : selectLang.selectedLang,
      //     "Signature" : ""
      //   }
      // }
      
  
      appFunc.receiptFunction = "GetFinancialTrxPrintout"
  

      if(this.isRequery){
        signalrConnection.connection.invoke(
          'InsertRequery', 
          signalrConnection.channelType,
          signalrConnection.requestIdentification,
          signalrConnection.deviceOwner,
          signalrConnection.agentCode,
          signalrConnection.branchCode,
          this.requeryInfo.banktrxreferencenumber,
          "",
          this.requeryInfo.transactiondate,
          this.requeryInfo.unitholderid,
          this.requeryInfo.identificationtype,
          this.requeryInfo.identificationnumber,
          this.requeryInfo.fundid,
          this.requeryInfo.guardianid,
          this.requeryInfo.guardianictype,
          this.requeryInfo.guardianicnumber,
          this.requeryInfo.firstname,
          currentHolder.email,
          this.requeryInfo.module,
          this.requeryInfo.language,
          JSON.stringify(appFunc.body)
        ).then((data: any) => {
    
        });
      }
      
  
      appFunc.printing = true;
      signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
        if(data){
      
          signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), appFunc.receiptFunction, signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
            setTimeout(()=>{   
              if (data == true){
                this.Print1_Visible = false;
                this.Print2_Visible = true;
                setTimeout(()=>{
                  this.getAccountInquiry();
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
    else{
      const objCardInfo = 
      [{
        "DateTime" : this.CCinformation.createDate,
        "BatchNum" : this.tempCardInfo.BatchNumber,
        "Invoice" : this.tempCardInfo.TransactionTrace,
        "MID" : this.tempCardInfo.MID,
        "TID" : this.tempCardInfo.TID,
        "Type" : this.tempCardInfo.CardType,
        "CardName" : this.tempCardInfo.CardholderName,
        "CardNumber" : this.tempCardInfo.CardNo,
        "ExpDate" : this.tempCardInfo.ExpiryDate,
        "ApprovalCode" : this.tempCardInfo.ApprovalCode,
        "ReferenceNumber" : this.tempCardInfo.RRN,
        "TotalAmount" : paidamount,
        "ApplicationLabel": this.tempCardInfo.ApplicationLabel,
        "TransactionTrace": this.tempCardInfo.TransactionTrace,
        "HostNo": this.tempCardInfo.HostNo
      }]

      let accountType = "";
      let module = "";
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        if(appFunc.isInvesment){
          module = "9";
        }else{
          module = "11";
        }
      }
      else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        if(appFunc.isInvesment){
          module = "10";
        }else{
          module = "12";
        }
      }
      else{
        if(selectLang.selectedLang == 'ms'){
          accountType = "Pihak Ketiga";
        }
        else{
          accountType = "Third Party";
        }
        module = "19";
      }
    

      // if(this.thirduhidkeyed == ""){
        appFunc.body = 
        {
          "Transaction" : this.transaction.toUpperCase(),
          "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Location" : signalrConnection.branchName,
          "Name" : selectedUnitHolder,
          "UHID" : selectedUnitHolderID,
          "NRIC" : selectedUnitHolderIC,
          "AccountType" : accountType,
          "TransactionNumber" : this.refno,
          "FUNDID" : fundname,
          "FUNDPRICE" : this.nav,
          "UNITSALLOTED" : this.unitsalloted,
          "FEEPERCENTAGE" : this.feepercentage,
          "SALESCHARGE" : this.initialcharges,
          "GSTAMOUNT" : this.sst,
          "UHIDTHIRDPARTY": this.thirduhidkeyed,
          "NAMETHIRDPARTY": this.thirdnamekeyed,
          "CARDINFO" : objCardInfo,
          "Language" : selectLang.selectedLang,
          "Signature" : ""
        }
      // }
      // else{
      //   appFunc.body = 
      //   {
      //     "Transaction" : this.transaction.toUpperCase(),
      //     "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      //     "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      //     "Location" : signalrConnection.branchName,
      //     "Name" : this.thirdnamekeyed,
      //     "UHID" : this.thirduhidkeyed,
      //     "NRIC" : selectedUnitHolderIC,
      //     "AccountType" : accountType,
      //     "TransactionNumber" : this.refno,
      //     "FUNDID" : fundname,
      //     "FUNDPRICE" : this.nav,
      //     "UNITSALLOTED" : this.unitsalloted,
      //     "FEEPERCENTAGE" : this.feepercentage,
      //     "SALESCHARGE" : this.initialcharges,
      //     "GSTAMOUNT" : this.sst,
      //     "UHIDTHIRDPARTY": selectedUnitHolderID,
      //     "NAMETHIRDPARTY": selectedUnitHolder,
      //     "CARDINFO" : objCardInfo,
      //     "Language" : selectLang.selectedLang,
      //     "Signature" : ""
      //   }
      // }

      console.log(JSON.stringify(appFunc.body));
  
      appFunc.receiptFunction = "GetFinancialTrxPrintout"

      if(this.isRequery){
        signalrConnection.connection.invoke(
          'InsertRequery', 
          signalrConnection.channelType,
          signalrConnection.requestIdentification,
          signalrConnection.deviceOwner,
          signalrConnection.agentCode,
          signalrConnection.branchCode,
          this.requeryInfo.banktrxreferencenumber,
          "",
          this.requeryInfo.transactiondate,
          this.requeryInfo.unitholderid,
          this.requeryInfo.identificationtype,
          this.requeryInfo.identificationnumber,
          this.requeryInfo.fundid,
          this.requeryInfo.guardianid,
          this.requeryInfo.guardianictype,
          this.requeryInfo.guardianicnumber,
          this.requeryInfo.firstname,
          currentHolder.email,
          this.requeryInfo.module,
          this.requeryInfo.language,
          JSON.stringify(appFunc.body)
        ).then((data: any) => {
    
        });
      }
      
  
      appFunc.printing = true;
      signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
        console.log(data);
        if(data){
          
          signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), appFunc.receiptFunction, signalrConnection.trxno, module, selectLang.selectedLang).then((data: any) => {
            setTimeout(()=>{   
              if (data == true){
                this.Print1_Visible = false;
                this.Print2_Visible = true;
                setTimeout(()=>{
                  this.getAccountInquiry();
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
    
  }

  Email(){
    this.SIStep6 = false;
    this.EmailPage_Visible = true;

    let selectedUnitHolder = "";
    let selectedUnitHolderID = "";
    let selectedUnitHolderIC = "";

    if(appFunc.isOwn == "major"){
      selectedUnitHolder = currentHolder.firstname;
      selectedUnitHolderID = currentHolder.unitholderid;
      selectedUnitHolderIC = currentHolder.identificationnumber;
    }
    else if(appFunc.isOwn == "bijak"){
      selectedUnitHolder = this.currentBijakName;
      selectedUnitHolderID = this.currentBijakUHID;
      selectedUnitHolderIC = this.currentBijakIDNO;
    }
    else{
      selectedUnitHolder = currentHolder.firstname;
      selectedUnitHolderID = currentHolder.unitholderid;
      selectedUnitHolderIC = currentHolder.identificationnumber;
    }

    let fundname = "";
    appFunc.ASNBFundID.forEach((element: ASNBFundID) => {
      if(this.fundid.toLowerCase() == element.code.toString().toLowerCase()){
        fundname = element.value;
      }
    });


    let paidamount = 0;
    if(appFunc.isOwn == "major" || appFunc.isOwn == "bijak"){
      paidamount = this.amountKeyed;
    }
    else{
      paidamount = this.thirdamountkeyed;
    }

    
    if(signalrConnection.isHardcodedIC){
      const objCardInfo = 
      [{
        "DateTime" : formatDate(new Date(), 'dd/MM/yyyy h:MM:ss a', 'en'),
        "BatchNum" : "",
        "Invoice" : "",
        "MID" : "",
        "TID" : "",
        "Type" : "",
        "CardName" : "",
        "CardNumber" : "",
        "ExpDate" : "",
        "ApprovalCode" : "",
        "ReferenceNumber" : "",
        "TotalAmount" : paidamount,
        "ApplicationLabel": "",
        "TransactionTrace": "",
        "HostNo": ""
      }]

      let accountType = "";
      let module = "";
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        if(appFunc.isInvesment){
          module = "9";
        }else{
          module = "11";
        }
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        if(appFunc.isInvesment){
          module = "10";
        }else{
          module = "12";
        }
      }else{
        if(selectLang.selectedLang == 'ms'){
          accountType = "Pihak Ketiga";
        }
        else{
          accountType = "Third Party";
        }
        module = "19";
      }
      
      // if(this.thirduhidkeyed == ""){
        appFunc.body = 
        {
          "Transaction" : this.transaction.toUpperCase(),
          "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Location" : signalrConnection.branchName,
          "Name" : selectedUnitHolder,
          "UHID" : selectedUnitHolderID,
          "NRIC" : selectedUnitHolderIC,
          "AccountType" : accountType,
          "TransactionNumber" : this.refno,
          "FUNDID" : fundname,
          "FUNDPRICE" : this.nav,
          "UNITSALLOTED" : this.unitsalloted,
          "FEEPERCENTAGE" : this.feepercentage,
          "SALESCHARGE" : this.initialcharges,
          "GSTAMOUNT" : this.sst,
          "UHIDTHIRDPARTY": this.thirduhidkeyed,
          "NAMETHIRDPARTY": this.thirdnamekeyed,
          "CARDINFO" : objCardInfo,
          "Language" : selectLang.selectedLang,
          "Signature" : ""
        }
      // }
      // else{
      //   appFunc.body = 
      //   {
      //     "Transaction" : this.transaction.toUpperCase(),
      //     "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      //     "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      //     "Location" : signalrConnection.branchName,
      //     "Name" : this.thirdnamekeyed,
      //     "UHID" : this.thirduhidkeyed,
      //     "NRIC" : selectedUnitHolderIC,
      //     "AccountType" : accountType,
      //     "TransactionNumber" : this.refno,
      //     "FUNDID" : fundname,
      //     "FUNDPRICE" : this.nav,
      //     "UNITSALLOTED" : this.unitsalloted,
      //     "FEEPERCENTAGE" : this.feepercentage,
      //     "SALESCHARGE" : this.initialcharges,
      //     "GSTAMOUNT" : this.sst,
      //     "UHIDTHIRDPARTY": selectedUnitHolderID,
      //     "NAMETHIRDPARTY": selectedUnitHolder,
      //     "CARDINFO" : objCardInfo,
      //     "Language" : selectLang.selectedLang,
      //     "Signature" : ""
      //   }
      // }

      if(this.thirduhidkeyed == ""){
        appFunc.emailObj =
        {
          "Name" : this.unitholdername,
          "UnitHolderID" : this.unitholderid,
          "Module" : module,
          "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
          "language" : selectLang.selectedLang,
          "IC" : this.unitholderic
        }
      }
      else{
        appFunc.emailObj =
        {
          "Name" : selectedUnitHolder,
          "UnitHolderID" : selectedUnitHolderID,
          "Module" : module,
          "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
          "language" : selectLang.selectedLang,
          "IC" : this.unitholderic
        }
      }
      

      appFunc.receiptFunction = "GetFinancialTrxPrintout"


      if(this.isRequery){
        signalrConnection.connection.invoke(
          'InsertRequery', 
          signalrConnection.channelType,
          signalrConnection.requestIdentification,
          signalrConnection.deviceOwner,
          signalrConnection.agentCode,
          signalrConnection.branchCode,
          this.requeryInfo.banktrxreferencenumber,
          "",
          this.requeryInfo.transactiondate,
          this.requeryInfo.unitholderid,
          this.requeryInfo.identificationtype,
          this.requeryInfo.identificationnumber,
          this.requeryInfo.fundid,
          this.requeryInfo.guardianid,
          this.requeryInfo.guardianictype,
          this.requeryInfo.guardianicnumber,
          this.requeryInfo.firstname,
          currentHolder.email,
          this.requeryInfo.module,
          this.requeryInfo.language,
          JSON.stringify(appFunc.body)
        ).then((data: any) => {
    
        });
      }
      
      
      appFunc.printing = false;
      signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, module, JSON.stringify(appFunc.emailObj), this.fundname).then((data: any) => {
        // setTimeout(()=>{   
        //   if (data == true){
        //     this.getAccountInquiry();
        //     setTimeout(()=>{   
        //       this.EmailPage_Visible = false;
        //     }, 3000);
        //   }else{
        //     errorCodes.Ecode = "0069";
        //     errorCodes.Emessage = "Email Failed";
        //     this._router.navigate(['errorscreen']);
        //   }
        // }, 3000);
      });

      setTimeout(()=>{   
        this.EmailPage_Visible = false;
        this.getAccountInquiry();
      }, 5000);
    }else{
      const objCardInfo = 
      [{
        "DateTime" : this.CCinformation.createDate,
        "BatchNum" : this.tempCardInfo.BatchNumber,
        "Invoice" : this.tempCardInfo.TransactionTrace,
        "MID" : this.tempCardInfo.MID,
        "TID" : this.tempCardInfo.TID,
        "Type" : this.tempCardInfo.CardType,
        "CardName" : this.tempCardInfo.CardholderName,
        "CardNumber" : this.tempCardInfo.CardNo,
        "ExpDate" : this.tempCardInfo.ExpiryDate,
        "ApprovalCode" : this.tempCardInfo.ApprovalCode,
        "ReferenceNumber" : this.tempCardInfo.RRN,
        "TotalAmount" : paidamount,
        "ApplicationLabel": this.tempCardInfo.ApplicationLabel,
        "TransactionTrace": this.tempCardInfo.TransactionTrace,
        "HostNo": this.tempCardInfo.HostNo
      }]

      let accountType = "";
      let module = "";
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        if(appFunc.isInvesment){
          module = "9";
        }else{
          module = "11";
        }
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        if(appFunc.isInvesment){
          module = "10";
        }else{
          module = "12";
        }
      }else{
        if(selectLang.selectedLang == 'ms'){
          accountType = "Pihak Ketiga";
        }
        else{
          accountType = "Third Party";
        }
        module = "19";
      }
      
      

      // if(this.thirduhidkeyed == ""){
        appFunc.body = 
        {
          "Transaction" : this.transaction.toUpperCase(),
          "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
          "Location" : signalrConnection.branchName,
          "Name" : selectedUnitHolder,
          "UHID" : selectedUnitHolderID,
          "NRIC" : selectedUnitHolderIC,
          "AccountType" : accountType,
          "TransactionNumber" : this.refno,
          "FUNDID" : fundname,
          "FUNDPRICE" : this.nav,
          "UNITSALLOTED" : this.unitsalloted,
          "FEEPERCENTAGE" : this.feepercentage,
          "SALESCHARGE" : this.initialcharges,
          "GSTAMOUNT" : this.sst,
          "UHIDTHIRDPARTY": this.thirduhidkeyed,
          "NAMETHIRDPARTY": this.thirdnamekeyed,
          "CARDINFO" : objCardInfo,
          "Language" : selectLang.selectedLang,
          "Signature" : ""
        }
      // }
      // else{
      //   appFunc.body = 
      //   {
      //     "Transaction" : this.transaction.toUpperCase(),
      //     "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      //     "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      //     "Location" : signalrConnection.branchName,
      //     "Name" : this.thirdnamekeyed,
      //     "UHID" : this.thirduhidkeyed,
      //     "NRIC" : selectedUnitHolderIC,
      //     "AccountType" : accountType,
      //     "TransactionNumber" : this.refno,
      //     "FUNDID" : fundname,
      //     "FUNDPRICE" : this.nav,
      //     "UNITSALLOTED" : this.unitsalloted,
      //     "FEEPERCENTAGE" : this.feepercentage,
      //     "SALESCHARGE" : this.initialcharges,
      //     "GSTAMOUNT" : this.sst,
      //     "UHIDTHIRDPARTY": selectedUnitHolderID,
      //     "NAMETHIRDPARTY": selectedUnitHolder,
      //     "CARDINFO" : objCardInfo,
      //     "Language" : selectLang.selectedLang,
      //     "Signature" : ""
      //   }
      // }
      if(this.thirduhidkeyed == ""){
        appFunc.emailObj =
        {
          "Name" : this.unitholdername,
          "UnitHolderID" : this.unitholderid,
          "Module" : module,
          "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
          "language" : selectLang.selectedLang,
          "IC" : this.unitholderic
        }
      }
      else{
        appFunc.emailObj =
        {
          "Name" : selectedUnitHolder,
          "UnitHolderID" : selectedUnitHolderID,
          "Module" : module,
          "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
          "language" : selectLang.selectedLang,
          "IC" : this.unitholderic
        }
      }
      

      appFunc.receiptFunction = "GetFinancialTrxPrintout"


      if(this.isRequery){
        signalrConnection.connection.invoke(
          'InsertRequery', 
          signalrConnection.channelType,
          signalrConnection.requestIdentification,
          signalrConnection.deviceOwner,
          signalrConnection.agentCode,
          signalrConnection.branchCode,
          this.requeryInfo.banktrxreferencenumber,
          "",
          this.requeryInfo.transactiondate,
          this.requeryInfo.unitholderid,
          this.requeryInfo.identificationtype,
          this.requeryInfo.identificationnumber,
          this.requeryInfo.fundid,
          this.requeryInfo.guardianid,
          this.requeryInfo.guardianictype,
          this.requeryInfo.guardianicnumber,
          this.requeryInfo.firstname,
          currentHolder.email,
          this.requeryInfo.module,
          this.requeryInfo.language,
          JSON.stringify(appFunc.body)
        ).then((data: any) => {
    
        });
      }
      
      
      
      appFunc.printing = false;
      signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, module, JSON.stringify(appFunc.emailObj), this.fundname).then((data: any) => {
        // setTimeout(()=>{   
        //   if (data == true){
        //     this.getAccountInquiry();
        //     setTimeout(()=>{   
        //       this.EmailPage_Visible = false;
        //     }, 3000);
        //   }else{
        //     errorCodes.Ecode = "0069";
        //     errorCodes.Emessage = "Email Failed";
        //     this._router.navigate(['errorscreen']);
        //   }
        // }, 3000);
      });

      setTimeout(()=>{   
        this.EmailPage_Visible = false;
        this.getAccountInquiry();
      }, 5000);
    }
    

  }


  isBefore4pm(){
    let today = new Date().getHours();
    if (today < 20) { //Temporary change to 20, 8pm
      return true;
    } else {
      return false;
    }
  }

  agreeTNC(event: any){
    if (event.target.checked){
      this.disagreedTNC = false;
    }else{
      this.disagreedTNC = true;
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


  getAccountInquiry(): void {
    try{

      if(appFunc.isOwn == "bijak"){

        const body = { 

          "CHANNELTYPE": signalrConnection.channelType,
          "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
          "DEVICEOWNER": signalrConnection.deviceOwner,
          "UNITHOLDERID": "",
          "FIRSTNAME": "",
          "IDENTIFICATIONTYPE": "W",
          "IDENTIFICATIONNUMBER": this.currentBijakIDNO,
          "FUNDID": "",
          "INQUIRYCODE": "9",
          "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en'),
          "BANKTXNREFERENCENUMBER": signalrConnection.trxno,
          "BANKCUSTPHONENUMBER": "",
          "FILTRATIONFLAG": "1",
          "GUARDIANID": currentHolder.unitholderid,
          "GUARDIANICTYPE": currentHolder.identificationtype,
          "GUARDIANICNUMBER": currentHolder.identificationnumber,
        "LANGUAGE": selectLang.selectedLang
  
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
              errorCodes.Ecode = "0109";
              errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
              errorCodes.accountName = currentMyKidDetails.Name;
              errorCodes.accountNo = currentBijakHolder.unitholderid;
              errorCodes.accountType = 'Bijak';
              errorCodes.transaction = 'PrintingEmail';
              this._router.navigate(['errorscreen']);
            }
            else{
              if(currentBijakHolder.unitholderid != "" || currentBijakHolder.unitholderid != undefined){
                signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "Account Found.");
                this.Print1_Visible = false;
                this.Print2_Visible = false;
                this.EmailPage_Visible = false;

                this.transaction_Successful = true;
                //this._router.navigate(['transactionsuccessful']);
              }
            }
          }
          else{
            if (currentBijakHolder.rejectcode.toString() == "019"){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "No account found.");
  
              
              this._router.navigate(['feedbackscreen']);
            }
            else{
              errorCodes.Ecode = currentBijakHolder.rejectcode;
              errorCodes.Emessage = currentBijakHolder.rejectreason;
              errorCodes.accountName = currentMyKidDetails.Name;
              errorCodes.accountNo = currentBijakHolder.unitholderid;
              errorCodes.accountType = 'Bijak';
            errorCodes.transaction = 'PrintingEmail';
              this._router.navigate(['errorscreen']);
            }
          }
        });
      }else{
        const body = { 

          "CHANNELTYPE": signalrConnection.channelType,
          "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
          "DEVICEOWNER": signalrConnection.deviceOwner,
          "UNITHOLDERID": "",
          "FIRSTNAME": "",
          "IDENTIFICATIONTYPE": currentMyKadDetails.CategoryType,
          "IDENTIFICATIONNUMBER": currentMyKadDetails.ICNo,
          "FUNDID": "",
          "INQUIRYCODE": "9",
          "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en'),
          "BANKTXNREFERENCENUMBER": signalrConnection.trxno ,
          "BANKCUSTPHONENUMBER": "",
          "FILTRATIONFLAG": "1",
          "GUARDIANID": "",
          "GUARDIANICTYPE": "",
          "GUARDIANICNUMBER": "",
          "LANGUAGE": selectLang.selectedLang
  
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
              errorCodes.Ecode = "0109";
              errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
              errorCodes.accountName = currentMyKadDetails.Name;
              errorCodes.accountNo = currentHolder.unitholderid;
              errorCodes.accountType = 'Dewasa';
              errorCodes.transaction = 'PrintingEmail';
              this._router.navigate(['errorscreen']);
            }
            else{
              if(currentHolder.unitholderid != "" || currentHolder.unitholderid != undefined){
                signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Account Found.");
  
                
                this.Print1_Visible = false;
                this.Print2_Visible = false;
                this.EmailPage_Visible = false;
  
                this.transaction_Successful = true;
                //this._router.navigate(['transactionsuccessful']);
              }
            }
          }
          else{
            if (currentHolder.rejectcode.toString() == "019"){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "No account found.");
  
              
              this._router.navigate(['feedbackscreen']);
            }
            else{
              errorCodes.Ecode = currentHolder.rejectcode;
              errorCodes.Emessage = currentHolder.rejectreason;
              errorCodes.accountName = currentMyKadDetails.Name;
              errorCodes.accountNo = currentHolder.unitholderid;
              errorCodes.accountType = 'Dewasa';
              errorCodes.transaction = 'PrintingEmail';
              this._router.navigate(['errorscreen']);
            }
          }
        });
      }
      
    }
    catch (e){
      errorCodes.code = "0168";
      errorCodes.message = "Account Inquiry Issue";
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + `WebApp Component [PrintingEmail]` + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }


    
  }


}
