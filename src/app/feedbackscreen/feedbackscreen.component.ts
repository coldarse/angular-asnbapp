import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedbackscreen',
  templateUrl: './feedbackscreen.component.html',
  styleUrls: ['./feedbackscreen.component.css']
})
export class FeedbackscreenComponent implements OnInit {



  FBS1_Visible = false;
  FBS2_Visible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
