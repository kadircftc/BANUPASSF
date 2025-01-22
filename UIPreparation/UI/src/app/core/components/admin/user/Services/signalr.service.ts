import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { MergeMultiVisit } from '../../visit/models/mergeMultiVisit';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: HubConnection;
  private isConnected: boolean = false;  

  constructor() { }

  public startConnection(): void {
    if (this.isConnected) {
      return; 
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat") 
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
        this.isConnected = true;  
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        this.isConnected = false;  
      });
  }

  public addVisitAddedListener(callback: (visit: MergeMultiVisit) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on("VisitAdded", (visit: MergeMultiVisit) => {
        callback(visit);
      });
    }
  }
}
