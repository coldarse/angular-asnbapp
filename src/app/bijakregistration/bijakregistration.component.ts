import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bijakregistration',
  templateUrl: './bijakregistration.component.html',
  styleUrls: ['./bijakregistration.component.css']
})
export class BijakregistrationComponent implements OnInit {


  BRReminder_Visible = false;
  BRInsertMyKid_Visible = false;
  BRLoading_Visible = false;
  BRForm_Visible = true;
  BRError_Visible = false;
  BRCancel_Visible = false;
  BRTNC_Visible = false;
  BRSuccess_Visible = false;
  BRPrint1_Visible = false;
  BRPrint2_Visible = false;
  BREmail_Visible = false;


  constructor() { }

  ngOnInit(): void {
  }


  verify() {

  }

}
