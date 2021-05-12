import { flatten } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { bankName, businessNature, cities, monthlyIncome, occupationCategory, occupationName, occupationSector, preferredDelivery, races, relationship, religions, securityQuestions, states, TitleDetails } from './dropDownLists';
import { eModules } from './enabledModules';
import { kioskActivities } from './kioskActivities';

@Injectable({
    providedIn: 'root',
})

export class appFunc {
  static modules: eModules[];
  static cities: cities[];
  static titleSalutation: TitleDetails[];
  static states: states[];
  static monthlyIncome: monthlyIncome[];
  static businessNature: businessNature[];
  static occupationSector: occupationSector[];
  static occupationCategory: occupationCategory[];
  static races: races[];
  static occupationName: occupationName[];
  static preferredDelivery:preferredDelivery[];
  static bankName: bankName[];
  static religion: religions[];
  static relationship: relationship[];
  static securityQuestions: securityQuestions[];

  static kioskActivity: kioskActivities[];

  static timedOut: boolean = false;
  static isRedirectFromPortalRegistration = false;
  static isUpdateMajor = false;
}

