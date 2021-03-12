import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bijakregistration',
  templateUrl: './bijakregistration.component.html',
  styleUrls: ['./bijakregistration.component.css']
})
export class BijakregistrationComponent implements OnInit {

  insertMykidVisible = false;
  loadingVisible = false;
  BR_FormVisible = true;
  BR_Error = false;
  BR_Cancel = false;
  BR_TNCVisible = false;
  BR_SuccessVisible = false;
  BR_Print1Visible = false;
  BR_Print2Visible = false;
  BR_EmailVisible = false;


  constructor() { }

  ngOnInit(): void {
  }


  verify() {

  }

}
