import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { appFunc } from '../_models/appFunctions';
import { currentHolder } from '../_models/currentUnitHolder';
import { selectLang } from '../_models/language';
import { signalrConnection } from '../_models/signalr';

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
  amountKeyed = "";
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

  Form_1: any;
  Form_2: any;
  Form_3: any;
  Form_4: any;

  mDetails = currentHolder.minordetail;


  constructor(
    private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    this.initializeForm1();



    if(appFunc.isInvesment){
      this.isInvestment = true;
      if(appFunc.isOwn == "major"){
        this.isOwn = true;
        this.SIStep1 = true;
        setTimeout(() => {
          loadKeyboard();
        } , 2000);
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
        } , 2000);
      }else if(appFunc.isOwn == "bijak"){
        this.isBijak = true;
        this.BijakVisible = true;
      }
      else{
        this.isThird = true;
        this.initializeForm3();
        setTimeout(() => {
          loadKeyboard();
        } , 2000);

        
        this.SIStep6 = true;
      }
    }
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
    if(appFunc.isOwn == "major"){
      this.Back();
    }else{
      this.BijakVisible = true;
    }
  }

  Back(){
    this._router.navigate(['financialtransactionmenu']);
  }

  Minor(minor: any){
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
      this.SIStep2 = false;
      this.SIStep3 = true;

      this.initializeForm2();

      setTimeout(() => {
        loadKeyboard();
      } , 2000);
    }
  }

  SIStep3Back(){
    this.SIStep3 = false;
    this.SIStep2 = true;
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
    this.SIStep4 = false;
    this.SIStep3 = true;
  }

  SIStep4Next(){
    this.SIStep4 = false;
    this.SIStep5 = true;
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
