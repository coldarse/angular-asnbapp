import { Component, OnInit } from '@angular/core';
import { BroadcastEventListener, ConnectionStatus, IConnectionOptions, SignalR, SignalRConnection } from 'ng2-signalr';
import { Router } from '@angular/router';


@Component({        
  selector: 'app-verifymykad',
  templateUrl: './verifymykad.component.html',
  styleUrls: ['./verifymykad.component.css']
})


  
export class VerifymykadComponent implements OnInit {
  private connection!: SignalRConnection;
  //private proxy: any;
  //private url = 'https://localhost:8080';
  loadingVisible = false;
  readThumbprintVisible = false;
  insertMykadVisible = true;
  _conn: any;
  private CardType = "MyKad";
  statuses: any;

  constructor(
    private _signalR: SignalR,
    private _router: Router
    ){
      this.startConnection();
    }
  
  ngOnInit(): void {
  }

  startConnection() : void {
    this._signalR.connect().then((c) => {
      console.log("API King is now Connected");
     
      let listener$ = c.listenForRaw('MessageReceived');
      listener$.subscribe((data: any[]) => {
        console.log(data);
      });

      this._conn = c;
    });
  }


  verify() : void {
    try {
      this.insertMykadVisible = false;
      this.loadingVisible = true;

      var status = "";

      //First Invoke
      this._conn.invoke('request1', this.CardType).then((data: any) => {
        console.log(data);
        status = data;
        //Not ScanThumb
        this._conn.invoke('request1', status).then((data: any) => {
          console.log(data);
          status = data;
          this.loadingVisible = false;
          this.readThumbprintVisible = true;
          //ScanThumb
          this._conn.invoke('request1', status).then((data: any) => {
            console.log(data);
            status = data;
            if (status.toUpperCase().includes("MISMATCH")){
              status = "ScanThumb";
              this._conn.invoke('request1', status).then((data: any) => {
                console.log(data);
                status = data;
                if (status.toUpperCase().includes("MISMATCH")){
                  status = "ScanThumb";
                  this._conn.invoke('request1', status).then((data: any) => {
                    console.log(data);
                    status = data;
                    if (status.toUpperCase().includes("MISMATCH")){
                      this._router.navigate(['outofservice']);
                    }
                    else{
                      this._router.navigate(['language']);
                    }
                  });
                }
                else{
                  this._router.navigate(['language']);
                }
              });
            }
            else{
              this._router.navigate(['language']);
            }
          });
        });
      });
    }
    catch (e){
      console.log(e);
      this._router.navigate(['outofservice']);
    }
    
  }

  

}
