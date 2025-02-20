import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'app/core/services/alertify.service';
import { SignalRService } from '../../admin/user/Services/signalr.service';
import { MergeMultiVisit } from '../../admin/visit/models/mergeMultiVisit';
import { VisitService } from '../../admin/visit/services/visit.service';
import { AllVisitorsDialogComponent } from './all-visitors-dialog/all-visitors-dialog.component';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';

interface Visitor {
  name: string;
  surname: string;
}

interface SecurityVisit {
  id: number;
  visitors: Visitor[];
  totalVisitors: number;
  licensePlate?: string;
  isVehicle: boolean;
  entryDate: Date;
  exitDate: Date | null;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
}

@Component({
  selector: 'app-security-transactions',
  templateUrl: './security-transactions.component.html',
  styleUrls: ['./security-transactions.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('300ms ease-in'))
    ])
  ]
})
export class SecurityTransactionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['visitors', 'licensePlate', 'entryDate', 'exitDate', 'actions'];
  approvedColumns: string[] = ['visitors', 'licensePlate', 'entryDate', 'exitDate'];
  rejectedColumns: string[] = ['rejectReason', 'visitors', 'licensePlate', 'entryDate', 'exitDate'];

  dataSource: MatTableDataSource<MergeMultiVisit>;
  approvedDataSource: MatTableDataSource<MergeMultiVisit>;
  rejectedDataSource: MatTableDataSource<MergeMultiVisit>;
  allmergeData: MergeMultiVisit[] = [];
  selectedTab = 'today';
  pendingData: MergeMultiVisit[] = [];
  filteredPendingData: MergeMultiVisit[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('approvedPaginator') approvedPaginator: MatPaginator;
  @ViewChild('rejectedPaginator') rejectedPaginator: MatPaginator;
  @ViewChild('approvedSort') approvedSort: MatSort;
  @ViewChild('rejectedSort') rejectedSort: MatSort;
  private hubConnection!: signalR.HubConnection;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private visitService: VisitService, private signalRService: SignalRService, private alertifyService: AlertifyService

  ) {
    this.dataSource = new MatTableDataSource([]);
    this.approvedDataSource = new MatTableDataSource([]);
    this.rejectedDataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.loadVisits(this.getSelectedDateText());
    
    // SignalR bağlantısını başlat
    this.signalRService.startConnection();

    // 3 saniye sonra bağlantı durumunu kontrol et
    setTimeout(() => {
      if (!this.signalRService.hubConnection?.state) {
        console.error('SignalR connection failed');
        this.alertifyService.error('Gerçek zamanlı bildirimler için bağlantı kurulamadı. Sayfayı yenileyin veya daha sonra tekrar deneyin.');
      } else {
        this.setupVisitAddedListener();
      }
    }, 3000);
  }

  private setupVisitAddedListener(): void {
    this.signalRService.addVisitAddedListener((visit: MergeMultiVisit) => {
      if (!visit) return;
      
      visit.animated = true;
      this.pendingData.unshift(visit);
      this.dataSource = new MatTableDataSource(this.pendingData);
      this.configDataTable();
      
      setTimeout(() => {
        visit.animated = false;
      }, 20000);
      
      this.alertifyService.success(`${visit.visit.visitorFullName} adına yeni ziyaret kaydı var!`);
    });
  }

  ngOnDestroy(): void {
    if (this.signalRService.hubConnection) {
      this.signalRService.hubConnection.off("VisitAdded");
      this.signalRService.stopConnection();
    }
  }
  

  private loadVisits(date:string) {
    this.visitService.getVisitMergeMultiVisitList(date).subscribe({
      next: (data: MergeMultiVisit[]) => {

        this.pendingData = data.filter(v => !v.visit.isConfirm && !v.visit.isReject);
        let approvedData = data.filter(v => v.visit.isConfirm);
        let rejectedData = data.filter(v => v.visit.isReject);
        console.log(rejectedData)
        this.dataSource = new MatTableDataSource(this.pendingData);
        this.approvedDataSource.data = approvedData;
        this.rejectedDataSource.data = rejectedData;

        this.configDataTable();
      },
      error: (error) => {
        console.error('Ziyaret verileri yüklenirken hata oluştu:', error);
        this.snackBar.open('Gösterilecek veri bulunamadı', 'Kapat', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private configDataTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.approvedDataSource.paginator = this.approvedPaginator;
    this.approvedDataSource.sort = this.approvedSort;

    this.rejectedDataSource.paginator = this.rejectedPaginator;
    this.rejectedDataSource.sort = this.rejectedSort;


  }

  approveVisit(row: MergeMultiVisit) {
        this.visitService.confirmVisit(row.visit.id).subscribe( res=>{
          this.snackBar.open(res, 'Kapat', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadVisits(this.getSelectedDateText());
        });
      }

  

  rejectVisit(mergeVisit: MergeMultiVisit) {

    const dialogRef = this.dialog.open(RejectDialogComponent, {
      width: '500px',
      data: {
        visit: mergeVisit.visit,
        multiVisiters: mergeVisit.multiVisiters
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        // API'ye red isteği gönder
        const visitToUpdate = {
          ...mergeVisit.visit,
          isReject: true,
          reasonForRejection: result.reason
        };

        this.visitService.rejectVisit(mergeVisit.visit.id, result.reason).subscribe({
          next: () => {
            const visitorNames = [
              mergeVisit.visit.visitorFullName,
              ...(mergeVisit.multiVisiters || []).map(mv => mv.visitorFullName)
            ].join(', ');

            const message = mergeVisit.visit.vehicleEntry ?
              `${visitorNames} (${mergeVisit.visit.visitorLicensePlate}) ziyareti reddedildi` :
              `${visitorNames} (Yaya) ziyareti reddedildi`;

            this.snackBar.open(message, 'Kapat', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });

            // Tabloları güncelle
            this.loadVisits(this.getSelectedDateText());
          },
          error: (error) => {
            console.error('Ziyaret reddetme hatası:', error);
            this.snackBar.open('Ziyaret reddedilirken bir hata oluştu', 'Kapat', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  private updateTables() {
    const allData = [...this.dataSource.data];

    /*this.approvedDataSource.data = allData.filter(visit => visit.visits === 'approved');
    this.rejectedDataSource.data = allData.filter(visit => visit === 'rejected');
   this.dataSource.data = allData.filter(visit => visit.status === 'pending');*/

    this.refreshDataSources();
  }

  private refreshDataSources() {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.sort) {
      this.dataSource.sort.sortChange.emit();
    }

    if (this.approvedDataSource.paginator) {
      this.approvedDataSource.paginator.firstPage();
    }
    if (this.approvedDataSource.sort) {
      this.approvedDataSource.sort.sortChange.emit();
    }

    if (this.rejectedDataSource.paginator) {
      this.rejectedDataSource.paginator.firstPage();
    }
    if (this.rejectedDataSource.sort) {
      this.rejectedDataSource.sort.sortChange.emit();
    }
  }
  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target) {
      console.error("Event target is not an input element.");
      return;
    }
  
    const filterValue = target.value?.trim().toLowerCase();
  
    // Eğer filtre değeri boşsa, tüm veriyi geri yükle ve işlemi durdur
    if (!filterValue) {
      console.warn("Filter value is empty or not valid. Resetting to all data.");
      this.filteredPendingData = this.pendingData;
      this.dataSource = new MatTableDataSource(this.filteredPendingData);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      return;
    }
  
    // pendingData'nın geçerli bir array olduğunu kontrol et
    if (!Array.isArray(this.pendingData)) {
      console.error("pendingData is not an array:", this.pendingData);
      return;
    }
  
    // Filtreleme işlemi
    this.filteredPendingData = this.pendingData.filter(v =>
      v?.visit?.visitorFullName?.toLowerCase().includes(filterValue) ||
      v?.visit?.visitorLicensePlate?.toLowerCase().includes(filterValue)
    );
  
    this.dataSource = new MatTableDataSource(this.filteredPendingData);
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  

  filterByDate(tab: string) {
    this.selectedTab = tab;
    this.loadVisits(this.getSelectedDateText());
  }
  getSelectedDateText(): string {
    const today = new Date();
    
    switch(this.selectedTab) {
      case 'today':
        return `${this.formatDate(today)}`;
      
      case 'tomorrow': {
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        return `${this.formatDate(tomorrow)}`;
      }
      
      case 'twoDaysLater': {
        const twoDaysLater = new Date(); 
        twoDaysLater.setDate(today.getDate() + 2);
        return `${this.formatDate(twoDaysLater)}`;
      }

      default:
        return '';
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    const year = date.getFullYear();
    console.log(day,month,year)
    return `${day}-${month}-${year}`;
  }

  getAllVisitorNames(row: MergeMultiVisit): { visitorNames: string[], totalVisitors: number } {
    const allVisitors: string[] = [];

    if (row.visit?.visitorFullName) {
      allVisitors.push(row.visit.visitorFullName);
    }

    if (row.multiVisiters && row.multiVisiters.length > 2) {
      for (let index = 0; index < 2; index++) {
        allVisitors.push(row.multiVisiters[index].visitorFullName);
      }
      allVisitors.push(`+${row.multiVisiters.length - 2}`);
    } else if (row.multiVisiters) {
      // İkiden az ziyaretçi varsa hepsini ekle
      allVisitors.push(...row.multiVisiters.map(mv => mv.visitorFullName));
    }

    // Toplam ziyaretçi sayısı: Ana ziyaretçi + multiVisiters
    const totalVisitors = (row.multiVisiters?.length || 0) + 1;

    return { visitorNames: allVisitors, totalVisitors };
  }

  showAllVisitors(row: MergeMultiVisit) {
    this.dialog.open(AllVisitorsDialogComponent, {
      width: '500px',
      data: row
    });
  }

}
