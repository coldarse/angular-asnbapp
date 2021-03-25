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
import { formatDate } from '@angular/common';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';

@Component({
  selector: 'app-checkbalance',
  templateUrl: './checkbalance.component.html',
  styleUrls: ['./checkbalance.component.css']
})
export class CheckbalanceComponent implements OnInit {

  mDetails : any = currentHolder.minordetail;
  fDetails : any;
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
  }

  EmailStatement(selectedFundDetails: any) {
    console.log(selectedFundDetails.FUNDID);
    console.log(selectedFundDetails.UNITBALANCE);
  }

  PrintAllStatement(selectedFundDetails: any) {
    console.log(selectedFundDetails.FUNDID);
    console.log(selectedFundDetails.UNITBALANCE);
  }

  EmailAllStatement(selectedFundDetails: any) {
    console.log(selectedFundDetails.FUNDID);
    console.log(selectedFundDetails.UNITBALANCE);
  }


  MinorCheckBalance(selectedMinorDetails: any) {
    const body = {
      "CHANNELTYPE": "IB",
      "REQUESTORIDENTIFICATION": "RHBNOW",
      "DEVICEOWNER": "RHB",
      "UNITHOLDERID": "",
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE": "W",
      "IDENTIFICATIONNUMBER": "060915101139",
      "FUNDID": "",
      "INQUIRYCODE": "4",
      "TRANSACTIONDATE": "23/12/2019",
      "TRANSACTIONTIME": "15:43:10",
      "BANKTXNREFERENCENUMBER": "20191003001325",
      "BANKCUSTPHONENUMBER": "60173518221",
      "FILTRATIONFLAG": "",
      "GUARDIANID": "",
      "GUARDIANICTYPE": "W",
      "GUARDIANICNUMBER": "751219135506"
      };

     this.serviceService.getAccountInquiry(body)
     .subscribe((result: any) => {
       currentBijakHolder.channeltype = result.channeltype;
       currentBijakHolder.requestoridentification = result.requestoridentification;
       currentBijakHolder.deviceowner = result.deviceowner;
       currentBijakHolder.unitholderid = result.unitholderid;
       currentBijakHolder.firstname = result.firstname;
       currentBijakHolder.identificationtype = result.identificationtype;
       currentBijakHolder.identificationnumber = result.identificationnumber;
       currentBijakHolder.fundid = result.fundid;
       currentBijakHolder.inquirycode = result.inquirycode;
       currentBijakHolder.transactiondate = result.transactiondate;
       currentBijakHolder.transactiontime = result.transactiontime;
       currentBijakHolder.banktxnreferencenumber = result.banktxnreferencenumber;
       currentBijakHolder.bankcustphonenumber = result.bankcustphonenumber;
       currentBijakHolder.filtrationflag = result.filtrationflag;
       currentBijakHolder.typeclosed = result.typeclosed;
       currentBijakHolder.participateinasnbmkt = result.participateinasnbmkt;
       currentBijakHolder.funddetail = result.funddetail;
       currentBijakHolder.grandtotalunitbalance = result.grandtotalunitbalance;
       currentBijakHolder.grandtotalepfunits = result.grandtotalepfunits;
       currentBijakHolder.grandtotalloanunits = result.grandtotalloanunits;
       currentBijakHolder.grandtotalcertunits = result.grandtotalcertunits;
       currentBijakHolder.grandtotalblockedunits = result.grandtotalblockedunits;
       currentBijakHolder.grandtotalprovisionalunits = result.grandtotalprovisionalunits;
       currentBijakHolder.grandtotalunits = result.grandtotalunits;
       currentBijakHolder.grandtotaluhholdings = result.grandtotaluhholdings;
       currentBijakHolder.totalminoraccount = result.totalminoraccount;
       currentBijakHolder.minordetail = result.minordetail;
       currentBijakHolder.guardianid = result.guardianid;
       currentBijakHolder.guardianictype = result.guardianictype;
       currentBijakHolder.guardianicnumber = result.guardianicnumber;
       currentBijakHolder.agentcode = result.agentcode;
       currentBijakHolder.branchcode = result.branchcode;
       currentBijakHolder.lastupdatedate = result.lastupdatedate;
       currentBijakHolder.transactionchannel = result.transactionchannel;
       currentBijakHolder.transactionstatus = result.transactionstatus;
       currentBijakHolder.rejectcode = result.rejectcode;
       currentBijakHolder.rejectreason = result.rejectreason;
       
       this.CheckBijakAccount();
     })
  }
  

  CheckMainAccount() {
    this.fDetails = currentHolder.funddetail;
    this.CB1_Visible = false;
    this.CB2_Visible = true;

    this.CB2_3 = currentHolder.firstname;
    this.CB2_5 = currentHolder.identificationnumber;
    this.CB2_7 = currentHolder.unitholderid;

    this.CB2_9 = currentHolder.grandtotaluhholdings;
    this.CB2_10 = currentHolder.grandtotalunits;

  }

  CheckBijakAccount() {
    this.fDetails = currentBijakHolder.funddetail;

    this.CB1_Visible = false;
    this.CB2_Visible = true;

    this.CB2_3 = currentBijakHolder.firstname;
    this.CB2_5 = currentBijakHolder.identificationnumber;
    this.CB2_7 = currentBijakHolder.unitholderid;

    this.CB2_9 = currentBijakHolder.grandtotaluhholdings;
    this.CB2_10 = currentBijakHolder.grandtotalunits;

  }
  

}
