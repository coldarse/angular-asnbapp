import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 

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

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
  }


  verify() {

  }

  noEmailCheck() {
    this.checkedXEmail = !this.checkedXEmail;
  }


  noTelephoneCheck() {
    this.checkedXTelephone = !this.checkedXTelephone;
  }

  myKadAddress() {
    this.ARAddress1_disabled = !this.ARAddress1_disabled; 
    this.ARAddress2_disabled = !this.ARAddress2_disabled; 
    this.ARPostcode_disabled = !this.ARPostcode_disabled; 
    this.ARCity_disabled = !this.ARCity_disabled; 
    this.ARState_disabled = !this.ARState_disabled;
  }


}
