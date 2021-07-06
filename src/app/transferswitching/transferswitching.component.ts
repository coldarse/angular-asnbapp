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
  selector: 'app-transferswitching',
  templateUrl: './transferswitching.component.html',
  styleUrls: ['./transferswitching.component.css']
})
export class TransferswitchingComponent implements OnInit {

  @ViewChild('tuhid') tuhid : ElementRef | undefined;
  @ViewChild('tuhname') tuhname : ElementRef | undefined;
  @ViewChild('tuhic') tuhic : ElementRef | undefined;
  @ViewChild('treason') treason : ElementRef | undefined;
  @ViewChild('trelationship') trelationship : ElementRef | undefined;
  @ViewChild('tamount') tamount : ElementRef | undefined;

  @ViewChild('sfundid') sfundid : ElementRef | undefined;
  @ViewChild('samount') samount : ElementRef | undefined;

  transferswitching = false;
  istransfer = false;
  isswitching = false;
  isOwn = false;
  isBijak = false;

  disagreedTNC = true;

  uhidWarning = false;
  uhnameWarning = false;
  uhicWarning = false;
  transferamountWarning = false;

  switchingamountWarning = false;

  BijakVisible = false;

  transfer1 = false;
  transfer2 = false;
  transfer3 = false;

  switching1 = false;
  switching2 = false;
  switching3 = false;

  Form_1: any;
  Form_2: any;

  transferuhid = "";
  transferuhname = "";
  transferuhic = "";
  transferreason = "";
  transferrelationship = "";
  transferamount = "";
  transferfrom = "";
  transferfunname = "";
  transferNAV = "";
  transferunits = "";
  transferSST = "";
  transferinitialRM = "";
  transferinitialPercentage = "";

  switchinguhid = "";
  switchingfrom = "";
  switchingto = "";
  switchingamount = "";
  switchingNAVFrom = "";
  switchingNAVTo = "";
  switchingUnitsFrom = "";
  switchingUnitsTo = "";
  switchingSST = "";

  unitholderid = "000011112221";
  unitholdername = "Alia Nur Ali";

  actualfundname ="Amanah Saham Bumiputera";
  actualfundvalue = "250000.00";

  mDetails = currentHolder.minordetail;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);

    appFunc.isOwn = "major";

    if(appFunc.isOwn == "major"){
      this.isOwn = true;
      this.transferswitching = true;
    }else{
      this.isBijak = true;
      this.BijakVisible = true;
    }
  }

  transferswitchingBack(){
    if(appFunc.isOwn == "major"){
      this.Back();
    }else{
      this.BijakVisible = true;
    }
  }

  Back(){
    this.router.navigate(['financialtransactionmenu']);
  }

  Minor(minor: any){
    this.BijakVisible = false;
    this.transferswitching = true;
  }

  Transfer(){
    this.transferswitching = false;
    this.istransfer = true;
    this.transfer1 = true;

    this.initializeForm1();

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  transfer1Back(){
    this.istransfer = false;
    this.transfer1 = false;
    this.transferswitching = true;
    
    deleteKeyboard();
  }

  transfer1Next(){
    this.Form_1.controls.uhid.setValue(this.tuhid?.nativeElement.value);
    this.Form_1.controls.uhname.setValue(this.tuhname?.nativeElement.value);
    this.Form_1.controls.uhic.setValue(this.tuhic?.nativeElement.value);
    this.Form_1.controls.amount.setValue(this.tamount?.nativeElement.value);


    let x = 0;
    Object.keys(this.Form_1.controls).forEach(key => {
      if (this.Form_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('uhid')){
          this.uhidWarning = true;
        }
        else if(key.includes('uhname')){
          this.uhnameWarning = true;
        }
        else if(key.includes('uhic')){
          this.uhicWarning = true;
        }
        else if(key.includes('amount')){
          this.transferamountWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.transfer1 = false;
      this.transfer2 = true;

      this.transferuhid = this.Form_1.controls.uhid.value;
      this.transferuhname = this.Form_1.controls.uhname.value;
      this.transferuhic = this.Form_1.controls.uhic.value;
      this.transferreason = this.Form_1.controls.reason.value;
      this.transferrelationship = this.Form_1.controls.relationship.value;
      this.transferamount = this.Form_1.controls.amount.value;

      deleteKeyboard();
    }
  }

  transfer2Back(){
    this.transfer1 = true;
    this.transfer2 = false;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  transfer2Next(){
    this.transfer2 = false;
    this.transfer3 = true;
  }

  transferPrint(){
    appFunc.printing = true;
    this.router.navigate(['printingemail']);
  }

  transferEmail(){
    appFunc.printing = false;
    this.router.navigate(['printingemail']);
  }



  Switching(){
    this.transferswitching = false;
    this.isswitching = true;
    this.switching1 = true;

    this.initializeForm2();

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  switching1Back(){
    this.isswitching = false;
    this.switching1 = false;
    this.transferswitching = true;
    
    deleteKeyboard();
  }

  switching1Next(){
    this.Form_2.controls.amount.setValue(this.samount?.nativeElement.value);
   
    let x = 0;
    Object.keys(this.Form_2.controls).forEach(key => {
      if (this.Form_2.controls[key].hasError('required')){
        x += 1;
        if(key.includes('amount')){
          this.switchingamountWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.switching1 = false;
      this.switching2 = true;

      

      deleteKeyboard();
    }
  }

  switching2Back(){
    this.switching1 = true;
    this.switching2 = false;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  switching2Next(){
    this.switching2 = false;
    this.switching3 = true;
  }

  switchingPrint(){
    appFunc.printing = true;
    this.router.navigate(['printingemail']);
  }

  switchingEmail(){
    appFunc.printing = false;
    this.router.navigate(['printingemail']);
  }

  agreeTNC(event: any){
    if (event.target.checked){
      this.disagreedTNC = false;
    }else{
      this.disagreedTNC = true;
    }
  }

  initializeForm1(){
    this.Form_1 = this.fb.group({
      uhid: ['', Validators.required],
      uhname: ['', Validators.required],
      uhic: ['', Validators.required],
      reason: [''],
      relationship: [''],
      amount: ['', Validators.required],
    });
  }

  initializeForm2(){
    this.Form_2 = this.fb.group({
      fundname: [''],
      amount: ['', Validators.required],
    });
  }

}
