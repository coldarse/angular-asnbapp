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

  FBS1_Visible = true;
  FBS2_Visible = false;

  constructor(private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.use(selectLang.selectedLang);
  }

  SubmitFeedback(){
    this.FBS1_Visible = false;
    this.FBS2_Visible = true;
    setTimeout(() => {

    }, 5000);
  }

  DetectMyKad() {
    signalrConnection.connection.invoke()
  }

}
