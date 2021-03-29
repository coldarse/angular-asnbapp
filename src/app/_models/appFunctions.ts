import { Injectable } from '@angular/core';
import { cities } from './cities';
import { eModules } from './enabledModules';
import { TitleDetails } from './titleDetails';

@Injectable({
    providedIn: 'root',
})

export class appFunc {
  static modules: eModules[];
  static cities: cities[];
  static titleSalutation: TitleDetails[];
}