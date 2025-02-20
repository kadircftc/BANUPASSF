import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/components/admin/login/Services/auth.service';
import { PrivPagingResult } from 'app/core/models/privPaging';
import { Filter } from 'app/core/search-settings/global-filter';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { BanuLog } from './models/BanuLog';
import { BanuLogService } from './services/BanuLog.service';

declare var jQuery: any;

@Component({
	selector: 'app-banuLog',
	templateUrl: './banulog.component.html',
	styleUrls: ['./banuLog.component.scss']
})
export class BanuLogComponent implements AfterViewInit, OnInit {

	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = [ 'createdDate', 'transactorFullName', 'transactorId', 'transactionsDescription', 'transactionType'];

	banuLogList: BanuLog[];
	banuLog: BanuLog = new BanuLog();

	banuLogAddForm: FormGroup;
	basePageIndex:number=1;
	basePageCount:number=100;
	startDate: Date | null = null;
	endDate: Date | null = null;
	formattedStartDate: string = '';
	formattedEndDate: string = '';
	selectedProcessType: string = '';
	searchName: string = '';
	banuLogId: number;
	isSearch:boolean=false;
	filters: Filter[] = [];
	filteredAllResult:PrivPagingResult<BanuLog>=null
	allResult:PrivPagingResult<BanuLog>=null
	filterResult: BanuLog[] = [];
	page:number=1;
	pageCount:number[]=[];
	allPageCount:number[]=[];
	pageSize:number=100;
	selectedPageCount: number = null;
	
	getVisiblePages(): number[] {
		const totalPages = this.pageCount.length;
		const currentPage = this.page;
		const visiblePages: number[] = [];
	
		if (totalPages <= 7) {
			// Toplam sayfa sayısı 7 veya daha azsa hepsini göster
			return this.pageCount;
		}
	
		// İlk sayfayı her zaman göster
		visiblePages.push(1);
	
		if (currentPage > 4) {
			visiblePages.push(-1); // "..." için
		}
	
		// Aktif sayfanın etrafındaki sayfaları göster
		for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
			visiblePages.push(i);
		}
	
		if (currentPage < totalPages - 3) {
			visiblePages.push(-1); // "..." için
		}
	
		// Son sayfayı her zaman göster
		visiblePages.push(totalPages);
	
