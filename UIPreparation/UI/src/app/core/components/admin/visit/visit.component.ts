import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
	
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['createdDate','personnelId','visitorFullName','visitorLicensePlate','vehicleEntry','multiPersonVisit','isConfirm','isExit','status','isReject','approvalDate','exitDate','visitStartDate','visitEndDate'];

	visitList:Visit[];
	visit:Visit=new Visit();

	visitAddForm: FormGroup;


	visitId:number;

	constructor(private visitService:VisitService, private lookupService:LookUpService,private alertifyService:AlertifyService,private formBuilder: FormBuilder, private authService:AuthService) { }

    ngAfterViewInit(): void {
        this.getVisitList();
    }

	ngOnInit() {

		this.createVisitAddForm();
	}


	getVisitList() {
		this.visitService.getVisitList().subscribe(data => {
			this.visitList = data;
			this.dataSource = new MatTableDataSource(data);
            this.configDataTable();
		});
	}

	save(){

		if (this.visitAddForm.valid) {
			this.visit = Object.assign({}, this.visitAddForm.value)

			if (this.visit.id == "")
				this.addVisit();
			else
				this.updateVisit();
		}

	}

	addVisit(){

		this.visitService.addVisit(this.visit).subscribe(data => {
			this.getVisitList();
			this.visit = new Visit();
			jQuery('#visit').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.visitAddForm);

		})

	}

	updateVisit(){

		this.visitService.updateVisit(this.visit).subscribe(data => {

			var index=this.visitList.findIndex(x=>x.id==this.visit.id);
			this.visitList[index]=this.visit;
			this.dataSource = new MatTableDataSource(this.visitList);
            this.configDataTable();
			this.visit = new Visit();
			jQuery('#visit').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.visitAddForm);

		})

	}

	createVisitAddForm() {
		this.visitAddForm = this.formBuilder.group({		
			id : [0],
createdDate : [null, Validators.required],
personnelId : [0, Validators.required],
visitorFullName : ["", Validators.required],
visitorLicensePlate : ["", Validators.required],
vehicleEntry : [false, Validators.required],
multiPersonVisit : [false, Validators.required],
isConfirm : [false, Validators.required],
isExit : [false, Validators.required],
status : [false, Validators.required],
reasonForRejection : ["", Validators.required],
isReject : [false, Validators.required],
approvalDate : [null, Validators.required],
exitDate : [null, Validators.required],
visitStartDate : [null, Validators.required],
visitEndDate : [null, Validators.required]
		})
	}

	deleteVisit(visitId:string){
		this.visitService.deleteVisit(visitId).subscribe(data=>{
			this.alertifyService.success(data.toString());
			this.visitList=this.visitList.filter(x=> x.id!=visitId);
			this.dataSource = new MatTableDataSource(this.visitList);
			this.configDataTable();
		})
	}

	getVisitById(visitId:number){
		this.clearFormGroup(this.visitAddForm);
		this.visitService.getVisitById(visitId).subscribe(data=>{
			this.visit=data;
			this.visitAddForm.patchValue(data);
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
