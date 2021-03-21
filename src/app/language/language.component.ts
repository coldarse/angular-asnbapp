import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/_shared/service.service';
import { selectLang } from '../_models/language';
import { BroadcastEventListener, ConnectionStatus, IConnectionOptions, SignalR, SignalRConnection } from 'ng2-signalr';
import { signalrConnection } from 'src/app/_models/signalr';
import { accessToken } from 'src/app/_models/apiToken';
import { UnitHolder } from '../_models/unitHolder';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent implements OnInit {

  constructor(
    private serviceService : ServiceService,
    private route: Router,
    private _signalR: SignalR,
    ) { 
      // this.startConnection();
    }

  
  ngOnInit(): void {
  
  }

  startConnection() : void {
    this._signalR.connect().then((c) => {
      console.log("API King is now Connected");
      signalrConnection.connection = c;
      signalrConnection.connection.invoke('GetLoginToken').then((data: string) => {
        accessToken.token = data;
      });
      signalrConnection.connection.invoke('GetPrinterStatus').then((data: string) => {
        //accessToken.token = data;
        console.log(data);
      });
    }).catch((err: any) => {console.log(err)});
  }

  

  selectEnglish() {
    selectLang.selectedLang = 'en';
    //this.route.navigate(['/verifymykad']);

    // this.serviceService.getToken().subscribe(data =>
    //   console.log(data));

     this.serviceService.getAccountInquiry()
    .subscribe(data => console.log(JSON.stringify(data)));
    
    // this.serviceService.getAccountInquiry()
    // .subscribe(data => new UnitHolder(    
    //   data.success, 
    //   data.result.wM_UHAccountInquiryResponse.wM_UHAccountInquiryResult.uploaD_UH_ACK.
    //   channeltype, data.requestoridentification))
    //   {                   

          //   if (data) {
          //     for (var property in data) {
          //         if (data.hasOwnProperty(property))
          //             (<any>this)[property] = (<any>data)[property];                     
          //     }
          // }
              
          // let resources = data["result"]["wM_UHAccountInquiryResponse"]
          // ["wM_UHAccountInquiryResult"]["uploaD_UH_ACK"];
          
          // console.log(resources["channeltype"]);
        
          // var unitHolder = 
          // JSON.stringify(
          //   data["result"]["wM_UHAccountInquiryResponse"]
          //   ["wM_UHAccountInquiryResult"]["uploaD_UH_ACK"]);
                      

          //console.log(JSON.stringify(data["result"]["wM_UHAccountInquiryResponse"]["wM_UHAccountInquiryResult"]));
        // console.log(JSON.stringify(data["result"]["wM_UHAccountInquiryResponse"]));
        // console.log(JSON.stringify(data["result"]["wM_UHAccountInquiryResponse"]["wM_UHAccountInquiryResult"]));
        // this.uHolder.result.wM_UHAccountInquiryResponse 
        // = JSON.stringify(data["result"]["wM_UHAccountInquiryResponse"]); 
       
        // JSON.stringify(data["result"]["wM_UHAccountInquiryResponse"]);
        // console.log("Response : " + this.uHolder.result.wM_UHAccountInquiryResponse );
        
        // console.log(JSON.stringify(data))
        // if (data != null && data['success'] == true)
        // {           
        // }
      // };
    }

  selectMalay() {
    selectLang.selectedLang = 'ms';
    this.route.navigate(['/verifymykad']);
  }


}
