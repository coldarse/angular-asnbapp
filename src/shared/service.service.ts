import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { accessToken } from 'src/app/_models/apiToken';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + accessToken.token
  })
}

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  url = 'https://aldansupport.com/ASNBCore/api/';
  constructor(private http: HttpClient) {}

}
