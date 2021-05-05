import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { ServiceService } from '../_shared/service.service';
import { currentHolder } from '../_models/currentUnitHolder';
import { MyKadDetails } from '../_models/myKadDetails';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { formatDate } from '@angular/common';
import { errorCodes } from '../_models/errorCode';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';

@Component({        
  selector: 'app-verifymykad',
  templateUrl: './verifymykad.component.html',
  styleUrls: ['./verifymykad.component.css']
})


  
export class VerifymykadComponent implements OnInit {

  ishardcodeic = signalrConnection.isHardcodedIC;

  @ViewChild('icnumber') icnumber : ElementRef | undefined;

  BTN_End = "";
  BTN_TryAgain = "";

  BTN_VerifyMyKad = "";

  Header_Title =  "";

  RMError1_1 = "";
  RMError1_2 = "";
  
  RMError2_1 = "";
  RMError2_2 = "";

  InsertMyKad_1 = "";
  InsertMyKad_2 = "";
  InsertMyKad_3 = "";
  InsertMyKad_4 = "";

  Loading_1 = "";

  ReadThumbprint_1 = "";
  ReadThumbprint_2 = "";


  
  //HTML Elements Visibility
  RMError1_Visible = false;
  RMError2_Visible = false;
  RMError3_Visible = false;
  loadingVisible = false;
  readThumbprintVisible = false;
  insertMykadVisible = true;
  RMError4_Visible = false;
  RMError5_Visible = false;

  //Initializing SignalR properties
  _conn: any;
  statuses: any;
  myKadData: any;
  cardDetect : any;

  id: any; 


  //Setting CardType
  private CardType = "MyKad";
  private tryCount = 2;
  

  constructor(
    private _router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService){
    }
  
