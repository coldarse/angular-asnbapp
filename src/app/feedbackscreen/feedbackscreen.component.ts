import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { selectLang } from '../_models/language'; 
import { signalrConnection } from 'src/app/_models/signalr';

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

  cardDetect : boolean = true;

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
  }

  ngOnDestroy() {
    clearInterval(this.id);
  }

  SubmitFeedback(){
    this.FBS1_Visible = false;
    this.FBS2_Visible = true;
    
    this.id = setInterval(() => {
      this.playAudio();
      this.DetectMyKad();
    }, 1000);
  }

  DetectMyKad() {
    signalrConnection.connection.invoke('IsCardDetected').then((data: boolean) => {
      console.log(data);
      this.cardDetect = data;
      if(this.cardDetect != true){
        this._router.navigate(['language']);
      }
    });
  }


  playAudio() {
    let audio = new Audio();
    audio.src = "assets/sounds/sam.mp3";
    audio.load();
    audio.play();
  }

}
