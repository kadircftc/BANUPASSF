import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as signalR from '@microsoft/signalr';
import { MustMatch } from "app/core/directives/must-match";
import { LookUp } from "app/core/models/LookUp";
import { AlertifyService } from "app/core/services/alertify.service";
import { LookUpService } from "app/core/services/lookUp.service";
import { environment } from "environments/environment";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { GroupService } from '../group/Services/group.service';
import { AuthService } from "../login/Services/auth.service";
import { PasswordDto } from "./models/passwordDto";
import { User } from "./models/user";
import { SignalRService } from "./Services/signalr.service";
import { UserService } from "./Services/user.service";
declare var jQuery: any;

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements AfterViewInit, OnInit ,OnDestroy{
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    "email",
    "fullName",
    "reqLimit",
    "status",
    "mobilePhones",
    "address",
    "notes",
    "updateReqLimit",
    "passwordChange",
    "updateGroupClaim",
    "update",
  ];
  visits: string[] = ["jhnuıohıuj"];
  user: User;
  userList: User[];
  userEmail: string;
  groupDropdownList: LookUp[];
  groupSelectedItems: LookUp[];
  dropdownSettings: IDropdownSettings;
  notValidEmail: boolean = true;
  claimDropdownList: LookUp[];
  claimSelectedItems: LookUp[];
  private hubConnection!: signalR.HubConnection;
  isGroupChange: boolean = false;
  isClaimChange: boolean = false;

  userId: number;
  reqLimitForm: FormGroup;
  selectedUserId: number;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private lookUpService: LookUpService,
    private authService: AuthService,
    private signalRService: SignalRService,
    private groupService: GroupService
  ) {}

  ngAfterViewInit(): void {
    this.getUserList();
  }

  userAddForm: FormGroup;
  passwordForm: FormGroup;

  ngOnInit() {
    this.createUserAddForm();
    this.createPasswordForm();
    this.createReqLimitForm();
    this.getGroupList();

    this.dropdownSettings = environment.getDropDownSetting;

    this.lookUpService.getGroupLookUp().subscribe((data) => {
      this.groupDropdownList = data;
    });

    this.lookUpService.getOperationClaimLookUp().subscribe((data) => {
      this.claimDropdownList = data;
    });

    // Real-time validation for email field
    this.userAddForm.get('email')?.valueChanges.subscribe(() => {
        this.validateEmail();
    });
  }

  validateEmail() {
    
    if (this.userEmail.length < 10 || this.userEmail.length > 50) {
      this.notValidEmail = false;
    } else {
      this.notValidEmail = true;
    }
  }

  getUserGroupPermissions(userId: number) {
    this.userId = userId;

    this.userService.getUserGroupPermissions(userId).subscribe((data) => {
      this.groupSelectedItems = data;
    });
  }
  ngOnDestroy(): void {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('Hub connection stopped'))
        .catch(err => console.error('Error while stopping connection:', err));
    } else {
      console.warn('Hub connection is undefined, cannot stop.');
    }
  }
  
  getUserClaimsPermissions(userId: number) {
    this.userId = userId;

    this.userService.getUserClaims(userId).subscribe((data) => {
      this.claimSelectedItems = data;
    });
  }

  saveUserGroupsPermissions() {
    if (this.isGroupChange) {
      var ids = this.groupSelectedItems.map(function (x) {
        return x.id as number;
      });
      this.userService.saveUserGroupPermissions(this.userId, ids).subscribe(
        (x) => {
          jQuery("#groupPermissions").modal("hide");
          this.isGroupChange = false;
          this.alertifyService.success(x);
        },
        (error) => {
          this.alertifyService.error(error.error);
          jQuery("#groupPermissions").modal("hide");
        }
      );
    }
  }

  saveUserClaimsPermission() {
    if (this.isClaimChange) {
      var ids = this.claimSelectedItems.map(function (x) {
        return x.id as number;
      });
      this.userService.saveUserClaims(this.userId, ids).subscribe(
        (x) => {
          jQuery("#claimsPermissions").modal("hide");
          this.isClaimChange = false;
          this.alertifyService.success(x);
        },
        (error) => {
          this.alertifyService.error(error.error);
          jQuery("#claimsPermissions").modal("hide");
        }
      );
    }
  }

  onItemSelect(comboType: string) {
    this.setComboStatus(comboType);
  }

  onSelectAll(comboType: string) {
    this.setComboStatus(comboType);
  }
  onItemDeSelect(comboType: string) {
    this.setComboStatus(comboType);
  }

  setComboStatus(comboType: string) {
    if (comboType == "Group") this.isGroupChange = true;
    else if (comboType == "Claim") this.isClaimChange = true;
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      userId: [0],
      fullName: ["", Validators.required],
      email: ["", Validators.required],
      address: [""],
      notes: [""],
      mobilePhones: [""],
      status: [true],
    });
  }

  createPasswordForm() {
    this.passwordForm = this.formBuilder.group(
      {
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  createReqLimitForm() {
    this.reqLimitForm = this.formBuilder.group({
      reqLimit: ['', [Validators.required, Validators.min(1)]]
    });
  }

  getUserList() {
    this.userService.getUserList().subscribe((data) => {
      this.userList = data;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    });
  }

  clearFormGroup(group: FormGroup) {
    group.markAsUntouched();
    group.reset();

    Object.keys(group.controls).forEach((key) => {
      group.get(key).setErrors(null);
      if (key == "userId") group.get(key).setValue(0);
      else if (key == "status") group.get(key).setValue(true);
    });
  }

  setUserId(id: number) {
    this.userId = id;
  }

  save() {
    if (this.userAddForm.valid) {
      this.user = Object.assign({}, this.userAddForm.value);

      if (this.user.userId == 0) this.addUser();
      else this.updateUser();
    }
  }

  savePassword() {
    if (this.passwordForm.valid) {
      var passwordDto: PasswordDto = new PasswordDto();
      passwordDto.userId = this.userId;
      passwordDto.password = this.passwordForm.value.password;

      this.userService.saveUserPassword(passwordDto).subscribe((data) => {
        this.userId = 0;
        jQuery("#passwordChange").modal("hide");
        this.alertifyService.success(data);
        this.clearFormGroup(this.passwordForm);
      });
    }
  }

  addUser() {
    this.userService.addUser(this.user).subscribe((data) => {
      this.getUserList();
      this.user = new User();
      jQuery("#user").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.userAddForm);
    });
  }

  getUserById(id: number) {
    this.clearFormGroup(this.userAddForm);
    this.userService.getUserById(id).subscribe((data) => {
      this.user = data;
      this.userAddForm.patchValue(data);
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe((data) => {
      var index = this.userList.findIndex((x) => x.userId == this.user.userId);
      this.userList[index] = this.user;
      this.dataSource = new MatTableDataSource(this.userList);
      this.configDataTable();
      this.user = new User();
      jQuery("#user").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.userAddForm);
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.alertifyService.success(data.toString());
      var index = this.userList.findIndex((x) => x.userId == id);
      this.userList[index].status = false;
      this.dataSource = new MatTableDataSource(this.userList);
      this.configDataTable();
    });
  }

  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
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

  requestLimitIncrease(userId: number) {
    const newLimit = prompt('Enter new request limit:');
    if (newLimit !== null) {
      const limit = parseInt(newLimit);
      if (!isNaN(limit)) {
        this.userService.requestLimitIncrease(userId, limit).subscribe(
          (response) => {
            this.alertifyService.success(response);
            this.getUserList();
          },
          (error) => {
            this.alertifyService.error(error.error);
          }
        );
      } else {
        this.alertifyService.error('Please enter a valid number');
      }
    }
  }

  setSelectedUserId(userId: number) {
    this.selectedUserId = userId;
    // Get current req limit and set it in form
    const user = this.userList.find(u => u.userId === userId);
    if (user) {
      this.reqLimitForm.patchValue({
        reqLimit: user.reqLimit
      });
    }
  }

  saveRequestLimit() {
    if (this.reqLimitForm.valid) {
      const newLimit = this.reqLimitForm.get('reqLimit')?.value;
      this.userService.requestLimitIncrease(this.selectedUserId, newLimit).subscribe({
        next: (response) => {
          jQuery('#reqLimitModal').modal('hide');
          this.alertifyService.success(response);
          this.getUserList();
          this.clearFormGroup(this.reqLimitForm);
        },
        error: (error) => {
          const errorMessage = error.error || error.message || 'An error occurred while updating request limit';
          this.alertifyService.error(errorMessage);
        }
      });
    }
  }

  getGroupList() {
    this.groupService.getGroupList().subscribe(data => {
        this.groupDropdownList = data.map(group => ({ id: group.id, label: group.groupName }));
    });
  }
}
