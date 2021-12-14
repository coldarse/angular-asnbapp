import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { accessToken } from '../_models/apiToken';
import { appFunc } from '../_models/appFunctions';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { ASNBFundID, bankName } from '../_models/dropDownLists';
import { errorCodes } from '../_models/errorCode';
import { kActivity } from '../_models/kActivity';
import { selectLang } from '../_models/language';
import { signalrConnection } from '../_models/signalr';
import { ServiceService } from '../_shared/service.service';

declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.css']
})
export class RedemptionComponent implements OnInit {

  @ViewChild('ramount1') amount1 : ElementRef | undefined;
  @ViewChild('ramount2') amount2 : ElementRef | undefined;

  pdfsrc1 = "assets/Kiosk_TnC_Financial_Transaction_V.01_2021.pdf";
  pdfsrc2 = "assets/Investment_Notice_Kiosk_v4.pdf";
  pdfsrc3 = "assets/REDEMPTION/All_Fund_Min_Criteria.pdf";
  TermsAndConditions = false;
  InvestmentDisclaimer = false;
  MinimumCriteria = false;

  isClicked = false;

  ispopup = false;
  isHistorical = true;

  isOwn = false;
  isBijak = false;
  BijakVisible = false;
  redemption1 = false;
  redemption2 = false;
  redemption3 = false;
  redemption4 = false;
  disagreedTNC = true;

  Print1_Visible = false;
  Print2_Visible = false;
  EmailPage_Visible = false;
  transaction_Successful = false;

  isRedemptionMajor = false;
  isRedemptionMinor = false;

  fundDetails: any = [];
  newFundDetails: any = [];

  redemptionamountWarning  = false;
  amountWarning1 = false;

  mDetails = currentHolder.minordetail;
  Form_1: any;
  Form_2: any;

  unitholderid ="000011112221";
  unitholdername = "Alia Nur Ali";
  unitholderidtype = "";
  unitholderidno = "";
  unitholderbankcode = "";
  unitholderbankaccountnumber = "";
  unitholderemail = "";

  sst = 0;
  initialcharges = "";
  feepercentage = "";

  Print_Visible = true;
  Email_Visible = true;

  guardianID = "";
  guardianICType = "";
  guardianICNO = "";

  actualfundname = "Amanah Saham Bumiputera";
  cashinvestment =  "6103.00";
  epf =  "0.00";
  loancertificate =  "0.00";
  certificate =  "0.00";
  blocked =  "0.00";
  totalunits =  "6103.00";
  currentvalue =  "6103.00";

  redemptionbankname = "";
  redemptionbankcode = "";
  redemptionbankaccountno = "";
  redemptionemailaddress = "";
  redemptionfundname = "";
  redemptionfundid = "";

  redemptionhistoricalpricing = "6103.00";
  redemptionforwardpricing = "6103.00";

  redemptionamountinclusive = 0;
  redemptiontransactiondate =  "";
  redemptionrefno = "";
  redemptionnav = 0;
  redemptionunits  = 0;

  transaction = "";

  RedemptionMinValue = 0.00;
  RedemptionMaxValue = 0.00;


  moduleid = 0;
  action = "";

  id: any; 

