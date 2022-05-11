import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';
import { ServiceService } from '../_shared/service.service';

@Component({
  selector: 'app-feedbackscreen',
  templateUrl: './feedbackscreen.component.html',
  styleUrls: ['./feedbackscreen.component.css']
})
export class FeedbackscreenComponent implements OnInit {

  @ViewChild('starone') star1 : ElementRef | undefined;
  @ViewChild('startwo') star2 : ElementRef | undefined;
  @ViewChild('starthree') star3 : ElementRef | undefined;
  @ViewChild('starfour') star4 : ElementRef | undefined;
  @ViewChild('starfive') star5 : ElementRef | undefined;

  Header_Title = "";

  BTN_Submit = "";

  FBS1_1 = "";
  FBS1_2 = "";
  FBS1_3 = "";

  FBS2_1 = "";
  FBS2_2 = "";

  id : any;

  FBS1_Visible = true;
  FBS2_Visible = false;


  

  constructor(private _router: Router,
    private translate: TranslateService,
    private serviceService : ServiceService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
  }

  ngOnDestroy() {
    clearInterval(this.id);
    if(appFunc.kioskActivity != undefined){
      this.serviceService.postKioskActivity(appFunc.kioskActivity).subscribe((res: any) => {
      });
    }
    appFunc.kioskActivity = [];
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "Cleared Interval.");
  }

  SubmitFeedback(){

    let sone = this.star1?.nativeElement.checked;
    let stwo = this.star2?.nativeElement.checked;
    let sthree = this.star3?.nativeElement.checked;
    let sfour = this.star4?.nativeElement.checked;
    let sfive = this.star5?.nativeElement.checked;

    let body: any;

    if(sone == true){
      //three star
      body = { 
        "trxNo": signalrConnection.trxno,
        "feedbackScore": 5,
        "kioskCode": signalrConnection.kioskCode,
       };

      this.serviceService.postFeedbackSubmit(body).subscribe();
    }
    else if(stwo == true){
      //two star
      body = { 
        "trxNo": signalrConnection.trxno,
        "feedbackScore": 4,
        "kioskCode": signalrConnection.kioskCode,
       };

      this.serviceService.postFeedbackSubmit(body).subscribe();
    }
    else if(sthree == true){
      //one star
      body = {    
        "trxNo": signalrConnection.trxno,
        "feedbackScore": 3,
        "kioskCode": signalrConnection.kioskCode,
       };

      this.serviceService.postFeedbackSubmit(body).subscribe();
    }
    else if(sfour == true){
      //one star
      body = {    
        "trxNo": signalrConnection.trxno,
        "feedbackScore": 2,
        "kioskCode": signalrConnection.kioskCode,
       };

      this.serviceService.postFeedbackSubmit(body).subscribe();
    }
    else if(sfive == true){
      //one star
      body = {    
        "trxNo": signalrConnection.trxno,
        "feedbackScore": 1,
        "kioskCode": signalrConnection.kioskCode,
       };

      this.serviceService.postFeedbackSubmit(body).subscribe();
    }

    this.FBS1_Visible = false;
    this.FBS2_Visible = true;

    setTimeout(()=>{   
      // this.DetectMyKad();     
      this.id = setInterval(() => {
        this.playAudio();
        this.DetectMyKad();
      }, 3000);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "Set interval to 3 second to detect MyKad/MyKid.");
    }, 5000);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "Set timer to 5 seconds.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {

      signalrConnection.cardDetect = data;

      if(signalrConnection.cardDetect == false){
        let kActivit = new kActivity();
        kActivit.trxno = signalrConnection.trxno;
        kActivit.kioskCode = signalrConnection.kioskCode;
        kActivit.moduleID = 0;
        kActivit.submoduleID = undefined;
        kActivit.action = "Removed Identification Card.";
        kActivit.startTime = new Date();
        kActivit.endTime = new Date();
        kActivit.status = true;

        appFunc.kioskActivity.push(kActivit);
        this._router.navigate(['language']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      
      }
    });
  }


  playAudio() {
    let audio = new Audio();
    audio.src = "assets/sounds/removeMyKadAlert.wav";
    audio.load();
    audio.play();
  }

}
