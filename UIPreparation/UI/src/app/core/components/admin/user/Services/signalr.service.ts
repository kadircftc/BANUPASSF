import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { environment } from 'environments/environment';
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
      return;
    }

    // API URL'den SignalR hub URL'sini oluştur
    const hubUrl = environment.getApiUrl.replace('/api/v1', '/d_o10_sig_r');

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => token,
        skipNegotiation: true
      })
      .configureLogging(environment.production ? LogLevel.Error : LogLevel.Debug)
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.isConnected = true;
        
        // Bağlantı başarılı olduğunda mevcut connection ID'yi logla
      })
      .catch(err => {
        this.isConnected = false;
        
        // Hata detaylarını logla
        if (err.statusCode) {
        }
        if (err.message) {
        }
      });

    // Bağlantı durumu değişikliklerini dinle
    this.hubConnection.onclose((error) => {
      this.isConnected = false;
    });

    this.hubConnection.onreconnecting((error) => {
      console.warn('SignalR Reconnecting:', error);
      this.isConnected = false;
    });

    this.hubConnection.onreconnected((connectionId) => {
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
          this.isConnected = false;
        })
        .catch(err => {
          console.error('Error while stopping SignalR:', err);
        });
    }
  }
}
