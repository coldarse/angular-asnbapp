import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConfiguration } from '../config/app-configuration';
import { appFunc } from '../_models/appFunctions';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { currentHolder } from '../_models/currentUnitHolder';
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

  STPStep1 = false;
  STPStep2 = false;
  STPStep3 = false;


  disagreedTNC = true;

  amountWarning = false;
  funderWarning = false;

  thirdicnoWarning = false;
  thirduhidWarning = false;
  thirdnameWarning = false;
  thirdamountWarning = false;

  unitholderid = "Chen Jiunn Haw";  

  refno = "";
  status = "Successful";
  approvalcode = "";
  accounttype = "";
  amountKeyed = 0;
  fundid = "ASN";
  nav = "";
  sst = "";
  unitsalloted = "";
  initialcharges = "";

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

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    this.initializeForm1();

    if(selectLang.selectedLang == 'en'){
      if(appFunc.isInvesment){
        this.transaction = "Initial Investment";
      }else{
        this.transaction = "Pelaburan Permulaan";
      }
    }else{
      if(appFunc.isInvesment){
        this.transaction = "Subscription";
      }else{
        this.transaction = "Pelaburan Tambahan";
      }
    }

    if(appFunc.isInvesment){
      this.isInvestment = true;
      if(appFunc.isOwn == "major"){
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
        
      }else if(appFunc.isOwn == "bijak"){
        this.isBijak = true;
        this.BijakVisible = true;
      }
    }else{
      this.isSubscription = true;
      if(appFunc.isOwn == "major"){
        this.isOwn = true;
        this.SIStep1 = true;
        setTimeout(() => {
          loadKeyboard();
        } , 1000);
      }else if(appFunc.isOwn == "bijak"){
        this.isBijak = true;
        this.BijakVisible = true;
      }
      else{
        this.isThird = true;
        this.initializeForm3();
        setTimeout(() => {
          loadKeyboard();
        } , 1000);

        
        this.SIStep6 = true;
      }
    }
  }

  selectedFund(fund: any){
    console.log(fund);
    this.SIStep1 = false;
    this.SIStep2 = true;

    if(appFunc.isOwn == "major"){
      this.unitholderid = currentHolder.unitholderid;
      this.fundid = fund;
    }else{
      this.unitholderid = this.currentBijakUHID;
      this.fundid = fund;
    }
    

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
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
      ictype: [''],
      icno: ['', Validators.required],
      uhid: ['', Validators.required],
      name: ['', Validators.required],
      reason: [''],
      relationship: [''],
      fundname: [''],
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

  SIStep2Back(){
    this.SIStep2 = false;
    this.SIStep1 = true;
  }

  SIStep2Next(){
    this.Form_1.controls.amount.setValue(this.amount?.nativeElement.value);

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

      deleteKeyboard();

      if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo)){
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

    let x = 0;
    Object.keys(this.Form_2.controls).forEach(key => {
      if (this.Form_2.controls[key].hasError('required')){
        x += 1;
        if(key.includes('fundername')){
          this.funderWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.SIStep3 = false;
      this.SIStep4 = true;
      deleteKeyboard();
    }

  }

  SIStep4Back(){
    if(Number(this.amountKeyed) >= Number(this.appConfig.thresholdForAdditionalInfo)){
      this.SIStep4 = false;
      this.SIStep3 = true;

      // this.initializeForm2();

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

  SIStep4Next(){
    this.SIStep4 = false;
    this.SIStep5 = true;

    setTimeout(() => {

      let ictype = "";
      let icno = "";
      let uhid = "";


      if(appFunc.isOwn == "major"){
        ictype = currentHolder.identificationtype;
        icno = currentHolder.identificationnumber;
        uhid = currentHolder.unitholderid;
      }
      else if(appFunc.isOwn == "bijak"){
        uhid = this.currentBijakUHID;
        icno = this.currentBijakIDNO;
        ictype = this.currentBijakIDType;
      }
      else{

      }

      const body = {
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
        "SOURCEOFFUND":"",
        "OTHERSOURCEOFFUND":"",
        "FUNDERNAME":""
        }

        
      this.serviceService.postProvisionSubscription(body)
      .subscribe((result: any) => {
        console.log(result.transactionstatus);
        console.log(result.transactionnumber);
        if(result.transactionstatus.toString().toLower() == 'successful' && result.transactionnumber.toString() != ""){
          const body1 = 
          {
            "CHANNELTYPE":signalrConnection.channelType,
            "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
            "DEVICEOWNER":signalrConnection.deviceOwner,
            "UNITHOLDERID":result.unitholderid,
            "TRANSACTIONNUMBER":result.transactionnumber,
            "OPERATION":"C",
            "REMARKS":"Payment Cleared",
            "PAYMENTREFERENCENUMBER":formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
          }

          this.serviceService.postSettlement(body1)
          .subscribe((result: any) => {
            console.log(result.transactionstatus);
            console.log(result.transactionnumber);
          });
        }
      });
    }, 3000)
  }

  SIStep5Cancel(){
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
      this.thirdfundnamekeyed = this.Form_3.controls.fundname.value;
      this.thirdamountkeyed = this.Form_3.controls.amount.value;

      deleteKeyboard();
      this.STPStep1 = false;
      this.STPStep2 = true;

      this.initializeForm4();
    }
  }

  STPStep2Back(){
    this.STPStep2 = false;
    this.STPStep1 = true;
  }

  STPStep2Next(){
    this.STPStep2 = false;
    this.STPStep3 = true;
  }

  STPStep3Back(){
    this.STPStep3 = false;
    this.STPStep2 = true;
  }

  STPStep3Next(){
    this.STPStep3 = false;
    this.SIStep5 = true;
  }

  Print(){
    appFunc.printing = true;
    this._router.navigate(['printingemail']);
  }

  Email(){
    appFunc.printing = false;
    this._router.navigate(['printingemail']);
  }

  agreeTNC(event: any){
    if (event.target.checked){
      this.disagreedTNC = false;
    }else{
      this.disagreedTNC = true;
    }
    
  }

  

}
