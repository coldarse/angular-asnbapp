import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { appFunc } from '../_models/appFunctions';
import { selectLang } from '../_models/language';
import { signalrConnection } from '../_models/signalr';

declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.css']
})
export class RedemptionComponent implements OnInit {

  @ViewChild('ramount1') amount1 : ElementRef | undefined;
  @ViewChild('ramount2') amount2 : ElementRef | undefined;

  isOwn = true;
  isBijak = false;
  BijakVisible = false;
  redemption1 = false;
  redemption2 = false;
  redemption3 = false;
  redemption4 = false;
  disagreedTNC = true;

  redemptionamountWarning  = false;

  mDetails: any;
  Form_1: any;
  Form_2: any;

  unitholderid ="000011112221";
  unitholdername = "Alia Nur Ali";

  actualfundname = "Amanah Saham Bumiputera";
  cashinvestment =  "6103.00";
  epf =  "0.00";
  loancertificate =  "0.00";
  certificate =  "0.00";
  blocked =  "0.00";
  totalunits =  "6103.00";
  currentvalue =  "6103.00";

  redemptionbankname = "";
  redemptionbankaccountno = "";
  redemptionemailaddress = "";
  redemptionfundname = "";

  redemptionhistoricalpricing = "6103.00";
  redemptionforwardpricing = "6103.00";

  redemptionamountinclusive = "";
  redemptiontransactiondate =  "";
  redemptionrefno = "";
  redemptionnav = "";
  redemptionunits  = "";

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
      this.redemption1 = true;
    }else{
      this.isBijak = true;
      this.BijakVisible = true;
    }

    if(appFunc.isRedirectFromRedemption == true){
      this.redemption2 = true;
      this.initializeForm1();

      setTimeout(() => {
        loadKeyboard();
      } , 1000);
    }
    else{
      this.redemption1 = true;
    }
  }

  ngOnDestroy(): void{
    deleteKeyboard();
  }

  Minor(minor: any){
    this.BijakVisible = false;
    this.redemption1 = true;
  }

  SelectFund(){
    this.redemption1 = false;
    this.redemption2 = true;

    this.initializeForm1();

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  redemptionBack(){
    if(appFunc.isOwn == "major"){
      this.Back();
    }else{
      this.BijakVisible = true;
    }
  }

  Back(){
    this.router.navigate(['financialtransactionmenu']);
  }

  redemption2Back(){
    this.redemption2 = false;
    this.redemption1 = true;

    deleteKeyboard();
  }

  redemption2Update(){
    this.router.navigate(['updatedetails']);
    
  }

  redemption2Next(){
    this.Form_1.controls.amount.setValue(this.amount1?.nativeElement.value);

    let x = 0;
    Object.keys(this.Form_1.controls).forEach(key => {
      if (this.Form_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('amount')){
          this.redemptionamountWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.redemption2 = false;
      this.redemption3 = true;

      deleteKeyboard();
    }
  }

  redemption3Back(){
    this.redemption3 = false;
    this.redemption2 = true;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  redemption3Next(){
    this.redemption3 = false;
    this.redemption4 = true;
  }

  redemptionPrint(){
    appFunc.printing = true;
    this.router.navigate(['printingemail']);
  }

  redemptionEmail(){
    appFunc.printing = false;
    this.router.navigate(['printingemail']);
  }

  initializeForm1(){
    this.Form_1 = this.fb.group({
      amount: ['', Validators.required],
    });
  }

  initializeForm2(){
    this.Form_2 = this.fb.group({
      amount: ['', Validators.required],
    });
  }

  agreeTNC(event: any){
    if (event.target.checked){
      this.disagreedTNC = false;
    }else{
      this.disagreedTNC = true;
    }
  }

}
