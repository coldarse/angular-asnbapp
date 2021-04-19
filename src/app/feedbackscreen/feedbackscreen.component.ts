import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';
import { kActivity } from '../_models/kActivity';
import { appFunc } from '../_models/appFunctions';

@Component({
  selector: 'app-feedbackscreen',
  templateUrl: './feedbackscreen.component.html',
  styleUrls: ['./feedbackscreen.component.css']
})
export class FeedbackscreenComponent implements OnInit {

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
    private translate: TranslateService) { }

  ngOnInit(): void {
    if(signalrConnection.logsaves != undefined){
      signalrConnection.connection.invoke('SaveToLog', signalrConnection.logsaves);
    }
    signalrConnection.logsaves = [];
    this.translate.use(selectLang.selectedLang);
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Arrived At Feedback Screen.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);
  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "Cleared Interval.");
  }

  SubmitFeedback(){
    let kActivit = new kActivity();
    kActivit.trxno = signalrConnection.trxno;
    kActivit.kioskCode = signalrConnection.kioskCode;
    kActivit.moduleID = 0;
    kActivit.submoduleID = undefined;
    kActivit.action = "Prompt User to Remove Identification Card.";
    kActivit.startTime = new Date();
    kActivit.endTime = new Date();
    kActivit.status = true;

    appFunc.kioskActivity.push(kActivit);

    this.FBS1_Visible = false;
    this.FBS2_Visible = true;
    setTimeout(()=>{   
      this.DetectMyKad();     
      this.id = setInterval(() => {
        this.playAudio();
        this.DetectMyKad();
      }, 1000);
      signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "Set interval to 1 second to detect MyKad/MyKid.");
    }, 5000);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "Set timer to 5 seconds.");
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      signalrConnection.cardDetect = data;
      if(signalrConnection.cardDetect != true){
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
    audio.src = "assets/sounds/samangry.mp3";
    audio.load();
    audio.play();
  }

}
