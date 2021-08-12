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
import { ASNBFundID } from '../_models/dropDownLists';
import { errorCodes } from '../_models/errorCode';
import { fundDetails } from '../_models/fundDetails';
import { selectLang } from '../_models/language';
import { signalrConnection } from '../_models/signalr';
import { ServiceService } from '../_shared/service.service';

declare const loadKeyboard: any;
declare const deleteKeyboard: any;
declare const closeKeyboard: any;

@Component({
  selector: 'app-transferswitching',
  templateUrl: './transferswitching.component.html',
  styleUrls: ['./transferswitching.component.css']
})
export class TransferswitchingComponent implements OnInit {

  @ViewChild('tuhid') tuhid : ElementRef | undefined;
  @ViewChild('tuhname') tuhname : ElementRef | undefined;
  @ViewChild('tuhic') tuhic : ElementRef | undefined;
  @ViewChild('treason') treason : ElementRef | undefined;
  @ViewChild('trelationship') trelationship : ElementRef | undefined;
  @ViewChild('tamount') tamount : ElementRef | undefined;

  @ViewChild('sfundid') sfundid : ElementRef | undefined;
  @ViewChild('samount') samount : ElementRef | undefined;

  transferswitching = false;
  istransfer = false;
  isswitching = false;
  isOwn = false;
  isBijak = false;

  refno = "";
  nav = 0;
  sst = 0;
  unitsalloted = 0;
  initialcharges = 0;
  feepercentage = "";

  disagreedTNC = true;

  uhidWarning = false;
  uhnameWarning = false;
  uhictypeWarning = false;
  uhicWarning = false;
  transferamountWarning = false;

  switchingamountWarning = false;

  BijakVisible = false;

  transfer1 = false;
  transfer2 = false;
  transfer3 = false;

  switching1 = false;
  switching2 = false;
  switching3 = false;

  Print1_Visible = false;
  Print2_Visible = false;
  EmailPage_Visible = false;
  transaction_Successful = false;

  Form_1: any;
  Form_2: any;

  reason = appFunc.reasonTransfer;
  relationship = appFunc.thirdPartyRelationship;
  ictype = appFunc.ictype;

  fundAvailable: any = [];

  transferuhid = "";
  transferuhname = "";
  transferuhictype = "";
  transferuhic = "";
  transferreason = "";
  transferrelationship = "";
  transferamount = "";
  transferfrom = "";
  transferfunname = "";
  transferNAV = "";
  transferunits = "";
  transferSST = "";
  transferinitialRM = "";
  transferinitialPercentage = "";

  switchinguhid = "";
  switchingfrom = "";
  switchingto = "";
  switchingamount = "";
  switchingNAVFrom = "";
  switchingNAVTo = "";
  switchingUnitsFrom = "";
  switchingUnitsTo = "";
  switchingSST = "";

  unitholderid = "000011112221";
  unitholdername = "Alia Nur Ali";
  unitholderidtype = "";

  actualfundname ="Amanah Saham Bumiputera";
  actualfundvalue = "250000.00";
  actualfundid = "";

  mDetails = currentHolder.minordetail;
  fundDetails: any = [];
  newFundDetails: any = [];

  transaction = "";



  constructor(
    private router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);

