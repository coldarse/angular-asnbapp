import { keyframes } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language';
import { signalrConnection } from 'src/app/_models/signalr';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { formatDate } from '@angular/common';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-accountregistration',
  templateUrl: './accountregistration.component.html',
  styleUrls: ['./accountregistration.component.css']
})
export class AccountregistrationComponent implements OnInit {

  BTN_Cancel = "";
  BTN_Next = "";

  BTN_xAgree = "";
  BTN_Agree = "";

  BTN_Print = "";
  BTN_Email = "";
  
  


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

  constructor(private elementRef: ElementRef,
    private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder) {
     
      this.initializeForm();
    }

  initializeForm()  {
    this.AR_Form = this.fb.group(
      {
        salutation: ['Datuk'],
        fullname: [{value: currentMyKadDetails.Name, disabled: true}],
        identificationcardno: [{value: currentMyKadDetails.ICNo, disabled: true}],
        dob: [{value: formatDate(currentMyKadDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
        race: [{value: currentMyKadDetails.Race, disabled: true}],
        religion: [{value: currentMyKadDetails.Religion, disabled: true}],

        address1 : [{value: currentMyKadDetails.Address1 + currentMyKadDetails.Address2, disabled: true}],
        address2 : [{value: currentMyKadDetails.Address3, disabled: true}],
        postcode : [{value: currentMyKadDetails.PostCode, disabled: true}],
        city : [{value: currentMyKadDetails.City, disabled: true}],
        state : [{value: currentMyKadDetails.State, disabled: true}],
        mykadaddress: [true],

        homenumber : ['', Validators.required],
        // telephone: ['', Validators.required],
        telephone: new FormControl('', Validators.required),
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
    })

    // this.AR_Form = this.fb.group({
    //   salutation: new FormControl('Datuk'),
    //   fullname: new FormControl({value: currentMyKadDetails.Name, disabled: true}),
    //   identificationcardno: new FormControl({value: currentMyKadDetails.ICNo, disabled: true}),
    //   dob: new FormControl({value: formatDate(currentMyKadDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}),
    //   race: new FormControl({value: currentMyKadDetails.Race, disabled: true}),
    //   religion: new FormControl({value: currentMyKadDetails.Religion, disabled: true}),

    //   address1 : new FormControl({value: currentMyKadDetails.Address1 + currentMyKadDetails.Address2, disabled: true}),
    //   address2 : new FormControl({value: currentMyKadDetails.Address3, disabled: true}),
    //   postcode : new FormControl({value: currentMyKadDetails.PostCode, disabled: true}),
    //   city : new FormControl({value: currentMyKadDetails.City, disabled: true}),
    //   state : new FormControl({value: currentMyKadDetails.State, disabled: true}),
    //   mykadaddress: new FormControl(true),

    //   homenumber : new FormControl('', Validators.required),
    //   telephone: new FormControl('', Validators.required),
    //   notelephone: new FormControl(false),

    //   email: new FormControl('', Validators.required),
    //   noemail: new FormControl(false),
    //   deliverystate: new FormControl('Sila Pilih Satu'),

    //   bankname: new FormControl('Sila Pilih Satu'),
    //   bankaccount: new FormControl('', Validators.required),

    //   jobcategory: new FormControl('Sila Pilih Satu'),
    //   jobname: new FormControl('Sila Pilih Satu'),
    //   natureofjob: new FormControl('Sila Pilih Satu'),
    //   jobsector: new FormControl('Sila Pilih Satu'),
    //   monthlyincome: new FormControl('Sila Pilih Satu'),
    //   companyname: new FormControl('', Validators.required),

    //   fatca: new FormControl('No'),
    //   pep: new FormControl('No'),
    //   news: new FormControl('No'),
    //   crs: new FormControl('No'),
    // })
  }  

  ngOnInit(): void {
    console.log("Hi");

    this.translate.use(selectLang.selectedLang);
  }

  usekeyboardinput() {
    //this.elementRef.nativeElement.querySelector('keyboard').classList.remove('keyboard--hidden')
  }


  noEmailCheck() {
    if (this.AR_Form.controls.noemail.value == false){
      this.AR_Form.controls.email.disable();
    }
    else{
      this.AR_Form.controls.email.enable();
    }
  }


  noTelephoneCheck() {
    if (this.AR_Form.controls.notelephone.value == false){
      this.AR_Form.controls.telephone.disable();
    }
    else{
      this.AR_Form.controls.telephone.enable();
    }
  }

  myKadAddress() {
    if (this.AR_Form.controls.mykadaddress.value == false){
      this.AR_Form.controls.address1.disable();
      this.AR_Form.controls.address2.disable();
      this.AR_Form.controls.postcode.disable();
      this.AR_Form.controls.city.disable();
      this.AR_Form.controls.state.disable();
    }
    else{
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
    }
  }


  registrationNext() {
    let x = 0
    Object.keys(this.AR_Form.controls).forEach(key => {
      if(this.AR_Form.controls[key].hasError('required')){
        x += 1;
      }
    })
    if (x > 0){
      console.log("Error");
    }
    else{
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
    }
  }

  registrationCancel() {

  }





  

}


