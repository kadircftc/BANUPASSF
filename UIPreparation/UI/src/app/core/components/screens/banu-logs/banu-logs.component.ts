import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banu-logs',
  templateUrl: './banu-logs.component.html',
  styleUrls: ['./banu-logs.component.css']
})
export class BanuLogsComponent implements OnInit {

  constructor(private datePipe: DatePipe) { }
  startDate: Date | null = null;
  endDate: Date | null = null;
  formattedStartDate: string = '';
  formattedEndDate: string = '';
  selectedProcessType: string = '';
  searchName: string = '';
  ngOnInit(): void {
  }
  onStartDateChange(): void {
    if (this.startDate) {
      this.formattedStartDate = this.datePipe.transform(this.startDate, 'dd-MM-yyyy') || '';
    }
  }

  onEndDateChange(): void {
    if (this.endDate) {
      this.formattedEndDate = this.datePipe.transform(this.endDate, 'dd-MM-yyyy') || '';
    }
  }
}
