import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbalance',
  templateUrl: './checkbalance.component.html',
  styleUrls: ['./checkbalance.component.css']
})
export class CheckbalanceComponent implements OnInit {

  CB1_Visible = false;
  CB2_Visible = false;
  CB3_Visible = false;
  CB4_Visible = false;
  CB5_Visible = false;



  constructor() { }

  ngOnInit(): void {
  }

}
