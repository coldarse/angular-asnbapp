import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { element } from 'protractor';
import { accessToken } from '../_models/apiToken';
import { appFunc } from '../_models/appFunctions';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { ASNBFundID, reasonTransfer, thirdpartyRelationship } from '../_models/dropDownLists';
import { errorCodes } from '../_models/errorCode';
import { fundDetails } from '../_models/fundDetails';
import { kActivity } from '../_models/kActivity';
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

  pdfsrc1 = "assets/Kiosk_TnC_Financial_Transaction_V.01_2021.pdf";
  pdfsrc2 = "assets/Investment_Notice_Kiosk_v4.pdf";
  pdfsrc3 = "assets/ASNB_MasterProspectus.pdf";
  TermsAndConditions = false;
  InvestmentDisclaimer = false;
  MinimumCriteria = false;
  ispopup = false;
  isHistorical = false;

  isClicked = false;

  uhNotExist = false;
  uhNoFund = false;

  transferswitching1 = false;
  transferswitching = false;
  istransfer = false;
  isswitching = false;
  isOwn = false;
  isBijak = false;

  moduleid = 0;
  action = "";

  isGetInfo = false;

  Print_Visible = true;
  Email_Visible = true;

  refno = "";
  nav = 0;
  sst = 0;
  unitsalloted = 0;
  initialcharges = 0;
  feepercentage = "";

  disagreedTNC = false;

  uhidWarning = false;
  uhnameWarning = false;
  uhictypeWarning = false;
  uhicWarning = false;
  transferamountWarning = false;
  amountWarning1 = false;


  switchingamountWarning = false;
  amountWarning2 = false;

  receiptfundid = "";

  transferreasonWarning = false;
  transferrelationshipWarning = false;
  switchingFundWarning = false;

  isTransferSwitchingMajor = false;
  isTransferSwitchingMinor = false;

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

  sameUH = false;

  transferuhid = "";
  transferuhname = "";
  transferuhictype = "";
  transferuhic = "";
  transferreason = "";
  transferrelationship = "";
  transferamount = "";
  transferfrom = "";
  transferfromName = "";
  transferfunname = "";
  transferNAV = 0;
  transferunits = 0;
  transferSST = 0;
  transferinitialRM = 0;
  transferinitialPercentage = 0;

  displayReason = "";
  displayRelationship = "";

  switchinguhid = "";
  switchingFromName = "";
  switchingfrom = "";
  switchingto = "";
  switchingamount = "";
  switchingNAVFrom = 0;
  switchingNAVTo = 0;
  switchingUnitsFrom = 0;
  switchingUnitsTo = 0;
  switchingSST = 0;

  unitholderid = "000011112221";
  unitholdername = "Alia Nur Ali";
  unitholderidtype = "";
  untiholderidno = "";

  actualfundname ="Amanah Saham Bumiputera";
  actualfundvalue = "250000.00";
  actualfundid = "";

  mDetails = currentHolder.minordetail;
  fundDetails: any = [];
  newFundDetails: any = [];

  transaction = "";

  TransferMinValue = 0.00;
  TransferMaxValue = 0.00;
  SwitchingMinValue = 0.00;
  SwitchingMaxValue = 0.00;

  transferDisabled = false;
  switchDisabled = false;

  selectedFundID = "";

  id: any; 

  constructor(
    private router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService,
    private fb: FormBuilder,
  ) { }

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

  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }

  isModuleEnabled(){
    let transferMDisabled = true;
    let transferBDisabled = true;
    let switchMDisabled = true;
    let switchBDisabled = true;

    if(appFunc.isOwn == "major"){
      for (var val of appFunc.modules){
        if(val.moduleID == 13){//TransferM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              transferMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              transferMDisabled = false;
            }
          }
        }
        else if(val.moduleID == 15){//SwitchM
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              switchMDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              switchMDisabled = false;
            }
          }
        }
      }

      if(transferMDisabled){
        this.transferDisabled = true;
      }
      else{
        this.transferDisabled = false;
      }
  
      if(switchMDisabled){
        this.switchDisabled = true;
      }
      else{
        this.switchDisabled = false;
      }
    }
    else{
      for (var val of appFunc.modules){
        if(val.moduleID == 14){//TransferB
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              transferBDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              transferBDisabled = false;
            }
          }
        }
        else if(val.moduleID == 16){//SwitchB
          if(val.enable == true){
            if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              switchBDisabled = false;
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "Enabled Update Details Module.");
            }
          }else{
            if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
              switchBDisabled = false;
            }
          }
        }
      }

      if(transferBDisabled){
        this.transferDisabled = true;
      }
      else{
        this.transferDisabled = false;
      }
  
      if(switchBDisabled){
        this.switchDisabled = true;
      }
      else{
        this.switchDisabled = false;
      }
    }

    


    

  }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);

    console.log(appFunc.ASNBFundID);

    this.isModuleEnabled();
    if(appFunc.isOwn == "major"){
      this.isTransferSwitchingMajor = true;
      this.isOwn = true;
      this.transferswitching1 = true;
      this.transferswitching = true;
      this.fundDetails = currentHolder.funddetail;
      this.unitholderid = currentHolder.unitholderid;
      this.unitholdername = currentHolder.firstname;
      this.unitholderidtype = currentHolder.identificationtype;
      this.untiholderidno = currentHolder.identificationnumber;

      this.fundDetails.forEach((element: any) => {
        appFunc.ASNBFundID.forEach((elem: ASNBFundID) => {
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


    }else{
      this.transferswitching1 = true;
      this.isTransferSwitchingMinor = true;
      this.isBijak = true;
      this.BijakVisible = true;
    }

    if (!signalrConnection.isHardcodedIC){
      this.id = setInterval(() => {
        this.DetectMyKad();
      }, 1000);
    }
    
  }

  RemoveElementFromStringArray(element: string, fundArray: any[]) {
    fundArray.forEach((value, index)=>{
      if(value.FUNDID.toString().toUpperCase() == element.toString().toUpperCase()){
        fundArray.splice(index,1);
      } 
    });
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

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this.router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transaction Menu]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  Back(){
    this.router.navigate(['financialtransactionmenu']);
  }

  ngOnDestroy() {
    clearInterval(this.id);
    deleteKeyboard();
    if(appFunc.kioskActivity != undefined){
      this.serviceService.postKioskActivity(appFunc.kioskActivity).subscribe((res: any) => {
      });
    }
    appFunc.kioskActivity = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Transfer/Switching]" + ": " + "Cleared Interval.");
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
      "GUARDIANICNUMBER": currentHolder.identificationnumber,
      "LANGUAGE": selectLang.selectedLang
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
    this.untiholderidno = currentBijakHolder.identificationnumber;
    this.BijakVisible = false;
    this.transferswitching = true;
  }

  Transfer(fund: any){
    console.log(fund);
    //this.isHistorical = this.isBefore4pm();
    this.disagreedTNC = false;
    
    this.pdfsrc3 = "assets/TRANSFER/All_Fund_Min_Criteria.pdf";

    if(selectLang.selectedLang == 'en'){
      this.transaction = "Transfer";
    }else{
      this.transaction = "Pemindahan";
    }

    this.selectedFundID = fund.FUNDID;

    appFunc.ASNBFundID.forEach((elements: ASNBFundID) => {
      if(elements.code.toString().toLowerCase() == fund.FUNDID.toLowerCase()){
        this.actualfundname = elements.value;
        if(appFunc.isOwn == "major"){
          this.TransferMinValue = elements.majorTransferLimit_min;
          this.TransferMaxValue = elements.majorTransferLimit_max;
          this.moduleid = 13;
          this.action = "Perform Transfer for Major";
        }else{
          this.TransferMinValue = elements.minorTransferLimit_min;
          this.TransferMaxValue = elements.minorTransferLimit_max;
          this.moduleid = 14;
          this.action = "Perform Transfer for Minor";
        }

        if(elements.pricingType.toString().toLowerCase() == "amount"){
          this.isHistorical = true;
        }
        else{
          this.isHistorical = false;
        }
      }
    });

    this.transferswitching = false;
    this.transferswitching1 = false;
    this.istransfer = true;
    this.transfer1 = true;

    this.initializeForm1();

    
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
    this.transferswitching1 = true;
    this.fundAvailable = [];
    this.isGetInfo = false;

    this.uhidWarning = false;
    this.uhnameWarning = false;
    this.uhictypeWarning = false;
    this.uhicWarning = false;
    this.transferamountWarning = false;
    this.transferreasonWarning = false;
    this.transferrelationshipWarning = false;
    this.amountWarning1 = false;
    this.uhNoFund = false;
    this.uhNotExist = false;
    this.disagreedTNC = false;
    
    deleteKeyboard();
  }

  transfer1Next(){

    // if(this.isGetInfo == false){
    //   this.Form_1.controls.uhic.setValue(this.tuhic?.nativeElement.value);
    //   this.sameUH = false;
    //   this.uhictypeWarning = false;
    //   this.uhicWarning = false;
    //   this.uhNoFund = false;
    //   this.uhNotExist = false;
    //   closeKeyboard();

    //   let x = 0;
    //   Object.keys(this.Form_1.controls).forEach(key => {
    //     if (this.Form_1.controls[key].hasError('required')){
          
    //       if(key.includes('ictype')){
    //         x += 1;
    //         this.uhictypeWarning = true;
    //       }
    //       else if(key.includes('uhic')){
    //         x += 1;
    //         this.uhicWarning = true;
    //       }
    //     }
    //   });
    //   if (x > 0){
    //     signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    //   }else{
    //     if(this.Form_1.controls.uhic.value == currentHolder.identificationnumber){
    //       this.sameUH = true;
    //       this.disagreedTNC = false;
    //       this.Form_1.controls.uhic.setValue("");
    //       this.Form_1.controls.ictype.setValue("");
    //     }else{
    //       this.transferuhictype = this.Form_1.controls.ictype.value;
    //       this.transferuhic = this.Form_1.controls.uhic.value;
    //       this.disagreedTNC = true;

    //       const body = { 

    //         "CHANNELTYPE": signalrConnection.channelType,
    //         "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
    //         "DEVICEOWNER": signalrConnection.deviceOwner,
    //         "UNITHOLDERID": "",
    //         "FIRSTNAME": "",
    //         "IDENTIFICATIONTYPE": this.transferuhictype,
    //         "IDENTIFICATIONNUMBER": this.transferuhic,
    //         "FUNDID": "",
    //         "INQUIRYCODE": "9",
    //         "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    //         "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
    //         "BANKTXNREFERENCENUMBER": signalrConnection.trxno,
    //         "BANKCUSTPHONENUMBER": "",
    //         "FILTRATIONFLAG": "1",
    //         "GUARDIANID": "",
    //         "GUARDIANICTYPE": "",
    //         "GUARDIANICNUMBER": ""
    
    //       };
    
    
      
    //       this.serviceService.getAccountInquiry(body)
    //         .subscribe((result: any) => {
    //           if(result.transactionstatus.toLowerCase().includes('successful')){

    //             let isFund = false;
    //             result.funddetail.forEach((element: any) => {
    //               if(element.FUNDID == this.selectedFundID){
    //                 isFund = true;
    //               }
    //             });

    //             if(isFund){
    //               this.Form_1.controls.uhid.setValue(result.unitholderid);
    //               this.Form_1.controls.uhname.setValue(result.firstname);
      
    //               this.Form_1.controls.ictype.disable();
    //               this.Form_1.controls.uhic.disable();
    //               this.Form_1.controls.uhid.disable();
    //               this.Form_1.controls.uhname.disable();
    
    //               deleteKeyboard();
                
    //               this.isGetInfo = true;
    //               setTimeout(() => {
    //                 loadKeyboard();
    //               } , 300);
    //             }
    //             else{
    //               this.disagreedTNC = false;
    //               this.Form_1.controls.uhic.setValue("");
    //               this.Form_1.controls.ictype.setValue("");
    //               // this.uhicWarning = true;
    //               // this.uhictypeWarning = true;
    //               this.uhNoFund = true;
    //             }
                
    //           }else{
    //             this.disagreedTNC = false;
    //             this.Form_1.controls.uhic.setValue("");
    //             this.Form_1.controls.ictype.setValue("");
    //             // this.uhicWarning = true;
    //             // this.uhictypeWarning = true;
    //             this.uhNotExist = true;
    //           }
              
    //       });
    //     }
    //   }
    // }
    // else{
      this.Form_1.controls.uhid.setValue(this.tuhid?.nativeElement.value);
      this.Form_1.controls.uhname.setValue(this.tuhname?.nativeElement.value);
      this.Form_1.controls.uhic.setValue(this.tuhic?.nativeElement.value);
      this.Form_1.controls.amount.setValue(this.tamount?.nativeElement.value);
  
      this.uhidWarning = false;
      this.uhnameWarning = false;
      this.uhictypeWarning = false;
      this.uhicWarning = false;
      this.transferamountWarning = false;
      this.transferreasonWarning = false;
      this.transferrelationshipWarning = false;
      this.amountWarning1 = false;
  
      
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
          else if(key.includes('reason')){
            this.transferreasonWarning = true;
          }
          else if(key.includes('relationship')){
            this.transferrelationshipWarning = true;
          }
        }
      });
      if (x > 0){
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
      }else{
  
        
        if(this.TransferMinValue == 0.00 && this.TransferMaxValue == 0.00){
          this.amountWarning1 = false;
        }
        else{
          if(Number(this.Form_1.controls.amount.value) < this.TransferMinValue || Number(this.Form_1.controls.amount.value) > this.TransferMaxValue){
            this.amountWarning1 = true;
          }
          else{
            this.amountWarning1 = false;
          }
        }
  
        if(this.amountWarning1 == false){
          this.transfer1 = false;
          this.transfer2 = true;
    
          this.transferuhid = this.Form_1.controls.uhid.value;
          this.transferuhname = this.Form_1.controls.uhname.value;
          this.transferuhictype = this.Form_1.controls.ictype.value;
          this.transferuhic = this.Form_1.controls.uhic.value;
          this.transferreason = this.Form_1.controls.reason.value;
          this.transferrelationship = this.Form_1.controls.relationship.value;
          this.transferamount = this.Form_1.controls.amount.value;
    
          this.reason.forEach((element: reasonTransfer) => {
            if(element.code == this.transferreason){
              this.displayReason = element.desc;
            }
          });
    
          this.relationship.forEach((elem: thirdpartyRelationship) => {
            if(elem.code == this.transferrelationship){
              this.displayRelationship = elem.desc;
            }
          });

    
          if(appFunc.isOwn == "major"){
            this.transferfrom = currentHolder.unitholderid;
            this.transferfromName = currentHolder.firstname;
          }else{
            this.transferfrom = currentBijakHolder.unitholderid;
            this.transferfromName = currentBijakHolder.firstname;
          }
    
          this.transferfunname = this.actualfundname;
          
    
          deleteKeyboard();
        }
  
      }
    // }
  }

  transfer2Back(){
    this.transfer1 = true;
    this.transfer2 = false;

    this.disagreedTNC = true;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  transfer2Next(){

    this.isClicked = true;

    let kActivit1 = new kActivity();
    kActivit1.trxno = signalrConnection.trxno;
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = this.moduleid;
    kActivit1.submoduleID = undefined;
    kActivit1.action = this.action;
    kActivit1.startTime = new Date();

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
      if(elem.value.toLowerCase() == this.transferfunname.toLowerCase()){
        fundid = elem.code;
      }
    });

    // const body = 
    // {
    //   "CHANNELTYPE": signalrConnection.channelType,
    //   "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
    //   "DEVICEOWNER": signalrConnection.deviceOwner,
    //   "UNITHOLDERID":uhid,
    //   "FIRSTNAME": "",
    //   "IDENTIFICATIONTYPE":ictype,
    //   "IDENTIFICATIONNUMBER":icno,
    //   "FUNDID":fundid,
    //   "AMOUNTAPPLIED":this.transferamount,
    //   "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    //   "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
    //   "CUSTOMERICNUMBER":"",
    //   "CUSTOMERNAME":"",
    //   "AGENTCODE":signalrConnection.agentCode,
    //   "BRANCHCODE":signalrConnection.branchCode,
    //   "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
    //   "BANKCUSTPHONENUMBER":"",
    //   "PAYMENTTYPE":"T",
    //   "BANKACCOUNTNUMBER":"",
    //   "BANKBRANCHCODE":"",
    //   "CHEQUENUMBER":"",
    //   "CHEQUEDATE":"",
    //   "GUARDIANID":guardianID,
    //   "GUARDIANICTYPE":guardianICtype,
    //   "GUARDIANICNUMBER":guardianIC,
    //   "POLICYNUMBER":"",
    //   "EPFNUMBER":"",
    //   "SUBPAYMENTTYPE":"",
    //   "EWGATEWAY":"",
    //   "THIRDPARTYINVESTMENT":"Y",
    //   "THIRDPARTYNAME":this.transferuhname,
    //   "THIRDPARTYICTYPE":this.transferuhictype,
    //   "THIRDPARTYICNUMBER":this.transferuhic,
    //   "THIRDPARTYRELATIONSHIP":this.transferrelationship,
    //   "REASONFORTRANSFER":this.transferreason,
    //   "SOURCEOFFUND":"",
    //   "OTHERSOURCEOFFUND":"",
    //   "FUNDERNAME":""
    // }
    
    // this.serviceService.postProvisionSubscription(body)
    //   .subscribe((result: any) => {
    //     console.log(result.result.transactionstatus);
    //     console.log(result.result.transactionnumber);

        let txnmode = "";
        if(this.isHistorical){
          txnmode = "A";
        }else{
          txnmode = "U";
        }

        // if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
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
            "TXNMODE": txnmode,
            "GUARDIANID":guardianID,
            "GUARDIANICTYPE":guardianICtype,
            "GUARDIANICNUMBER":guardianIC,
            "THIRDPARTYTRANSFER":"N",
            "THIRDPARTYRELATIONSHIP":this.transferrelationship,
            "REASONFORTRANSFER":this.transferreason,
            "LANGUAGE": selectLang.selectedLang
          }
      
          this.serviceService.postTransfer(body1)
            .subscribe((result1: any) => {
              if(result1.result.transactionstatus.toLowerCase() == 'successful'){
                this.transfer2 = false;
                this.transfer3 = true;
                this.refno = result1.result.transactionnumber;
                this.transferinitialPercentage = result1.result.feepercentage == "" ? 0 : result1.result.feepercentage;
                this.transferNAV = result1.result.fundprice == "" ? 0 : result1.result.fundprice;
                this.transferSST = result1.result.gstamount == "" ? 0 : result1.result.gstamount;
                this.transferunits = result1.result.unitsalloted == "" ? 0 : result1.result.unitsalloted;
                this.transferinitialRM = result1.result.salescharge == "" ? 0 : result1.result.salescharge;
              
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

                // let module = "";
                // if(appFunc.isOwn == "major"){
                //   module = "13";
                // }else if(appFunc.isOwn == "bijak"){
                //   module = "14";
                // }

                let module1 = "";
                let module2 = "";
                if(appFunc.isOwn == "major"){
                  module1 = "25"; //out
                  module2 = "27"; //in
                }else if(appFunc.isOwn == "bijak"){
                  module1 = "26"; //out
                  module2 = "28"; //in
                }

                const FTBodyOut =
                {
                  "trxNo": signalrConnection.trxno,
                  "kioskCode": signalrConnection.kioskCode,
                  "unitHolderID": result1.result.unitholderid,
                  "firstName": result1.result.firstname,
                  "identificationType": result1.result.identificationtype,
                  "identificationNumber": result1.result.identificationnumber,
                  "fundID": result1.result.fundid,
                  "amountApplied": 0 - result1.result.amountapplied,
                  "transactionDate": result1.result.transactiondate,
                  "transactionTime": result1.result.transactiontime,
                  "transactionType": module1,
                  "customerICNumber": "",
                  "customerName": "",
                  "agentCode": result1.result.agentCode,
                  "referenceNo": "",
                  "bankTxnReferenceNumber": result1.result.banktxnreferencenumber,
                  "bankCustPhoneNumber": result1.result.bankcustphonenumber,
                  "paymentType": result1.result.paymenttype,
                  "bankAccountNumber": result1.result.bankaccountnumber,
                  "bankBranchCode": "",
                  "chequeNumber": "",
                  "chequeDate": "",
                  "guardianID": result1.result.guardianid,
                  "guardianicType": result1.result.guardianictype,
                  "guardianicNumber": result1.result.guardianicnumber,
                  "policyNumber": result1.result.policynumber,
                  "epfNumber": result1.result.epfnumber,
                  "subPaymentType": "",
                  "ewgateway": "",
                  "thirdPartyInvestment": "",
                  "thirdPartyName": "",
                  "thirdPartyICNumber": "",
                  "thirdPartyRelationship": result1.result.thirdpartyrelationship,
                  "reasonForTransfer": result1.result.reasonfortransfer,
                  "sourceOfFund": "",
                  "otherSourceOfFund": "",
                  "funderName": "",
                  "transactionStatus": result1.result.transactionstatus,
                  "transactionNumber": result1.result.transactionnumber,
                  "taxInvoiceNumber": "",
                  "confirmedUnits": "",
                  "unitBalance": "",
                  "operation": "",
                  "remark": "",
                  "creditNoteNumber": "",
                  "rejectCode": result1.result.rejectcode,
                  "rejectReason": result1.result.rejectreason,
                  "itemno": signalrConnection.itemNo,
                  "nav": result1.result.fundprice,
                  "fee": result1.result.salescharge,
                  "sst": result1.result.gstamount
                }

                const FTBodyIn =
                {
                  "trxNo": signalrConnection.trxno,
                  "kioskCode": signalrConnection.kioskCode,
                  "unitHolderID": this.transferuhid,
                  "firstName": this.transferuhname,
                  "identificationType": this.transferuhictype,
                  "identificationNumber": this.transferuhic,
                  "fundID": result1.result.fundid,
                  "amountApplied": result1.result.amountapplied,
                  "transactionDate": result1.result.transactiondate,
                  "transactionTime": result1.result.transactiontime,
                  "transactionType": module2,
                  "customerICNumber": "",
                  "customerName": "",
                  "agentCode": result1.result.agentCode,
                  "referenceNo": "",
                  "bankTxnReferenceNumber": result1.result.banktxnreferencenumber,
                  "bankCustPhoneNumber": result1.result.bankcustphonenumber,
                  "paymentType": result1.result.paymenttype,
                  "bankAccountNumber": result1.result.bankaccountnumber,
                  "bankBranchCode": "",
                  "chequeNumber": "",
                  "chequeDate": "",
                  "guardianID": result1.result.guardianid,
                  "guardianicType": result1.result.guardianictype,
                  "guardianicNumber": result1.result.guardianicnumber,
                  "policyNumber": result1.result.policynumber,
                  "epfNumber": result1.result.epfnumber,
                  "subPaymentType": "",
                  "ewgateway": "",
                  "thirdPartyInvestment": "",
                  "thirdPartyName": "",
                  "thirdPartyICNumber": "",
                  "thirdPartyRelationship": result1.result.thirdpartyrelationship,
                  "reasonForTransfer": result1.result.reasonfortransfer,
                  "sourceOfFund": "",
                  "otherSourceOfFund": "",
                  "funderName": "",
                  "transactionStatus": result1.result.transactionstatus,
                  "transactionNumber": result1.result.transactionnumber,
                  "taxInvoiceNumber": "",
                  "confirmedUnits": "",
                  "unitBalance": "",
                  "operation": "",
                  "remark": "",
                  "creditNoteNumber": "",
                  "rejectCode": result1.result.rejectcode,
                  "rejectReason": result1.result.rejectreason,
                  "itemno": signalrConnection.itemNo,
                  "nav": 0,
                  "fee": 0,
                  "sst": 0
                }

                this.serviceService.createFundTransaction(FTBodyOut).subscribe(() => {});
                this.serviceService.createFundTransaction(FTBodyIn).subscribe(() => {});
                signalrConnection.itemNo += 1;
                kActivit1.endTime = new Date();
                kActivit1.status = true;
                appFunc.kioskActivity.push(kActivit1);

                this.isClicked = false;
              }
              else{

                this.isClicked = false;
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
                kActivit1.endTime = new Date();
                kActivit1.status = false;
                appFunc.kioskActivity.push(kActivit1);
                this.router.navigate(['errorscreen']);
              }
            });
        // }
        // else{
        //   errorCodes.Ecode = result.result.rejectcode;
        //   errorCodes.Emessage = result.result.rejectreason;
        //   errorCodes.accountName = firstname;
        //   errorCodes.accountNo = uhid;
        //   if(appFunc.isOwn == "major"){
        //     errorCodes.accountType = "Dewasa";
        //   }else if(appFunc.isOwn == "bijak"){
        //     errorCodes.accountType = "Bijak/Remaja";
        //   }
        //   errorCodes.transaction = this.transaction;
        //   kActivit1.endTime = new Date();
        //   kActivit1.status = false;
        //   appFunc.kioskActivity.push(kActivit1);
        //   this.router.navigate(['errorscreen']);
        // }
    // });
    
  }

  transferPrint(){
    this.transfer3 = false;
    this.Print1_Visible = true;

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
      "AMOUNTAPPLIED": this.transferamount,
      "FUNDID" : this.transferfunname,
      "TOUHFIRSTNAME": this.transferuhname,
      "TOUNITHOLDERID": this.transferuhid,
      "THIRDPARTYRELATIONSHIP": this.displayRelationship,
      "FUNDPRICE" : this.transferNAV,
      "UNITSALLOTED" : this.transferunits,
      "SALESCHARGE" : this.transferinitialRM,
      "FEEPERCENTAGE" : this.transferinitialPercentage,
      "GSTAMOUNT" : this.transferSST,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }

    appFunc.receiptFunction = "GetTransferTrxPrintout"
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

  transferEmail(){
    this.transfer3 = false;
    this.EmailPage_Visible = true;

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
      "AMOUNTAPPLIED": this.transferamount,
      "FUNDID" : this.transferfunname,
      "TOUHFIRSTNAME": this.transferuhname,
      "TOUNITHOLDERID": this.transferuhid,
      "THIRDPARTYRELATIONSHIP": this.displayRelationship,
      "FUNDPRICE" : this.transferNAV,
      "UNITSALLOTED" : this.transferunits,
      "SALESCHARGE" : this.transferinitialRM,
      "FEEPERCENTAGE" : this.transferinitialPercentage,
      "GSTAMOUNT" : this.transferSST,
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

    appFunc.receiptFunction = "GetTransferTrxPrintout"

    
    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, module, JSON.stringify(appFunc.emailObj), this.transferfunname).then((data: any) => {
      
    });

    setTimeout(()=>{   
      this.EmailPage_Visible = false;
      this.getAccountInquiry();
    }, 5000);
  }

  containsObject(obj: ASNBFundID, list: any[]) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x].toString() === obj.code.toString()) {
            return true;
        }
    }

    return false;
  }

  checkAMLA(fundid: any){
    let faultCode = "";
    let faultString = "";

    if(appFunc.isOwn == "bijak"){
      if(currentBijakHolder.riskprofile == ""){
        const AMLABody = 
        {
          "AuthUser": "AMLSVC",
          "AuthPswd": "AMLSVC",
          "Username": "Kiosk",
          "BrCode": signalrConnection.branchCode,
          "SysName": "Kiosk",
          "ScanOption": "5",
          "UniqueNo": currentBijakHolder.unitholderid,
          "SearchName": currentBijakHolder.firstname,
          "SearchCountry": "MY",
          "SearchDOB": currentBijakHolder.dateofbirth,
          "SearchID": currentBijakHolder.identificationnumber,
          "PassportVerify": "0",
          "SecurityNo1": "0",
          "PassExpiryDtVerify": "0",
          "PassExpiryDate": "0",
          "SecurityNo2": "0",
          "RiskFactors": `1#${currentBijakHolder.occupation}|${currentBijakHolder.occupationsector}|${currentBijakHolder.occupationcategory}|${currentBijakHolder.natureofbusiness}|${currentBijakHolder.otherinfO8}|${currentBijakHolder.pep}|${fundid}|${currentBijakHolder.branchcode}||`, 
          "Content": "",
          "RtnHit": "",
          "RtnScanID": 0,
          "RtnEnCryptScanID": ""
        }

        this.serviceService.postAMLA(AMLABody).subscribe((data: any) => {
          faultCode = data.result.faultCode;
          faultString = data.result.faultString;
          currentBijakHolder.riskprofile = data.result.rtnHit;
          if(currentBijakHolder.riskprofile == "HI"){
            //Error screen?
            errorCodes.Ecode = currentBijakHolder.riskprofile;
            errorCodes.Emessage = currentBijakHolder.riskprofile;
            errorCodes.accountType = "Bijak/Remaja";
            errorCodes.accountName = currentBijakHolder.firstname;
            errorCodes.accountNo = currentBijakHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this.router.navigate(['errorscreen']);
          }
          else if(!data.result.rtnHit){
            errorCodes.Ecode = faultCode;
            errorCodes.Emessage = faultString;
            errorCodes.accountType = "Dewasa";
            errorCodes.accountName = currentBijakHolder.firstname;
            errorCodes.accountNo = currentBijakHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this.router.navigate(['errorscreen']);
          }
        });
      }
      else if(currentBijakHolder.riskprofile == "HI"){
        //Error screen?
        errorCodes.Ecode = currentBijakHolder.riskprofile;
        errorCodes.Emessage = currentBijakHolder.riskprofile;
        errorCodes.accountType = "Bijak/Remaja";
        errorCodes.accountName = currentBijakHolder.firstname;
        errorCodes.accountNo = currentBijakHolder.unitholderid;
        errorCodes.transaction = this.transaction;
        this.router.navigate(['errorscreen']);
      }
    }
    else{
      if(currentHolder.riskprofile == ""){
        const AMLABody = 
        {
          "AuthUser": "AMLSVC",
          "AuthPswd": "AMLSVC",
          "Username": "Kiosk",
          "BrCode": signalrConnection.branchCode,
          "SysName": "Kiosk",
          "ScanOption": "5",
          "UniqueNo": currentHolder.unitholderid,
          "SearchName": currentHolder.firstname,
          "SearchCountry": "MY",
          "SearchDOB": currentHolder.dateofbirth,
          "SearchID": currentHolder.identificationnumber,
          "PassportVerify": "0",
          "SecurityNo1": "0",
          "PassExpiryDtVerify": "0",
          "PassExpiryDate": "0",
          "SecurityNo2": "0",
          "RiskFactors": `1#${currentHolder.occupation}|${currentHolder.occupationsector}|${currentHolder.occupationcategory}|${currentHolder.natureofbusiness}|${currentHolder.otherinfO8}|${currentHolder.pep}|${fundid}|${currentHolder.branchcode}||`, 
          "Content": "",
          "RtnHit": "",
          "RtnScanID": 0,
          "RtnEnCryptScanID": ""
        }

        this.serviceService.postAMLA(AMLABody).subscribe((data: any) => {
          faultCode = data.result.faultCode;
          faultString = data.result.faultString;
          currentHolder.riskprofile = data.result.rtnHit;
          if(data.result.rtnHit == "HI"){
            //Error screen?
            errorCodes.Ecode = currentHolder.riskprofile;
            errorCodes.Emessage = currentHolder.riskprofile;
            errorCodes.accountType = "Dewasa";
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this.router.navigate(['errorscreen']);
          }
          else if(!data.result.rtnHit){
            errorCodes.Ecode = faultCode;
            errorCodes.Emessage = faultString;
            errorCodes.accountType = "Dewasa";
            errorCodes.accountName = currentHolder.firstname;
            errorCodes.accountNo = currentHolder.unitholderid;
            errorCodes.transaction = this.transaction;
            this.router.navigate(['errorscreen']);
          }
        });
      }
      else if(currentHolder.riskprofile == "HI"){
        //Error screen?
        errorCodes.Ecode = currentHolder.riskprofile;
        errorCodes.Emessage = currentHolder.riskprofile;
        errorCodes.accountType = "Dewasa";
        errorCodes.accountName = currentHolder.firstname;
        errorCodes.accountNo = currentHolder.unitholderid;
        errorCodes.transaction = this.transaction;
        this.router.navigate(['errorscreen']);
      }
    }
  }

  Switching(fund: any){

    console.log(fund);
    this.disagreedTNC = true;
    this.pdfsrc3 = "assets/SWITCHING/All_Fund_Min_Criteria.pdf";

    this.checkAMLA("");
    //this.isHistorical = this.isBefore4pm();
    
    // const body =
    // {
    //   "CHANNELTYPE": signalrConnection.channelType,
    //   "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
    //   "DEVICEOWNER": signalrConnection.deviceOwner,
    //   "REQUESTDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    //   "REQUESTTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
    //   "UNITHOLDERID": this.unitholderid,
    //   "IDENTIFICATIONTYPE": this.unitholderidtype,
    //   "IDENTIFICATIONNUMBER": this.untiholderidno,
    //   "FUNDLISTTYPE":"N"
    // }

    appFunc.ASNBFundID.forEach((elements: ASNBFundID) => {
      if(elements.code.toString().toLowerCase() == fund.FUNDID.toLowerCase()){
        this.actualfundname = elements.value;
        if(appFunc.isOwn == "major"){
          this.SwitchingMinValue = elements.majorSwitchingLimit_min;
          this.SwitchingMaxValue = elements.majorSwitchingLimit_max;
          this.moduleid = 15;
          this.action = "Perform Switching for Major";
        }else{
          this.SwitchingMinValue = elements.minorSwitchingLimit_min;
          this.SwitchingMaxValue = elements.minorSwitchingLimit_max;
          this.moduleid = 16;
          this.action = "Perform Switching for Minor";
        }

        if(elements.pricingType.toString().toLowerCase() == "amount"){
          this.isHistorical = true;
        }
        else{
          this.isHistorical = false;
        }

      
      }
    });

    this.newFundDetails.forEach((element: any) => {
      if(element.FUNDID.toString().toLowerCase() != fund.FUNDID.toString().toLowerCase()){
        this.fundAvailable.push(element);
      }
    });

    // this.serviceService.postEligibleFunds(body)
    //   .subscribe((result: any) => {
        // appFunc.ASNBFundID.forEach((elem1: ASNBFundID) => {
        //   if(this.containsObject(elem1, result.result.fundid)){
        //     this.fundAvailable.push(elem1);
        //     console.log(true);
        //   }
        // });

      //console.log(this.fundAvailable);


      

      appFunc.ASNBFundID.forEach((element: ASNBFundID) => {
        if(fund.FUNDID.toString().toLowerCase() == element.code.toString().toLowerCase()){
          this.switchingfrom = element.value;
          if(element.pricingType.toLowerCase() == 'amount'){
            this.switchingNAVFrom = fund.NAV;
          }
          else{
            this.switchingNAVFrom = 0;
          }
        }
      });
      

      if(selectLang.selectedLang == 'en'){
        this.transaction = "Switching";
      }else{
        this.transaction = "Penukaran";
      }

      this.transferswitching = false;
      this.transferswitching1 = false;
      this.isswitching = true;
      this.switching1 = true;

      this.initializeForm2();

      
      this.actualfundvalue = fund.UNITBALANCE;
      this.actualfundid = fund.FUNDID;

      setTimeout(() => {
        loadKeyboard();
      } , 1000);
    // });

    
  }

  switching1Back(){
    this.isswitching = false;
    this.switching1 = false;
    this.transferswitching = true;
    this.transferswitching1 = true;
    this.fundAvailable = [];
    deleteKeyboard();
  }

  switching1Next(){
    this.Form_2.controls.amount.setValue(this.samount?.nativeElement.value);

    this.switchingamountWarning = false;
    this.switchingFundWarning = false;
    this.amountWarning2 = false;

   
    let x = 0;
    Object.keys(this.Form_2.controls).forEach(key => {
      if (this.Form_2.controls[key].hasError('required')){
        x += 1;
        if(key.includes('amount')){
          this.switchingamountWarning = true;
        }
        else if(key.includes('fundname')){
          this.switchingFundWarning = true;
        }
      }
    });
    if (x > 0){
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Portal Registration]" + ": " + `${x} field(s) empty.`);
    }else{

      if(this.SwitchingMinValue == 0.00 && this.SwitchingMaxValue == 0.00){
        this.amountWarning2 = false;
      }
      else{
        if(Number(this.Form_2.controls.amount.value) < this.SwitchingMinValue || Number(this.Form_2.controls.amount.value) > this.SwitchingMaxValue){
          this.amountWarning2 = true;
        }
        else{
          this.amountWarning2 = false;
        }
      }

      if(this.amountWarning2 == false){
        


        this.switchinguhid = this.unitholderid;
        this.switchingFromName = this.unitholdername;
        this.switchingto = this.Form_2.controls.fundname.value;
        this.switchingamount = this.Form_2.controls.amount.value;


        appFunc.ASNBFundID.forEach((elem: ASNBFundID) => {
          if(elem.code.toLowerCase() == this.switchingto.toLowerCase()){
            this.receiptfundid = elem.value;
          }
        });

        this.switching1 = false;
        this.switching2 = true;
        
        deleteKeyboard();
      }
      
    }
  }

  switching2Back(){
    this.switching1 = true;
    this.switching2 = false;

    this.disagreedTNC = true;

    setTimeout(() => {
      loadKeyboard();
    } , 1000);
  }

  isBefore4pm(){
    let today = new Date().getHours();
    if (today < 16) {
      return true;
    } else {
      return false;
    }
  }

  switching2Next(){

    this.isClicked = true;

    

    let kActivit1 = new kActivity();
    kActivit1.trxno = signalrConnection.trxno;
    kActivit1.kioskCode = signalrConnection.kioskCode;
    kActivit1.moduleID = this.moduleid;
    kActivit1.submoduleID = undefined;
    kActivit1.action = this.action;
    kActivit1.startTime = new Date();

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
    
    this.switchingUnitsFrom = 0;

    fundid = this.switchingto;
    appFunc.ASNBFundID.forEach((elem: ASNBFundID) => {
      if(elem.code.toLowerCase() == this.switchingto.toLowerCase()){
        this.receiptfundid = elem.value;
      }
    });

    // const body = 
    // {
    //   "CHANNELTYPE": signalrConnection.channelType,
    //   "REQUESTORIDENTIFICATION": signalrConnection.requestIdentification,
    //   "DEVICEOWNER": signalrConnection.deviceOwner,
    //   "UNITHOLDERID":uhid,
    //   "FIRSTNAME": "",
    //   "IDENTIFICATIONTYPE":ictype,
    //   "IDENTIFICATIONNUMBER":icno,
    //   "FUNDID":fundid,
    //   "AMOUNTAPPLIED":this.switchingamount,
    //   "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    //   "TRANSACTIONTIME": formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
    //   "CUSTOMERICNUMBER":"",
    //   "CUSTOMERNAME":"",
    //   "AGENTCODE":signalrConnection.agentCode,
    //   "BRANCHCODE":signalrConnection.branchCode,
    //   "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
    //   "BANKCUSTPHONENUMBER":"",
    //   "PAYMENTTYPE":"T",
    //   "BANKACCOUNTNUMBER":"",
    //   "BANKBRANCHCODE":"",
    //   "CHEQUENUMBER":"",
    //   "CHEQUEDATE":"",
    //   "GUARDIANID":guardianID,
    //   "GUARDIANICTYPE":guardianICtype,
    //   "GUARDIANICNUMBER":guardianIC,
    //   "POLICYNUMBER":"",
    //   "EPFNUMBER":"",
    //   "SUBPAYMENTTYPE":"",
    //   "EWGATEWAY":"",
    //   "THIRDPARTYINVESTMENT":"",
    //   "THIRDPARTYNAME":"",
    //   "THIRDPARTYICTYPE":"",
    //   "THIRDPARTYICNUMBER":"",
    //   "THIRDPARTYRELATIONSHIP":"",
    //   "REASONFORTRANSFER":"",
    //   "SOURCEOFFUND":"",
    //   "OTHERSOURCEOFFUND":"",
    //   "FUNDERNAME":""
    // }

    // this.serviceService.postProvisionSubscription(body)
    //   .subscribe((result: any) => {


    //     console.log(result);
    //     console.log(result.result.transactionstatus);
    //     console.log(result.result.transactionnumber);

        let txnmode = "";
        if(this.isHistorical){
          txnmode = "A";
        }else{
          txnmode = "U";
        }

        
        //if(result.result.transactionstatus.toString().toLowerCase().includes('successful') && result.result.transactionnumber.toString() != ""){
          const body1 = 
          { 
            "CHANNELTYPE":signalrConnection.channelType,
            "REQUESTORIDENTIFICATION":signalrConnection.requestIdentification,
            "DEVICEOWNER":signalrConnection.deviceOwner,
            "UNITHOLDERID":uhid,
            "FIRSTNAME":firstname,
            "IDENTIFICATIONTYPE":ictype,
            "IDENTIFICATIONNUMBER":icno,
            "FUNDID":this.actualfundid,
            "AMOUNTAPPLIED":this.switchingamount,
            "TRANSACTIONDATE":formatDate(new Date(), 'dd/MM/yyyy', 'en'),
            "TRANSACTIONTIME":formatDate(new Date(), 'HH:mm:ss', 'en').toString(),
            "AGENTCODE":signalrConnection.agentCode,
            "BRANCHCODE":signalrConnection.branchCode,
            "BANKTXNREFERENCENUMBER":signalrConnection.trxno,
            "BANKCUSTPHONENUMBER":"",
            "PAYMENTTYPE":"",
            "BANKACCOUNTNUMBER":"",
            "TOFUNDID":fundid,
            "TXNMODE":txnmode,
            "POLICYNUMBER":"",
            "EPFNUMBER":"",
            "GUARDIANID":guardianID,
            "GUARDIANICTYPE":guardianICtype,
            "GUARDIANICNUMBER":guardianIC,
            "LANGUAGE": selectLang.selectedLang
            }
      
          this.serviceService.postSwitching(body1)
            .subscribe((result1: any) => {
              console.log(result1);
              if(result1.result.transactionstatus.toLowerCase() == 'successful'){
                this.switching2 = false;
                this.switching3 = true;
                this.refno = result1.result.transactionnumber;
                this.feepercentage = result1.result.feepercentage == "" ? 0 : result1.result.feepercentage;
                this.switchingNAVTo = result1.result.tofundprice == "" ? 0 : result1.result.tofundprice;
                this.switchingSST = result1.result.gstamount == "" ? 0 : result1.result.gstamount;
                this.switchingUnitsFrom = result1.result.unitsalloted == "" ? 0 : result1.result.unitsalloted;
                this.switchingUnitsTo = result1.result.tounitsalloted == "" ? 0 : result1.result.tounitsalloted;
                this.initialcharges = result1.result.salescharge == "" ? 0 : result1.result.salescharge;

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

                let module1 = "";
                let module2 = "";
                if(appFunc.isOwn == "major"){
                  module1 = "20"; //out
                  module2 = "22"; //in
                }else if(appFunc.isOwn == "bijak"){
                  module1 = "21"; //out
                  module2 = "23"; //in
                }
                

                const FTBodyOut =
                {
                  "trxNo": signalrConnection.trxno,
                  "kioskCode": signalrConnection.kioskCode,
                  "unitHolderID": result1.result.unitholderid,
                  "firstName": result1.result.firstname,
                  "identificationType": result1.result.identificationtype,
                  "identificationNumber": result1.result.identificationnumber,
                  "fundID": this.actualfundid,
                  "amountApplied": 0 - result1.result.amountapplied,
                  "transactionDate": result1.result.transactiondate,
                  "transactionTime": result1.result.transactiontime,
                  "transactionType": module1,
                  "customerICNumber": "",
                  "customerName": "",
                  "agentCode": result1.result.agentCode,
                  "referenceNo": "",
                  "bankTxnReferenceNumber": result1.result.banktxnreferencenumber,
                  "bankCustPhoneNumber": result1.result.bankcustphonenumber,
                  "paymentType": result1.result.paymenttype,
                  "bankAccountNumber": result1.result.bankaccountnumber,
                  "bankBranchCode": "",
                  "chequeNumber": "",
                  "chequeDate": "",
                  "guardianID": result1.result.guardianid,
                  "guardianicType": result1.result.guardianictype,
                  "guardianicNumber": result1.result.guardianicnumber,
                  "policyNumber": result1.result.policynumber,
                  "epfNumber": result1.result.epfnumber,
                  "subPaymentType": "",
                  "ewgateway": "",
                  "thirdPartyInvestment": "",
                  "thirdPartyName": "",
                  "thirdPartyICNumber": "",
                  "thirdPartyRelationship": "",
                  "reasonForTransfer": "",
                  "sourceOfFund": "",
                  "otherSourceOfFund": "",
                  "funderName": "",
                  "transactionStatus": result1.result.transactionstatus,
                  "transactionNumber": result1.result.transactionnumber,
                  "taxInvoiceNumber": "",
                  "confirmedUnits": "",
                  "unitBalance": "",
                  "operation": "",
                  "remark": "",
                  "creditNoteNumber": "",
                  "rejectCode": result1.result.rejectcode,
                  "rejectReason": result1.result.rejectreason,
                  "itemno": signalrConnection.itemNo,
                  "nav": result1.result.fundprice,
                  "fee": result1.result.salescharge,
                  "sst": result1.result.gstamount
                }

                const FTBodyIn =
                {
                  "trxNo": signalrConnection.trxno,
                  "kioskCode": signalrConnection.kioskCode,
                  "unitHolderID": result1.result.unitholderid,
                  "firstName": result1.result.firstname,
                  "identificationType": result1.result.identificationtype,
                  "identificationNumber": result1.result.identificationnumber,
                  "fundID": fundid,
                  "amountApplied": result1.result.amountapplied,
                  "transactionDate": result1.result.transactiondate,
                  "transactionTime": result1.result.transactiontime,
                  "transactionType": module2,
                  "customerICNumber": "",
                  "customerName": "",
                  "agentCode": result1.result.agentCode,
                  "referenceNo": "",
                  "bankTxnReferenceNumber": result1.result.banktxnreferencenumber,
                  "bankCustPhoneNumber": result1.result.bankcustphonenumber,
                  "paymentType": result1.result.paymenttype,
                  "bankAccountNumber": result1.result.bankaccountnumber,
                  "bankBranchCode": "",
                  "chequeNumber": "",
                  "chequeDate": "",
                  "guardianID": result1.result.guardianid,
                  "guardianicType": result1.result.guardianictype,
                  "guardianicNumber": result1.result.guardianicnumber,
                  "policyNumber": result1.result.policynumber,
                  "epfNumber": result1.result.epfnumber,
                  "subPaymentType": "",
                  "ewgateway": "",
                  "thirdPartyInvestment": "",
                  "thirdPartyName": "",
                  "thirdPartyICNumber": "",
                  "thirdPartyRelationship": "",
                  "reasonForTransfer": "",
                  "sourceOfFund": "",
                  "otherSourceOfFund": "",
                  "funderName": "",
                  "transactionStatus": result1.result.transactionstatus,
                  "transactionNumber": result1.result.transactionnumber,
                  "taxInvoiceNumber": "",
                  "confirmedUnits": "",
                  "unitBalance": "",
                  "operation": "",
                  "remark": "",
                  "creditNoteNumber": "",
                  "rejectCode": result1.result.rejectcode,
                  "rejectReason": result1.result.rejectreason,
                  "itemno": signalrConnection.itemNo,
                  "nav": result1.result.tofundprice,
                  "fee": result1.result.salescharge,
                  "sst": result1.result.gstamount
                }

                this.serviceService.createFundTransaction(FTBodyOut).subscribe(() => {});
                this.serviceService.createFundTransaction(FTBodyIn).subscribe(() => {});
                signalrConnection.itemNo += 1;
                console.log(signalrConnection.itemNo);
                kActivit1.endTime = new Date();
                kActivit1.status = true;
                appFunc.kioskActivity.push(kActivit1);
                this.isClicked = false;
              }
              else{
                this.isClicked = false;
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
                kActivit1.endTime = new Date();
                kActivit1.status = false;
                appFunc.kioskActivity.push(kActivit1);
                this.router.navigate(['errorscreen']);
              }
            });
        // }
        // else{
        //   errorCodes.Ecode = result.result.rejectcode;
        //   errorCodes.Emessage = result.result.rejectreason;
        //   errorCodes.accountName = firstname;
        //   errorCodes.accountNo = uhid;
        //   if(appFunc.isOwn == "major"){
        //     errorCodes.accountType = "Dewasa";
        //   }else if(appFunc.isOwn == "bijak"){
        //     errorCodes.accountType = "Bijak/Remaja";
        //   }
        //   errorCodes.transaction = this.transaction;
        //   kActivit1.endTime = new Date();
        //   kActivit1.status = false; 
        //   appFunc.kioskActivity.push(kActivit1);
        //   this.router.navigate(['errorscreen']);
        // }
    //});
    
  }

  switchingPrint(){
    this.switching3 = false;
    this.Print1_Visible = true;
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
    let switchindetails = "";
    if(selectLang.selectedLang == 'ms'){
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "15"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "16"
      }
      switchindetails = "Penukaran daripada " + this.switchingfrom + " kepada " + this.receiptfundid;
    }else{
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "15"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "16"
      }
      switchindetails = "Switching from " + this.switchingfrom + " to " + this.receiptfundid;
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
      "AMOUNTAPPLIED": this.switchingamount,
      "FUNDID" : this.switchingfrom,
      "TOFUNDID": this.receiptfundid,
      "FUNDPRICE" : this.switchingNAVFrom,
      "TOFUNDPRICE": this.switchingNAVTo,
      "UNITSALLOTED" : this.switchingUnitsFrom,
      "TOUNITSALLOTED": this.switchingUnitsTo,
      "FEEPERCENTAGE" : this.feepercentage,
      "SALESCHARGE" : this.initialcharges,
      "GSTAMOUNT" : this.switchingSST,
      "Language" : selectLang.selectedLang,
      "Signature" : ""
    }

    appFunc.receiptFunction = "GetSwitchTrxPrintout"
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

  switchingEmail(){
    this.switching3 = false;
    this.EmailPage_Visible = true;
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


    let switchindetails = "";
    if(selectLang.selectedLang == 'ms'){
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "15"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "16"
      }
      switchindetails = "Penukaran daripada " + this.switchingfrom + " kepada " + this.receiptfundid;
    }else{
      if(appFunc.isOwn == "major"){
        accountType = "Dewasa";
        module = "15"
      }else if(appFunc.isOwn == "bijak"){
        accountType = "Bijak/Remaja";
        module = "16"
      }
      switchindetails = "Switching from " + this.switchingfrom + " to " + this.receiptfundid;
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
      "AMOUNTAPPLIED": this.switchingamount,
      "FUNDID" : this.switchingfrom,
      "TOFUNDID": this.receiptfundid,
      "FUNDPRICE" : this.switchingNAVFrom,
      "TOFUNDPRICE": this.switchingNAVTo,
      "UNITSALLOTED" : this.switchingUnitsFrom,
      "TOUNITSALLOTED": this.switchingUnitsTo,
      "FEEPERCENTAGE" : this.feepercentage,
      "SALESCHARGE" : this.initialcharges,
      "GSTAMOUNT" : this.switchingSST,
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

    appFunc.receiptFunction = "GetSwitchTrxPrintout"

    
    signalrConnection.connection.invoke('EmailHelpPageAsync', JSON.stringify(appFunc.body), accessToken.token, currentHolder.email, appFunc.receiptFunction, signalrConnection.trxno, module, JSON.stringify(appFunc.emailObj), switchindetails).then((data: any) => {
      
    });

    setTimeout(()=>{   
      this.EmailPage_Visible = false;
      this.getAccountInquiry();
    }, 5000);
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
      reason: ['', Validators.required],
      relationship: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  initializeForm2(){
    this.Form_2 = this.fb.group({
      fundname: ['', Validators.required],
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
          "GUARDIANICNUMBER": currentHolder.identificationnumber,
          "LANGUAGE": selectLang.selectedLang
  
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
            if (currentBijakHolder.rejectcode.toString() == "019"){
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
        "GUARDIANICNUMBER": "",
        "LANGUAGE": selectLang.selectedLang

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
          if (currentHolder.rejectcode.toString() == "019"){
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
