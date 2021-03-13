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
  
  //HTML Elements Visibility
  RMError1_Visible = false;
  RMError2_Visible = false;
  loadingVisible = false;
  readThumbprintVisible = false;
  insertMykadVisible = true;

  //Initializing SignalR properties
  _conn: any;
  statuses: any;

  //Setting CardType
  private CardType = "MyKad";
  private tryCount = 2;
  

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
      this._conn = c;
    });
  }

  endTransaction() : void {
    this._router.navigate(['language']);
  }

  tryAgain() : void {
    this.RMError1_Visible = false;
    this.RMError2_Visible = false;

    this._conn.invoke('request1', "ScanThumb").then((data: any) => {
      console.log(data);
      if (data.toUpperCase().includes("MISMATCH")){
        this.tryCount = this.tryCount - 1;
        if (this.tryCount == 0) {
          this.RMError1_Visible = false;
          this.RMError2_Visible = true;
        }
        else{
          this.RMError1_Visible = true;
        }
      }
      else{
        this._router.navigate(['transactionmenu']);
      }
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
              this.RMError1_Visible = true;
            }
            else{
              this._router.navigate(['transactionmenu']);
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
