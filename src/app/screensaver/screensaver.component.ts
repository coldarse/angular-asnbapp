import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.css']
})
export class ScreensaverComponent implements OnInit {

  imgArray = [
    "ss1.png",
    "ss2.png",
    "ss3.png",
    "ss4.png"
  ];

  counter = 0;
  imgSrc: any;

  id: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.imgCycle();
    this.id = setInterval(() => {
      this.imgCycle();
    }, 5000);
  }

  imgCycle() {
    console.log(this.counter);
    this.imgSrc = "./assets/screensaver/" + this.imgArray[this.counter];
    console.log(this.imgSrc);
    if (this.counter == this.imgArray.length - 1) {
      this.counter = -1;
    }
    this.counter++;
  }

  screensaverclick(){
    this.router.navigate(['language']);
    clearInterval(this.id);
  }

  ngOnDestroy(){
    clearInterval(this.id);
  }

}
