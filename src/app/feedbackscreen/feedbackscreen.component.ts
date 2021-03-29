import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';
import { formatDate } from '@angular/common';

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
  }

  ngOnDestroy() {
    clearInterval(this.id);
    signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "Cleared Interval.");
  }

  SubmitFeedback(){
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
        this._router.navigate(['language']);
        signalrConnection.logsaves.push(formatDate(new Date(), 'M/d/yyyy h:MM:ss a', 'en') + " " + "WebApp Component [Feedback Screen]" + ": " + "MyKad Not Detected. Redirected to Feedback Screen.");
      }
    });
  }


  playAudio() {
    let audio = new Audio();
    audio.src = "assets/sounds/litlit.mp3";
    audio.load();
    audio.play();
  }

}
