import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appFunc } from '../_models/appFunctions';
import { ServiceService } from '../_shared/service.service';

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

  path = "";

  constructor(
    private router: Router,
    private serviceService : ServiceService,
  ) { }

  ngOnInit(): void {
    
    if(appFunc.screenSaver == undefined){
      this.path = "";
    }else{
      this.path = appFunc.screenSaver;
      this.path = this.path.substring(this.path.indexOf("screensaver/") + 12);
      console.log(this.path);
    }
    
    this.imgCycle();
    this.id = setInterval(() => {
      this.imgCycle();
    }, 5000);
  }

  imgCycle() {
    if(this.path == ""){
      this.imgSrc = "./assets/screensaver/" + this.path + "/" + this.imgArray[this.counter];
      if (this.counter == this.imgArray.length - 1) {
        this.counter = -1;
      }
      this.counter++;
    }else{
      this.imgSrc = "./assets/screensaver/" + this.path + "/" + appFunc.screenSaverList[this.counter];
      if (this.counter == appFunc.screenSaverList.length - 1) {
        this.counter = -1;
      }
      this.counter++;
    }
  }

  screensaverclick(){
    this.router.navigate(['language']);
    clearInterval(this.id);
  }

  ngOnDestroy(){
    clearInterval(this.id);
  }

}
