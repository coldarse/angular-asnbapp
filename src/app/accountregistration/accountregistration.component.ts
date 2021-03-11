import { keyframes } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';



@Component({
  selector: 'app-accountregistration',
  templateUrl: './accountregistration.component.html',
  styleUrls: ['./accountregistration.component.css']
})
export class AccountregistrationComponent implements OnInit {



  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    
  }

  usekeyboardinput() {
    this.elementRef.nativeElement.querySelector('keyboard').classList.remove('keyboard--hidden')
  }

  

}


