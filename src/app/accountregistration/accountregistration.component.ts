import { keyframes } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';



@Component({
  selector: 'app-accountregistration',
  templateUrl: './accountregistration.component.html',
  styleUrls: ['./accountregistration.component.css']
})
export class AccountregistrationComponent implements OnInit {

  ARForm_Visible = false;
  ARTNC_Visible = false;
  ARSuccess_Visible = false;

  ARPrint1_Visible = false;
  ARPrint2_Visible = false;
  AREmail_Visible = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    
  }

  usekeyboardinput() {
    this.elementRef.nativeElement.querySelector('keyboard').classList.remove('keyboard--hidden')
  }

  

}


