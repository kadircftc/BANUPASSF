import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/components/admin/login/Services/auth.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { Visit } from './models/Visit';
import { VisitService } from './services/visit.service';

declare var jQuery: any;

@Component({
	selector: 'app-visit',
	templateUrl: './visit.component.html',
	styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements AfterViewInit, OnInit {
	dataSource: MatTableDataSource<Visit>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['createdDate', 'personnelId', 'visitorFullName', 'visitorLicensePlate', 'vehicleEntry', 'multiPersonVisit', 'isConfirm', 'isExit', 'status', 'isReject', 'approvalDate', 'exitDate', 'visitStartDate', 'visitEndDate'];
	pageSize: number = 50;
	page: number = 1;
	totalPages: number = 0;
	totalItemCount: number = 0;
	visitList: Visit[] = [];
	visit: Visit = new Visit();
	visitAddForm: FormGroup;

	constructor(private visitService: VisitService, private lookupService: LookUpService, private alertifyService: AlertifyService, private formBuilder: FormBuilder, private authService: AuthService) { }

	ngAfterViewInit(): void {
		this.getVisitList();
	}

	ngOnInit() {
		this.getVisitList();
	}

	getVisitList() {
		this.visitService.getVisitListByPaging(this.page, this.pageSize).subscribe(data => {
			this.visitList = data.data;
			this.totalPages = data.totalPages;
			this.totalItemCount = data.totalItemCount;
			this.dataSource = new MatTableDataSource(this.visitList);
			this.configDataTable();
		});
	}

	onPageChange(newPage: number) {
		if (newPage >= 1 && newPage <= this.totalPages) {
			this.page = newPage;
			this.getVisitList();
		}
	}

	getPagination(): number[] {
		const pages: number[] = [];
		if (this.totalPages <= 7) {
			for (let i = 1; i <= this.totalPages; i++) pages.push(i);
		} else {
			pages.push(1);
			if (this.page > 4) pages.push(-1);
			for (let i = Math.max(2, this.page - 2); i <= Math.min(this.totalPages - 1, this.page + 2); i++) {
				pages.push(i);
			}
			if (this.page < this.totalPages - 3) pages.push(-1);
			pages.push(this.totalPages);
		}
		return pages;
	}




	


	configDataTable(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
