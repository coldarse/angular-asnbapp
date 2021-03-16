import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/shared/service.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent implements OnInit {

  constructor(
    private serviceService : ServiceService
    ) { }

    _conn: any;

  ngOnInit(): void {
  }

  
  getEnglish() {
    //this._conn.invoke('test', this.text);
    this.serviceService.getAllLanguage('en');
  }


}
