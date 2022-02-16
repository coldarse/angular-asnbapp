import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { AppConfiguration } from './config/app-configuration';
import { appFunc } from './_models/appFunctions';
import { errorCodes } from './_models/errorCode';
import { selectLang } from './_models/language';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing: Date = new Date();
  title = 'angular-idle-timeout';
  timer = 0;
  timeoutidle = false
  id: any;

  constructor(
    private idle: Idle, 
    private keepalive: Keepalive,
    private router: Router,
    private appConfig: AppConfiguration,
    private translate: TranslateService) {

    this.translate.use(selectLang.selectedLang);
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(appConfig.idletime);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(appConfig.popuptime);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      this.timeoutidle = false;
      this.idleState = 'No longer idle.'
      // console.log(this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      // console.log(this.idleState);
      if (this.router.url === '/outofservice' ){//|| this.router.url === '/screensaver'){
        if (errorCodes.code = "0168"){
          this.checkinterval();
        }else{
          this.reset();
        }
      }else{
        appFunc.timedOut = true;
        this.router.navigate(['/screensaver']);
        this.reset();
      }
    });
    
    idle.onIdleStart.subscribe(() => {
      if(this.router.url === '/screensaver'){
        this.timeoutidle = false;
        this.idleState = 'You\'ve gone idle!'
        // console.log(this.idleState);
      }
      else if(this.router.url === '/outofservice'){
        this.timeoutidle = false;
        this.idleState = 'You\'ve gone idle!'
        // console.log(this.idleState);
      }
      else{
        this.timeoutidle = true;
        this.idleState = 'You\'ve gone idle!'
        // console.log(this.idleState);
      }
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.timer = countdown;
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      // console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.timeoutidle = false;
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  isInBetween(startDateTime: Date, stopDateTime: Date, current: Date): Boolean {
    if (current.getTime() >= startDateTime.getTime() && current.getTime() <= stopDateTime.getTime()){
      return true;
    }
    return false;
  }

  Yes(){
    this.timeoutidle = false;
  }

  No(){
    // console.log("clicked no");
    appFunc.timedOut = true;
    this.router.navigate(['/screensaver']);
    this.reset();
  }

  checkinterval(){
    setTimeout(() => {
      this.id = setInterval(() => {
        let count = 0;
        for (var val of appFunc.modules){
          if(val.moduleID == 3){//Update CIF
            if(val.enable == true){
              if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }else{
              if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }
          }
          else if(val.moduleID == 6){//Balance Inquiry
            if(val.enable == true){
              if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }else{
              if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }
          }
          else if(val.moduleID == 5){//Financial
            if(val.enable == true){
              if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }else{
              if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }
          }
          else if(val.moduleID == 2){//Bijak Registration
            if(val.enable == true){
              if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }else{
              if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }
          }
          else if(val.moduleID == 4){//Portal Registration
            if(val.enable == true){
              if(this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }else{
              if(!this.isInBetween(new Date(val.operationStart), new Date(val.operationEnd), new Date())){
                count += 1;
              }
            }
          }
        }
  
        if(count > 0){
          this.router.navigate(['/screensaver']);
          clearInterval(this.id);
        }
      }, 1000);
    } , 60000);
  }
  
}