		return visiblePages;
	}
	getAllVisiblePages(): number[] {
		const totalPages = this.allPageCount.length;
		const currentPage = this.basePageIndex;
		const visiblePages: number[] = [];
	
		if (totalPages <= 7) {
			// Toplam sayfa sayısı 7 veya daha azsa hepsini göster
			return this.allPageCount;
		}
	
		// İlk sayfayı her zaman göster
		visiblePages.push(1);
	
		if (currentPage > 4) {
			visiblePages.push(-1); // "..." için
		}
	
		// Aktif sayfanın etrafındaki sayfaları göster
		for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
			visiblePages.push(i);
		}
	
		if (currentPage < totalPages - 3) {
			visiblePages.push(-1); // "..." için
		}
	
		// Son sayfayı her zaman göster
		visiblePages.push(totalPages);
	
		return visiblePages;
	}
	
	constructor(private banuLogService: BanuLogService, private lookupService: LookUpService, private alertifyService: AlertifyService, private formBuilder: FormBuilder, private authService: AuthService, private datePipe: DatePipe) { }

	ngAfterViewInit(): void {
		this.getBanuLogList();
	}

	ngOnInit() {

		this.createBanuLogAddForm();
	}


	getBanuLogList() {
		this.banuLogService.getBanuLogByPagingList(this.basePageIndex,this.basePageCount).subscribe(res => {
			this.banuLogList =res.data;
			this.allResult =res;
			this.dataSource = new MatTableDataSource(res.data);
			this.allPageCount=[];
					for (let index = 1; index < res.totalPages+1; index++) {
						this.allPageCount.push(index);
					}
			this.configDataTable();
		});
	}

	save() {

		if (this.banuLogAddForm.valid) {
			this.banuLog = Object.assign({}, this.banuLogAddForm.value)

			if (this.banuLog.id == "")
				this.addBanuLog();
			else
				this.updateBanuLog();
		}

	}

	addBanuLog() {

		this.banuLogService.addBanuLog(this.banuLog).subscribe(data => {
			this.getBanuLogList();
			this.banuLog = new BanuLog();
			jQuery('#banulog').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.banuLogAddForm);

		})

	}

	updateBanuLog() {

		this.banuLogService.updateBanuLog(this.banuLog).subscribe(data => {

			var index = this.banuLogList.findIndex(x => x.id == this.banuLog.id);
			this.banuLogList[index] = this.banuLog;
			this.dataSource = new MatTableDataSource(this.banuLogList);
			this.configDataTable();
			this.banuLog = new BanuLog();
			jQuery('#banulog').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.banuLogAddForm);

		})

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
	onPageCountChange(event: any) {
		this.page = event.value; 
		this.onSearch();
	}

	onPageChange(newPage: number) {
		if (newPage >= 1 && newPage <= this.pageCount.length) {
			this.page = newPage;
			this.onSearch();
		}
	}
    onAllPageCountChange(event: any) {
		this.basePageIndex = event.value; 
		this.getBanuLogList();
	}

	onAllPageChange(newPage: number) {
		if (newPage >= 1 && newPage <= this.allPageCount.length) {
			this.basePageIndex = newPage;
			this.getBanuLogList();
		}
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
			this.page=1;
		}
	}

	onEndDateChange(): void {
		if (this.endDate) {
			this.formattedEndDate = this.datePipe.transform(this.endDate, 'dd-MM-yyyy') || '';
			console.log(this.formattedEndDate)
			this.page=1;
		}
	}
	getBanuLogById(banuLogId: number) {
		this.clearFormGroup(this.banuLogAddForm);
		this.banuLogService.getBanuLogById(banuLogId).subscribe(data => {
			this.banuLog = data;
			this.banuLogAddForm.patchValue(data);
		})
	}
	createPdf() {
		if (this.filterResult.length == 0 && this.isSearch == true) {
		  this.alertifyService.error("PDF oluşturulacak bir veri yok!");
		  return;
		}
	  
		this.banuLogService.getBanuLogFilterListToPdf(this.filters).subscribe(
		  (response: HttpResponse<Blob>) => {
			// Blob nesnesini oluştur
			const file = new Blob([response.body!], { type: response.body?.type });
			const contentType = response.headers.get('Content-Type');
			const format = contentType?.split('/')[1];
			// Dosya adını HTTP yanıt başlıklarından al
			let fileName = `BanuLogs_${new Date().toISOString()}.${format}`; 
			const contentDisposition = response.headers.get('Content-Disposition');
			
			if (contentDisposition) {
			  const matches = contentDisposition.match(/filename="?([^"]+)"?/);
			  if (matches?.length > 1) {
				fileName = matches[1];
			  }
			}
	  
			const fileURL = URL.createObjectURL(file);
			const a = document.createElement('a');
			a.href = fileURL;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		  },
		  (error) => {
			console.log(error);
			this.alertifyService.error("PDF oluşturulurken bir hata oluştu!");
		  }
		);
	  }
	  
	
		onSearch() {
			this.isSearch = true;
			this.filters = [];
		  
			if (this.formattedStartDate != '' && this.formattedStartDate != null) {
				this.filters.push({
					key: 'CreatedDate',
					operation: 'GreaterThanOrEqual',
					value: this.formattedStartDate
				});
			}
		
			if (this.formattedEndDate != '' && this.formattedEndDate != null) {
				this.filters.push({
					key: 'CreatedDate',
					operation: 'LessThanOrEqual',
					value: this.formattedEndDate
				});
			}
		  
			if (this.searchName != '' && this.searchName != null) {
				this.filters.push({
					key: 'TransactorFullName',
					operation: 'Contains',
					value: this.searchName
				});
			}
		  
			if (this.selectedProcessType != '' && this.selectedProcessType != null) {
				this.filters.push({
					key: 'TransactionType',
					operation: 'Contains',
					value: this.selectedProcessType
				});
			}
		  
		  
			this.banuLogService.getBanuLogGlobalFilterList(this.filters,this.page,this.pageSize).subscribe(res => {
				this.dataSource = new MatTableDataSource(res.data);
				this.filteredAllResult=res
				this.filterResult = res.data;
				this.configDataTable();
				this.pageCount=[];
					for (let index = 1; index < res.totalPages+1; index++) {
						this.pageCount.push(index);
						console.log(this.pageCount)
					}
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
