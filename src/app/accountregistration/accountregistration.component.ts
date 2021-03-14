import { keyframes } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';



@Component({
  selector: 'app-accountregistration',
  templateUrl: './accountregistration.component.html',
  styleUrls: ['./accountregistration.component.css']
})
export class AccountregistrationComponent implements OnInit {


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

  FLB_1 : string = "";
  FLB_2 : string = "";
  FLB_3 : string = "";
  FLB_4 : string = "";
  FLB_5 : string = "";
  FLB_6 : string = "";
  FLB_7 : string = "";
  FLB_8 : string = "";
  FLB_9 : string = "";

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

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log("Hi");
    //this.FL_1 = "Maklumat Peribadi Pemegang Unit"
  }

  usekeyboardinput() {
    this.elementRef.nativeElement.querySelector('keyboard').classList.remove('keyboard--hidden')
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


