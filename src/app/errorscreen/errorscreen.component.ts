import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 

@Component({
  selector: 'app-errorscreen',
  templateUrl: './errorscreen.component.html',
  styleUrls: ['./errorscreen.component.css']
})
export class ErrorscreenComponent implements OnInit {

  BTN_End = "";

  ES_1 = "";
  ES_2 = "";
  ES_3 = "";
  ES_4 = "";
  ES_5 = "";

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
  }

}
