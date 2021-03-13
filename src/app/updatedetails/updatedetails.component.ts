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

  constructor() { }

  ngOnInit(): void {
  }

}
