import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/components/admin/login/Services/auth.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { MultiVisiters } from './models/multivisiters';
import { MultiVisitersService } from './services/multivisiters.service';

declare var jQuery: any;

@Component({
	selector: 'app-multiVisiters',
	templateUrl: './multivisiters.component.html',
	styleUrls: ['./multiVisiters.component.scss']
})
export class MultiVisitersComponent implements AfterViewInit, OnInit {
	
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id','createdDate','visitId','visitorFullName', 'update','delete'];

	multiVisitersList:MultiVisiters[];
	multiVisiters:MultiVisiters=new MultiVisiters();

	multiVisitersAddForm: FormGroup;


	multiVisitersId:number;

	constructor(private multiVisitersService:MultiVisitersService, private lookupService:LookUpService,private alertifyService:AlertifyService,private formBuilder: FormBuilder, private authService:AuthService) { }

    ngAfterViewInit(): void {
        this.getMultiVisitersList();
    }

	ngOnInit() {

		this.createMultiVisitersAddForm();
	}


	getMultiVisitersList() {
		this.multiVisitersService.getMultiVisitersList().subscribe(data => {
			this.multiVisitersList = data;
			this.dataSource = new MatTableDataSource(data);
            this.configDataTable();
		});
	}

	save(){

		if (this.multiVisitersAddForm.valid) {
			this.multiVisiters = Object.assign({}, this.multiVisitersAddForm.value)

			if (this.multiVisiters.id == "")
				this.addMultiVisiters();
			else
				this.updateMultiVisiters();
		}

	}

	addMultiVisiters(){

		this.multiVisitersService.addMultiVisiters(this.multiVisiters).subscribe(data => {
			this.getMultiVisitersList();
			this.multiVisiters = new MultiVisiters();
			jQuery('#multivisiters').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.multiVisitersAddForm);

		})

	}

	updateMultiVisiters(){

		this.multiVisitersService.updateMultiVisiters(this.multiVisiters).subscribe(data => {

			var index=this.multiVisitersList.findIndex(x=>x.id==this.multiVisiters.id);
			this.multiVisitersList[index]=this.multiVisiters;
			this.dataSource = new MatTableDataSource(this.multiVisitersList);
            this.configDataTable();
			this.multiVisiters = new MultiVisiters();
			jQuery('#multivisiters').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.multiVisitersAddForm);

		})

	}

	createMultiVisitersAddForm() {
		this.multiVisitersAddForm = this.formBuilder.group({		
			id : [0],
createdDate : [null, Validators.required],
visitId : ["", Validators.required],
visitorFullName : ["", Validators.required]
		})
	}

	deleteMultiVisiters(multiVisitersId:string){
		this.multiVisitersService.deleteMultiVisiters(multiVisitersId).subscribe(data=>{
			this.alertifyService.success(data.toString());
			this.multiVisitersList=this.multiVisitersList.filter(x=> x.id!=multiVisitersId);
			this.dataSource = new MatTableDataSource(this.multiVisitersList);
			this.configDataTable();
		})
	}

	getMultiVisitersById(multiVisitersId:number){
		this.clearFormGroup(this.multiVisitersAddForm);
		this.multiVisitersService.getMultiVisitersById(multiVisitersId).subscribe(data=>{
			this.multiVisiters=data;
			this.multiVisitersAddForm.patchValue(data);
		})
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

	checkClaim(claim:string):boolean{
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
