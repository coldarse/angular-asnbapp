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
  url = 'https://aldansupport.com/ASNBCore/api/';
  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

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

  getCities()
  {
    return this.http.get(
      this.url + "services/app/City/GetAll",
      accessToken.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  getToken()
  {
    const body = 
    {
      "username": "admin",
      "password": "123qwe"
    };

    return this.http.post(this.url + 
      "TokenAuth/Authenticate",
      body)
      .pipe(
        map((response: any) => {
          // console.log(response);
          signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `Authenticate Response: ${response}.`);
        }),
        retry(1),       
        catchError(this.handleError),     
      );    
  }

  postAccountRegistration(body: any | undefined): Observable<AccountReg>
  {
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `RegWithoutMinInvestment Request: ${body}.`);
    return this.http.post(
      this.url + "services/app/OpenAPI/RegWithoutMinInvestment",
      body,
      accessToken.httpOptions
    ).pipe(_observableMergeMap((response: any) => 
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
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Service Service]" + ": " + `BalanceInquiry Request: ${JSON.stringify(body)}.`);
      return this.http.post(
        this.url + "services/app/OpenAPI/BalanceInquiry",
        body,
        accessToken.httpOptions)
        .pipe(_observableMergeMap((response: any) => 
        {
          let result = this.processUnitHolder(response);
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

  //Get DropDown in Account Registration
  getTitleSalutation() 
  { 
    // return this.http.get(
    //   this.url + 'services/app/PersonTitle/GetAll',
    //   accessToken.httpOptions).pipe(
    //   retry(1),       
    //   catchError(this.handleError),     
    // );         

    const response1 = this.http.get(this.url + 'services/app/PersonTitle/GetAll', accessToken.httpOptions);
    const response2 = this.http.get(this.url + "services/app/City/GetAll",accessToken.httpOptions);
    return forkJoin(
      [response1, 
        response2.pipe(delay(1000))]);
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









