import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { currentMyKidDetails } from '../_models/currentMyKidDetails';
import { currentHolder } from '../_models/currentUnitHolder';
import { ServiceService } from '../_shared/service.service';
import { currentBijakHolder } from '../_models/currentBijakUnitHolder';

@Component({
  selector: 'app-updatedetails',
  templateUrl: './updatedetails.component.html',
  styleUrls: ['./updatedetails.component.css']
})
export class UpdatedetailsComponent implements OnInit {

  BTN_Cancel = "";
  BTN_MainMenu = "";

  BTN_Next = "";

  BTN_No = "";
  BTN_Yes = "";

  BTN_Print = "";
  BTN_Email = "";

  UD1_Visible = true;
  UDForm_Visible = false;
  UDBForm_Visible = false;
  UDConfirm_Visible = false;
  UDSuccess_Visible = false;

  UDBijak_Visible = false;

  UD_Print1Visible = false;
  UD_Print2Visible = false;
  UD_EmailVisible = false;

  checkedXEmail : boolean = false;
  checkedXTelephone : boolean = false;
  checkedMyKadAddress : boolean = true;

  ARAddress1_disabled : boolean = true;
  ARAddress2_disabled : boolean = true;
  ARPostcode_disabled : boolean = true;
  ARCity_disabled : boolean = true;
  ARState_disabled : boolean = true;

  noAhli = "";
  namaAhli = "";
  noAhliBijak = "";
  namaAhliBijak = "";

  Header_Title = "";

  UD1_1 = "";
  UD1_2 = "";
  UD1_3 = "";


  UDConfirm_1 = "";
  UDConfirm_2 = "";
  UDConfirm_3 = "";

  UDSuccess_1 = "";

  UDPrint1_1 = "";
  UDPrint1_2 = "";

  UDPrint2_1 = "";

  UDEmail_1 = "";
  UDEmail_2 = "";

  AR1_Value = "";
  AR2_Value = "";
  AR3_Value = "";
  AR4_Value = "";
  AR5_Value = "";

  emailValue = "";
  
  ARAddress1_Value = "";
  ARAddress2_Value = "";
  ARPostcode_Value = "";
  ARCity_Value = "";
  ARState_Value = "";

  AR6_Value = "";
  AR7_Value = "";
  AR8_Value = "";
  AR9_Value = "";
  AR10_Value = "";
  AR11_Value = "";

  FL_1  : string = "";
  FL_2  : string = "";
  FL_3  : string = "";
  FL_4  : string = "";
  FL_5  : string = "";
  FL_6  : string = "";
  FL_7  : string = "";
  FL_8  : string = "";
  FL_9  : string = "";
  FL_10 : string = "";
  FL_11 : string = "";
  FL_12 : string = "";
  FL_13 : string = "";
  FL_14 : string = "";
  FL_15 : string = "";
  FL_16 : string = "";
  FL_17 : string = "";
  FL_18 : string = "";
  FL_19 : string = "";
  FL_20 : string = "";
  FL_21 : string = "";
  FL_22 : string = "";
  FL_23 : string = "";
  FL_24 : string = "";
  FL_25 : string = "";
  FL_26 : string = "";
  FL_27 : string = "";
  FL_28 : string = "";
  FL_29 : string = "";
  FL_30 : string = "";
  FL_31 : string = "";
  FL_32 : string = "";
  FL_33 : string = "";
  FL_34 : string = "";
  FL_35 : string = "";
  FL_36 : string = "";
  FL_37 : string = "";
  FL_38 : string = "";

  FLB_1 : string = "";
  FLB_2 : string = "";
  FLB_3 : string = "";
  FLB_4 : string = "";
  FLB_5 : string = "";
  FLB_6 : string = "";
  FLB_7 : string = "";
  FLB_8 : string = "";
  FLB_9 : string = "";

  mDetails : any = currentHolder.minordetail;

  AR_Form: any;
  id: any; 

  constructor(private _router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private serviceService : ServiceService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);

    this.noAhli = currentHolder.unitholderid;
    this.namaAhli = currentHolder.firstname;

