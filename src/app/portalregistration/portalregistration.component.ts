import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portalregistration',
  templateUrl: './portalregistration.component.html',
  styleUrls: ['./portalregistration.component.css']
})
export class PortalregistrationComponent implements OnInit {

  PR_Intro = false;
  PR_TNC = false;
  PR_Details = false;
  PR_TempPass = false;
  PR_Login = false;
  PR_NewPassword = false;
  PR_Confirm = false;
  PR_Success = true;

  PR_Print1Visible = false;
  PR_Print2Visible = false;
  PR_EmailVisible = false;


  constructor() { }

  ngOnInit(): void {
  }

}
