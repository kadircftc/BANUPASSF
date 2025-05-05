import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MultiVisiters } from '../../../admin/multiVisiters/models/MultiVisiters';
import { Visit } from '../../../admin/visit/models/Visit';

interface RejectDialogData {
  visit: Visit;
  multiVisiters: MultiVisiters[];
}

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent {
  rejectReason = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    public dialogRef: MatDialogRef<RejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RejectDialogData
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.rejectReason.valid) {
      const result = {
        visitId: this.data.visit.id,
        reason: this.rejectReason.value
      };
      this.dialogRef.close(result);
    }
  }

  getAllVisitorNames(): string[] {
    const allVisitors: string[] = [];
    
    // Ana ziyaretçiyi ekle
    if (this.data.visit?.visitorFullName) {
      allVisitors.push(this.data.visit.visitorFullName);
    }
    
    // MultiVisiters'teki ziyaretçileri ekle
    if (this.data.multiVisiters && this.data.multiVisiters.length > 0) {
      allVisitors.push(...this.data.multiVisiters.map(mv => mv.visitorFullName));
    }
    
    return allVisitors;
  }
}