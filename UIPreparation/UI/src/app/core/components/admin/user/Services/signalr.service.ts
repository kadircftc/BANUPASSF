import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { MergeMultiVisit } from '../../visit/models/mergeMultiVisit';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: HubConnection;
  private isConnected: boolean = false;  

  constructor(private storageService: LocalStorageService) { }

  public startConnection(): void {
    if (this.isConnected) {
      return; 
    }

    const token = this.storageService.getToken();
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/chat", {
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => token,
        skipNegotiation: true
      })
      .configureLogging(LogLevel.Debug) // Daha detaylı loglama için Debug seviyesine çektik
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected Successfully');
        this.isConnected = true;
        
        // Bağlantı başarılı olduğunda mevcut connection ID'yi logla
        console.log('Connection ID:', this.hubConnection.connectionId);
      })
      .catch(err => {
        console.error('SignalR Connection Error:', err);
        this.isConnected = false;
        
        // Hata detaylarını logla
        if (err.statusCode) {
          console.error('Status Code:', err.statusCode);
        }
        if (err.message) {
          console.error('Error Message:', err.message);
        }
      });

    // Bağlantı durumu değişikliklerini dinle
    this.hubConnection.onclose((error) => {
      console.error('SignalR Connection Closed:', error);
      this.isConnected = false;
    });

    this.hubConnection.onreconnecting((error) => {
      console.warn('SignalR Reconnecting:', error);
      this.isConnected = false;
    });

    this.hubConnection.onreconnected((connectionId) => {
      console.log('SignalR Reconnected. ConnectionId:', connectionId);
      this.isConnected = true;
    });
  }

  public addVisitAddedListener(callback: (visit: MergeMultiVisit) => void): void {
    if (!this.hubConnection) {
      console.error('Hub connection is not initialized');
      return;
    }

    try {
      this.hubConnection.on("VisitAdded", (visit: MergeMultiVisit) => {
        console.log('Received visit notification:', visit);
        callback(visit);
      });
    } catch (error) {
      console.error('Error adding VisitAdded listener:', error);
    }
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => {
          console.log('SignalR Disconnected');
          this.isConnected = false;
        })
        .catch(err => {
          console.error('Error while stopping SignalR:', err);
        });
    }
  }
}
