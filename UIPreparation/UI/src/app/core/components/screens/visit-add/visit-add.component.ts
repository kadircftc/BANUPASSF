import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Visitor, VehicleData, PedestrianEntranceRequest } from './models/visit-add.model';
import { VisitService } from '../../admin/visit/services/Visit.service';
import { MultiVisitersService } from '../../admin/multiVisiters/services/multivisiters.service';
import { AlertifyService } from '../../../services/alertify.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-visit-add',
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css'],
  providers: [
    DatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { hideRequiredMarker: true }
    }
  ]
})
export class VisitAddComponent implements OnInit {
  selectedTab = 'vehicle';
  
  vehicleData: VehicleData = {
    plate: '',
    visitStartDate: null,
    visitEndDate: null
  };

  vehicleVisitors: Visitor[] = [
    { name: '' }
  ];

  pedestrianVisitors: Visitor[] = [
    { name: '' }
  ];

  formattedStartDate: string = '';
  formattedEndDate: string = '';

  constructor(
    private datePipe: DatePipe,
    private visitService: VisitService,
    private multiVisitersService: MultiVisitersService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
  }

  switchTab(tab: string) {
    this.selectedTab = tab;
  }

  addVisitor() {
    this.vehicleVisitors.push({ name: '' });
  }

  removeVisitor(index: number) {
    if (index !== 0) {
      this.vehicleVisitors.splice(index, 1);
    }
  }

  addPedestrianVisitor() {
    this.pedestrianVisitors.push({ name: '' });
  }

  removePedestrianVisitor(index: number) {
    if (index !== 0) {
      this.pedestrianVisitors.splice(index, 1);
    }
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  onStartDateChange(): void {
    if (this.vehicleData.visitStartDate) {
      this.formattedStartDate = this.datePipe.transform(this.vehicleData.visitStartDate, 'dd/MM/yyyy') || '';
    }
  }

  onEndDateChange(): void {
    if (this.vehicleData.visitEndDate) {
      this.formattedEndDate = this.datePipe.transform(this.vehicleData.visitEndDate, 'dd/MM/yyyy') || '';
    }
  }

  async saveVisit(isVehicle: boolean) {
    try {
      const visitors = isVehicle ? this.vehicleVisitors : this.pedestrianVisitors;
      const mainVisitor = visitors[0];
      const additionalVisitors = visitors.slice(1).filter(v => v.name.trim() !== '');

      const startDate = new Date(this.vehicleData.visitStartDate!);
      const endDate = new Date(this.vehicleData.visitEndDate!);
      startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
      endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());

      const mainVisitRequest: PedestrianEntranceRequest = {
        personnelId: 0,
        visitorFullName: mainVisitor.name,
        vehicleEntry: isVehicle,
        multiPersonVisit: additionalVisitors.length > 0,
        isExit: false,
        status: true,
        isConfirm: false,
        isReject: false,
        visitStartDate: startDate,
        visitEndDate: endDate,
        visitorLicensePlate: isVehicle ? this.vehicleData.plate : undefined,
        multiVisitersList: additionalVisitors.map(visitor => ({
          visitorFullName: visitor.name
        }))
      };

      const saveVisitObservable = isVehicle ? 
        this.visitService.vehicleEntrance(mainVisitRequest) : 
        this.visitService.pedestrianEntrance(mainVisitRequest);

      saveVisitObservable.subscribe({
        next: (response) => {
          console.log('Visit created:', response);
          this.alertifyService.success(response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating visit:', error);
          this.alertifyService.error(error.error);
        }
      });

    } catch (error: any) {
      console.error('Error in save process:', error);
      this.alertifyService.error(error.message);
    }
  }

  private resetForm() {
    this.vehicleData = {
      plate: '',
      visitStartDate: null,
      visitEndDate: null
    };
    
    this.vehicleVisitors = [{ name: '' }];
    this.pedestrianVisitors = [{ name: '' }];
    
    this.formattedStartDate = '';
    this.formattedEndDate = '';
  }
}
