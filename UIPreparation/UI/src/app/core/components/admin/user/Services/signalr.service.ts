import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { MergeMultiVisit } from '../../visit/models/mergeMultiVisit';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection;

  constructor() { }

  public startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/chat")  // SignalR Hub endpoint
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  // "VisitAdded" metodunu dinlemek için
  public addVisitAddedListener(callback: (visit: MergeMultiVisit) => void): void {
    this.hubConnection.on("VisitAdded", (visit: MergeMultiVisit) => {
      callback(visit);
    });
  }
}
