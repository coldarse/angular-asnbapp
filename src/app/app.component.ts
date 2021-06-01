import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { AppConfiguration } from './config/app-configuration';
import { appFunc } from './_models/appFunctions';
import { errorCodes } from './_models/errorCode';

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
  id: any;

  constructor(
    private idle: Idle, 
    private keepalive: Keepalive,
    private router: Router,
    private appConfig: AppConfiguration) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(appConfig.idletime);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      if (this.router.url === '/outofservice' ){//|| this.router.url === '/screensaver'){
        if (errorCodes.code = "0168"){
          this.checkinterval();
        }else{
          this.reset();
        }
      }else{
        appFunc.timedOut = true;
        this.router.navigate(['/']);
        this.reset();
      }
    });
    
    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  
}