    if(currentHolder.totalminoraccount != "0"){
      this.UDBijak_Visible = true;
    }
    else{
      this.UDBijak_Visible = false;
    }

    this.id = setInterval(() => {
      this.DetectMyKad();
    }, 1000);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Set 1 second interval to detect MyKad.");
  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Cleared Interval.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
        this._router.navigate(['feedbackscreen']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }

  

  updateDetails1Cancel(){
    this._router.navigate(['feedbackscreen']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Redirect to Feedback Screen.");
  }

  updateDetails1MainMenu(){
    this._router.navigate(['transactionmenu']);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Redirect to Transaction Menu.");
  }

  UpdateMainAccount(){
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Selected Update Main Account.");
  }

  UpdateMinor(selectedMinorDetails: any) {
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
       
     });

     signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + `Selected Minor Account Balance. ${currentBijakHolder.firstname}, ${currentBijakHolder.identificationnumber}, ${currentBijakHolder.unitholderid}`);
  }

  noEmailCheck() {
    if (this.AR_Form.controls.noemail.value == false){
      this.AR_Form.controls.email.disable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Checked No Email.");
    }
    else{
      this.AR_Form.controls.email.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Unchecked No Email.");
    }
  }


  noTelephoneCheck() {
    if (this.AR_Form.controls.notelephone.value == false){
      this.AR_Form.controls.telephone.disable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Checked No Telephone.");
    }
    else{
      this.AR_Form.controls.telephone.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Unchecked No Telephone.");
    }
  }

  myKadAddress() {
    if (this.AR_Form.controls.mykadaddress.value == false){
      this.AR_Form.controls.address1.disable();
      this.AR_Form.controls.address2.disable();
      this.AR_Form.controls.postcode.disable();
      this.AR_Form.controls.city.disable();
      this.AR_Form.controls.state.disable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Checked MyKad Address.");
    }
    else{
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Unhecked MyKad Address.");
    }
  }


  majorUpdateBack(){
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Back.");
  }

  majorUpdateCancel(){
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Cancel.");
  }

  majorUpdateNext(){
    let x = 0
    Object.keys(this.AR_Form.controls).forEach(key => {
      if(this.AR_Form.controls[key].hasError('required')){
        x += 1;
      }
    })
    if (x > 0){
      console.log("Error");
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + `Major Form: ${x} field(s) empty.`);
    }
    else{
      this.AR_Form.controls.fullname.enable();
      this.AR_Form.controls.identificationcardno.enable();
      this.AR_Form.controls.dob.enable();
      this.AR_Form.controls.race.enable();
      this.AR_Form.controls.religion.enable();
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      console.log(this.AR_Form.value);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Major Update Submit.");
    }
  }

  bijakUpdateBack() {
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Cancel.");
  }

  bijakUpdateCancel(){
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Cancel.");
  }
  
  bijakUpdateNext(){
    let x = 0
    Object.keys(this.AR_Form.controls).forEach(key => {
      if(this.AR_Form.controls[key].hasError('required')){
        x += 1;
      }
    })
    if (x > 0){
      console.log("Error");
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + `Bijak Form: ${x} field(s) empty.`);
    }
    else{
      this.AR_Form.controls.fullname.enable();
      this.AR_Form.controls.identificationcardno.enable();
      this.AR_Form.controls.dob.enable();
      this.AR_Form.controls.race.enable();
      this.AR_Form.controls.religion.enable();
      this.AR_Form.controls.g_memberid.enable();
      this.AR_Form.controls.g_fullname.enable();
      this.AR_Form.controls.g_identificationnumber.enable();
      this.AR_Form.controls.g_dob.enable();
      this.AR_Form.controls.g_race.enable();
      this.AR_Form.controls.g_religion.enable();
      this.AR_Form.controls.address1.enable();
      this.AR_Form.controls.address2.enable();
      this.AR_Form.controls.postcode.enable();
      this.AR_Form.controls.city.enable();
      this.AR_Form.controls.state.enable();
      console.log(this.AR_Form.value);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Clicked Bijak Update Submit.");
    }
  }

  initializeForm(acctType: string)  {
    if (acctType == 'major'){
      this.AR_Form = this.fb.group(
        {
          salutation: ['Datuk'],
          fullname: [{value: currentMyKadDetails.Name, disabled: true}],
          identificationcardno: [{value: currentMyKadDetails.ICNo, disabled: true}],
          dob: [{value: formatDate(currentMyKadDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
          race: [{value: currentMyKadDetails.Race, disabled: true}],
          religion: [{value: currentMyKadDetails.Religion, disabled: true}],
  
          address1 : [{value: currentMyKadDetails.Address1 + currentMyKadDetails.Address2, disabled: true}],
          address2 : [{value: currentMyKadDetails.Address3, disabled: true}],
          postcode : [{value: currentMyKadDetails.PostCode, disabled: true}],
          city : [{value: currentMyKadDetails.City, disabled: true}],
          state : [{value: currentMyKadDetails.State, disabled: true}],
          mykadaddress: [true],
  
          homenumber : ['', Validators.required],
          // telephone: ['', Validators.required],
          telephone: new FormControl('', Validators.required),
          notelephone: [false],
  
          email: ['', Validators.required],
          noemail: [false],
          deliverystate: ['Sila Pilih Satu'],
  
          bankname: ['Sila Pilih Satu'],
          bankaccount: ['', Validators.required],
  
          jobcategory: ['Sila Pilih Satu'],
          jobname: ['Sila Pilih Satu'],
          natureofjob: ['Sila Pilih Satu'],
          jobsector: ['Sila Pilih Satu'],
          monthlyincome: ['Sila Pilih Satu'],
          companyname: ['', Validators.required],
  
          fatca: ['No'],
          pep: ['No'],
          news: ['No'],
          crs: ['No'],
      });
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Initialized Major Form")
    }
    else if (acctType == 'minor'){
      this.AR_Form = this.fb.group(
        {
          salutation: ['Datuk'],
          fullname: [{value: currentMyKidDetails.Name, disabled: true}],
          identificationcardno: [{value: currentMyKidDetails.ICNo, disabled: true}],
          dob: [{value: formatDate(currentMyKidDetails.DOB, 'dd MMM yyyy', 'en'), disabled: true}],
          race: [{value: currentMyKidDetails.FathersRace, disabled: true}],
          religion: [{value: currentMyKidDetails.FathersReligion, disabled: true}],
  
          g_memberid: [{value: currentHolder.unitholderid, disabled: true}],
          g_salution: [{value: 'Datuk', disabled: false}],
          g_fullname: [{value: currentMyKadDetails.Name, disabled: true}],
          g_identificationnumber: [{value: currentMyKadDetails.ICNo, disabled: true}],
          g_dob: [{value: currentMyKadDetails.DOB, disabled: true}],
          g_race: [{value: currentMyKadDetails.Race, disabled: true}],
          g_religion: [{value: currentMyKadDetails.Religion, disabled: true}],
          g_relation: [{value: 'Sila Pilih Satu', disabled: false}],
  
          address1 : [{value: currentMyKidDetails.Address1 + currentMyKidDetails.Address2, disabled: true}],
          address2 : [{value: currentMyKidDetails.Address3, disabled: true}],
          postcode : [{value: currentMyKidDetails.PostCode, disabled: true}],
          city : [{value: currentMyKidDetails.City, disabled: true}],
          state : [{value: currentMyKidDetails.State, disabled: true}],
          mykadaddress: [true],
  
          homenumber : ['', Validators.required],
          telephone: ['', Validators.required],
          notelephone: [false],
  
          email: ['', Validators.required],
          noemail: [false],
          deliverystate: ['Sila Pilih Satu'],
  
          bankname: ['Sila Pilih Satu'],
          bankaccount: ['', Validators.required],
  
          jobcategory: ['Sila Pilih Satu'],
          jobname: ['Sila Pilih Satu'],
          natureofjob: ['Sila Pilih Satu'],
          jobsector: ['Sila Pilih Satu'],
          monthlyincome: ['Sila Pilih Satu'],
          companyname: ['', Validators.required],
  
          fatca: ['No'],
          pep: ['No'],
          news: ['No'],
          crs: ['No'],

      });
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Update Details]" + ": " + "Initialized Bijak Form")
    }
    
  }  

}
