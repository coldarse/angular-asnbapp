import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbalance',
  templateUrl: './checkbalance.component.html',
  styleUrls: ['./checkbalance.component.css']
})
export class CheckbalanceComponent implements OnInit {

  BTN_Cancel = "";
  BTN_MainMenu = "";

  BTN_End = "";
  BTN_ChooseOtherAccount = "";

  noAhli = "";
  namaAhli = "";
  noAhliBijak = "";
  namaAhliBijak = "";

  BTN_Print1 = "";
  BTN_Email1 = "";

  CB1_Visible = false;
  CB2_Visible = false;
  CB3_Visible = false;
  CB4_Visible = false;
  CB5_Visible = false;

  Header_Title = "";

  CB1_1 = "";
  CB1_2 = "";
  CB1_3 = "";

  CB2_1 = "";
  CB2_2 = "";
  CB2_3 = "";
  CB2_4 = "";
  CB2_5 = "";
  CB2_6 = "";
  CB2_7 = "";
  CB2_8 = "";
  CB2_9 = "";
  CB2_10 = "";

  CBTH_1 = "";
  CBTH_2 = "";
  CBTH_3 = "";
  CBTH_4 = "";
  CBTH_5 = "";
  CBTH_6 = "";
  CBTH_7 = "";
  CBTH_8 = "";
  CBTH_9 = "";
  CBTH_10 = "";

  CB3_1 = "";
  CB3_2 = "";

  CB4_1 = "";

  CB5_1 = "";
  CB5_2 = "";


  CBError_1 = "";
  CBError_2 = "";
  CBError_3 = "";

  constructor() { }

  ngOnInit(): void {
  }

}