  constructor(
    private router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    
    //appFunc.isOwn = "major";

    if(selectLang.selectedLang == 'en'){
      this.transaction = "Redemption";
    }else{
      this.transaction = "Jualan Balik";
    }

    if(appFunc.isOwn == "major"){
      this.moduleid = 17;
      this.action = "Perform Redemption for Major";
      this.isOwn = true;
      this.isRedemptionMajor = true;
      this.fundDetails = currentHolder.funddetail;
      this.unitholderid = currentHolder.unitholderid;
      this.unitholdername = currentHolder.firstname;
      this.unitholderidtype = currentHolder.identificationtype;
      this.unitholderidno = currentHolder.identificationnumber;
      this.unitholderemail = currentHolder.email;
      this.unitholderbankcode = currentHolder.bankcode;
      this.unitholderbankaccountnumber = currentHolder.accountnumber;

      this.fundDetails.forEach((element: any) => {
        appFunc.ASNBFundID.forEach((elem: any) => {
          if(elem.code.toLowerCase() == element.FUNDID.toLowerCase()){
            let before4pm = this.isBefore4pm();

            if(!before4pm){//After 4pm, meaning disable variable funds
              if(elem.fundType != "Variable"){
                this.newFundDetails.push({
                  "FUNDID": element.FUNDID,
                  "UNITBALANCE": element.UNITBALANCE,
                  "EPFUNITS": element.EPFUNITS,
                  "LOANUNITS": element.LOANUNITS,
                  "CERTUNITS": element.CERTUNITS,
                  "BLOCKEDUNITS": element.BLOCKEDUNITS,
                  "PROVISIONALUNITS": element.PROVISIONALUNITS,
                  "TOTALUNITS": element.TOTALUNITS,
                  "NAV": element.NAV,
                  "UHHOLDINGS": element.UHHOLDINGS,
                  "UHACCOUNTSTATUS": element.UHACCOUNTSTATUS,
                  "UBBUNITS": element.UBBUNITS,
                  "UBCUNITS": element.UBCUNITS,
                  "ELIGIBLELOANUNITS": element.ELIGIBLELOANUNITS,
                  "FUNDNAME": elem.desc,
                  "FUNDTYPE": elem.fundType,
                  "DISABLED": false,
                });
              }
              else{
                this.newFundDetails.push({
                  "FUNDID": element.FUNDID,
                  "UNITBALANCE": element.UNITBALANCE,
                  "EPFUNITS": element.EPFUNITS,
                  "LOANUNITS": element.LOANUNITS,
                  "CERTUNITS": element.CERTUNITS,
                  "BLOCKEDUNITS": element.BLOCKEDUNITS,
                  "PROVISIONALUNITS": element.PROVISIONALUNITS,
                  "TOTALUNITS": element.TOTALUNITS,
                  "NAV": element.NAV,
                  "UHHOLDINGS": element.UHHOLDINGS,
                  "UHACCOUNTSTATUS": element.UHACCOUNTSTATUS,
                  "UBBUNITS": element.UBBUNITS,
                  "UBCUNITS": element.UBCUNITS,
                  "ELIGIBLELOANUNITS": element.ELIGIBLELOANUNITS,
                  "FUNDNAME": elem.desc,
                  "FUNDTYPE": elem.fundType,
                  "DISABLED": true,
                });
              }
            }
            else{
              this.newFundDetails.push({
                "FUNDID": element.FUNDID,
                "UNITBALANCE": element.UNITBALANCE,
                "EPFUNITS": element.EPFUNITS,
                "LOANUNITS": element.LOANUNITS,
                "CERTUNITS": element.CERTUNITS,
                "BLOCKEDUNITS": element.BLOCKEDUNITS,
                "PROVISIONALUNITS": element.PROVISIONALUNITS,
                "TOTALUNITS": element.TOTALUNITS,
                "NAV": element.NAV,
                "UHHOLDINGS": element.UHHOLDINGS,
                "UHACCOUNTSTATUS": element.UHACCOUNTSTATUS,
                "UBBUNITS": element.UBBUNITS,
                "UBCUNITS": element.UBCUNITS,
                "ELIGIBLELOANUNITS": element.ELIGIBLELOANUNITS,
                "FUNDNAME": elem.desc,
                "FUNDTYPE": elem.fundType,
                "DISABLED": false,
              });
            }
          }
        });
      });

      console.log(this.newFundDetails)


      if(appFunc.isRedirectFromRedemption == true){
        // this.redemption2 = true;

        // this.initializeForm1();
        // appFunc.isRedirectFromRedemption = false;
        // setTimeout(() => {
        //   loadKeyboard();
        // } , 1000);

        const fundbody = {
          "FUNDNAME": appFunc.redemptionFundname,
          "FUNDID": appFunc.redemptionFundID
        }

        this.SelectFund(fundbody);
      }else{
        this.redemption1 = true;
      }
      
    }else{
      this.moduleid = 18;
      this.action = "Perform Redemption for Minor";
      this.isRedemptionMinor = true;
      this.isBijak = true;
      if(appFunc.isRedirectFromRedemption == true){
        this.RedemptionBijakAccount();
      }else{
        
        this.BijakVisible = true;
      }
      
    }

    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this.router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  RemoveElementFromStringArray(element: string, fundArray: any[]) {
    fundArray.forEach((value, index)=>{
      if(value.FUNDID.toString().toUpperCase() == element.toString().toUpperCase()){
        fundArray.splice(index,1);
      } 
    });
  }

  NextTNC(){
    this.TermsAndConditions = false;
    this.ispopup = false;
  }
  NextID(){
    this.InvestmentDisclaimer = false;
    this.ispopup = false;
  }
  NextMC(){
    this.MinimumCriteria = false;
    this.ispopup = false;
  }
  ClickTNC(){
    this.TermsAndConditions = true;
    this.ispopup = true;
  }
  ClickInvesmtentDisclaimer(){
    this.InvestmentDisclaimer = true;
    this.ispopup = true;
  }
  ClickMinimumCriteria(){
    this.MinimumCriteria = true;
    this.ispopup = true;
  }

  ngOnDestroy() {
    clearInterval(this.id);
    deleteKeyboard();
    if(appFunc.kioskActivity != undefined){
      this.serviceService.postKioskActivity(appFunc.kioskActivity).subscribe((res: any) => {
      });
    }
    appFunc.kioskActivity = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Redemption]" + ": " + "Cleared Interval.");
  }

