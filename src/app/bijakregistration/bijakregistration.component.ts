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


  BRReminder_Visible = true;
  BRInsertMyKid_Visible = false;
  BRLoading_Visible = false;
  BRForm_Visible = false;
  BRError_Visible = false;
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

  constructor(private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    this.initializeForm();
  }

  ngOnDestroy() {
    clearInterval(this.id);
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
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
    })
  }  

  bijakDisagree(){
    this._router.navigate(['transactionmenu']);
  }

  bijakAgree(){
    this.BRReminder_Visible = false;
    this.BRInsertMyKid_Visible = true;
  }


  verify() {
    
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

  bijakregistrationCancel() {

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
    }
    else{
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
    }
  }

}
