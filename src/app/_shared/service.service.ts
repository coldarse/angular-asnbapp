import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, ReplaySubject, throwError, of as _observableOf, throwError as _observableThrow, of } from 'rxjs';
import { accessToken } from 'src/app/_models/apiToken';
import { UnitHolder }  from '../_models/unitHolder';
import { User } from '../_models/user';
import { catchError, map, retry, mergeMap as _observableMergeMap, delay} from 'rxjs/operators';
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


// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + accessToken.token
//     //Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc25iLmNvbS5teSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiY2E2Nzg2NjgtZDk1Mi03M2ExLTA2OTMtMzlmYjIzNTE4MGI2IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJzdWIiOiIxIiwianRpIjoiODM2NjEzOWItNzQ2NS00ZWEzLWI3ZDktZjhjZWRmOGU0NGY5IiwiaWF0IjoxNjE2ODEzNTczLCJuYmYiOjE2MTY4MTM1NzMsImV4cCI6MTYxNjg5OTk3MywiaXNzIjoiQVNOQiIsImF1ZCI6IkFTTkIifQ.wQ6ZhPuispL6463ErPBG8CHT7FbRThY-SqlUpZmSqAA'
//   })
// }

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
    return throwError(
      'Something bad happened; please try again later.');
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
    return forkJoin([
      response1.pipe(retry(1), catchError(this.handleError)), 
      response2.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response3.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response4.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response5.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response6.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response7.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response8.pipe(delay(3000), retry(1), catchError(this.handleError)), //
      response9.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response10.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response11.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response12.pipe(delay(3000), retry(1), catchError(this.handleError)),
      response13.pipe(delay(3000), retry(1), catchError(this.handleError)),
    ]);
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

  //Post get 5 transaction.
  getReceiptTemplate(body: any)
  {
    body = {
      "Date": "sample string 1",
      "Time": "sample string 2",
      "UNITHOLDERID": "sample string 3",
      "FIRSTNAME": "sample string 4",
      "GRANDTOTALUNITBALANCE": 5.1,
      "GRANDTOTALEPFUNITS": 6.1,
      "GRANDTOTALLOANUNITS": 7.1,
      "GRANDTOTALCERTUNITS": 8.1,
      "GRANDTOTALBLOCKEDUNITS": 9.1,
      "GRANDTOTALPROVISIONALUNITS": 10.1,
      "GRANDTOTALUNITS": 11.1,
      "GRANDTOTALUHHOLDINGS": 12.1,
      "FUNDS": [
        {
          "FUNDID": "sample string 1",
          "UHHOLDINGS": "sample string 2",
          "UNITBALANCE": "sample string 3",
          "EPFUNITS": 4.1,
          "LOANUNITS": 5.1,
          "CERTUNITS": 6.1,
          "BLOCKEDUNITS": 7.1,
          "TOTALUNITS": "sample string 8",
          "TRANSACTIONDETAIL": [
            {
              "TXNSEQNO": 1,
              "TRANSACTIONDATE": "sample string 2",
              "TRANSACTIONCHANNEL": "sample string 3",
              "BRANCHCODE": "sample string 4",
              "TRANSACTIONTYPE": "sample string 5",
              "TRANSACTIONAMOUNT": 6.1,
              "NAV": 7.1,
              "SALESCHARGE": 8.1,
              "GSTAMOUNT": 9.1,
              "NETAMOUNT": 10.1,
              "CONFIRMEDUNITS": 11.1,
              "UNITBALANCE": "sample string 12"
            },
            {
              "TXNSEQNO": 1,
              "TRANSACTIONDATE": "sample string 2",
              "TRANSACTIONCHANNEL": "sample string 3",
              "BRANCHCODE": "sample string 4",
              "TRANSACTIONTYPE": "sample string 5",
              "TRANSACTIONAMOUNT": 6.1,
              "NAV": 7.1,
              "SALESCHARGE": 8.1,
              "GSTAMOUNT": 9.1,
              "NETAMOUNT": 10.1,
              "CONFIRMEDUNITS": 11.1,
              "UNITBALANCE": "sample string 12"
            }
          ]
        },
        {
          "FUNDID": "sample string 1",
          "UHHOLDINGS": "sample string 2",
          "UNITBALANCE": "sample string 3",
          "EPFUNITS": 4.1,
          "LOANUNITS": 5.1,
          "CERTUNITS": 6.1,
          "BLOCKEDUNITS": 7.1,
          "TOTALUNITS": "sample string 8",
          "TRANSACTIONDETAIL": [
            {
              "TXNSEQNO": 1,
              "TRANSACTIONDATE": "sample string 2",
              "TRANSACTIONCHANNEL": "sample string 3",
              "BRANCHCODE": "sample string 4",
              "TRANSACTIONTYPE": "sample string 5",
              "TRANSACTIONAMOUNT": 6.1,
              "NAV": 7.1,
              "SALESCHARGE": 8.1,
              "GSTAMOUNT": 9.1,
              "NETAMOUNT": 10.1,
              "CONFIRMEDUNITS": 11.1,
              "UNITBALANCE": "sample string 12"
            },
            {
              "TXNSEQNO": 1,
              "TRANSACTIONDATE": "sample string 2",
              "TRANSACTIONCHANNEL": "sample string 3",
              "BRANCHCODE": "sample string 4",
              "TRANSACTIONTYPE": "sample string 5",
              "TRANSACTIONAMOUNT": 6.1,
              "NAV": 7.1,
              "SALESCHARGE": 8.1,
              "GSTAMOUNT": 9.1,
              "NETAMOUNT": 10.1,
              "CONFIRMEDUNITS": 11.1,
              "UNITBALANCE": "sample string 12"
            }
          ]
        }
      ]
    }

    let result =  this.http.post(
      this.receipturl + "ssrs/GetStatementPrintout",
      body,  { responseType: 'arraybuffer' }
    ).toPromise();
    
    return result;
  }

  // Sam Testing Purpose
  // getToken()
  // {
  //   const body = 
  //   {
  //     "username": "admin",
  //     "password": "123qwe"
  //   };

  //   return this.http.post(this.url + 
  //     "TokenAuth/Authenticate",
  //     body)
  //     .pipe(
  //       map((response: any) => {
  //         // console.log(response);
  //         signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `Authenticate Response: ${response}.`);
  //       }),
  //       retry(1),       
  //       catchError(this.handleError),     
  //     );    
  // }

  postAccountRegistration(body: any | undefined): Observable<AccountReg>
  {
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `RegWithoutMinInvestment Request: ${body}.`);
    return this.http.post(
      this.url + "services/app/OpenAPI/RegWithoutMinInvestment",
      body,
      accessToken.httpOptions
    ).pipe(retry(1), _observableMergeMap((response: any) => 
    {
      let result = this.processAccountReg(response);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `RegWithoutMinInvestment Response: ${result}.`);
      return result;
    }));
  }

  protected processAccountReg(response: any): Observable<AccountReg> {
    const status = response.success;
    if (status) {
        let result200: any = null;
        result200 = UnitHolder.fromJS(response);
        return _observableOf(result200);
    } else {
        return _observableOf(status);
    }
  }
  

  getAccountInquiry(body: any | undefined): Observable<UnitHolder>
  {
    let kActivit = new kActivity();
    kActivit.trxno = "";
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









