import { Injectable } from '@angular/core';
import { eModules } from './enabledModules';

@Injectable({
    providedIn: 'root',
})

export class appFunc {
  static modules: eModules[];
}