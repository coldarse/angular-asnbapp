import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeMissingTranslationHandler, TranslateService } from '@ngx-translate/core';

import { AppConfiguration } from '../config/app-configuration';
import { accessToken } from '../_models/apiToken';
import { appFunc } from '../_models/appFunctions';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { ASNBFundID } from '../_models/dropDownLists';
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

  pdfsrc1 = "assets/Terms_N_Condition.pdf";
  pdfsrc2 = "assets/ASNB_MasterProspectus.pdf";
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

  

  isSubscription = false;
  isInvestment = false;
  isOwn = false;
  isBijak = false;
  isThird = false;

  BijakVisible = false;

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

  disagreedTNC = true;

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

  unitholderid = "";  
  unitholdername = "";
  unitholderic = "";

  fundSource = appFunc.fundSource;
  reason = appFunc.reasonTransfer;
  relationship = appFunc.thirdPartyRelationship;
  ictype = appFunc.ictype;
  fundnamelist: any;

  
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

  ispopup = false;
  

  paymentStep1 = true;
  paymentStep2 = false;
  paymentStep3 = false;

  thirdictypekeyed = "";
  thirdicnokeyed = "";
  thirduhidkeyed = "";
  thirdnamekeyed = "";
  thirdreasonkeyed = "";
  thirdrelationshipkeyed = "";
  thirdfundnamekeyed = "";
  thirdamountkeyed = "";

  transaction = "";
  currentBijakUHID = "";
  currentBijakIDNO = "";
  currentBijakIDType = "";
  currentBijakName = "";

  InvestmentMinValue = 0.00;
  InvestmentMaxValue = 0.00;
  SubscriptionMinValue = 0.00;
  SubscriptionMaxValue = 0.00;

  Form_1: any;
  Form_2: any;
  Form_3: any;
  Form_4: any;

  variableFunds: any = [];
  fixedFunds: any = [];

  testing = [];

  variableFundsFilter = [
    'ASNI03',
    'ASNE05',
    'AASSGD',
    'ASN3',
    'ASN',
    'AASSGK',
    'AASSGS',
    'ASNS02',
    'ASN2',
  ];
  fixedFundsFilter = [
    'ASW',
    'AS1M',
    'ASB2',
    'ASM',
    'ASB',
    'ASD',
  ];
  isloadedfunds = false;

  mDetails = currentHolder.minordetail;


  constructor(
    private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private serviceService : ServiceService,
    private appConfig: AppConfiguration
  ) { }


  checkAMLA(){
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
          currentBijakHolder.riskprofile = data.result.rtnHit;
          if(currentBijakHolder.riskprofile == "HC"){
            //Error screen?
          }
        });
      }
      else if(currentBijakHolder.riskprofile == "HC"){
        //Error screen?
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
          if(data.result.rtnHit == "HC"){
            //Error screen?
          }
        });
      }
      else if(currentHolder.riskprofile == "HC"){
        //Error screen?
      }
    }
  }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    this.initializeForm1();
    this.fundnamelist = [];

    currentHolder.funddetail.forEach((elem: any) => {
      appFunc.ASNBFundID.forEach((element: any) => {
        if(elem.FUNDID != undefined){
          if(elem.FUNDID.toString().toLowerCase() == element.code.toString().toLowerCase()){
            this.fundnamelist.push(element);
          }
        }
      })
    })

    if(selectLang.selectedLang == 'en'){
      if(appFunc.isInvesment){
        this.transaction = "Initial Investment";
      }else{
        this.transaction = "Subscription";
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
      this.checkAMLA();
      if(appFunc.isOwn == "major"){
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
          "FUNDLISTTYPE":"N"
        }

        this.variableFunds = [];
        this.fixedFunds = [];

        console.log(JSON.stringify(body));

        this.serviceService.postEligibleFunds(body)
        .subscribe((result: any) => {
          result.result.fundid.forEach((elem1: string) => {
            this.variableFundsFilter.forEach((elem2: string) =>{
              if(elem1.toString() == elem2.toString()){
                this.variableFunds.push(elem1);
              }
            })
          });
          result.result.fundid.forEach((elem1: string) => {
            this.fixedFundsFilter.forEach((elem2: string) =>{
              if(elem1.toString() == elem2.toString()){
                this.fixedFunds.push(elem1);
              }
            })
          });
          this.isloadedfunds = true;
        });
        
      }else if(appFunc.isOwn == "bijak"){
        this.isInvestmentMinor = true;
        this.isBijak = true;
        this.BijakVisible = true;
      }
    }else{
      this.isSubscription = true;
      if(appFunc.isOwn == "major"){
        currentHolder.funddetail.forEach((elem1: any) => {
          this.variableFundsFilter.forEach((elem2: string) =>{
            if(elem1.FUNDID.toString() == elem2.toString()){
              this.variableFunds.push(elem1.FUNDID.toString());
            }
          })
        });
        currentHolder.funddetail.forEach((elem1: any) => {
          this.fixedFundsFilter.forEach((elem2: string) =>{
            if(elem1.FUNDID.toString() == elem2.toString()){
              this.fixedFunds.push(elem1.FUNDID.toString());
            }
          })
        });
        console.log(this.variableFunds);
        console.log(this.fixedFunds);
        this.isloadedfunds = true;
        this.isSubscriptionMajor = true;
        this.isOwn = true;
        this.SIStep1 = true;
        this.checkAMLA();
      }else if(appFunc.isOwn == "bijak"){
        this.isSubscriptionMinor = true;
        this.isBijak = true;
        this.BijakVisible = true;
      }
      else{
        this.isSubscriptionThird = true;
        this.isThird = true;
        this.checkAMLA();
        this.initializeForm3();
        setTimeout(() => {
          loadKeyboard();
        } , 1000);

        
        this.STPStep1 = true;
      }
    }
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
            this.InvestmentMinValue = elements.majorInvestmentLimit_max;
            this.InvestmentMaxValue = elements.majorInvestmentLimit_min;
          }else{ //Subscription Major
            this.SubscriptionMaxValue = elements.majorSubscriptionLimit_max;
            this.SubscriptionMinValue = elements.majorSubscriptionLimit_min;
          }
        }else if(appFunc.isOwn == "bijak"){
          if(appFunc.isInvesment){ //Investment Minor
            this.InvestmentMinValue = elements.minorInvestmentLimit_max;
            this.InvestmentMaxValue = elements.minorInvestmentLimit_min;
          }else{ //Subscription Minor
            this.SubscriptionMaxValue = elements.minorSubscriptionLimit_max;
            this.SubscriptionMinValue = elements.minorSubscriptionLimit_min;
          }
        }else{ //Subscription Third Party
          this.SubscriptionMaxValue = elements.majorSubscriptionLimit_max;
          this.SubscriptionMinValue = elements.majorSubscriptionLimit_min;
        }
      }
    })
    

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  ngOnDestroy() {
    //clearInterval(this.id);
    deleteKeyboard();
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Subscription/Investment]" + ": " + "Cleared Interval.");
  }


  initializeForm1(){
    this.Form_1 = this.fb.group({
      amount: ['', Validators.required]
    });
  }

  initializeForm2(){
    this.Form_2 = this.fb.group({
      sourceoffund: ['', Validators.required],
      fundername: ['', Validators.required]
    });
  }

  initializeForm3(){
    this.Form_3 = this.fb.group({
      ictype: ['', Validators.required],
      icno: ['', Validators.required],
      uhid: ['', Validators.required],
      name: ['', Validators.required],
      reason: ['', Validators.required],
      relationship: ['', Validators.required],
      fund: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  initializeForm4(){
    this.Form_4 = this.fb.group({
      sourceoffund:['', Validators.required]
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
        currentBijakHolder.riskprofile = result.riskprofile;
        this.checkAMLA();

        if(this.isSubscriptionMinor){
          this.variableFunds = [];
          this.fixedFunds = [];
          minor.FUNDID.forEach((elem1: string) => {
            this.variableFundsFilter.forEach((elem2: string) =>{
              if(elem1.toString() == elem2.toString()){
                this.variableFunds.push(elem1);
              }
            })
          });
          minor.FUNDID.forEach((elem1: string) => {
            this.fixedFundsFilter.forEach((elem2: string) =>{
              if(elem1.toString() == elem2.toString()){
                this.fixedFunds.push(elem1);
              }
            })
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
            "FUNDLISTTYPE":"N"
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
              this.variableFundsFilter.forEach((elem2: string) =>{
                if(elem1.toString() == elem2.toString()){
                  this.variableFunds.push(elem1);
                }
              })
            });
            result.result.fundid.forEach((elem1: string) => {
              this.fixedFundsFilter.forEach((elem2: string) =>{
                if(elem1.toString() == elem2.toString()){
                  this.fixedFunds.push(elem1);
                }
              })
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
    this.SIStep2 = false;
    this.SIStep1 = true;
  }

  SIStep2Next(){
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
          else{
            this.amountWarning1 = false;
          }
        }
      }

      if(this.amountWarning1 == false){
        deleteKeyboard();

        if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1)){ //More than 20K
  
          this.SIStep2 = false;
          this.SIStep3 = true;
    
          this.initializeForm2();
    
          setTimeout(() => {
            loadKeyboard();
          } , 1000);
        }
        else if(Number(this.amountKeyed) < Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){//Between 20k and 10k
          if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.amountKeyed) <= Number(this.appConfig.thresholdForAdditionalInfo2)){//Between 10k and 15k
  
            if(appFunc.isOwn == "bijak"){
              if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
                this.SIStep2 = false;
                this.SIStep3 = true;
          
                this.initializeForm2();
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else{
                this.SIStep2 = false;
                this.SIStep4 = true;
              }
            }
            else{
              if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
                this.SIStep2 = false;
                this.SIStep3 = true;
          
                this.initializeForm2();
          
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
          else{//Between 15k and 20k
            if(appFunc.isOwn == "bijak"){
              if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
                this.SIStep2 = false;
                this.SIStep3 = true;
          
                this.initializeForm2();
          
                setTimeout(() => {
                  loadKeyboard();
                } , 1000);
              }
              else{
                this.SIStep2 = false;
                this.SIStep4 = true;
              }
            }else{
              if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
                this.SIStep2 = false;
                this.SIStep3 = true;
          
                this.initializeForm2();
          
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

    setTimeout(() => {  
      loadKeyboard();
    } , 1000);
  }

  SIStep3Next(){
    this.Form_2.controls.sourceoffund.setValue(this.source?.nativeElement.value);
    this.Form_2.controls.fundername.setValue(this.fundername?.nativeElement.value);

    this.funderWarning = false;
    this.sourceFundWarning = false;
    
    let x = 0;
    Object.keys(this.Form_2.controls).forEach(key => {
      if (this.Form_2.controls[key].hasError('required')){
        x += 1;
        if(key.includes('fundername')){
          this.funderWarning = true;
        }
        else if(key.includes('sourceoffund')){
          this.sourceFundWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{

      this.sourceOfFund = this.Form_2.controls.sourceoffund.value;
      this.otherSourceOfFund = this.Form_2.controls.fundername.value;
      this.SIStep3 = false;
      this.SIStep4 = true;
      deleteKeyboard();
    }

  }

  SIStep4Back(){

    if(appFunc.isInvesment){ //Investment Major
      if(this.InvestmentMaxValue == 0.00 && this.InvestmentMinValue == 0.00 ){
        this.amountWarning1 = false;
      }else{
        if(Number(this.amountKeyed) < this.InvestmentMinValue){
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
        else{
          this.amountWarning1 = false;
        }
      }
    }

    if(this.amountWarning1 == false){
      if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1)){ //More than 20K

        this.SIStep4 = false;
        this.SIStep3 = true;
  
        setTimeout(() => {
          loadKeyboard();
        } , 1000);
      }
      else if(Number(this.amountKeyed) < Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){//Between 20k and 10k
        if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.amountKeyed) <= Number(this.appConfig.thresholdForAdditionalInfo2)){//Between 10k and 15k
  
          if(appFunc.isOwn == "bijak"){
            if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
              this.SIStep4 = false;
              this.SIStep3 = true;
        
              setTimeout(() => {
                loadKeyboard();
              } , 1000);
            }
            else{
              this.SIStep4 = false;
              this.SIStep2 = true;
  
              setTimeout(() => {  
                loadKeyboard();
              } , 1000);
            }
          }
          else{
            if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
              this.SIStep4 = false;
              this.SIStep3 = true;
        
              setTimeout(() => {
                loadKeyboard();
              } , 1000);
            }
            else{
              this.SIStep4 = false;
              this.SIStep2 = true;
  
              setTimeout(() => {  
                loadKeyboard();
              } , 1000);
            }
          }
          
        }
        else{//Between 15k and 20k
          if(appFunc.isOwn == "bijak"){
            if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
              this.SIStep4 = false;
              this.SIStep3 = true;
        
              setTimeout(() => {
                loadKeyboard();
              } , 1000);
            }
            else{
              this.SIStep4 = false;
              this.SIStep2 = true;
  
              setTimeout(() => {  
                loadKeyboard();
              } , 1000);
            }
          }else{
            if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
              this.SIStep4 = false;
              this.SIStep3 = true;
        
              setTimeout(() => {
                loadKeyboard();
              } , 1000);
            }
            else{
              this.SIStep4 = false;
              this.SIStep2 = true;
  
              setTimeout(() => {  
                loadKeyboard();
              } , 1000);
            }
          }
        }
      }
      else{
        this.SIStep4 = false;
        this.SIStep2 = true;
  
        setTimeout(() => {
          loadKeyboard();
        } , 1000);
      }
    }
    
    
  }

  SIStep4Next(){

    let ictype = "";
    let icno = "";
    let uhid = "";
    let name = ""

    if(appFunc.isOwn == "major"){
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
      uhid = currentHolder.unitholderid;
      name = currentHolder.firstname;
    }
    else if(appFunc.isOwn == "bijak"){
      uhid = this.currentBijakUHID;
      icno = this.currentBijakIDNO;
      ictype = this.currentBijakIDType;
      name = this.currentBijakName;
    }
    else{

    }

    this.SIStep4 = false;
    this.SIStep5 = true;
    //let PaymentAmt = parseFloat(this.amountKeyed.toString()).toFixed(2);

    if(signalrConnection.isHardcodedIC){

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
          "BANKBRANCHCODE":"",
          "CHEQUENUMBER":"",
          "CHEQUEDATE":"",
          "GUARDIANID":"",
          "GUARDIANICTYPE":"",
          "GUARDIANICNUMBER":"",
          "POLICYNUMBER":"",
          "EPFNUMBER":"",
          "SUBPAYMENTTYPE":"",
          "EWGATEWAY":"",
          "THIRDPARTYINVESTMENT":"",
          "THIRDPARTYNAME":"",
          "THIRDPARTYICTYPE":"",
          "THIRDPARTYICNUMBER":"",
          "THIRDPARTYRELATIONSHIP":"",
          "REASONFORTRANSFER":"",
          "SOURCEOFFUND":this.sourceOfFund,
          "OTHERSOURCEOFFUND":"",
          "FUNDERNAME":this.otherSourceOfFund
          }

        this.serviceService.postProvisionSubscription(body)
        .subscribe((result: any) => {
          console.log(result.result.transactionstatus);
          console.log(result.result.transactionnumber);
          if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
            
            const body1 = 
            {
              "CHANNELTYPE":signalrConnection.channelType,
              "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
              "DEVICEOWNER":signalrConnection.deviceOwner,
              "UNITHOLDERID":result.result.unitholderid,
              "TRANSACTIONNUMBER":result.result.transactionnumber,
              "OPERATION":"C",
              "REMARKS":"Payment Cleared",
              "PAYMENTREFERENCENUMBER":formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
            }

            this.serviceService.postSettlement(body1)
            .subscribe((result1: any) => {
              console.log(result1.result.transactionstatus);
              console.log(result1.result.transactionnumber);
              if(result1.result.transactionstatus.toString().toLowerCase().includes('successful') && result1.result.transactionnumber.toString() != ""){
                this.unitholdername = name;
                this.unitholderid = uhid;
                this.unitholderic = icno;
                this.refno = result.result.transactionnumber;
                this.status = result1.result.transactionstatus;
                this.approvalcode = result1.result.paymentreferencenumber;
                if(appFunc.isOwn = "major"){
                  this.accounttype = "Dewasa"
                }else if(appFunc.isOwn = "bijak"){
                  this.accounttype = "Bijak/Remaja"
                }else{
                  if(selectLang.selectedLang == 'ms'){
                    this.accounttype = "Pihak Ketiga"
                  }else{
                    this.accounttype = "Third Party"
                  }
                }
                this.feepercentage = result1.result.feepercentage == "" ? 0 : result1.result.feepercentage;
                this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
                this.SIStep5 = false;
                this.SIStep6 = true;

                this.isHistorical = this.isBefore4pm();

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
                  //"kioskID": signalrConnection.kioskID,
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
                  "confirmedUnits": Number(parseFloat(result1.result.confirmedunits.toString()).toFixed(2)),
                  "unitBalance": Number(parseFloat(result1.result.unitbalance.toString()).toFixed(2)),
                  "operation": result1.result.operation,
                  "remark": result1.result.remarks,
                  "creditNoteNumber": result1.result.creditnotenumber,
                  "rejectCode": result1.result.rejectcode,
                  "rejectReason": result1.result.rejectreason
                  //"createDate": formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en')
                }

                console.log(JSON.stringify(FTBody));

                this.serviceService.createFundTransaction(FTBody).subscribe(() => {});
              }
              else{
                errorCodes.Ecode = result1.result.rejectcode;
                errorCodes.Emessage = result1.result.rejectreason;
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
                  }
                }
                errorCodes.transaction = this.transaction;
                this._router.navigate(['errorscreen']);
              }
            });
          }
          else{
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
              }
            }
            errorCodes.transaction = this.transaction;
            this._router.navigate(['errorscreen']);
          }
        });
    }
    else{
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
                  "createDate": formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en')
                }
  
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
                    "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
                    "BANKCUSTPHONENUMBER":"",
                    "PAYMENTTYPE":"T",
                    "BANKACCOUNTNUMBER":"",
                    "BANKBRANCHCODE":"",
                    "CHEQUENUMBER":"",
                    "CHEQUEDATE":"",
                    "GUARDIANID":"",
                    "GUARDIANICTYPE":"",
                    "GUARDIANICNUMBER":"",
                    "POLICYNUMBER":"",
                    "EPFNUMBER":"",
                    "SUBPAYMENTTYPE":"",
                    "EWGATEWAY":"",
                    "THIRDPARTYINVESTMENT":"",
                    "THIRDPARTYNAME":"",
                    "THIRDPARTYICTYPE":"",
                    "THIRDPARTYICNUMBER":"",
                    "THIRDPARTYRELATIONSHIP":"",
                    "REASONFORTRANSFER":"",
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":"",
                    "FUNDERNAME":this.otherSourceOfFund
                    }
  
                  this.serviceService.postProvisionSubscription(body)
                  .subscribe((result: any) => {
                    console.log(result.result.transactionstatus);
                    console.log(result.result.transactionnumber);
                    if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
                      
                      const body1 = 
                      {
                        "CHANNELTYPE":signalrConnection.channelType,
                        "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
                        "DEVICEOWNER":signalrConnection.deviceOwner,
                        "UNITHOLDERID":result.result.unitholderid,
                        "TRANSACTIONNUMBER":result.result.transactionnumber,
                        "OPERATION":"C",
                        "REMARKS":"Payment Cleared",
                        "PAYMENTREFERENCENUMBER":formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
                      }
    
                      this.serviceService.postSettlement(body1)
                      .subscribe((result1: any) => {
                        console.log(result1.result.transactionstatus);
                        console.log(result1.result.transactionnumber);
                        if(result1.result.transactionstatus.toString().toLowerCase().includes('successful') && result1.result.transactionnumber.toString() != ""){
                          this.unitholdername = name;
                          this.unitholderid = uhid;
                          this.unitholderic = icno;
                          this.refno = result.result.transactionnumber;
                          this.status = result1.result.transactionstatus;
                          this.approvalcode = result1.result.paymentreferencenumber;
                          if(appFunc.isOwn = "major"){
                            this.accounttype = "Dewasa"
                          }else if(appFunc.isOwn = "bijak"){
                            this.accounttype = "Bijak/Remaja"
                          }else{
                            if(selectLang.selectedLang == 'ms'){
                              this.accounttype = "Pihak Ketiga"
                            }else{
                              this.accounttype = "Third Party"
                            }
                          }

                          this.isHistorical = this.isBefore4pm();

                          this.feepercentage = result1.result.feepercentage == "" ? 0 : result1.result.feepercentage;
                          this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                          this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                          this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                          this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
                          this.SIStep5 = false;
                          this.SIStep6 = true;

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
                            //"kioskID": signalrConnection.kioskID,
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
                            "confirmedUnits": Number(parseFloat(result1.result.confirmedunits.toString()).toFixed(2)),
                            "unitBalance": Number(parseFloat(result1.result.unitbalance.toString()).toFixed(2)),
                            "operation": result1.result.operation,
                            "remark": result1.result.remarks,
                            "creditNoteNumber": result1.result.creditnotenumber,
                            "rejectCode": result1.result.rejectcode,
                            "rejectReason": result1.result.rejectreason
                            //"createDate": formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en')
                          }

                          console.log(JSON.stringify(FTBody));
  
                          this.serviceService.createFundTransaction(FTBody).subscribe(() => {});
                        }
                        else{
                          errorCodes.Ecode = result1.result.rejectcode;
                          errorCodes.Emessage = result1.result.rejectreason;
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
                            }
                          }
                          errorCodes.transaction = this.transaction;
                          signalrConnection.connection.invoke('DoVoid', PaymentAmt, cardInfo.HostNo, cardInfo.TransactionTrace, signalrConnection.trxno).then(() => {
                  
                          });
                          this._router.navigate(['errorscreen']);
                        }
                      });
                    }
                    else{
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
                        }
                      }
                      errorCodes.transaction = this.transaction;
                      signalrConnection.connection.invoke('DoVoid', PaymentAmt, cardInfo.HostNo, cardInfo.TransactionTrace, signalrConnection.trxno).then(() => {
                  
                      });
                      this._router.navigate(['errorscreen']);
                    }
                  });
                });
              }
              else if(statusCode == "CE"){
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
                  }
                }
                errorCodes.transaction = this.transaction;
                this._router.navigate(['errorscreen']);
              }
              else if(statusCode == "TA"){
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
                  }
                }
                errorCodes.transaction = this.transaction;
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

    this.thirdicnoWarning = false;
    this.thirduhidWarning = false;
    this.thirdnameWarning = false;
    this.thirdamountWarning = false;
    this.thirdictypeWarning = false;
    this.thirdreasonWarning = false;
    this.thirdrelationshipWarning = false;
    this.thirdfundWarning = false;

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
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.thirdictypekeyed = this.Form_3.controls.ictype.value;
      this.thirdicnokeyed = this.Form_3.controls.icno.value;
      this.thirduhidkeyed = this.Form_3.controls.uhid.value;
      this.thirdnamekeyed = this.Form_3.controls.name.value;
      this.thirdreasonkeyed = this.Form_3.controls.reason.value;
      this.thirdrelationshipkeyed = this.Form_3.controls.relationship.value;
      this.thirdfundnamekeyed = this.Form_3.controls.fund.value;
      this.thirdamountkeyed = this.Form_3.controls.amount.value;

      if(appFunc.isInvesment){ //Investment Major
        if(this.InvestmentMaxValue == 0.00 && this.InvestmentMinValue == 0.00 ){
          this.amountWarning2 = false;
        }else{
          if(Number(this.thirdamountkeyed) < this.InvestmentMinValue){
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
          else{
            this.amountWarning2 = false;
          }
        }
      }


      if(this.amountWarning2 == false){
        deleteKeyboard();

        if(Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1)){ //More than 20K
  
          this.STPStep1 = false;
          this.STPStep2 = true;
  
          this.initializeForm4();
    
          setTimeout(() => {
            loadKeyboard();
          } , 1000);
        }
        else if(Number(this.thirdamountkeyed) < Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){//Between 20k and 10k
          if(Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.thirdamountkeyed) <= Number(this.appConfig.thresholdForAdditionalInfo2)){//Between 10k and 15k
  
            if(appFunc.isOwn == "bijak"){
              if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
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
            else{
              if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
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
          else{//Between 15k and 20k
            if(appFunc.isOwn == "bijak"){
              if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
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
            }else{
              if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
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
        else{
          this.STPStep1 = false;
          this.STPStep3 = true; 
        }
      }
      

      
    }
  }

  STPStep2Back(){
    this.STPStep2 = false;
    this.STPStep1 = true;
  }

  STPStep2Next(){
    this.Form_4.controls.sourceoffund.setValue(this.source?.nativeElement.value);

    let x = 0;
    Object.keys(this.Form_4.controls).forEach(key => {
      if (this.Form_2.controls[key].hasError('required')){
        x += 1;
        if(key.includes('sourceoffund')){

        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.sourceOfFund = this.Form_4.controls.sourceoffund.value;
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
    this._router.navigate(['feedbackscreen']);
  }

  STPStep3Back(){
    if(Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1)){ //More than 20K

      this.STPStep3 = false;
      this.STPStep2 = true;

      setTimeout(() => {
        loadKeyboard();
      } , 1000);
    }
    else if(Number(this.thirdamountkeyed) < Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo3)){//Between 20k and 10k
      if(Number(this.thirdamountkeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1) && Number(this.thirdamountkeyed) <= Number(this.appConfig.thresholdForAdditionalInfo2)){//Between 10k and 15k

        if(appFunc.isOwn == "bijak"){
          if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
            this.STPStep3 = false;
            this.STPStep2 = true;
      
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
          else{
            this.STPStep3 = false;
            this.STPStep1 = true;

            setTimeout(() => {  
              loadKeyboard();
            } , 1000);
          }
        }
        else{
          if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
            this.STPStep3 = false;
            this.STPStep2 = true;
      
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
          else{
            this.STPStep3 = false;
            this.STPStep1 = true;

            setTimeout(() => {  
              loadKeyboard();
            } , 1000);
          }
        }
        
      }
      else{//Between 15k and 20k
        if(appFunc.isOwn == "bijak"){
          if(currentBijakHolder.occupationcategory == "UM" || currentBijakHolder.occupationcategory == "HM"){
            this.STPStep3 = false;
            this.STPStep2 = true;
      
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
          else{
            this.STPStep3 = false;
            this.STPStep1 = true;

            setTimeout(() => {  
              loadKeyboard();
            } , 1000);
          }
        }else{
          if(currentHolder.occupationcategory == "UM" || currentHolder.occupationcategory == "HM"){
            this.STPStep3 = false;
            this.STPStep2 = true;
      
            setTimeout(() => {
              loadKeyboard();
            } , 1000);
          }
          else{
            this.STPStep3 = false;
            this.STPStep1 = true;

            setTimeout(() => {  
              loadKeyboard();
            } , 1000);
          }
        }
      }
    }
    else{
      this.STPStep3 = false;
      this.STPStep1 = true;

      setTimeout(() => {  
        loadKeyboard();
      } , 1000);
    }
    // if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo1)){
    //   this.STPStep3 = false;
    //   this.STPStep2 = true;

    //   setTimeout(() => {  
    //     loadKeyboard();
    //   } , 1000);
    // }
    // else{
    //   this.STPStep3 = false;
    //   this.STPStep1 = true;

    //   setTimeout(() => {  
    //     loadKeyboard();
    //   } , 1000);
    // }
    
  }

  STPStep3Next(){
    let ictype = "";
    let icno = "";
    let uhid = "";
    let name = ""

    ictype = currentHolder.identificationtype;
    icno = currentHolder.identificationnumber;
    uhid = currentHolder.unitholderid;
    name = currentHolder.firstname;

    //let PaymentAmt = parseFloat(this.thirdamountkeyed.toString()).toFixed(2);

    if(signalrConnection.isHardcodedIC){

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
        "BANKBRANCHCODE":"",
        "CHEQUENUMBER":"",
        "CHEQUEDATE":"",
        "GUARDIANID":"",
        "GUARDIANICTYPE":"",
        "GUARDIANICNUMBER":"",
        "POLICYNUMBER":"",
        "EPFNUMBER":"",
        "SUBPAYMENTTYPE":"",
        "EWGATEWAY":"",
        "THIRDPARTYINVESTMENT":"",
        "THIRDPARTYNAME":this.thirdnamekeyed,
        "THIRDPARTYICTYPE":this.thirdictypekeyed,
        "THIRDPARTYICNUMBER":this.thirdicnokeyed,
        "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
        "REASONFORTRANSFER":this.thirdreasonkeyed,
        "SOURCEOFFUND":this.sourceOfFund,
        "OTHERSOURCEOFFUND":"",
        "FUNDERNAME":this.otherSourceOfFund
        }

      this.serviceService.postProvisionSubscription(body)
      .subscribe((result: any) => {
        console.log(result.result.transactionstatus);
        console.log(result.result.transactionnumber);
        if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){

          this.STPStep3 = false;
          this.SIStep5 = true;
          const body1 = 
          {
            "CHANNELTYPE":signalrConnection.channelType,
            "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
            "DEVICEOWNER":signalrConnection.deviceOwner,
            "UNITHOLDERID":result.result.unitholderid,
            "TRANSACTIONNUMBER":result.result.transactionnumber,
            "OPERATION":"C",
            "REMARKS":"Payment Cleared",
            "PAYMENTREFERENCENUMBER":formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
          }

          this.serviceService.postSettlement(body1)
          .subscribe((result1: any) => {
            console.log(result1.result.transactionstatus);
            console.log(result1.result.transactionnumber);
            if(result1.result.transactionstatus.toString().toLowerCase().includes('successful') && result1.result.transactionnumber.toString() != ""){
              this.unitholdername = this.thirdnamekeyed;
              this.unitholderid = this.thirduhidkeyed;
              this.unitholderic = this.thirdicnokeyed;
              this.refno = result.result.transactionnumber;
              this.status = result1.result.transactionstatus;
              this.approvalcode = result1.result.paymentreferencenumber;
              if(appFunc.isOwn = "major"){
                this.accounttype = "Dewasa"
              }else if(appFunc.isOwn = "bijak"){
                this.accounttype = "Bijak/Remaja"
              }else{
                if(selectLang.selectedLang == 'ms'){
                  this.accounttype = "Pihak Ketiga"
                }else{
                  this.accounttype = "Third Party"
                }
              }

              this.isHistorical = this.isBefore4pm();

              this.feepercentage = result1.result.feepercentage == "" ? 0 : result1.result.feepercentage;
              this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
              this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
              this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
              this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
              this.SIStep5 = false;
              this.SIStep6 = true;
            }
            else{
              errorCodes.Ecode = result1.result.rejectcode;
              errorCodes.Emessage = result1.result.rejectreason;
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
                }
              }
              errorCodes.transaction = this.transaction;
              this._router.navigate(['errorscreen']);
            }
          });
        }
        else{
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
            }
          }
          errorCodes.transaction = this.transaction;
          this._router.navigate(['errorscreen']);
        }
      });
    }
    else{
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
                  "createDate": formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en')
                }
  
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
                    "BANKBRANCHCODE":"",
                    "CHEQUENUMBER":"",
                    "CHEQUEDATE":"",
                    "GUARDIANID":"",
                    "GUARDIANICTYPE":"",
                    "GUARDIANICNUMBER":"",
                    "POLICYNUMBER":"",
                    "EPFNUMBER":"",
                    "SUBPAYMENTTYPE":"",
                    "EWGATEWAY":"",
                    "THIRDPARTYINVESTMENT":"",
                    "THIRDPARTYNAME":this.thirdnamekeyed,
                    "THIRDPARTYICTYPE":this.thirdictypekeyed,
                    "THIRDPARTYICNUMBER":this.thirdicnokeyed,
                    "THIRDPARTYRELATIONSHIP":this.thirdrelationshipkeyed,
                    "REASONFORTRANSFER":this.thirdreasonkeyed,
                    "SOURCEOFFUND":this.sourceOfFund,
                    "OTHERSOURCEOFFUND":"",
                    "FUNDERNAME":this.otherSourceOfFund
                  }

                  this.serviceService.postProvisionSubscription(body)
                  .subscribe((result: any) => {
                  console.log(result.result.transactionstatus);
                  console.log(result.result.transactionnumber);
                  if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){

                    this.STPStep3 = false;
                    this.SIStep5 = true;
                    const body1 = 
                    {
                      "CHANNELTYPE":signalrConnection.channelType,
                      "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
                      "DEVICEOWNER":signalrConnection.deviceOwner,
                      "UNITHOLDERID":result.result.unitholderid,
                      "TRANSACTIONNUMBER":result.result.transactionnumber,
                      "OPERATION":"C",
                      "REMARKS":"Payment Cleared",
                      "PAYMENTREFERENCENUMBER":formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
                    }

                    this.serviceService.postSettlement(body1)
                    .subscribe((result1: any) => {
                      console.log(result1.result.transactionstatus);
                      console.log(result1.result.transactionnumber);
                      if(result1.result.transactionstatus.toString().toLowerCase().includes('successful') && result1.result.transactionnumber.toString() != ""){
                        this.unitholdername = this.thirdnamekeyed;
                        this.unitholderid = this.thirduhidkeyed;
                        this.unitholderic = this.thirdicnokeyed;
                        this.refno = result.result.transactionnumber;
                        this.status = result1.result.transactionstatus;
                        this.approvalcode = result1.result.paymentreferencenumber;
                        if(appFunc.isOwn = "major"){
                          this.accounttype = "Dewasa"
                        }else if(appFunc.isOwn = "bijak"){
                          this.accounttype = "Bijak/Remaja"
                        }else{
                          if(selectLang.selectedLang == 'ms'){
                            this.accounttype = "Pihak Ketiga"
                          }else{
                            this.accounttype = "Third Party"
                          }
                        }

                        this.isHistorical = this.isBefore4pm();

                        this.feepercentage = result1.result.feepercentage == "" ? 0 : result1.result.feepercentage;
                        this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                        this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                        this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                        this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
                        this.SIStep5 = false;
                        this.SIStep6 = true;
                      }
                      else{
                        errorCodes.Ecode = result1.result.rejectcode;
                        errorCodes.Emessage = result1.result.rejectreason;
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
                          }
                        }
                        errorCodes.transaction = this.transaction;
                        signalrConnection.connection.invoke('DoVoid', PaymentAmt, cardInfo.HostNo, cardInfo.TransactionTrace, signalrConnection.trxno).then(() => {
                  
                        });
                        this._router.navigate(['errorscreen']);
                      }
                    });
                  }
                  else{
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
                      }
                    }
                    errorCodes.transaction = this.transaction;
                    signalrConnection.connection.invoke('DoVoid', PaymentAmt, cardInfo.HostNo, cardInfo.TransactionTrace, signalrConnection.trxno).then(() => {
                  
                    });
                    this._router.navigate(['errorscreen']);
                  }
                  });
                });
              }
              else if(statusCode == "CE"){
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
                  }
                }
                errorCodes.transaction = this.transaction;
                this._router.navigate(['errorscreen']);
              }
              else if(statusCode == "TA"){
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
                  }
                }
                errorCodes.transaction = this.transaction;
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
        "TotalAmount" : this.amountKeyed,
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
      
  
      appFunc.body = 
      {
        "Transaction" : this.transaction,
        "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "Location" : signalrConnection.branchName,
        "Name" : this.unitholdername,
        "UHID" : this.unitholderid,
        "NRIC" : this.unitholderic,
        "AccountType" : accountType,
        "TransactionNumber" : this.refno,
        "FUNDID" : this.fundid,
        "FUNDPRICE" : this.nav,
        "UNITSALLOTED" : this.unitsalloted,
        "FEEPERCENTAGE" : this.feepercentage,
        "SALESCHARGE" : this.initialcharges,
        "GSTAMOUNT" : this.sst,
        "CARDINFO" : objCardInfo,
        "Language" : selectLang.selectedLang,
        "Signature" : ""
      }
  
      appFunc.receiptFunction = "GetFinancialTrxPrintout"
  
  
      appFunc.printing = true;
      signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
        if(data){
      
          signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), "GetFinancialTrxPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
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
        "DateTime" : formatDate(new Date(), 'dd/MM/yyyy h:MM:ss a', 'en'),
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
        "TotalAmount" : this.amountKeyed,
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
      
  
      appFunc.body = 
      {
        "Transaction" : this.transaction,
        "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "Location" : signalrConnection.branchName,
        "Name" : this.unitholdername,
        "UHID" : this.unitholderid,
        "NRIC" : this.unitholderic,
        "AccountType" : accountType,
        "TransactionNumber" : this.refno,
        "FUNDID" : this.fundid,
        "FUNDPRICE" : this.nav,
        "UNITSALLOTED" : this.unitsalloted,
        "FEEPERCENTAGE" : this.feepercentage,
        "SALESCHARGE" : this.initialcharges,
        "GSTAMOUNT" : this.sst,
        "CARDINFO" : objCardInfo,
        "Language" : selectLang.selectedLang,
        "Signature" : ""
      }
  
      appFunc.receiptFunction = "GetFinancialTrxPrintout"
  
  
      appFunc.printing = true;
      signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
        if(data){
      
          signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), "GetFinancialTrxPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
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
        "TotalAmount" : this.amountKeyed,
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
        accountType = "Pihak Ketiga";
        module = "19";
      }
      

      appFunc.body = 
      {
        "Transaction" : this.transaction,
        "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "Location" : signalrConnection.branchName,
        "Name" : this.unitholdername,
        "UHID" : this.unitholderid,
        "NRIC" : this.unitholderic,
        "AccountType" : accountType,
        "TransactionNumber" : this.refno,
        "FUNDID" : this.fundid,
        "FUNDPRICE" : this.nav,
        "UNITSALLOTED" : this.unitsalloted,
        "FEEPERCENTAGE" : this.feepercentage,
        "SALESCHARGE" : this.initialcharges,
        "GSTAMOUNT" : this.sst,
        "CARDINFO" : objCardInfo,
        "Language" : selectLang.selectedLang,
        "Signature" : ""
      }

      appFunc.emailObj =
      {
        "Name" : this.unitholdername,
        "UnitHolderID" : this.unitholderid,
        "Module" : module,
        "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
        "language" : selectLang.selectedLang,
        "IC" : this.unitholderic
      }

      appFunc.receiptFunction = "GetFinancialTrxPrintout"

      
      appFunc.printing = false;
      signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, "4", JSON.stringify(appFunc.emailObj)).then((data: any) => {
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
        "DateTime" : formatDate(new Date(), 'dd/MM/yyyy h:MM:ss a', 'en'),
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
        "TotalAmount" : this.amountKeyed,
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
        accountType = "Pihak Ketiga";
        module = "19";
      }
      
      

      appFunc.body = 
      {
        "Transaction" : this.transaction,
        "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
        "Location" : signalrConnection.branchName,
        "Name" : this.unitholdername,
        "UHID" : this.unitholderid,
        "NRIC" : this.unitholderic,
        "AccountType" : accountType,
        "TransactionNumber" : this.refno,
        "FUNDID" : this.fundid,
        "FUNDPRICE" : this.nav,
        "UNITSALLOTED" : this.unitsalloted,
        "FEEPERCENTAGE" : this.feepercentage,
        "SALESCHARGE" : this.initialcharges,
        "GSTAMOUNT" : this.sst,
        "CARDINFO" : objCardInfo,
        "Language" : selectLang.selectedLang,
        "Signature" : ""
      }

      appFunc.emailObj =
      {
        "Name" : this.unitholdername,
        "UnitHolderID" : this.unitholderid,
        "Module" : module,
        "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
        "language" : selectLang.selectedLang,
        "IC" : this.unitholderic
      }

      appFunc.receiptFunction = "GetFinancialTrxPrintout"

      
      appFunc.printing = false;
      signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, "4", JSON.stringify(appFunc.emailObj)).then((data: any) => {
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
    if (today < 16) {
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
          "IDENTIFICATIONNUMBER": currentMyKidDetails.ICNo,
          "FUNDID": "",
          "INQUIRYCODE": "9",
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
            if (currentBijakHolder.rejectreason.includes('not exists')){
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
            if (currentHolder.rejectreason.includes('not exists')){
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