    if(appFunc.isOwn == "major"){
      this.isOwn = true;
      this.transferswitching = true;
      this.fundDetails = currentHolder.funddetail;
      this.unitholderid = currentHolder.unitholderid;
      this.unitholdername = currentHolder.firstname;
      this.unitholderidtype = currentHolder.identificationtype;

      this.fundDetails.forEach((element: any) => {
        appFunc.ASNBFundID.forEach((elem: any) => {
          if(elem.code.toLowerCase() == element.FUNDID.toLowerCase()){
            //element.FUNDID = elem.value;
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
              "FUNDNAME": elem.desc
            });
          }
        });
      });
    }else{
      this.isBijak = true;
      this.BijakVisible = true;
    }

    
  }

  transferswitchingBack(){
    if(appFunc.isOwn == "major"){
      this.Back();
    }else{
      // this.BijakVisible = true;
      // this.transferswitching = false;
      this.Back();
    }
  }

  Back(){
    this.router.navigate(['financialtransactionmenu']);
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
      "INQUIRYCODE": "5",
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


        this.TransferSwitchBijakAccount();
     });
  }

  TransferSwitchBijakAccount(){
    this.fundDetails = [];
    this.fundDetails = currentBijakHolder.funddetail;
    this.fundDetails.forEach((element: any) => {
      appFunc.ASNBFundID.forEach((elem: any) => {
        if(elem.code.toLowerCase() == element.FUNDID.toLowerCase()){
          //element.FUNDID = elem.value;
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
            "FUNDNAME": elem.desc
          });
        }
      });
    });
    this.unitholderid = currentBijakHolder.unitholderid;
    this.unitholdername = currentBijakHolder.firstname;
    this.unitholderidtype = currentBijakHolder.identificationtype;
    this.BijakVisible = false;
    this.transferswitching = true;
  }

  Transfer(fund: any){

    if(selectLang.selectedLang == 'en'){
      this.transaction = "Transfer";
    }else{
      this.transaction = "Pemindahan";
    }

    this.transferswitching = false;
    this.istransfer = true;
    this.transfer1 = true;

    this.initializeForm1();

    this.actualfundname = fund.FUNDNAME;
    this.actualfundvalue = fund.UNITBALANCE;
    this.actualfundid = fund.FUNDID;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  transfer1Back(){
    this.istransfer = false;
    this.transfer1 = false;
    this.transferswitching = true;
    
    deleteKeyboard();
  }

  transfer1Next(){
    this.Form_1.controls.uhid.setValue(this.tuhid?.nativeElement.value);
    this.Form_1.controls.uhname.setValue(this.tuhname?.nativeElement.value);
    this.Form_1.controls.uhic.setValue(this.tuhic?.nativeElement.value);
    this.Form_1.controls.amount.setValue(this.tamount?.nativeElement.value);


    let x = 0;
    Object.keys(this.Form_1.controls).forEach(key => {
      if (this.Form_1.controls[key].hasError('required')){
        x += 1;
        if(key.includes('uhid')){
          this.uhidWarning = true;
        }
        else if(key.includes('uhname')){
          this.uhnameWarning = true;
        }
        else if(key.includes('ictype')){
          this.uhictypeWarning = true;
        }
        else if(key.includes('uhic')){
          this.uhicWarning = true;
        }
        else if(key.includes('amount')){
          this.transferamountWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.transfer1 = false;
      this.transfer2 = true;

      this.transferuhid = this.Form_1.controls.uhid.value;
      this.transferuhname = this.Form_1.controls.uhname.value;
      this.transferuhictype = this.Form_1.controls.ictype.value;
      this.transferuhic = this.Form_1.controls.uhic.value;
      this.transferreason = this.Form_1.controls.reason.value;
      this.transferrelationship = this.Form_1.controls.relationship.value;
      this.transferamount = this.Form_1.controls.amount.value;

      if(appFunc.isOwn == "major"){
        this.transferfrom = currentHolder.unitholderid;
      }else{
        this.transferfrom = currentBijakHolder.unitholderid;
      }

      this.transferfunname = this.actualfundname;
      

      deleteKeyboard();
    }
  }

  transfer2Back(){
    this.transfer1 = true;
    this.transfer2 = false;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  transfer2Next(){

    let uhid = "";
    let firstname = "";
    let ictype = "";
    let icno = "";
    let fundid = "";

    let guardianID = "";
    let guardianIC = "";
    let guardianICtype = "";

    if(appFunc.isOwn == "major"){
      uhid = currentHolder.unitholderid;
      firstname = currentHolder.firstname;
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
    }else{
      uhid = currentBijakHolder.unitholderid;
      firstname = currentBijakHolder.firstname;
      ictype = currentBijakHolder.identificationtype;
      icno = currentBijakHolder.identificationnumber;
      guardianID = currentHolder.unitholderid;
      guardianIC = currentHolder.identificationnumber;
      guardianICtype = currentHolder.identificationtype;
    }

    appFunc.ASNBFundID.forEach((elem: ASNBFundID) => {
      if(elem.desc.toLowerCase() == this.transferfunname.toLowerCase()){
        fundid = elem.code;
      }
    });

    const body = 
    {
      "CHANNELTYPE": signalrConnection.channelType,
      "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
      "DEVICEOWNER": signalrConnection.deviceOwner,
      "UNITHOLDERID":uhid,
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE":ictype,
      "IDENTIFICATIONNUMBER":icno,
      "FUNDID":fundid,
      "AMOUNTAPPLIED":this.transferamount,
      "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "CUSTOMERICNUMBER":"",
      "CUSTOMERNAME":"",
      "AGENTCODE":signalrConnection.agentCode,
      "BRANCHCODE":signalrConnection.branchCode,
      "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
      "BANKCUSTPHONENUMBER":"",
      "PAYMENTTYPE":"T",
      "BANKACCOUNTNUMBER":"",
      "BANKBRANCHCODE":"",
      "CHEQUENUMBER":"",
      "CHEQUEDATE":"",
      "GUARDIANID":guardianID,
      "GUARDIANICTYPE":guardianICtype,
      "GUARDIANICNUMBER":guardianIC,
      "POLICYNUMBER":"",
      "EPFNUMBER":"",
      "SUBPAYMENTTYPE":"",
      "EWGATEWAY":"",
      "THIRDPARTYINVESTMENT":"",
      "THIRDPARTYNAME":"",
      "THIRDPARTYICTYPE":this.transferuhictype,
      "THIRDPARTYICNUMBER":this.transferuhic,
      "THIRDPARTYRELATIONSHIP":this.transferrelationship,
      "REASONFORTRANSFER":this.transferreason,
      "SOURCEOFFUND":"",
      "OTHERSOURCEOFFUND":"",
      "FUNDERNAME":""
    }

    this.serviceService.postProvisionSubscription(body)
      .subscribe((result: any) => {
        console.log(result.result.transactionstatus);
        console.log(result.result.transactionnumber);
        if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
          const body1 = 
          {
            "CHANNELTYPE":signalrConnection.channelType,
            "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
            "DEVICEOWNER":signalrConnection.deviceOwner,
            "BRANCHCODE":signalrConnection.branchCode,
            "UNITHOLDERID":uhid,
            "FIRSTNAME":firstname,
            "IDENTIFICATIONTYPE":ictype,
            "IDENTIFICATIONNUMBER":icno,
            "FUNDID":fundid,
            "AMOUNTAPPLIED":this.transferamount,
            "TRANSACTIONDATE":formatDate(new Date(), 'dd/MM/yyyy', 'en'),
            "TRANSACTIONTIME":formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "AGENTCODE":signalrConnection.agentCode,
            "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
            "BANKCUSTPHONENUMBER":"",
            "PAYMENTTYPE":"",
            "BANKACCOUNTNUMBER":"",
            "TOUNITHOLDERID": this.transferuhid,
            "TOUHFIRSTNAME": this.transferuhname,
            "TOUHIDENTIFICATIONTYPE": this.transferuhictype,
            "TOUHIDENTIFICATIONNUMBER": this.transferuhic,
            "TXNMODE": "A",
            "GUARDIANID":guardianID,
            "GUARDIANICTYPE":guardianICtype,
            "GUARDIANICNUMBER":guardianIC,
            "THIRDPARTYTRANSFER":"Y",
            "THIRDPARTYRELATIONSHIP":this.transferrelationship,
            "REASONFORTRANSFER":this.transferreason
          }
      
          this.serviceService.postTransfer(body1)
            .subscribe((result1: any) => {
              if(result1.result.transactionstatus.toLowerCase() == 'successful'){
                this.transfer2 = false;
                this.transfer3 = true;
                this.refno = result.result.transactionnumber;
                this.feepercentage = result.result.feepercentage == "" ? 0 : result1.result.feepercentage;
                this.nav = result.result.fundprice == "" ? 0 : result.result.fundprice;
                this.sst = result.result.gstamount == "" ? 0 : result.result.gstamount;
                this.unitsalloted = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
              }
              else{
                errorCodes.Ecode = result1.result.rejectcode;
                errorCodes.Emessage = result1.result.rejectreason;
                errorCodes.accountName = firstname;
                errorCodes.accountNo = uhid;
                if(appFunc.isOwn == "major"){
                  errorCodes.accountType = "Dewasa";
                }else if(appFunc.isOwn == "bijak"){
                  errorCodes.accountType = "Bijak/Remaja";
                }
                errorCodes.transaction = this.transaction;
                this.router.navigate(['errorscreen']);
              }
            });
        }
        else{
          errorCodes.Ecode = result.result.rejectcode;
          errorCodes.Emessage = result.result.rejectreason;
          errorCodes.accountName = firstname;
          errorCodes.accountNo = uhid;
          if(appFunc.isOwn == "major"){
            errorCodes.accountType = "Dewasa";
          }else if(appFunc.isOwn == "bijak"){
            errorCodes.accountType = "Bijak/Remaja";
          }
          errorCodes.transaction = this.transaction;
          this.router.navigate(['errorscreen']);
        }
    });
    
  }

  transferPrint(){

    let uhid = "";
    let firstname = "";
    let ictype = "";
    let icno = "";

    if(appFunc.isOwn == "major"){
      uhid = currentHolder.unitholderid;
      firstname = currentHolder.firstname;
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
    }else{
      uhid = currentBijakHolder.unitholderid;
      firstname = currentBijakHolder.firstname;
      ictype = currentBijakHolder.identificationtype;
      icno = currentBijakHolder.identificationnumber;
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

    let accountType = "";
    if(selectLang.selectedLang == 'ms'){
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
      }
    }else{
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
      }
    }
    

    appFunc.body = 
    {
      "Transaction" : this.transaction,
      "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Location" : signalrConnection.branchName,
      "Name" : this.unitholdername,
      "UHID" : this.unitholderid,
      "NRIC" : icno,
      "AccountType" : accountType,
      "TransactionNumber" : this.refno,
      "FUNDID" : this.transferfunname,
      "FUNDPRICE" : this.nav,
      "UNITSALLOTED" : this.unitsalloted,
      "FEEPERCENTAGE" : this.feepercentage,
      "SALESCHARGE" : this.initialcharges,
      "GSTAMOUNT" : this.sst,
      "CARDINFO" : objCardInfo,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }

    appFunc.receiptFunction = "GetFinancialTrxPrintout"
    appFunc.printing = true;
    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), "GetFinancialTrxPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
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

  transferEmail(){
    
    let uhid = "";
    let firstname = "";
    let ictype = "";
    let icno = "";

    if(appFunc.isOwn == "major"){
      uhid = currentHolder.unitholderid;
      firstname = currentHolder.firstname;
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
    }else{
      uhid = currentBijakHolder.unitholderid;
      firstname = currentBijakHolder.firstname;
      ictype = currentBijakHolder.identificationtype;
      icno = currentBijakHolder.identificationnumber;
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

    let accountType = "";
    let module = "0";
    if(selectLang.selectedLang == 'ms'){
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "13"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "14"
      }
    }else{
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "13"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "14"
      }
    }
    

    appFunc.body = 
    {
      "Transaction" : this.transaction,
      "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Location" : signalrConnection.branchName,
      "Name" : this.unitholdername,
      "UHID" : this.unitholderid,
      "NRIC" : icno,
      "AccountType" : accountType,
      "TransactionNumber" : this.refno,
      "FUNDID" : this.transferfunname,
      "FUNDPRICE" : this.nav,
      "UNITSALLOTED" : this.unitsalloted,
      "FEEPERCENTAGE" : this.feepercentage,
      "SALESCHARGE" : this.initialcharges,
      "GSTAMOUNT" : this.sst,
      "CARDINFO" : objCardInfo,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }
    appFunc.printing = false;

    appFunc.emailObj =
    {
      "Name" : this.unitholdername,
      "UnitHolderID" : this.unitholderid,
      "Module" : module,
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : icno
    }

    appFunc.receiptFunction = "GetFinancialTrxPrintout"

    
    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, "4", JSON.stringify(appFunc.emailObj)).then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          this.EmailPage_Visible = false;
          setTimeout(()=>{   
            this.getAccountInquiry();
          }, 3000);
        }else{
          errorCodes.Ecode = "0069";
          errorCodes.Emessage = "Email Failed";
          this.router.navigate(['errorscreen']);
        }
      }, 3000);
    });
  }

  containsObject(obj: ASNBFundID, list: fundDetails[]) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x].FUNDID === obj.code) {
            return true;
        }
    }

    return false;
  }

  Switching(fund: any){

    appFunc.ASNBFundID.forEach((elem1: ASNBFundID) => {
      if(!this.containsObject(elem1, this.fundDetails)){
        this.fundAvailable.push(elem1);
      }
    });

    this.switchingNAVFrom = fund.NAV;
    this.switchingfrom = fund.FUNDNAME;

    if(selectLang.selectedLang == 'en'){
      this.transaction = "Switching";
    }else{
      this.transaction = "Penukaran";
    }

    this.transferswitching = false;
    this.isswitching = true;
    this.switching1 = true;

    this.initializeForm2();

    this.actualfundname = fund.FUNDNAME;
    this.actualfundvalue = fund.UNITBALANCE;
    this.actualfundid = fund.FUNDID;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  switching1Back(){
    this.isswitching = false;
    this.switching1 = false;
    this.transferswitching = true;
    
    deleteKeyboard();
  }

  switching1Next(){
    this.Form_2.controls.amount.setValue(this.samount?.nativeElement.value);
   
    let x = 0;
    Object.keys(this.Form_2.controls).forEach(key => {
      if (this.Form_2.controls[key].hasError('required')){
        x += 1;
        if(key.includes('amount')){
          this.switchingamountWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{
      this.switching1 = false;
      this.switching2 = true;


      this.switchinguhid = this.unitholderid;
      this.switchingto = this.Form_2.controls.fundname.value;
      this.switchingamount = this.Form_2.controls.amount.value;

      
      deleteKeyboard();
    }
  }

  switching2Back(){
    this.switching1 = true;
    this.switching2 = false;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  switching2Next(){
    let uhid = "";
    let firstname = "";
    let ictype = "";
    let icno = "";
    let fundid = "";

    let guardianID = "";
    let guardianIC = "";
    let guardianICtype = "";

    if(appFunc.isOwn == "major"){
      uhid = currentHolder.unitholderid;
      firstname = currentHolder.firstname;
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
    }else{
      uhid = currentBijakHolder.unitholderid;
      firstname = currentBijakHolder.firstname;
      ictype = currentBijakHolder.identificationtype;
      icno = currentBijakHolder.identificationnumber;
      guardianID = currentHolder.unitholderid;
      guardianIC = currentHolder.identificationnumber;
      guardianICtype = currentHolder.identificationtype;
    }

    this.switchinguhid = uhid;
    
    this.switchingUnitsFrom = "0";

    appFunc.ASNBFundID.forEach((elem: ASNBFundID) => {
      if(elem.desc.toLowerCase() == this.switchingto.toLowerCase()){
        fundid = elem.code;
      }
    });

    const body = 
    {
      "CHANNELTYPE": signalrConnection.channelType,
      "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
      "DEVICEOWNER": signalrConnection.deviceOwner,
      "UNITHOLDERID":uhid,
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE":ictype,
      "IDENTIFICATIONNUMBER":icno,
      "FUNDID":fundid,
      "AMOUNTAPPLIED":this.transferamount,
      "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "CUSTOMERICNUMBER":"",
      "CUSTOMERNAME":"",
      "AGENTCODE":signalrConnection.agentCode,
      "BRANCHCODE":signalrConnection.branchCode,
      "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
      "BANKCUSTPHONENUMBER":"",
      "PAYMENTTYPE":"T",
      "BANKACCOUNTNUMBER":"",
      "BANKBRANCHCODE":"",
      "CHEQUENUMBER":"",
      "CHEQUEDATE":"",
      "GUARDIANID":guardianID,
      "GUARDIANICTYPE":guardianICtype,
      "GUARDIANICNUMBER":guardianIC,
      "POLICYNUMBER":"",
      "EPFNUMBER":"",
      "SUBPAYMENTTYPE":"",
      "EWGATEWAY":"",
      "THIRDPARTYINVESTMENT":"",
      "THIRDPARTYNAME":"",
      "THIRDPARTYICTYPE":"",
      "THIRDPARTYICNUMBER":"",
      "THIRDPARTYRELATIONSHIP":"",
      "REASONFORTRANSFER":"",
      "SOURCEOFFUND":"",
      "OTHERSOURCEOFFUND":"",
      "FUNDERNAME":""
    }

    this.serviceService.postProvisionSubscription(body)
      .subscribe((result: any) => {
        console.log(result.result.transactionstatus);
        console.log(result.result.transactionnumber);
        if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
          const body1 = 
          {
            "CHANNELTYPE":signalrConnection.channelType,
            "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
            "DEVICEOWNER":signalrConnection.deviceOwner,
            "UNITHOLDERID":uhid,
            "FIRSTNAME":firstname,
            "IDENTIFICATIONTYPE":ictype,
            "IDENTIFICATIONNUMBER":icno,
            "FUNDID":fundid,
            "AMOUNTAPPLIED":this.transferamount,
            "TRANSACTIONDATE":formatDate(new Date(), 'dd/MM/yyyy', 'en'),
            "TRANSACTIONTIME":formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "AGENTCODE":signalrConnection.agentCode,
            "BRANCHCODE":signalrConnection.branchCode,
            "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
            "BANKCUSTPHONENUMBER":"",
            "PAYMENTTYPE":"",
            "BANKACCOUNTNUMBER":"",
            "TOFUNDID":"ASB",
            "TXNMODE":"A",
            "POLICYNUMBER":"",
            "EPFNUMBER":"",
            "GUARDIANID":guardianID,
            "GUARDIANICTYPE":guardianICtype,
            "GUARDIANICNUMBER":guardianIC
            }
      
          this.serviceService.postSwitching(body1)
            .subscribe((result1: any) => {
              if(result.result.transactionstatus.toLowerCase() == 'Successful'){
                this.switching2 = false;
                this.switching3 = true;
                this.refno = result.result.transactionnumber;
                this.feepercentage = result1.result.feepercentage == "" ? 0 : result1.result.feepercentage;
                this.switchingNAVTo = result.result.fundprice == "" ? 0 : result.result.fundprice;
                this.switchingSST = result.result.gstamount == "" ? 0 : result.result.gstamount;
                this.switchingUnitsTo = result.result.unitsalloted == "" ? 0 : result.result.unitsalloted;
                this.initialcharges = result.result.salescharge == "" ? 0 : result.result.salescharge;
              }
              else{
                errorCodes.Ecode = result1.result.rejectcode;
                errorCodes.Emessage = result1.result.rejectreason;
                errorCodes.accountName = firstname;
                errorCodes.accountNo = uhid;
                if(appFunc.isOwn == "major"){
                  errorCodes.accountType = "Dewasa";
                }else if(appFunc.isOwn == "bijak"){
                  errorCodes.accountType = "Bijak/Remaja";
                }
                errorCodes.transaction = this.transaction;
                this.router.navigate(['errorscreen']);
              }
            });
        }
        else{
          errorCodes.Ecode = result.result.rejectcode;
          errorCodes.Emessage = result.result.rejectreason;
          errorCodes.accountName = firstname;
          errorCodes.accountNo = uhid;
          if(appFunc.isOwn == "major"){
            errorCodes.accountType = "Dewasa";
          }else if(appFunc.isOwn == "bijak"){
            errorCodes.accountType = "Bijak/Remaja";
          }
          errorCodes.transaction = this.transaction;
          this.router.navigate(['errorscreen']);
        }
    });
    
  }

  switchingPrint(){
    let uhid = "";
    let firstname = "";
    let ictype = "";
    let icno = "";

    if(appFunc.isOwn == "major"){
      uhid = currentHolder.unitholderid;
      firstname = currentHolder.firstname;
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
    }else{
      uhid = currentBijakHolder.unitholderid;
      firstname = currentBijakHolder.firstname;
      ictype = currentBijakHolder.identificationtype;
      icno = currentBijakHolder.identificationnumber;
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

    let accountType = "";
    if(selectLang.selectedLang == 'ms'){
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
      }
    }else{
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
      }
    }
    

    appFunc.body = 
    {
      "Transaction" : this.transaction,
      "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Location" : signalrConnection.branchName,
      "Name" : this.unitholdername,
      "UHID" : this.unitholderid,
      "NRIC" : icno,
      "AccountType" : accountType,
      "TransactionNumber" : this.refno,
      "FUNDID" : this.switchingto,
      "FUNDPRICE" : this.switchingNAVTo,
      "UNITSALLOTED" : this.switchingUnitsTo,
      "FEEPERCENTAGE" : this.feepercentage,
      "SALESCHARGE" : this.initialcharges,
      "GSTAMOUNT" : this.switchingSST,
      "CARDINFO" : objCardInfo,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }

    appFunc.receiptFunction = "GetFinancialTrxPrintout"
    appFunc.printing = true;
    signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
      if(data){
    
        signalrConnection.connection.invoke('PrintHelpPageAsync', JSON.stringify(appFunc.body), "GetFinancialTrxPrintout", signalrConnection.trxno, "0", selectLang.selectedLang).then((data: any) => {
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

  switchingEmail(){
    let uhid = "";
    let firstname = "";
    let ictype = "";
    let icno = "";

    if(appFunc.isOwn == "major"){
      uhid = currentHolder.unitholderid;
      firstname = currentHolder.firstname;
      ictype = currentHolder.identificationtype;
      icno = currentHolder.identificationnumber;
    }else{
      uhid = currentBijakHolder.unitholderid;
      firstname = currentBijakHolder.firstname;
      ictype = currentBijakHolder.identificationtype;
      icno = currentBijakHolder.identificationnumber;
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

    let accountType = "";
    let module = "0";
    if(selectLang.selectedLang == 'ms'){
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "15"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "16"
      }
    }else{
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "15"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "16"
      }
    }
    

    appFunc.body = 
    {
      "Transaction" : this.transaction,
      "Date" : formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      "Time" : formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
      "Location" : signalrConnection.branchName,
      "Name" : this.unitholdername,
      "UHID" : this.unitholderid,
      "NRIC" : icno,
      "AccountType" : accountType,
      "TransactionNumber" : this.refno,
      "FUNDID" : this.switchingto,
      "FUNDPRICE" : this.switchingNAVTo,
      "UNITSALLOTED" : this.switchingUnitsTo,
      "FEEPERCENTAGE" : this.feepercentage,
      "SALESCHARGE" : this.initialcharges,
      "GSTAMOUNT" : this.switchingSST,
      "CARDINFO" : objCardInfo,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }
    appFunc.printing = false;

    appFunc.emailObj =
    {
      "Name" : this.unitholdername,
      "UnitHolderID" : this.unitholderid,
      "Module" : module,
      "TrxDate" : formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en'),
      "language" : selectLang.selectedLang,
      "IC" : icno
    }

    appFunc.receiptFunction = "GetFinancialTrxPrintout"

    
    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, "4", JSON.stringify(appFunc.emailObj)).then((data: any) => {
      setTimeout(()=>{   
        if (data == true){
          this.EmailPage_Visible = false;
          setTimeout(()=>{
            this.getAccountInquiry();
          }, 3000);
        }else{
          errorCodes.Ecode = "0069";
          errorCodes.Emessage = "Email Failed";
          this.router.navigate(['errorscreen']);
        }
      }, 3000);
    });
  }

  agreeTNC(event: any){
    if (event.target.checked){
      this.disagreedTNC = false;
    }else{
      this.disagreedTNC = true;
    }
  }

  initializeForm1(){
    this.Form_1 = this.fb.group({
      uhid: ['', Validators.required],
      uhname: ['', Validators.required],
      ictype:['', Validators.required],
      uhic: ['', Validators.required],
      reason: [''],
      relationship: [''],
      amount: ['', Validators.required],
    });
  }

  initializeForm2(){
    this.Form_2 = this.fb.group({
      fundname: [''],
      amount: ['', Validators.required],
    });
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
          "IDENTIFICATIONNUMBER": currentMyKidDetails.ICNo,
          "FUNDID": "",
          "INQUIRYCODE": "5",
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
          currentBijakHolder.typeclosed = result.typeclosed;
          currentBijakHolder.participateinasnbmkt = result.participateinasnbmkt;
          currentBijakHolder.funddetail = result.fundetail;
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
        "INQUIRYCODE": "5",
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
      errorCodes.message = e;
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
