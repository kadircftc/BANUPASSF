import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MergeMultiVisit } from '../../../admin/visit/models/mergeMultiVisit';

@Component({
  selector: 'app-all-visitors-dialog',
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>
        <mat-icon class="header-icon">groups</mat-icon>
        Tüm Ziyaretçiler ({{data.multiVisiters?.length + 1}} Kişi)
      </h2>
    </div>
    <mat-dialog-content>
      <div class="visitor-list">
        <!-- Ana Ziyaretçi -->
        <div class="visitor-item primary">
          <div class="visitor-icon">
            <mat-icon>person</mat-icon>
          </div>
          <div class="visitor-info">
            <span class="visitor-name">{{data.visit.visitorFullName}}</span>
            <div class="visitor-details">
              <span class="visitor-type">Ana Ziyaretçi</span>
              <span class="visitor-entry">
                <mat-icon>event</mat-icon>
                {{data.visit.visitStartDate | date:'dd/MM/yyyy HH:mm'}}
              </span>
            </div>
          </div>
        </div>

        <!-- Diğer Ziyaretçiler -->
        <div *ngFor="let visitor of data.multiVisiters; let i = index" class="visitor-item">
          <div class="visitor-icon">
            <mat-icon>person_outline</mat-icon>
          </div>
          <div class="visitor-info">
            <span class="visitor-name">{{visitor.visitorFullName}}</span>
            <div class="visitor-details">
              <span class="visitor-type">Beraberindeki Ziyaretçi {{i + 1}}</span>
              <span class="visitor-entry">
                <mat-icon>event</mat-icon>
                {{data.visit.visitStartDate | date:'dd/MM/yyyy HH:mm'}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button color="primary" [mat-dialog-close]>
        <mat-icon>close</mat-icon>
        Kapat
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header {
      background: #1976d2;
      color: white;
      margin: -24px -24px 24px -24px;
      padding: 16px 24px;
      display: flex;
      align-items: center;
    }

    .header-icon {
      margin-right: 8px;
      vertical-align: text-bottom;
    }

    .visitor-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .visitor-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border-radius: 8px;
      background: #f5f5f5;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .visitor-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .visitor-item.primary {
      background: #e3f2fd;
      border-left: 4px solid #1976d2;
    }

    .visitor-icon {
      background: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .visitor-info {
      flex: 1;
    }

    .visitor-name {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
      display: block;
      margin-bottom: 4px;
    }

    .visitor-details {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .visitor-type {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    .visitor-entry {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .visitor-entry mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #1976d2;
    }

    mat-icon {
      color: #1976d2;
    }

    .primary .visitor-icon {
      background: #1976d2;
    }

    .primary .visitor-icon mat-icon {
      color: white;
    }

    mat-dialog-actions {
      padding: 16px 0 0;
      margin-bottom: -8px;
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AllVisitorsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AllVisitorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MergeMultiVisit
  ) {}
} 