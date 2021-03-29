import { Injectable } from '@angular/core';
import { eModules } from './enabledModules';
import { TitleDetails } from './titleDetails';

@Injectable({
    providedIn: 'root',
})

export class appFunc {
  static modules: eModules[];
  static titleSalutions : TitleDetails[];
}