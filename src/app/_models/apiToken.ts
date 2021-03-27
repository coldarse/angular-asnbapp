import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class accessToken {
  static token: string;
  static httpOptions: any;
}