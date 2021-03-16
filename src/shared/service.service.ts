import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { Language } from 'src/app/_models/language';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc25iLmNvbS5teSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiY2E2Nzg2NjgtZDk1Mi03M2ExLTA2OTMtMzlmYjIzNTE4MGI2IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJzdWIiOiIxIiwianRpIjoiZWY3N2FhODYtYTg3MS00N2RiLWJkNWItNGFjMDk1MjY2ODdkIiwiaWF0IjoxNjE1ODg2MzU2LCJuYmYiOjE2MTU4ODYzNTYsImV4cCI6MTYxNTk3Mjc1NiwiaXNzIjoiQVNOQiIsImF1ZCI6IkFTTkIifQ.lVg8dl98Wo2oTmEZbBU9apEtFCchu0-quSDmoZaEq_E'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  url = 'http://localhost:21021/api/';
  constructor(private http: HttpClient) {}

  getAllLanguage(lang : string) {
    this.http.get<Language[]>(this.url + 'services/app/Language/GetLanguageText?LanguageCode=' + lang, httpOptions).subscribe(response => {
      return response;
    });
  }
  
}
