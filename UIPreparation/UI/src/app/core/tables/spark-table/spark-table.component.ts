import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BanuLog } from 'app/core/components/admin/banuLog/models/BanuLog';
import { BanuLogService } from 'app/core/components/admin/banuLog/services/BanuLog.service';
import { AuthService } from 'app/core/components/admin/login/Services/auth.service';
import { Filter } from 'app/core/search-settings/global-filter';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';


@Component({
  selector: 'app-spark-table',
  templateUrl: './spark-table.component.html',
  styleUrls: ['./spark-table.component.css']
})
export class SparkTableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id', 'createdDate', 'transactorFullName', 'transactorId', 'transactionsDescription', 'transactionType', 'update', 'delete'];

	banuLogList: BanuLog[];
	banuLog: BanuLog = new BanuLog();

	banuLogAddForm: FormGroup;

	startDate: Date | null = null;
	endDate: Date | null = null;
	formattedStartDate: string = '';
	formattedEndDate: string = '';
	selectedProcessType: string = '';
	searchName: string = '';
	banuLogId: number;
	isSearch:boolean=false;
	filters: Filter[] = [];
	filterResult: BanuLog[] = [];

	
	constructor(private banuLogService: BanuLogService, private lookupService: LookUpService, private alertifyService: AlertifyService, private formBuilder: FormBuilder, private authService: AuthService, private datePipe: DatePipe) { }

	ngAfterViewInit(): void {
		this.getBanuLogList();
	}

	ngOnInit() {

		this.createBanuLogAddForm();
	}


	getBanuLogList() {
		this.banuLogService.getBanuLogList().subscribe(data => {
			this.banuLogList = data;
			this.dataSource = new MatTableDataSource(data);
			this.configDataTable();
		});
	}





	createBanuLogAddForm() {
		this.banuLogAddForm = this.formBuilder.group({
			id: [0],
			createdDate: [null, Validators.required],
			transactorFullName: ["", Validators.required],
			transactorId: [0, Validators.required],
			transactionsDescription: ["", Validators.required],
			transactionType: ["", Validators.required]
		})
	}

	deleteBanuLog(banuLogId: string) {
		this.banuLogService.deleteBanuLog(banuLogId).subscribe(data => {
			this.alertifyService.success(data.toString());
			this.banuLogList = this.banuLogList.filter(x => x.id != banuLogId);
			this.dataSource = new MatTableDataSource(this.banuLogList);
			this.configDataTable();
		})
	}

	onStartDateChange(): void {
		if (this.startDate) {
			this.formattedStartDate = this.datePipe.transform(this.startDate, 'dd-MM-yyyy') || '';
			console.log(this.formattedStartDate)
		}
	}

	onEndDateChange(): void {
		if (this.endDate) {
			this.formattedEndDate = this.datePipe.transform(this.endDate, 'dd-MM-yyyy') || '';
			console.log(this.formattedEndDate)
		}
	}
	getBanuLogById(banuLogId: number) {
		this.clearFormGroup(this.banuLogAddForm);
		this.banuLogService.getBanuLogById(banuLogId).subscribe(data => {
			this.banuLog = data;
			this.banuLogAddForm.patchValue(data);
		})
	}
	createPdf(){
		if(this.filterResult.length==0 && this.isSearch==true){
			this.alertifyService.error("Pdf oluşturulacak bir veri yok!");
			return;
		}
		this.banuLogService.getBanuLogListToPdf(this.filterResult.length==0 && this.isSearch==false ? this.banuLogList : this.filterResult).subscribe(
			(response: Blob) => {
			  // PDF dosyasını Blob olarak alıyoruz
			  const fileURL = URL.createObjectURL(response); 
			  const a = document.createElement('a'); 
			  a.href = fileURL; 
			  a.download = 'BanuLogs.pdf'; 
			  document.body.appendChild(a);
			  a.click(); 
			  document.body.removeChild(a); 
			},
			(error) => {
				this.alertifyService.error("PDF oluşturulurken bir hata oluştu!")
			}
		  );
		}
	
		onSearch() {
			this.isSearch = true;
			this.filters = [];
		  
			// Start Date filtresi ekleniyor
			if (this.formattedStartDate != '' && this.formattedStartDate != null) {
				this.filters.push({
					key: 'CreatedDate',
					operation: 'GreaterThanOrEqual',
					value: this.formattedStartDate
				});
			}
		
			// End Date filtresi ekleniyor
			if (this.formattedEndDate != '' && this.formattedEndDate != null) {
				this.filters.push({
					key: 'CreatedDate',
					operation: 'LessThanOrEqual',
					value: this.formattedEndDate
				});
			}
		  
			// Name filtresi ekleniyor
			if (this.searchName != '' && this.searchName != null) {
				this.filters.push({
					key: 'TransactorFullName',
					operation: 'Contains',
					value: this.searchName
				});
			}
		  
			// Process Type filtresi ekleniyor
			if (this.selectedProcessType != '' && this.selectedProcessType != null) {
				this.filters.push({
					key: 'TransactionType',
					operation: 'Contains',
					value: this.selectedProcessType
				});
			}
		  
		  
			this.banuLogService.getBanuLogGlobalFilterList(this.filters,1,5).subscribe(data => {
				this.dataSource = new MatTableDataSource(data.data);
				this.filterResult = data.data;
				this.configDataTable();
			});
		}
		
		
		
		
		
	  
	clearFormGroup(group: FormGroup) {

		group.markAsUntouched();
		group.reset();

		Object.keys(group.controls).forEach(key => {
			group.get(key).setErrors(null);
			if (key == 'id')
				group.get(key).setValue(0);
		});
	}

	checkClaim(claim: string): boolean {
		return this.authService.claimGuard(claim)
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
