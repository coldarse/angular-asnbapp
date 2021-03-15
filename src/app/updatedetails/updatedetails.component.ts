import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatedetails',
  templateUrl: './updatedetails.component.html',
  styleUrls: ['./updatedetails.component.css']
})
export class UpdatedetailsComponent implements OnInit {

  UD1_Visible = false;
  UDForm_Visible = false;
  UDBForm_Visible = false;
  UDConfirm_Visible = false;
  UDSuccess_Visible = true;

  UD_Print1Visible = false;
  UD_Print2Visible = false;
  UD_EmailVisible = false;

  checkedXEmail : boolean = false;
  checkedXTelephone : boolean = false;
  checkedMyKadAddress : boolean = true;

  ARAddress1_disabled : boolean = true;
  ARAddress2_disabled : boolean = true;
  ARPostcode_disabled : boolean = true;
  ARCity_disabled : boolean = true;
  ARState_disabled : boolean = true;


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

  constructor() { }

  ngOnInit(): void {
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
