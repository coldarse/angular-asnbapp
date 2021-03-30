import { Injectable } from '@angular/core';
import { cities, TitleDetails } from './dropDownLists';
import { eModules } from './enabledModules';

@Injectable({
    providedIn: 'root',
})

export class appFunc {
  static modules: eModules[];
  static cities: cities[];
  static titleSalutation: TitleDetails[];
}