  Minor(minor: any){
    const body = {
      "CHANNELTYPE": signalrConnection.channelType,
      "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
      "DEVICEOWNER": signalrConnection.deviceOwner,
      "UNITHOLDERID": "",
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE": minor.ICTYPE,
      "IDENTIFICATIONNUMBER": minor.ICNO,
      "FUNDID": "",
      "INQUIRYCODE": "9",
      "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
      "BANKTXNREFERENCENUMBER": signalrConnection.trxno,
      "BANKCUSTPHONENUMBER": "",
      "FILTRATIONFLAG": "1",
      "GUARDIANID": currentHolder.unitholderid,
      "GUARDIANICTYPE": currentHolder.identificationtype,
      "GUARDIANICNUMBER": currentHolder.identificationnumber
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
      currentBijakHolder.cifstopaccountstatus = result.cifstopaccountstatus
      currentBijakHolder.typeclosed = result.typeclosed;
      currentBijakHolder.participateinasnbmkt = result.participateinasnbmkt;
      currentBijakHolder.unitbalance = result.unitbalance;
      currentBijakHolder.funddetail = result.funddetail;
      currentBijakHolder.cifnumber = result.cifnumber;
      currentBijakHolder.race = result.race;
      currentBijakHolder.religion = result.religion;
      currentBijakHolder.uhcategory = result.uhcategory;
      currentBijakHolder.title = result.title;
      currentBijakHolder.accountopeningdate = result.accountopeningdate;
      currentBijakHolder.investortype = result.investortype;
      currentBijakHolder.maritalstatus = result.maritalstatus;
      currentBijakHolder.addresslinE1 = result.addresslinE1;
      currentBijakHolder.addresslinE2 = result.addresslinE2;
      currentBijakHolder.addresslinE3 = result.addresslinE3;
      currentBijakHolder.addresslinE4 = result.addresslinE4;
      currentBijakHolder.country = result.country;
      currentBijakHolder.email = result.email;
      currentBijakHolder.zipcode = result.zipcode;
      currentBijakHolder.contactperson = result.contactperson;
      currentBijakHolder.telephonE1 = result.telephonE1;
      currentBijakHolder.telephonE2 = result.telephonE2;
      currentBijakHolder.cellphonenumber = result.cellphonenumber;
      currentBijakHolder.fax = result.fax;
      currentBijakHolder.dateofbirth = result.dateofbirth;
      currentBijakHolder.bankcode = result.bankcode;
      currentBijakHolder.bankbranchcode = result.bankbranchcode;
      currentBijakHolder.accounttype = result.accounttype;
      currentBijakHolder.accountnumber = result.accountnumber;
      currentBijakHolder.accountcurrency = result.accountcurrency;
      currentBijakHolder.fundcode = result.fundcode;
      currentBijakHolder.transactiontype = result.transactiontype;
      currentBijakHolder.directdebit = result.directdebit;
      currentBijakHolder.mothername = result.mothername;
      currentBijakHolder.portalenabled = result.portalenabled;				
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
      currentBijakHolder.epfnumber = result.epfnumber;
      currentBijakHolder.epfapplicable = result.epfapplicable;
      currentBijakHolder.epfaccounttype = result.epfaccounttype;
      currentBijakHolder.epfaccounttypeeffdate = result.epfaccounttypeeffdate;
      currentBijakHolder.agentcode  = result.agentcode;
      currentBijakHolder.branchcode  = result.branchcode;
      currentBijakHolder.occupation = result.occupation;
      currentBijakHolder.otherinfO8 = result.otherinfO8;
      currentBijakHolder.occupationsector = result.occupationsector;
      currentBijakHolder.occupationcategory = result.occupationcategory;
      currentBijakHolder.natureofbusiness = result.natureofbusiness;
      currentBijakHolder.companyname = result.companyname;
      currentBijakHolder.preferredmailmode = result.preferredmailmode;
      currentBijakHolder.fatca = result.fatca;
      currentBijakHolder.crs = result.crs;
      currentBijakHolder.pep = result.pep;
      currentBijakHolder.riskprofile = result.riskprofile;
      currentBijakHolder.relationship = result.relationship;
      currentBijakHolder.agentcode = result.agentcode;
      currentBijakHolder.branchcode = result.branchcode;
      currentBijakHolder.lastupdatedate = result.lastupdatedate;
      currentBijakHolder.transactionchannel = result.transactionchannel;
      currentBijakHolder.transactionstatus = result.transactionstatus;
      currentBijakHolder.rejectcode = result.rejectcode;
      currentBijakHolder.rejectreason = result.rejectreason;


      this.RedemptionBijakAccount();
     });
    
  }


  RedemptionBijakAccount(){
    this.fundDetails = [];
    this.fundDetails = currentBijakHolder.funddetail;
    this.fundDetails.forEach((element: any) => {
      appFunc.ASNBFundID.forEach((elem: any) => {
        if(elem.code.toLowerCase() == element.FUNDID.toLowerCase()){
          let before4pm = this.isBefore4pm();

            if(!before4pm){//After 4pm, meaning disable variable funds
              if(elem.fundType != "Variable"){
                this.newFundDetails.push({
                  "FUNDID": element.FUNDID,
                  "UNITBALANCE": element.UNITBALANCE,
                  "EPFUNITS": element.EPFUNITS,
                  "LOANUNITS": element.LOANUNITS,
                  "CERTUNITS": element.CERTUNITS,
                  "BLOCKEDUNITS": element.BLOCKEDUNITS,
                  "PROVISIONALUNITS": element.PROVISIONALUNITS,
                  "TOTALUNITS": element.TOTALUNITS,
                  "NAV": element.NAV,
                  "UHHOLDINGS": element.UHHOLDINGS,
                  "UHACCOUNTSTATUS": element.UHACCOUNTSTATUS,
                  "UBBUNITS": element.UBBUNITS,
                  "UBCUNITS": element.UBCUNITS,
                  "ELIGIBLELOANUNITS": element.ELIGIBLELOANUNITS,
                  "FUNDNAME": elem.desc,
                  "FUNDTYPE": elem.fundType,
                  "DISABLED": false,
                });
              }
              else{
                this.newFundDetails.push({
                  "FUNDID": element.FUNDID,
                  "UNITBALANCE": element.UNITBALANCE,
                  "EPFUNITS": element.EPFUNITS,
                  "LOANUNITS": element.LOANUNITS,
                  "CERTUNITS": element.CERTUNITS,
                  "BLOCKEDUNITS": element.BLOCKEDUNITS,
                  "PROVISIONALUNITS": element.PROVISIONALUNITS,
                  "TOTALUNITS": element.TOTALUNITS,
                  "NAV": element.NAV,
                  "UHHOLDINGS": element.UHHOLDINGS,
                  "UHACCOUNTSTATUS": element.UHACCOUNTSTATUS,
                  "UBBUNITS": element.UBBUNITS,
                  "UBCUNITS": element.UBCUNITS,
                  "ELIGIBLELOANUNITS": element.ELIGIBLELOANUNITS,
                  "FUNDNAME": elem.desc,
                  "FUNDTYPE": elem.fundType,
                  "DISABLED": true,
                });
              }
            }
            else{
              this.newFundDetails.push({
                "FUNDID": element.FUNDID,
                "UNITBALANCE": element.UNITBALANCE,
                "EPFUNITS": element.EPFUNITS,
                "LOANUNITS": element.LOANUNITS,
                "CERTUNITS": element.CERTUNITS,
                "BLOCKEDUNITS": element.BLOCKEDUNITS,
                "PROVISIONALUNITS": element.PROVISIONALUNITS,
                "TOTALUNITS": element.TOTALUNITS,
                "NAV": element.NAV,
                "UHHOLDINGS": element.UHHOLDINGS,
                "UHACCOUNTSTATUS": element.UHACCOUNTSTATUS,
                "UBBUNITS": element.UBBUNITS,
                "UBCUNITS": element.UBCUNITS,
                "ELIGIBLELOANUNITS": element.ELIGIBLELOANUNITS,
                "FUNDNAME": elem.desc,
                "FUNDTYPE": elem.fundType,
                "DISABLED": false,
              });
            }
        }
      });
    });

    let before4pm = this.isBefore4pm();

    if(!before4pm){//After 4pm, meaning disable variable funds
      this.newFundDetails.forEach((fundElement: any) => {
        if(fundElement.FUNDTYPE.toString().toLowerCase() == "variable"){
          this.RemoveElementFromStringArray(fundElement.FUNDID, this.newFundDetails);
        }
      });
    }

    this.unitholderid = currentBijakHolder.unitholderid;
    this.unitholdername = currentBijakHolder.firstname;
    this.unitholderidtype = currentBijakHolder.identificationtype;
    this.unitholderidno = currentBijakHolder.identificationnumber;
    this.unitholderemail = currentBijakHolder.email;
    this.unitholderbankcode = currentHolder.bankcode;
    this.unitholderbankaccountnumber = currentHolder.accountnumber;

    this.guardianID = currentHolder.unitholderid;
    this.guardianICType = currentHolder.identificationtype;
    this.guardianICNO = currentHolder.identificationnumber;
    

    if(appFunc.isRedirectFromRedemption == true){
      const fundbody = {
        "FUNDNAME": appFunc.redemptionFundname,
        "FUNDID": appFunc.redemptionFundID
      }

      this.SelectFund(fundbody);
    }else{
      this.BijakVisible = false;
      this.redemption1 = true;
    }
    
    
  }

  isBefore4pm(){
    let today = new Date().getHours();
    if (today < 16) {
      return true;
    } else {
      return false;
    }
  }

  SelectFund(fund: any){

    //this.isHistorical = this.isBefore4pm();

    this.redemption1 = false;
    this.redemption2 = true;
    appFunc.bankName.forEach((element: bankName) => {
      if(element.code == this.unitholderbankcode){
        this.redemptionbankname = element.name;
      }
    });
    this.redemptionbankcode = this.unitholderbankcode;
    this.redemptionbankaccountno = this.unitholderbankaccountnumber;
    this.redemptionemailaddress = this.unitholderemail;

    
    this.redemptionfundid = fund.FUNDID;

    appFunc.ASNBFundID.forEach((elements: ASNBFundID) => {
      if(elements.code.toString().toLowerCase() == fund.FUNDID.toLowerCase()){
        this.redemptionfundname = elements.value;
        if(appFunc.isOwn == "major"){
          this.RedemptionMinValue = elements.majorRedemptionLimit_min;
          this.RedemptionMaxValue = elements.majorRedemptionLimit_max;
        }else{
          this.RedemptionMinValue = elements.minorRedemptionLimit_min;
          this.RedemptionMaxValue = elements.minorRedemptionLimit_max;
        }

        console.log(this.RedemptionMinValue);
        console.log(this.RedemptionMaxValue);

        if(elements.pricingType.toString().toLowerCase() == "amount"){
          this.isHistorical = true;
        }
        else{
          this.isHistorical = false;
        }
      }
    });

    this.initializeForm1();

    appFunc.isRedirectFromRedemption = false;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  redemptionBack(){
    if(appFunc.isOwn == "major"){
      this.Back();
    }else{
      this.Back();
      //this.BijakVisible = true;
    }
  }

  Back(){
    this.router.navigate(['financialtransactionmenu']);
  }

  redemption2Back(){
    this.redemption2 = false;
    this.redemption1 = true;

    deleteKeyboard();
  }

  redemption2Update(){
    appFunc.isRedirectFromRedemption = true;

    appFunc.redemptionFundname = this.redemptionfundname;
    appFunc.redemptionFundID = this.redemptionfundid;

    if(appFunc.isOwn == "bijak"){
      appFunc.redemptionMinor = {};
      appFunc.redemptionMinor.UHID = this.unitholderid;
      appFunc.redemptionMinor.NAME = this.unitholdername;
      appFunc.redemptionMinor.ICTYPE = this.unitholderidtype;
      appFunc.redemptionMinor.ICNO = this.unitholderidno;
    }
    this.router.navigate(['updatedetails']);
  }

  redemption2Next(){
    this.Form_1.controls.amount.setValue(this.amount1?.nativeElement.value);

    this.redemptionamountWarning = false;
    this.amountWarning1 = false;

    let x = 0;
    Object.keys(this.Form_1.controls).forEach(key => {
      if (this.Form_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('amount')){
          this.redemptionamountWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{

      if(this.RedemptionMinValue == 0.00 && this.RedemptionMaxValue == 0.00){
        this.amountWarning1 = false;
      }
      else{
        if(Number(this.Form_1.controls.amount.value) < this.RedemptionMinValue || Number(this.Form_1.controls.amount.value) > this.RedemptionMaxValue){
          this.amountWarning1 = true;
        }
        else{
          this.amountWarning1 = false;
        }
      }


      if(this.amountWarning1 == false){
        this.redemption2 = false;
        this.redemption3 = true;
  
        this.redemptionhistoricalpricing = this.Form_1.controls.amount.value;
        //this.redemptionforwardpricing = this.Form_1.controls.amount.value;
  
  
        deleteKeyboard();
      }
      
    }
  }

  redemption3Back(){
    this.redemption3 = false;
    this.redemption2 = true;

    this.disagreedTNC = true;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  redemption3Next(){

    this.isClicked = true;

    

    let kActivit1 = new kActivity();
    kActivit1.trxno = signalrConnection.trxno;
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = this.moduleid;
    kActivit1.submoduleID = undefined;
    kActivit1.action = this.action;
    kActivit1.startTime = new Date();

    let txnmode = "";
    if(this.isHistorical){
      txnmode = "A";
    }else{
      txnmode = "U";
    }

    const body = {
      "CHANNELTYPE": signalrConnection.channelType,
      "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
      "DEVICEOWNER": signalrConnection.deviceOwner,
      "UNITHOLDERID":this.unitholderid,
      "FIRSTNAME":"",
      "IDENTIFICATIONTYPE":this.unitholderidtype,
      "IDENTIFICATIONNUMBER":this.unitholderidno,
      "FUNDID":this.redemptionfundid,
      "AMOUNTAPPLIED":this.redemptionhistoricalpricing,
      "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "CUSTOMERICNUMBER":"",
      "CUSTOMERNAME":"",
      "AGENTCODE":signalrConnection.agentCode,
      "BRANCHCODE":signalrConnection.branchCode,
      "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
      "BANKCUSTPHONENUMBER":"",
      "PAYMENTTYPE":"T",
      "BANKACCOUNTNUMBER":this.redemptionbankaccountno,
      "TXNMODE":txnmode,
      "BANKCODE":this.redemptionbankcode,
      "POLICYNUMBER":"UT",
      "EPFNUMBER":"",
      "GUARDIANID":this.guardianID,
      "GUARDIANICTYPE":this.guardianICType,
      "GUARDIANICNUMBER":this.guardianICNO
    }

    this.serviceService.postRedemption(body)
      .subscribe((result: any) => {
        if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
          this.redemptionamountinclusive = result.result.amountapplied;
          this.redemptiontransactiondate = result.result.transactiondate;
          this.redemptionrefno = result.result.transactionnumber;
          this.redemptionnav = result.result.fundprice == "" ? 0 : result.result.fundprice;
          this.redemptionunits = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
          this.feepercentage = result.result.feepercentage == "" ? 0 : result.result.feepercentage;
          this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;

          if(this.feepercentage == "" || this.feepercentage == undefined || this.feepercentage == null){
            this.feepercentage = "0";
          }
          if(this.initialcharges == "" || this.initialcharges == undefined || this.initialcharges == null){
            this.initialcharges = "0";
          }
          this.sst = 0;

          if (currentHolder.email == ""){
            this.Email_Visible = false;
          }
          else{
            this.Email_Visible = true;
          }
  
          if(signalrConnection.kioskType == 'Mobile'){
            this.Print_Visible = false;
          }
          else{
            this.Print_Visible = true;
          }

          this.redemption3 = false;
          this.redemption4 = true;

          let module = "";
          if(appFunc.isOwn == "major"){
            module = "17";
          }else if(appFunc.isOwn == "bijak"){
            module = "18";
          }

          console.log("ItemNo: " + signalrConnection.itemNo);
          console.log("ItemNo: " + signalrConnection.itemNo + 1);

          const FTBody =
          {
            "trxNo": signalrConnection.trxno,
            "kioskCode": signalrConnection.kioskCode,
            "unitHolderID": result.result.unitholderid,
            "firstName": result.result.firstname,
            "identificationType": result.result.identificationtype,
            "identificationNumber": result.result.identificationnumber,
            "fundID": result.result.fundid,
            "amountApplied": result.result.amountapplied,
            "transactionDate": result.result.transactiondate,
            "transactionTime": result.result.transactiontime,
            "transactionType": module,
            "customerICNumber": result.result.customericnumber,
            "customerName": result.result.customername,
            "agentCode": result.result.agentCode,
            "referenceNo": "",
            "bankTxnReferenceNumber": result.result.banktxnreferencenumber,
            "bankCustPhoneNumber": result.result.bankcustphonenumber,
            "paymentType": result.result.paymenttype,
            "bankAccountNumber": result.result.bankaccountnumber,
            "bankBranchCode": "",
            "chequeNumber": "",
            "chequeDate": "",
            "guardianID": result.result.guardianid,
            "guardianicType": result.result.guardianictype,
            "guardianicNumber": result.result.guardianicnumber,
            "policyNumber": result.result.policynumber,
            "epfNumber": result.result.epfnumber,
            "subPaymentType": "",
            "ewgateway": "",
            "thirdPartyInvestment": "",
            "thirdPartyName": "",
            "thirdPartyICNumber": "",
            "thirdPartyRelationship": "",
            "sourceOfFund": "",
            "otherSourceOfFund": "",
            "funderName": "",
            "taxInvoiceNumber": "",
            "transactionStatus": result.result.transactionstatus,
            "transactionNumber": result.result.transactionnumber,
            "confirmedUnits": "",
            "unitBalance": "",
            "operation": "",
            "remark": "",
            "creditNoteNumber": "",
            "rejectCode": result.result.rejectcode,
            "rejectReason": result.result.rejectreason,
            "itemno": signalrConnection.itemNo,
            "nav": result.result.fundprice,
            "fee": result.result.salescharge,
            "sst": 0
          }

          this.serviceService.createFundTransaction(FTBody).subscribe(() => {});
          signalrConnection.itemNo += 1;
          kActivit1.endTime = new Date();
          kActivit1.status = true;
          appFunc.kioskActivity.push(kActivit1);

          this.isClicked = false;
        }
        else{

          this.isClicked = false;
          errorCodes.Ecode = result.result.rejectcode;
          errorCodes.Emessage = result.result.rejectreason;
          errorCodes.accountName = this.unitholdername;
          errorCodes.accountNo = this.unitholderid;
          if(appFunc.isOwn == "major"){
            errorCodes.accountType = "Dewasa";
          }else if(appFunc.isOwn == "bijak"){
            errorCodes.accountType = "Bijak/Remaja";
          }
          errorCodes.transaction = this.transaction;
          kActivit1.endTime = new Date();
          kActivit1.status = false;
          appFunc.kioskActivity.push(kActivit1);
          this.router.navigate(['errorscreen']);
        }
      });
  }

  redemptionPrint(){
    this.redemption4 = false;
    this.Print1_Visible = true;


    let accountType = "";
    let module = "0";
    if(appFunc.isOwn == "major"){
      accountType = "Dewasa";
      module = "17";
    }else if(appFunc.isOwn == "bijak"){
      accountType = "Bijak/Remaja";
      module = "18";
    }

    const objCardInfo = 
    [{
      "DateTime" : "",
      "BatchNum" : "",
      "Invoice" : "",
      "MID" : "",
      "TID" : "",
      "Type" : "",
      "CardName" : "",
      "CardNumber" : "",
      "ExpDate" : "",
      "ApprovalCode" : "",
      "ReferenceNumber" : "",
      "TotalAmount" : 0,
    }]

    appFunc.body = 
    {
      "Transaction" : this.transaction,
      "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Location" : signalrConnection.branchName,
      "Name" : this.unitholdername,
      "UHID" : this.unitholderid,
      "NRIC" : this.unitholderidno,
      "AccountType" : accountType,
      "TransactionNumber" : this.redemptionrefno,
      "AMOUNTAPPLIED": this.redemptionhistoricalpricing,
      "FUNDID" : this.redemptionfundname,
      "FUNDPRICE" : this.redemptionnav,
      "UNITSALLOTED" : this.redemptionunits,
      "NAMEOFBANK": this.redemptionbankname,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }

    appFunc.receiptFunction = "GetRedemptionTrxPrintout"
    appFunc.printing = true;
    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), appFunc.receiptFunction, signalrConnection.trxno, module, selectLang.selectedLang).then((data: any) => {
          setTimeout(()=>{   
            if (data == true){
              this.Print1_Visible = false;
              this.Print2_Visible = true;
              setTimeout(()=>{
                this.getAccountInquiry();
              }, 3000);
            }else{
              errorCodes.Ecode = "0068";
              errorCodes.Emessage = "Printing Failed";
              this.router.navigate(['errorscreen']);
            }
          }, 3000);
        });
      }else{
        errorCodes.Ecode = "6688";
        errorCodes.Emessage = "Printer Error";
        this.router.navigate(['errorscreen']);
      }
    });
  }

  redemptionEmail(){
    this.redemption4 = false;
    this.EmailPage_Visible = true;

    let accountType = "";
    let module = "0";
    if(appFunc.isOwn == "major"){
      accountType = "Dewasa";
      module = "17";
    }else if(appFunc.isOwn == "bijak"){
      accountType = "Bijak/Remaja";
      module = "18";
    }

    const objCardInfo = 
    [{
      "DateTime" : "",
      "BatchNum" : "",
      "Invoice" : "",
      "MID" : "",
      "TID" : "",
      "Type" : "",
      "CardName" : "",
      "CardNumber" : "",
      "ExpDate" : "",
      "ApprovalCode" : "",
      "ReferenceNumber" : "",
      "TotalAmount" : 0,
    }]

    appFunc.body = 
    {
      "Transaction" : this.transaction,
      "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Location" : signalrConnection.branchName,
      "Name" : this.unitholdername,
      "UHID" : this.unitholderid,
      "NRIC" : this.unitholderidno,
      "AccountType" : accountType,
      "TransactionNumber" : this.redemptionrefno,
      "AMOUNTAPPLIED": this.redemptionhistoricalpricing,
      "FUNDID" : this.redemptionfundname,
      "FUNDPRICE" : this.redemptionnav,
      "UNITSALLOTED" : this.redemptionunits,
      "NAMEOFBANK": this.redemptionbankname,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }

    appFunc.emailObj =
    {
      "Name" : this.unitholdername,
      "UnitHolderID" : this.unitholderid,
      "Module" : module,
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : this.unitholderidno
    }

    appFunc.receiptFunction = "GetRedemptionTrxPrintout"

    
    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, module, JSON.stringify(appFunc.emailObj), this.redemptionfundname).then((data: any) => {
      
    });

    setTimeout(()=>{   
      this.EmailPage_Visible = false;
      this.getAccountInquiry();
    }, 5000);
  }

  initializeForm1(){
    this.Form_1 = this.fb.group({
      amount: ['', Validators.required],
    });
  }

  initializeForm2(){
    this.Form_2 = this.fb.group({
      amount: ['', Validators.required],
    });
  }

  agreeTNC(event: any){
    if (event.target.checked){
      this.disagreedTNC = false;
    }else{
      this.disagreedTNC = true;
    }
  }

  getAccountInquiry(): void {
    try{

      if(appFunc.isOwn == "bijak"){
        const body = { 

          "CHANNELTYPE": signalrConnection.channelType,
          "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
          "DEVICEOWNER": signalrConnection.deviceOwner,
          "UNITHOLDERID": "",
          "FIRSTNAME": "",
          "IDENTIFICATIONTYPE": "W",
          "IDENTIFICATIONNUMBER": currentBijakHolder.identificationnumber,
          "FUNDID": "",
          "INQUIRYCODE": "9",
          "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
          "BANKTXNREFERENCENUMBER": signalrConnection.trxno,
          "BANKCUSTPHONENUMBER": "",
          "FILTRATIONFLAG": "1",
          "GUARDIANID": currentHolder.unitholderid,
          "GUARDIANICTYPE": currentHolder.identificationtype,
          "GUARDIANICNUMBER": currentHolder.identificationnumber
  
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
          currentBijakHolder.cifstopaccountstatus = result.cifstopaccountstatus
          currentBijakHolder.typeclosed = result.typeclosed;
          currentBijakHolder.participateinasnbmkt = result.participateinasnbmkt;
          currentBijakHolder.unitbalance = result.unitbalance;
          currentBijakHolder.funddetail = result.funddetail;
          currentBijakHolder.cifnumber = result.cifnumber;
          currentBijakHolder.race = result.race;
          currentBijakHolder.religion = result.religion;
          currentBijakHolder.uhcategory = result.uhcategory;
          currentBijakHolder.title = result.title;
          currentBijakHolder.accountopeningdate = result.accountopeningdate;
          currentBijakHolder.investortype = result.investortype;
          currentBijakHolder.maritalstatus = result.maritalstatus;
          currentBijakHolder.addresslinE1 = result.addresslinE1;
          currentBijakHolder.addresslinE2 = result.addresslinE2;
          currentBijakHolder.addresslinE3 = result.addresslinE3;
          currentBijakHolder.addresslinE4 = result.addresslinE4;
          currentBijakHolder.country = result.country;
          currentBijakHolder.email = result.email;
          currentBijakHolder.zipcode = result.zipcode;
          currentBijakHolder.contactperson = result.contactperson;
          currentBijakHolder.telephonE1 = result.telephonE1;
          currentBijakHolder.telephonE2 = result.telephonE2;
          currentBijakHolder.cellphonenumber = result.cellphonenumber;
          currentBijakHolder.fax = result.fax;
          currentBijakHolder.dateofbirth = result.dateofbirth;
          currentBijakHolder.bankcode = result.bankcode;
          currentBijakHolder.bankbranchcode = result.bankbranchcode;
          currentBijakHolder.accounttype = result.accounttype;
          currentBijakHolder.accountnumber = result.accountnumber;
          currentBijakHolder.accountcurrency = result.accountcurrency;
          currentBijakHolder.fundcode = result.fundcode;
          currentBijakHolder.transactiontype = result.transactiontype;
          currentBijakHolder.directdebit = result.directdebit;
          currentBijakHolder.mothername = result.mothername;
          currentBijakHolder.portalenabled = result.portalenabled;				
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
          currentBijakHolder.epfnumber = result.epfnumber;
          currentBijakHolder.epfapplicable = result.epfapplicable;
          currentBijakHolder.epfaccounttype = result.epfaccounttype;
          currentBijakHolder.epfaccounttypeeffdate = result.epfaccounttypeeffdate;
          currentBijakHolder.agentcode  = result.agentcode;
          currentBijakHolder.branchcode  = result.branchcode;
          currentBijakHolder.occupation = result.occupation;
          currentBijakHolder.otherinfO8 = result.otherinfO8;
          currentBijakHolder.occupationsector = result.occupationsector;
          currentBijakHolder.occupationcategory = result.occupationcategory;
          currentBijakHolder.natureofbusiness = result.natureofbusiness;
          currentBijakHolder.companyname = result.companyname;
          currentBijakHolder.preferredmailmode = result.preferredmailmode;
          currentBijakHolder.fatca = result.fatca;
          currentBijakHolder.crs = result.crs;
          currentBijakHolder.pep = result.pep;
          currentBijakHolder.riskprofile = result.riskprofile;
          currentBijakHolder.relationship = result.relationship;
          currentBijakHolder.agentcode = result.agentcode;
          currentBijakHolder.branchcode = result.branchcode;
          currentBijakHolder.lastupdatedate = result.lastupdatedate;
          currentBijakHolder.transactionchannel = result.transactionchannel;
          currentBijakHolder.transactionstatus = result.transactionstatus;
          currentBijakHolder.rejectcode = result.rejectcode;
          currentBijakHolder.rejectreason = result.rejectreason;
  
  
          if (currentBijakHolder.transactionstatus.toLowerCase().includes('successful')){
  
            if (!currentBijakHolder.typeclosed.toLowerCase().includes('n')){
              errorCodes.Ecode = "0109";
              errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
              errorCodes.accountName = currentMyKidDetails.Name;
              errorCodes.accountNo = currentBijakHolder.unitholderid;
              errorCodes.accountType = 'Bijak';
            errorCodes.transaction = 'PrintingEmail';
              this.router.navigate(['errorscreen']);
            }
            else{
              if(currentBijakHolder.unitholderid != "" || currentBijakHolder.unitholderid != undefined){
                signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "Account Found.");
                this.Print1_Visible = false;
                this.Print2_Visible = false;
                this.EmailPage_Visible = false;

                this.transaction_Successful = true;
                //this._router.navigate(['transactionsuccessful']);
              }
            }
          }
          else{
            if (currentBijakHolder.rejectreason.includes('not exists')){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Bijak Account Registration]" + ": " + "No account found.");
  
              
              this.router.navigate(['feedbackscreen']);
            }
            else{
              errorCodes.Ecode = currentBijakHolder.rejectcode;
              errorCodes.Emessage = currentBijakHolder.rejectreason;
              errorCodes.accountName = currentMyKidDetails.Name;
              errorCodes.accountNo = currentBijakHolder.unitholderid;
              errorCodes.accountType = 'Bijak';
            errorCodes.transaction = 'PrintingEmail';
              this.router.navigate(['errorscreen']);
            }
          }
        });
      }else{

      }
      const body = { 

        "CHANNELTYPE": signalrConnection.channelType,
        "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
        "DEVICEOWNER": signalrConnection.deviceOwner,
        "UNITHOLDERID": "",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": currentMyKadDetails.CategoryType,
        "IDENTIFICATIONNUMBER": currentMyKadDetails.ICNo,
        "FUNDID": "",
        "INQUIRYCODE": "9",
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
        "BANKTXNREFERENCENUMBER": signalrConnection.trxno ,
        "BANKCUSTPHONENUMBER": "",
        "FILTRATIONFLAG": "1",
        "GUARDIANID": "",
        "GUARDIANICTYPE": "",
        "GUARDIANICNUMBER": ""

       };
      this.serviceService.getAccountInquiry(body)
      .subscribe((result: any) => {
        

        currentHolder.channeltype = result.channeltype;
        currentHolder.requestoridentification = result.requestoridentification;
        currentHolder.deviceowner = result.deviceowner;
        currentHolder.unitholderid = result.unitholderid;
        currentHolder.firstname = result.firstname;
        currentHolder.identificationtype = result.identificationtype;
        currentHolder.identificationnumber = result.identificationnumber;
        currentHolder.fundid = result.fundid;
        currentHolder.inquirycode = result.inquirycode;
        currentHolder.transactiondate = result.transactiondate;
        currentHolder.transactiontime = result.transactiontime;
        currentHolder.banktxnreferencenumber = result.banktxnreferencenumber;
        currentHolder.bankcustphonenumber = result.bankcustphonenumber;
        currentHolder.filtrationflag = result.filtrationflag;      		
        currentHolder.cifstopaccountstatus = result.cifstopaccountstatus
        currentHolder.typeclosed = result.typeclosed;
        currentHolder.participateinasnbmkt = result.participateinasnbmkt;
        currentHolder.unitbalance = result.unitbalance;
        currentHolder.funddetail = result.funddetail;
        currentHolder.cifnumber = result.cifnumber;
        currentHolder.race = result.race;
        currentHolder.religion = result.religion;
        currentHolder.uhcategory = result.uhcategory;
        currentHolder.title = result.title;
        currentHolder.accountopeningdate = result.accountopeningdate;
        currentHolder.investortype = result.investortype;
        currentHolder.maritalstatus = result.maritalstatus;
        currentHolder.addresslinE1 = result.addresslinE1;
        currentHolder.addresslinE2 = result.addresslinE2;
        currentHolder.addresslinE3 = result.addresslinE3;
        currentHolder.addresslinE4 = result.addresslinE4;
        currentHolder.country = result.country;
        currentHolder.email = result.email;
        currentHolder.zipcode = result.zipcode;
        currentHolder.contactperson = result.contactperson;
        currentHolder.telephonE1 = result.telephonE1;
        currentHolder.telephonE2 = result.telephonE2;
        currentHolder.cellphonenumber = result.cellphonenumber;
        currentHolder.fax = result.fax;
        currentHolder.dateofbirth = result.dateofbirth;
        currentHolder.bankcode = result.bankcode;
        currentHolder.bankbranchcode = result.bankbranchcode;
        currentHolder.accounttype = result.accounttype;
        currentHolder.accountnumber = result.accountnumber;
        currentHolder.accountcurrency = result.accountcurrency;
        currentHolder.fundcode = result.fundcode;
        currentHolder.transactiontype = result.transactiontype;
        currentHolder.directdebit = result.directdebit;
        currentHolder.mothername = result.mothername;
        currentHolder.portalenabled = result.portalenabled;				
        currentHolder.grandtotalunitbalance = result.grandtotalunitbalance;
        currentHolder.grandtotalepfunits = result.grandtotalepfunits;
        currentHolder.grandtotalloanunits = result.grandtotalloanunits;
        currentHolder.grandtotalcertunits = result.grandtotalcertunits;
        currentHolder.grandtotalblockedunits = result.grandtotalblockedunits;
        currentHolder.grandtotalprovisionalunits = result.grandtotalprovisionalunits;
        currentHolder.grandtotalunits = result.grandtotalunits;
        currentHolder.grandtotaluhholdings = result.grandtotaluhholdings;
        currentHolder.totalminoraccount = result.totalminoraccount;
        currentHolder.minordetail = result.minordetail;
        currentHolder.guardianid = result.guardianid;
        currentHolder.guardianictype = result.guardianictype;
        currentHolder.guardianicnumber = result.guardianicnumber;
        currentHolder.epfnumber = result.epfnumber;
        currentHolder.epfapplicable = result.epfapplicable;
        currentHolder.epfaccounttype = result.epfaccounttype;
        currentHolder.epfaccounttypeeffdate = result.epfaccounttypeeffdate;
        currentHolder.agentcode  = result.agentcode;
        currentHolder.branchcode  = result.branchcode;
        currentHolder.occupation = result.occupation;
        currentHolder.otherinfO8 = result.otherinfO8;
        currentHolder.occupationsector = result.occupationsector;
        currentHolder.occupationcategory = result.occupationcategory;
        currentHolder.natureofbusiness = result.natureofbusiness;
        currentHolder.companyname = result.companyname;
        currentHolder.preferredmailmode = result.preferredmailmode;
        currentHolder.fatca = result.fatca;
        currentHolder.crs = result.crs;
        currentHolder.pep = result.pep;
        currentHolder.riskprofile = result.riskprofile;
        currentHolder.relationship = result.relationship;
        currentHolder.agentcode = result.agentcode;
        currentHolder.branchcode = result.branchcode;
        currentHolder.lastupdatedate = result.lastupdatedate;
        currentHolder.transactionchannel = result.transactionchannel;
        currentHolder.transactionstatus = result.transactionstatus;
        currentHolder.rejectcode = result.rejectcode;
        currentHolder.rejectreason = result.rejectreason;




        if (currentHolder.transactionstatus.toLowerCase().includes('successful')){

          if (!currentHolder.typeclosed.toLowerCase().includes('n')){
            errorCodes.Ecode = "0109";
            errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
            errorCodes.accountName = currentMyKadDetails.Name;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.accountType = 'Dewasa';
            errorCodes.transaction = 'PrintingEmail';
            this.router.navigate(['errorscreen']);
          }
          else{
            if(currentHolder.unitholderid != "" || currentHolder.unitholderid != undefined){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "Account Found.");

              
              this.Print1_Visible = false;
              this.Print2_Visible = false;
              this.EmailPage_Visible = false;

              this.transaction_Successful = true;
              //this._router.navigate(['transactionsuccessful']);
            }
          }
        }
        else{
          if (currentHolder.rejectreason.includes('not exists')){
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Account Registration]" + ": " + "No account found.");

            
            this.router.navigate(['feedbackscreen']);
          }
          else{
            errorCodes.Ecode = currentHolder.rejectcode;
            errorCodes.Emessage = currentHolder.rejectreason;
            errorCodes.accountName = currentMyKadDetails.Name;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.accountType = 'Dewasa';
            errorCodes.transaction = 'PrintingEmail';
            this.router.navigate(['errorscreen']);
          }
        }
      });
    }
    catch (e){
      errorCodes.code = "0168";
      errorCodes.message = "Account Inquiry Error";
      this.router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + `WebApp Component [PrintingEmail]` + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }


    
  }

  endTransaction(){
    this.router.navigate(['feedbackscreen'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Redirect to Feedback Screen.");
  }

  mainMenu(){
    this.router.navigate(['transactionmenu'])
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Successful]" + ": " + "Redirect to Transaction Menu.");
  }

}
