import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { ServiceService } from 'src/app/_shared/service.service';
import { finalize } from 'rxjs/operators';
import { currentHolder } from 'src/app/_models/currentUnitHolder';
import { fundDetails } from '../_models/fundDetails';
import { minorDetails } from '../_models/minorDetails';

@Component({
  selector: 'app-checkbalance',
  templateUrl: './checkbalance.component.html',
  styleUrls: ['./checkbalance.component.css']
})
export class CheckbalanceComponent implements OnInit {

  mDetails : any = currentHolder.minordetail;
  fDetails : any = currentHolder.funddetail;
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

  CB1_Visible = true;
  CB2_Visible = false;
  CB3_Visible = false;
  CB4_Visible = false;
  CB5_Visible = false;

  CBBijak_Visible = false;

  CB2_ErrorVisible = false;

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

  constructor(private _router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService) { }

  ngOnInit(): void {

    
    this.translate.use(selectLang.selectedLang);
    //this.translate.use('ms');
    
    this.noAhli = currentHolder.unitholderid;
    this.namaAhli = currentHolder.firstname;


    if(currentHolder.totalminoraccount != "0"){
      this.CBBijak_Visible = true;
    }
    else{
      this.CBBijak_Visible = false;
    }
  }
  
  CancelCheckBalance() {
    this._router.navigate(['feedbackscreen']);
  }

  MainMenu() {
    this._router.navigate(['transactionmenu']);
  }

  PrintStatement(selectedFundDetails: any) {
    console.log(selectedFundDetails.FUNDID);
    console.log(selectedFundDetails.UNITBALANCE);
    this.CB2_Visible = false;
    this.CB3_Visible = true;
    signalrConnection.connection.invoke('');
  }

  EmailStatement(selectedFundDetails: any) {
    console.log(selectedFundDetails.FUNDID);
    console.log(selectedFundDetails.UNITBALANCE);
  }


  CheckMainAccount() {
    this.CB1_Visible = false;
    this.CB2_Visible = true;

    this.CB2_3 = currentHolder.firstname;
    this.CB2_5 = currentHolder.identificationnumber;
    this.CB2_7 = currentHolder.unitholderid;

    this.CB2_9 = currentHolder.grandtotaluhholdings;
    this.CB2_10 = currentHolder.grandtotalunits;

    //this.CB2_9 = currentHolder.
    //this.CB2_10 = currentHolder.
  }
  

}
