import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 

@Component({
  selector: 'app-portalregistration',
  templateUrl: './portalregistration.component.html',
  styleUrls: ['./portalregistration.component.css']
})
export class PortalregistrationComponent implements OnInit {

  BTN_Cancel = "";
  BTN_Next = "";

  BTN_xAgree = "";
  BTN_Agree = "";

  BTN_MainMenu = "";
  BTN_LoginASNB = "";

  BTN_No = "";
  BTN_Yes = "";

  BTN_Back = "";

  BTN_Print = "";
  BTN_Email = "";

  PR_Intro = true;
  PR_TNC = false;
  PR_Details = false;
  PR_TempPass = false;
  PR_Login = false;
  PR_NewPassword = false;
  PR_Confirm = false;
  PR_Success = false;

  PR_Print1Visible = false;
  PR_Print2Visible = false;
  PR_EmailVisible = false;


  Header_Title = "";

  PRIntro_1 = "";
  PRIntro_2 = "";
  PRIntro_3 = "";
  PRIntro_4 = "";
  PRIntro_5 = "";
  PRIntro_6 = "";
  PRIntro_7 = "";
  PRIntro_8 = "";
  PRIntro_9 = "";

  PRTNC_1 = "";
  PRTNC_2 = "";
  PRTNC_3 = "";
  PRTNC_4 = "";
  PRTNC_5 = "";
  PRTNC_6 = "";

  PRDetails_1  = "";
  PRDetails_2  = "";
  PRDetails_3  = "";
  PRDetails_4  = "";
  PRDetails_5  = "";
  PRDetails_6  = "";
  PRDetails_7  = "";
  PRDetails_8  = "";
  PRDetails_9  = "";
  PRDetails_10 = "";
  PRDetails_11 = "";
  PRDetails_12 = "";
  PRDetails_13 = "";
  PRDetails_14 = "";
  PRDetails_15 = "";
  PRDetails_16 = "";
  PRDetails_17 = "";
  PRDetails_18 = "";
  PRDetails_19 = "";

  PRTempPass_1 = "";
  PRTempPass_2 = "";
  PRTempPass_3 = "";
  PRTempPass_4 = "";
  PRTempPass_5 = "";

  PRLogin_1 = "";
  PRLogin_2 = "";
  PRLogin_3 = "";
  PRLogin_4 = "";
  PRLogin_5 = "";
  PRLogin_6 = "";
  PRLogin_7 = "";
  PRLogin_8 = "";
  PRLogin_9 = "";
  PRLogin_10 = "";

  PRNewPassword_1 = "";
  PRNewPassword_2 = "";
  PRNewPassword_3 = "";
  PRNewPassword_4 = "";
  PRNewPassword_5 = "";
  PRNewPassword_6 = "";
  PRNewPassword_7 = "";
  PRNewPassword_8 = "";
  PRNewPassword_9 = "";
  PRNewPassword_10 = "";
  PRNewPassword_11 = "";

  PRConfirm_1 = "";
  PRConfirm_2 = "";
  PRConfirm_3 = "";

  PRSuccess_1 = "";
  PRSuccess_2 = "";
  PRSuccess_3 = "";
  PRSuccess_4 = "";

  PRPrint1_1 = "";
  PRPrint1_2 = "";

  PRPrint2_1 = ""

  PREmail_1 = "";
  PREmail_2 = "";
  
  


  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
  }

}
