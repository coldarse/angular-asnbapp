import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { accessToken } from 'src/app/_models/apiToken';
import { UnitHolder }  from '../_models/unitHolder';
import { catchError, map, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    // Authorization: 'Bearer ' + accessToken.token
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc25iLmNvbS5teSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiY2E2Nzg2NjgtZDk1Mi03M2ExLTA2OTMtMzlmYjIzNTE4MGI2IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJzdWIiOiIxIiwianRpIjoiZTg2YTEzYjMtNDQxMi00NTk1LWI4MWEtODc4OGI2YzZiOTk1IiwiaWF0IjoxNjE2MDQ0MTg3LCJuYmYiOjE2MTYwNDQxODcsImV4cCI6MTYxNjEzMDU4NywiaXNzIjoiQVNOQiIsImF1ZCI6IkFTTkIifQ.4yJRfu0HC6jSWVbpVA--fIvAysax1byftfuak9Fu_Cg'
  })
}

@Injectable({
  providedIn: 'root'
})


export class ServiceService {
  url = 'https://aldansupport.com/ASNBCore/api/';
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }



  getAccountInquiry()
  {




    const body = { 

      "CHANNELTYPE": "IB",
      "REQUESTORIDENTIFICATION": "RHBNOW",
      "DEVICEOWNER": "RHB",
      "UNITHOLDERID": "000010014635",
      "FIRSTNAME": "",
      "IDENTIFICATIONTYPE": "W",
      "IDENTIFICATIONNUMBER": "460603715054",
      "FUNDID": "",
      "INQUIRYCODE": "4",
      "TRANSACTIONDATE": "23/12/2019",
      "TRANSACTIONTIME": "15:43:10",
      "BANKTXNREFERENCENUMBER": "20191003001325",
      "BANKCUSTPHONENUMBER": "60173518221",
      "FILTRATIONFLAG": "",
      "GUARDIANID": "",
      "GUARDIANICTYPE": "",
      "GUARDIANICNUMBER": ""

     };


    // return this.http.post<any> (
    // this.url + "services/app/OpenAPI/OpenAPIBalanceEnquiry", 
    // body,
    // httpOptions)
    //   .subscribe({
    //   next: data => {
    //       // this.postId = data.id;
    //       console.log(data);
    //   },
    //   error: error => {
    //       // this.errorMessage = error.message;
    //       console.error('There was an error!', error);
    //   }
    // });

    //  return this.http.post<UnitHolder> (
    //   this.url + "services/app/OpenAPI/OpenAPIBalanceEnquiry", 
    //   body,
    //   httpOptions);
    
      return this.http.post(this.url + 
        "services/app/OpenAPI/OpenAPIBalanceEnquiry", 
        body,
        httpOptions).pipe(
          map((response: UnitHolder) => { 
                
          //   if(uHolder) {
          //     console.log(uHolder.success1);
          // }
          //   const uHolder = response;          
        })
      )
  }
}

interface IAccountInquiry {
  // "wM_UHAccountInquiryResponse" : string;
  // "wM_UHAccountInquiryResult" : string;
  // "uploaD_UH_ACK" : string[];
  // "targetUrl": string,
  "success1": string,
  // "error": string,
  // "unAuthorizedRequest": boolean,
  // "__abp": boolean
}