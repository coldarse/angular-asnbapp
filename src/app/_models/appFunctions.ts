import { flatten } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ASNBFundID, bankName, businessNature, cities, fundSource, icType, monthlyIncome, occupationCategory, occupationName, occupationSector, preferredDelivery, races, reasonTransfer, relationship, religions, securityQuestions, states, thirdpartyRelationship, TitleDetails } from './dropDownLists';
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
  static fundSource: fundSource[];
  static ASNBFundID: ASNBFundID[];
  static thirdPartyRelationship: thirdpartyRelationship[];
  static reasonTransfer: reasonTransfer[];
  static screenSaver: string;
  static screenSaverList: string[];

  static kioskActivity: kioskActivities[];

  static ictype: icType[];

  static timedOut: boolean = false;
  static isRedirectFromPortalRegistration = false;
  static isRedirectFromRedemption = false;
  static isUpdateMajor = false;

  static printing = false;
  static receiptFunction  = "";

  static isInvesment = false;
  static isOwn = "third";

  static body: any;
  static emailObj: any;

}

