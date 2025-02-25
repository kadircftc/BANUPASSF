import { Component, OnInit } from '@angular/core';
import { Visit } from 'app/core/components/admin/visit/models/Visit';
import { VisitService } from 'app/core/components/admin/visit/services/visit.service';

@Component({
  selector: 'app-personel-visit',
  templateUrl: './personel-visit.component.html',
  styleUrls: ['./personel-visit.component.css']
})
export class PersonelVisitComponent implements OnInit {

  constructor(private visitService: VisitService) { }

  ngOnInit(): void {
    this.getPersonnelVisitList();
  }

  visits: Visit[] = [];
  filteredVisits: Visit[] = [];

  getPersonnelVisitList() {
    this.visitService.getPersonnelVisitList().subscribe(data => {
      if (Array.isArray(data)) {
        this.visits = data;
        this.filteredVisits = data;
      } else {
        console.error('Expected an array of visits');
      }
    });
  }

  filterVisits(status: string) {
    if (status === 'approved') {
      this.filteredVisits = this.visits.filter(visit => visit.isConfirm);
    } else if (status === 'rejected') {
      this.filteredVisits = this.visits.filter(visit => visit.isReject);
    } else if (status === 'pending') {
      this.filteredVisits = this.visits.filter(visit => !visit.isConfirm && !visit.isReject);
    } else {
      this.filteredVisits = this.visits;
    }
  }
}
