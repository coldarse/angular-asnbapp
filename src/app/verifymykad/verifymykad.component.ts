import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { ServiceService } from '../_shared/service.service';
import { currentHolder } from '../_models/currentUnitHolder';
import { MyKadDetails } from '../_models/myKadDetails';
import { Observable, of as _observableOf } from 'rxjs';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { formatDate } from '@angular/common';
import { errorCodes } from '../_models/errorCode';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';

@Component({        
  selector: 'app-verifymykad',
  templateUrl: './verifymykad.component.html',
  styleUrls: ['./verifymykad.component.css']
})


  
export class VerifymykadComponent implements OnInit {

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

  //Initializing SignalR properties
  _conn: any;
  statuses: any;
  myKadData: any;
  cardDetect : any;


  //Setting CardType
  private CardType = "MyKad";
  private tryCount = 2;
  

  constructor(
    private _router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService){
    }
  
  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
    this._conn = signalrConnection.connection;
  }


  endTransaction() : void {
    this._router.navigate(['language']);
  }
  

  registerAccount() : void {
    this._router.navigate(['accountregistration']);
  }

  tryAgain() : void {
    this.RMError1_Visible = false;
    this.RMError2_Visible = false;

    this._conn.invoke('myKadRequest', "ScanThumb").then((data: any) => {
      //console.log(data);
      if (data.toUpperCase().includes("MISMATCH")){
        this.tryCount = this.tryCount - 1;
        if (this.tryCount == 0) {
          this.RMError1_Visible = false;
          this.RMError2_Visible = true;
        }
        else{
          this.RMError1_Visible = true;
        }
      }
      else if(data.toUpperCase().includes("MATCH")){
        this.loadingVisible = true;
        this.readThumbprintVisible = false;
        this.myKadData = JSON.stringify(data);
        this.bindMyKadData();
        //this._router.navigate(['transactionmenu']);
        
      }
      else{
        errorCodes.code = "0222";
        errorCodes.message = "Open CBM Failed.";
        this._router.navigate(['outofservice']);
      }
    });
  }


  DetectMyKad() {
    // this._conn.invoke('IsCardDetected').then((data: boolean) => {
    //   console.log(data);
    //   if (data == true){
    //     this.verify();
    //   }
    // });
    this.verify();
  }

  verify() : void {
    try {
      this.insertMykadVisible = false;
      this.loadingVisible = true;

      var status = "";

      //First Invoke
      this._conn.invoke('myKadRequest', this.CardType).then((data: any) => {
        console.log(data);
        status = data;
        //Not ScanThumb
        this._conn.invoke('myKadRequest', status).then((data: any) => {
          console.log(data);
          //ScanThumb
          if (data.toUpperCase().includes("SCANTHUMB")){
            status = data;
            this.loadingVisible = false;
            this.readThumbprintVisible = true;
            this._conn.invoke('myKadRequest', status).then((data: any) => {
              status = data;
              
              console.log(data);
              if (status.toUpperCase().includes("MISMATCH")){
                this.RMError1_Visible = true;
              }
              else if(data.toUpperCase().includes("MATCH")){
                this.loadingVisible = true;
                this.readThumbprintVisible = false;
                this.myKadData = Object.assign(new MyKadDetails(), JSON.parse(data));
                this.bindMyKadData();
                //this._router.navigate(['transactionmenu']);
              }
              else{
                errorCodes.code = "0222";
                errorCodes.message = "Open CBM Failed.";
                this._router.navigate(['outofservice']);
              }
            }); 
          }
          else{
            errorCodes.code = "0111";
            errorCodes.message = data;
            this._router.navigate(['outofservice']);
          }    
        });
      });
    }
    catch (e){
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
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
  
      this.getAccountInquiry();
    }
    catch(e) {
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
    }
  }

 //660322107550

  getAccountInquiry(): void {
    try{

      const body = { 

        "CHANNELTYPE": "IB",
        "REQUESTORIDENTIFICATION": "RHBNOW",
        "DEVICEOWNER": "RHB",
        "UNITHOLDERID": "",
        "FIRSTNAME": "",
        "IDENTIFICATIONTYPE": "W",
        "IDENTIFICATIONNUMBER": currentMyKadDetails.ICNo,
        "FUNDID": "",
        "INQUIRYCODE": "4",
        "TRANSACTIONDATE": formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        "TRANSACTIONTIME": formatDate(new Date(), 'HH:MM:ss', 'en'),
        "BANKTXNREFERENCENUMBER": formatDate(new Date(), 'ddMMyyyy', 'en'),
        "BANKCUSTPHONENUMBER": "",
        "FILTRATIONFLAG": "",
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
        currentHolder.typeclosed = result.typeclosed;
        currentHolder.participateinasnbmkt = result.participateinasnbmkt;
        currentHolder.funddetail = result.funddetail;
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
        currentHolder.agentcode = result.agentcode;
        currentHolder.branchcode = result.branchcode;
        currentHolder.lastupdatedate = result.lastupdatedate;
        currentHolder.transactionchannel = result.transactionchannel;
        currentHolder.transactionstatus = result.transactionstatus;
        currentHolder.rejectcode = result.rejectcode;
        currentHolder.rejectreason = result.rejectreason;
        //Scenario 1: Unit Holder Not Exist
        if (currentHolder.rejectreason.includes('not exists')){
          this.RMError3_Visible = true;
        }
        //Scenario 2: FundID = ""
        else if (currentHolder.funddetail.length == 0 && currentHolder.unitholderid != undefined){
          this._router.navigate(['transactionmenu'])
        }
        //Scenario 3: FundID & UnitHolderID exists
        else if (currentHolder.funddetail.length > 0 && currentHolder.unitholderid != undefined){
          this._router.navigate(['transactionmenu'])
        }
  
      })
    }
    catch (e){
      console.log(e);
      errorCodes.code = "0168";
      errorCodes.message = e;
      this._router.navigate(['outofservice']);
    }
  }

  

}
