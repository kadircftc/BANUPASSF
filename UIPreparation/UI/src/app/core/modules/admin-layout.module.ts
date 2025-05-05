import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GroupComponent } from 'app/core/components/admin/group/group.component';
import { LoginComponent } from 'app/core/components/admin/login/login.component';
import { UserComponent } from 'app/core/components/admin/user/user.component';
import { LoginRouting } from 'app/core/guards/login-routing';
import { TranslationService } from 'app/core/services/Translation.service';
import { SparkTableComponent } from 'app/core/tables/spark-table/spark-table.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BanuLogComponent } from '../components/admin/banuLog/banuLog.component';
import { LanguageComponent } from '../components/admin/language/language.component';
import { LogDtoComponent } from '../components/admin/log/logDto.component';
import { MultiVisitersComponent } from '../components/admin/multiVisiters/multiVisiters.component';
import { OperationClaimComponent } from '../components/admin/operationclaim/operationClaim.component';
import { TranslateComponent } from '../components/admin/translate/translate.component';
import { VisitComponent } from '../components/admin/visit/visit.component';
import { DashboardComponent } from '../components/app/dashboard/dashboard.component';
import { AdminLayoutRoutes } from '../components/app/layouts/admin-layout/admin-layout.routing';
import { BanuLogsComponent } from '../components/screens/banu-logs/banu-logs.component';
import { PersonelVisitComponent } from '../components/screens/personel-visit/personel-visit.component';
import { AllVisitorsDialogComponent } from '../components/screens/security-transactions/all-visitors-dialog/all-visitors-dialog.component';
import { RejectDialogComponent } from '../components/screens/security-transactions/reject-dialog/reject-dialog.component';
import { SecurityTransactionsComponent } from '../components/screens/security-transactions/security-transactions.component';
import { VisitAddComponent } from '../components/screens/visit-add/visit-add.component';
// export function layoutHttpLoaderFactory(http: HttpClient) {
// 
//   return new TranslateHttpLoader(http,'../../../../../../assets/i18n/','.json');
// }

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatDatepickerModule,    
        MatNativeDateModule,  
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        MatDividerModule,
        MatChipsModule,
        MatCardModule,
        MatTabsModule,
        NgbModule,
        NgMultiSelectDropDownModule,
        SweetAlert2Module,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                //useFactory:layoutHttpLoaderFactory,
                useClass: TranslationService,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        DashboardComponent,
        UserComponent,
        LoginComponent,
        GroupComponent,
        LanguageComponent,
        TranslateComponent,
        OperationClaimComponent,
        LogDtoComponent,
        BanuLogComponent,
        BanuLogsComponent,
        SecurityTransactionsComponent,
        RejectDialogComponent,
        VisitComponent,
        SparkTableComponent,
        AllVisitorsDialogComponent,
        VisitAddComponent,MultiVisitersComponent
        ,PersonelVisitComponent
    ],
    providers: [
        LoginRouting
    ]
})

export class AdminLayoutModule { }
