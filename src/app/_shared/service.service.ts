import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, ReplaySubject, throwError, of as _observableOf, throwError as _observableThrow, of } from 'rxjs';
import { accessToken } from 'src/app/_models/apiToken';
import { UnitHolder }  from '../_models/unitHolder';
import { User } from '../_models/user';
import { catchError, map, retry, mergeMap as _observableMergeMap, delay, timeout} from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {formatDate} from '@angular/common';
import { currentMyKadDetails } from '../_models/currentMyKadDetails';
import { AccountReg } from '../_models/accountRegistration';
import { errorCodes } from '../_models/errorCode';
import { Router } from '@angular/router';
import { signalrConnection } from '../_models/signalr';
import { forkJoin } from 'rxjs';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { AppConfiguration } from '../config/app-configuration';


@Injectable({
  providedIn: 'root'
})


export class ServiceService {
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  //url = 'https://aldansupport.com/ASNBCore/api/'; // Using Aldan Support Swagger
  url: any; // Using Alibaba Development Swagger
  receipturl: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private appConfig: AppConfiguration
    ) {
        this.url = appConfig.AldanDevURL;
        this.receipturl = appConfig.AldanReceiptURL;
    }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `An error occured: ${error.error.message}.`);
    } 
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `Backend returned code: ${error.status}, body was: ${error.error}.`);
    }
    // Return an observable with a user-facing error message.
    // return throwError(
    //   'Something bad happened; please try again later.');
    return throwError(
      error);
  }

  //Get DropDown in Account Registration
  getAllDropDown() 
  {   
    const response1 = this.http.get(this.url + 'services/app/PersonTitle/GetAll?MaxResultCount=100&Sorting=id', accessToken.httpOptions); //
    const response2 = this.http.get(this.url + "services/app/City/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response3 = this.http.get(this.url + "services/app/UnitHolderSalary/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response4 = this.http.get(this.url + "services/app/StateCode/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response5 = this.http.get(this.url + "services/app/NatureBusiness/GetAll?MaxResultCount=100&Sorting=id", accessToken.httpOptions);  //
    const response6 = this.http.get(this.url + "services/app/OccupationSector/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response7 = this.http.get(this.url + "services/app/OccupationCategory/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response8 = this.http.get(this.url + "services/app/Religion/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response9 = this.http.get(this.url + 'services/app/UnitHolderEthnic/GetAll?MaxResultCount=100&Sorting=id', accessToken.httpOptions); //
    const response10 = this.http.get(this.url + "services/app/PreferredDelivery/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response11 = this.http.get(this.url + "services/app/BankName/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); 
    const response12 = this.http.get(this.url + "services/app/OccupationName/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions);
    const response13 = this.http.get(this.url + "services/app/FamilyRelationship/GetAll?MaxResultCount=100&Sorting=id",accessToken.httpOptions); //
    const response14 = this.http.get(this.url + "services/app/SecurityQuestions/GetAll?MaxResultCount=100&Sorting=id", accessToken.httpOptions);
    const response15 = this.http.get(this.url + "services/app/FundSource/GetAll?MaxResultCount=100&Sorting=id", accessToken.httpOptions);
    const response16 = this.http.get(this.url + "services/app/ASNBFundID/GetAll?MaxResultCount=100&Sorting=id", accessToken.httpOptions);
    const response17 = this.http.get(this.url + "services/app/ThirdPartyRelationship/GetAll?MaxResultCount=100&Sorting=id", accessToken.httpOptions);
    const response18 = this.http.get(this.url + "services/app/ReasonTransfer/GetAll?MaxResultCount=100&Sorting=id", accessToken.httpOptions);
    const response19 = this.http.get(this.url + "services/app/ICType/GetAll?MaxResultCount=100&Sorting=id", accessToken.httpOptions);
    return forkJoin([
      response1.pipe(retry(1), catchError(this.handleError)), 
      response2.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response3.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response4.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response5.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response6.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response7.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response8.pipe(delay(3000), retry(1), catchError(this.handleError)), 
      response9.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response10.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response11.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response12.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response13.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response14.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response15.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response16.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response17.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response18.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response19.pipe(delay(3000), retry(1), catchError(this.handleError)),
    ]);
  }

  //Add kiosk activity to DB
  postKioskActivity(body: any){
    return this.http.post(
      this.url + "services/app/KioskActivity/insertKioskActivity",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }


  //Add feedback to DB
  postFeedbackSubmit(body: any){
    return this.http.post(
      this.url + "services/app/Feedback/Insert",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //getTrxNo
  genTrxNo(kioskcode: string, trxtype: string){
    return this.http.get(
      this.url + `services/app/Sequence/generateTrxNo?KioskCode=${kioskcode}&TrxType=${trxtype}`,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //getScreenSaver
  getScreenSaver(kioskcode: string){
    return this.http.get(
      this.url + `services/app/KioskAgent/GetScreenSaver1?KioskCode=${kioskcode}`,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //getKioskModules
  getKioskModules(kioskcode: string){
    return this.http.get(
      this.url + `services/app/KioskModuleOperation/GetKioskModuleOperationSummaries?KioskCode=${kioskcode}`,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post get 5 transaction.
  postFiveTransactions(body: any)
  {
    return this.http.post(
      this.url + "services/app/OpenAPI/CashTransaction",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post get eligible funds
  postEligibleFunds(body: any)
  {
    return this.http.post(
      this.url + "services/app/OpenAPI/EligibleFunds",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post Provision Subscription
  postProvisionSubscription(body: any)
  {
    return this.http.post(
      this.url + "services/app/OpenAPI/ProvisionalSubscription",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post Settlement
  postSettlement(body: any)
  {
    return this.http.post(
      this.url + "services/app/OpenAPI/Settlement",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post Switching
  postSwitching(body: any)
  {
    return this.http.post(
      this.url + "services/app/OpenAPI/Switch",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post Transfer
  postTransfer(body: any)
  {
    return this.http.post(
      this.url + "services/app/OpenAPI/Transfer",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post Redemption
  postRedemption(body: any)
  {
    return this.http.post(
      this.url + "services/app/OpenAPI/Redemption",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Post AMLA
  postAMLA(body: any)
  {
    return this.http.post(
      this.url + "services/app/AMLA/OnlineScan",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Get Dividend Statement
  dividendStatement(body: any){
    return this.http.post(
      this.url + "services/app/OpenAPI/DividendStatement",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Update CIF
  updateDetails(body: any)
  {
    return this.http.put(
      this.url + "services/app/OpenAPI/UpdateDetails",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }



  //UH Verification
  unitHolderVerification(body: any)
  {
    return this.http.post(
      this.url + "services/app/PortalAPI/UHVerification",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Create CustCreditCardInfo
  createCustCreditCardInfo(body: any)
  {
    return this.http.post(
      this.url + "services/app/CustCreditCardInfo/Create",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //Create FundTransaction
  createFundTransaction(body: any)
  {
    return this.http.post(
      this.url + "services/app/FundTransaction/Create",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }


  //TAC Verification
  tacVerification(body: any)
  {
    return this.http.post(
      this.url + "services/app/PortalAPI/TacVerification",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //UH Registration
  unitHolderRegistration(body: any)
  {
    return this.http.post(
      this.url + "services/app/PortalAPI/Registration",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //UH Username Verification
  unitHolderUsernameVerification(body: any)
  {
    return this.http.post(
      this.url + "services/app/PortalAPI/UsernameVerification",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //UH Credential Verification
  unitHolderCredentialVerification(body: any)
  {
    return this.http.post(
      this.url + "services/app/PortalAPI/CredentialVerification",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  //UH Change Password
  unitHolderChangePassword(body: any)
  {
    return this.http.post(
      this.url + "services/app/PortalAPI/ChgPwd",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }


  //Account Registration (Bijak and Major)
  postAccountRegistration(body: any)
  {
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `RegWithoutMinInvestment Request: ${body}.`);
    return this.http.post(
      this.url + "services/app/OpenAPI/RegWithoutMinInvestment",
      body,
      accessToken.httpOptions
    );
  }

  postAccountRegistrationWithInvestment(body: any)
  {
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `RegWithMinInvestment Request: ${body}.`);
    return this.http.post(
      this.url + "services/app/OpenAPI/RegWithMinInvestment",
      body,
      accessToken.httpOptions
    );
  }


  getNewAccountInquiry(body: any){
    return this.http.post(
      this.url + "services/app/OpenAPI/BalanceInquiry",
      body,
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  
  //Account Enquiry (Bijak and Major)
  getAccountInquiry(body: any | undefined): Observable<UnitHolder>
  {
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Call Account Inquiry API (OpenAPI)";
    kActivit.startTime = new Date();
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `BalanceInquiry Request: ${JSON.stringify(body)}.`);
      return this.http.post(
        this.url + "services/app/OpenAPI/BalanceInquiry",
        body,
        accessToken.httpOptions)
        .pipe(retry(3), _observableMergeMap((response: any) => 
        {
          let result = this.processUnitHolder(response);
          kActivit.endTime = new Date();
          if (response.success){
            kActivit.status = true;
          }
          else{
            kActivit.status = false;
          }
          appFunc.kioskActivity.push(kActivit);
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `BalanceInquiry Response: ${JSON.stringify(result)}.`);
          return result;
        }));
  }

  protected processUnitHolder(response: any): Observable<UnitHolder> {
    const status = response.success;
    if (status) {
        let result200: any = null;
        result200 = UnitHolder.fromJS(response);
        return _observableOf(result200);
    } else {
        return _observableOf(status);
    }
  }

  
  
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
      return _observableThrow(result);
  else
      return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
      if (!blob) {
          observer.next("");
          observer.complete();
      } else {
          let reader = new FileReader(); 
          reader.onload = event => { 
              observer.next((<any>event.target).result);
              observer.complete();
          };
          reader.readAsText(blob); 
      }
  });
}

export class ApiException extends Error {
  message: string;
  status: number; 
  response: string; 
  headers: { [key: string]: any; };
  result: any; 

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
      return obj.isApiException === true;
  }
}









