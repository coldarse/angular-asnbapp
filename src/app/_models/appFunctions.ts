import { Injectable } from '@angular/core';
import { cities } from './cities';
import { eModules } from './enabledModules';

@Injectable({
    providedIn: 'root',
})

export class appFunc {
  static modules: eModules[];
  static cities: cities[];
}