  ngOnInit(): void {

    

    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
    this._conn = signalrConnection.connection;signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Set global variable 'signalrConnection.connection to this._conn.");


    if (signalrConnection.isHardcodedIC != true){
      signalrConnection.connection.invoke('CheckReaderStatus').then((data: boolean) => {
        if(data != true){
          errorCodes.Ecode = "7788";        
          errorCodes.Emessage = "MyKad Reader Error";
          this._router.navigate(['errorscreen']);
        }else{
          if(signalrConnection.kioskType == 'Standee'){
            signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => { 
              if(data != true){
                errorCodes.Ecode = "6688";
                errorCodes.Emessage = "Printer Error";
                this._router.navigate(['errorscreen']);
              }
            });
          }
        }
        // else{
        //   if(signalrConnection.kioskType == 'Standee'){
        //     signalrConnection.connection.invoke('CheckPrinterStatus').then((data: boolean) => {
        //       if(data != true){
        //         errorCodes.Ecode = "6688";
        //         errorCodes.Emessage = "Printer Error";
        //         this._router.navigate(['errorscreen']);
        //       }
        //     });
        //   }
        // }
      });
    }
    

    
  }

  endTransaction() : void {
    this._router.navigate(['language']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Redirect to Language Screen.");
  }
  
  registerAccount() : void {
    this._router.navigate(['accountregistration']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Redirect to Account Registration.");
  }

  tryAgain() : void {
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Scan Thumb";
    kActivit.startTime = new Date();

    //this.DetectMyKad();
    this.RMError1_Visible = false;
    this.RMError2_Visible = false;

    this._conn.invoke('myKadRequest', "ScanThumb").then((data: any) => {
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Invoked myKadRequest to Scan Thumb.");
      //console.log(data);
      //this.DetectMyKad();
      if (data.toUpperCase().includes("MISMATCH")){
        kActivit.endTime = new Date();
        kActivit.status = false;

        appFunc.kioskActivity.push(kActivit);
        this.tryCount = this.tryCount - 1;
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Thumbprint Mismatched. ${this.tryCount} tries remaining.`);
        this.DetectMyKad(data.toString());
      }
      else if(data.toUpperCase().includes("MATCH")){
        kActivit.endTime = new Date();
        kActivit.status = true;

        appFunc.kioskActivity.push(kActivit);
        this.DetectMyKad(data.toString());
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Thumbprint Matched.");
      }
      else if(data.toUpperCase().includes("ERROR")){
        kActivit.endTime = new Date();
        kActivit.status = false;

        appFunc.kioskActivity.push(kActivit);
        errorCodes.Ecode = "0333";
        errorCodes.Emessage = data;
        this._router.navigate(['errorscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Timeout Error.");

      }
      else{
        kActivit.endTime = new Date();
        kActivit.status = false;

        appFunc.kioskActivity.push(kActivit);
        errorCodes.code = "0222";
        errorCodes.message = `Error: ${data}`;
        this._router.navigate(['outofservice']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Redirect to Out Of Service.");
      }
    });
  }

  DetectMyKad(match?: string) {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        let kActivit = new kActivity();
        kActivit.trxno = signalrConnection.trxno;
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 0;
        kActivit.submoduleID = undefined;
        kActivit.action = "User Removed Identification Card.";
        kActivit.startTime = new Date();
        kActivit.endTime = new Date();
        kActivit.status = false;

        appFunc.kioskActivity.push(kActivit);
        console.log("No Identification Card Detected.");
        errorCodes.code = "0168";
        errorCodes.message = "No Identification Card Detected.";
        this._router.navigate(['outofservice']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "MyKad Not Detected. Redirected to Out Of Service Screen.");
      }
      if (match?.toLowerCase().includes('mismatch')){
        if (this.tryCount == 0) {
          this.RMError1_Visible = false;
          this.RMError2_Visible = true;
        }
        else{
          this.RMError1_Visible = true;
        }
      }
      else if (match?.toLowerCase().includes('match')){
        this.loadingVisible = true;
        this.readThumbprintVisible = false;
        this.myKadData = Object.assign(new MyKadDetails(), JSON.parse(match));
        this.bindMyKadData();
        
      }
      
    });
  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Cleared Interval.");
  }

  verify() : void {
    try {
      if(signalrConnection.isHardcodedIC){
        let kActivit0 = new kActivity();
        kActivit0.trxno = signalrConnection.trxno;
        kActivit0.kioskCode = signalrConnection.kioskCode;
        kActivit0.moduleID = 0;
        kActivit0.submoduleID = undefined;
        kActivit0.action = "Verify MyKad (Hardcoded)";
        kActivit0.startTime = new Date();
        kActivit0.endTime = new Date();
        kActivit0.status = true;

        appFunc.kioskActivity.push(kActivit0);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Verify MyKad Hardcoded.");

        this.bindMyKadDataHardcoded();

      }else{

        signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
          console.log(data);
          signalrConnection.cardDetect = data;
          if(signalrConnection.cardDetect != true){
            this.RMError5_Visible = true;
          }else{
            let kActivit0 = new kActivity();
            kActivit0.trxno = signalrConnection.trxno;
            kActivit0.kioskCode = signalrConnection.kioskCode;
            kActivit0.moduleID = 0;
            kActivit0.submoduleID = undefined;
            kActivit0.action = "Verify MyKad";
            kActivit0.startTime = new Date();
            

            this.insertMykadVisible = false;
            this.loadingVisible = true;

            let status = "";

            //this.DetectMyKad();
            //First Invoke
            this._conn.invoke('myKadRequest', this.CardType).then((data: any) => {
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Invoke myKadRequest to read MyKad.");
              console.log(data);
              status = data;
              
              //Not ScanThumb
              if(data.toLowerCase().includes("error")){
                kActivit0.endTime = new Date();
                kActivit0.status = false;

                appFunc.kioskActivity.push(kActivit0);
                console.log(data);
                errorCodes.code = "0168";
                errorCodes.message = data;
                this._router.navigate(['outofservice']);
                signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${data}.`);
              }
              kActivit0.endTime = new Date();
              kActivit0.status = true;

              appFunc.kioskActivity.push(kActivit0);
              //this.DetectMyKad();
              let kActivit = new kActivity();
              kActivit.trxno = signalrConnection.trxno;
              kActivit.kioskCode = signalrConnection.kioskCode;
              kActivit.moduleID = 0;
              kActivit.submoduleID = undefined;
              kActivit.action = "Read MyKad";
              kActivit.startTime = new Date();

              this._conn.invoke('myKadRequest', status).then((data: any) => {
                
                console.log(data);
                //ScanThumb
                //this.DetectMyKad();
                if (data.toUpperCase().includes("SCANTHUMB")){
                  kActivit.endTime = new Date();
                  kActivit.status = true;

                  appFunc.kioskActivity.push(kActivit);

                  let kActivit1 = new kActivity();
                  kActivit1.trxno = signalrConnection.trxno;
                  kActivit1.kioskCode = signalrConnection.kioskCode;
                  kActivit1.moduleID = 0;
                  kActivit1.submoduleID = undefined;
                  kActivit1.action = "Scan Thumb";
                  kActivit1.startTime = new Date();

                  signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Invoke myKadRequest to Scan Thumb.");
                  status = data;
                  this.loadingVisible = false;
                  this.readThumbprintVisible = true;
                  this._conn.invoke('myKadRequest', status).then((data: any) => {
                    status = data;
                    //this.DetectMyKad();
                    console.log(data);
                    if (status.toUpperCase().includes("MISMATCH")){
                      kActivit1.endTime = new Date();
                      kActivit1.status = false;

                      appFunc.kioskActivity.push(kActivit1);
                      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Thumbprint Mismatched. ${this.tryCount} tries remaining.`);
                      this.DetectMyKad(data.toString());
                    }
                    else if(data.toUpperCase().includes("MATCH")){
                      kActivit1.endTime = new Date();
                      kActivit1.status = true;

                      appFunc.kioskActivity.push(kActivit1);  
                      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Thumbprint Matched.");
                      this.DetectMyKad(data.toString());
                    }
                    else if(data.toUpperCase().includes("ERROR")){
                      kActivit1.endTime = new Date();
                      kActivit1.status = false;

                      appFunc.kioskActivity.push(kActivit1);
                      errorCodes.Ecode = "0333";
                      errorCodes.Emessage = data.replace("Error : ", "");
                      this._router.navigate(['errorscreen']);
                      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Timeout Error.");
                    }
                    else{
                      kActivit1.endTime = new Date();
                      kActivit1.status = false;

                      appFunc.kioskActivity.push(kActivit1);
                      errorCodes.code = "0222";
                      errorCodes.message = data;
                      this._router.navigate(['outofservice']);
                      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${data}.`);
                    }
                  }); 
                }
                else{
                  kActivit.endTime = new Date();
                  kActivit.status = false;

                  appFunc.kioskActivity.push(kActivit);
                  errorCodes.code = "0111";
                  errorCodes.message = data;
                  this._router.navigate(['outofservice']);
                  signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${data}.`);
                }    
              });
            });
          }
        });
      }
    }
    catch (e){
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
    
  }

  bindMyKadData(): void {
    try {

      currentMyKadDetails.Name = this.myKadData['Name'];
      currentMyKadDetails.ICNo = this.myKadData['ICNo'];
      currentMyKadDetails.OldICNo = this.myKadData['OldICNo'];
      currentMyKadDetails.DOB = this.myKadData['DOB'];
      currentMyKadDetails.POB =  this.myKadData['POB'];
      currentMyKadDetails.Gender = this.myKadData['Gender'];
      currentMyKadDetails.Citizenship = this.myKadData['Citizenship'];
      currentMyKadDetails.IssueDate = this.myKadData['IssueDate'];
      currentMyKadDetails.Race = this.myKadData['Race'];
      currentMyKadDetails.Religion = this.myKadData['Religion'];
      currentMyKadDetails.Address1 = this.myKadData['Address1'];
      currentMyKadDetails.Address2 = this.myKadData['Address2'];
      currentMyKadDetails.Address3 = this.myKadData['Address3'];
      currentMyKadDetails.PostCode = this.myKadData['PostCode'];
      currentMyKadDetails.City = this.myKadData['City'];
      currentMyKadDetails.State = this.myKadData['State'];
      currentMyKadDetails.Country = this.myKadData['Country'];
      currentMyKadDetails.Address = this.myKadData['Address'];
      currentMyKadDetails.RJ = this.myKadData['RJ'];
      currentMyKadDetails.KT = this.myKadData['KT'];
      currentMyKadDetails.GreenCardNationality = this.myKadData['GreenCardNationality'];
      currentMyKadDetails.GreenCardExpiryDate = this.myKadData['GreenCardExpiryDate'];
      currentMyKadDetails.CardVersion = this.myKadData['CardVersion'];
      currentMyKadDetails.OtherID = this.myKadData['OtherID'];
      currentMyKadDetails.CategoryType = this.myKadData['CategoryType'];

      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Mapped ${currentMyKadDetails.Name}'s MyKad details to Web App Object Class`);
  
      this.getAccountInquiry();
    }
    catch(e) {
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
  }

  bindMyKadDataHardcoded(): void {
    try {

      currentMyKadDetails.Name = "John Smith";
      currentMyKadDetails.ICNo = this.icnumber?.nativeElement.value;
      currentMyKadDetails.OldICNo = "";
      currentMyKadDetails.DOB = new Date("1957-08-31");
      currentMyKadDetails.POB =  "SELANGOR";
      currentMyKadDetails.Gender = "Male";
      currentMyKadDetails.Citizenship = "WARGANEGARA";
      currentMyKadDetails.IssueDate = new Date("2020-01-01");
      currentMyKadDetails.Race = "CINA";
      currentMyKadDetails.Religion = "ISLAM";
      currentMyKadDetails.Address1 = "6 Jln 14/70A";
      currentMyKadDetails.Address2 = "";
      currentMyKadDetails.Address3 = "Sri Hartamas";
      currentMyKadDetails.PostCode = "50480";
      currentMyKadDetails.City = "Kuala Lumpur";
      currentMyKadDetails.State = "W. PERSEKUTUAN(KL)";
      currentMyKadDetails.Country = "Malaysia";
      currentMyKadDetails.Address = "";
      currentMyKadDetails.RJ = "";
      currentMyKadDetails.KT = "";
      currentMyKadDetails.GreenCardNationality = "";
      currentMyKadDetails.GreenCardExpiryDate = new Date("0000-00-00");
      currentMyKadDetails.CardVersion = "";
      currentMyKadDetails.OtherID = "";
      currentMyKadDetails.CategoryType = "W";

      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Mapped ${currentMyKadDetails.Name}'s MyKad details to Web App Object Class`);
  
      this.getAccountInquiry();
    }
    catch(e) {
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    }
  }

  okay(){
    this.RMError5_Visible = false;
  }

  nextToUpdate() {
    this._router.navigate(['updatedetails']);
  }

  getAccountInquiry(): void {
    try{

      
      const body = { 

        "CHANNELTYPE": "ASNB KIOSK",
        "REQUESTORIDENTIFICATION": "TESTFDSSERVER",
        "DEVICEOWNER": "ASNB",
        "UNITHOLDERID": "",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": currentMyKadDetails.CategoryType,
        "IDENTIFICATIONNUMBER": currentMyKadDetails.ICNo,
        "FUNDID": "",
        "INQUIRYCODE": "5",
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
        "BANKTXNREFERENCENUMBER": signalrConnection.trxno,
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

        console.log(currentHolder.occupationcategory);



        if (currentHolder.transactionstatus.toLowerCase().includes('successful')){

          if (!currentHolder.typeclosed.toLowerCase().includes('n')){
            errorCodes.Ecode = "0168";
            errorCodes.Emessage = "Your Account has been closed. Akaun anda telah ditutup.";
            this._router.navigate(['errorscreen']);
          }
          else{
            if(currentHolder.unitholderid != "" || currentHolder.unitholderid != undefined){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Account Found.");

              if (
                (currentHolder.occupationcategory == "" || currentHolder.occupationcategory == undefined) ||
                // (currentHolder.occupation == "" || currentHolder.occupation == undefined) ||
                // (currentHolder.natureofbusiness == "" || currentHolder.natureofbusiness == undefined) ||
                // (currentHolder.occupationsector == "" || currentHolder.occupationsector == undefined) ||
                // (currentHolder.companyname == "" || currentHolder.companyname == undefined) ||
                // (currentHolder.otherinfO8 == "" || currentHolder.otherinfO8 == undefined) ||
                (currentHolder.email == "" || currentHolder.email == undefined) ||
                (currentHolder.cellphonenumber == "" || currentHolder.cellphonenumber == undefined) ||
                (currentHolder.preferredmailmode == "" || currentHolder.preferredmailmode == undefined) ||
                (currentHolder.bankcode == "" || currentHolder.bankcode == undefined) ||
                (currentHolder.accountnumber == "" || currentHolder.accountnumber == undefined) 
              ){
                this.loadingVisible = false;
                this.RMError4_Visible = true;
              }else{
                this._router.navigate(['transactionmenu']);
              }
            }
          }
        }
        else{
          if (currentHolder.rejectreason.includes('not exists')){
            signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "No account found.");

            if (currentMyKadDetails.OldICNo != ""){
              signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Retry with Old IC");

              const body = { 

                "CHANNELTYPE": "ASNB KIOSK",
                "REQUESTORIDENTIFICATION": "TESTFDSSERVER",
                "DEVICEOWNER": "ASNB",
                "UNITHOLDERID": "",
                "FIRSTNAME": "",
                "IDENTIFICATIONTYPE": "OL",
                "IDENTIFICATIONNUMBER": currentMyKadDetails.OldICNo,
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
        
                console.log(currentHolder.transactionstatus);
        
                if (currentHolder.transactionstatus.toLowerCase().includes('successful')){
        
                  if (!currentHolder.typeclosed.toLowerCase().includes('n')){
                    errorCodes.Ecode = "0168";
                    errorCodes.Emessage = "Your Old IC Account has been closed. Akaun anda telah ditutup.";
                    this._router.navigate(['errorscreen']);
                  }
                  else{
                    if(currentHolder.unitholderid != "" || currentHolder.unitholderid != undefined){
                      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "Old IC Account Found, But no Fund.");

                      if (
                        (currentHolder.occupationcategory == "" || currentHolder.occupationcategory == undefined) ||
                        // (currentHolder.occupation == "" || currentHolder.occupation == undefined) ||
                        // (currentHolder.natureofbusiness == "" || currentHolder.natureofbusiness == undefined) ||
                        // (currentHolder.occupationsector == "" || currentHolder.occupationsector == undefined) ||
                        // (currentHolder.companyname == "" || currentHolder.companyname == undefined) ||
                        // (currentHolder.otherinfO8 == "" || currentHolder.otherinfO8 == undefined) ||
                        (currentHolder.email == "" || currentHolder.email == undefined) ||
                        (currentHolder.cellphonenumber == "" || currentHolder.cellphonenumber == undefined) ||
                        (currentHolder.preferredmailmode == "" || currentHolder.preferredmailmode == undefined) ||
                        (currentHolder.bankcode == "" || currentHolder.bankcode == undefined) ||
                        (currentHolder.accountnumber == "" || currentHolder.accountnumber == undefined) 
                      ){
                        this.loadingVisible = false;
                        this.RMError4_Visible = true;
                      }else{
                        this._router.navigate(['transactionmenu']);
                      }
                    }
                  }
        
                  
                }
                else{
                  if (currentHolder.rejectreason.includes('not exists')){
                    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + "No Old IC account found.");
        
                    for (var val of appFunc.modules){
                      if(val.moduleName.toLowerCase().includes('major')){
                        if(val.enable == true){
                          if(this.isInBetween(val.operationStart, val.operationEnd, new Date())){
                            this.loadingVisible = false;
                            this.RMError3_Visible = true;
                          }
                          else{
                            errorCodes.Ecode = currentHolder.rejectcode;
                            errorCodes.Emessage = currentHolder.rejectreason;
                            this._router.navigate(['errorscreen']);
                          }
                        }
                        else{
                          errorCodes.Ecode = currentHolder.rejectcode;
                          errorCodes.Emessage = currentHolder.rejectreason;
                          this._router.navigate(['errorscreen']);
                        }
                      }
                    }
                  }
                  else{
                    errorCodes.Ecode = currentHolder.rejectcode;
                    errorCodes.Emessage = currentHolder.rejectreason;
                    this._router.navigate(['errorscreen']);
                  }
                }
              });
            }
            else{
              for (var val of appFunc.modules){
                if(val.moduleName.toLowerCase().includes('major')){
                  if(val.enable == true){
                    if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                      this.loadingVisible = false;
                      this.RMError3_Visible = true;
                    }
                    else{
                      errorCodes.Ecode = currentHolder.rejectcode;
                      errorCodes.Emessage = currentHolder.rejectreason;
                      this._router.navigate(['errorscreen']);
                    }
                  }
                  else{
                    errorCodes.Ecode = currentHolder.rejectcode;
                    errorCodes.Emessage = currentHolder.rejectreason;
                    this._router.navigate(['errorscreen']);
                  }
                }
              }
            }
          }
          else{
            errorCodes.Ecode = currentHolder.rejectcode;
            errorCodes.Emessage = currentHolder.rejectreason;
            this._router.navigate(['errorscreen']);
          }
        }
      });
    }
    catch (e){
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Verify MyKad]" + ": " + `Redirect to Out Of Service Screen due to ${e}.`);
    } 
  }

  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }
}
