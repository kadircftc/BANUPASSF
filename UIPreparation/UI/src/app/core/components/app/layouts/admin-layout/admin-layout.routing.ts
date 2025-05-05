import { Routes } from '@angular/router';
import { BanuLogComponent } from 'app/core/components/admin/banuLog/banuLog.component';
import { GroupComponent } from 'app/core/components/admin/group/group.component';
import { LanguageComponent } from 'app/core/components/admin/language/language.component';
import { LogDtoComponent } from 'app/core/components/admin/log/logDto.component';
import { LoginComponent } from 'app/core/components/admin/login/login.component';
import { OperationClaimComponent } from 'app/core/components/admin/operationclaim/operationClaim.component';
import { TranslateComponent } from 'app/core/components/admin/translate/translate.component';
import { UserComponent } from 'app/core/components/admin/user/user.component';
import { VisitComponent } from 'app/core/components/admin/visit/visit.component';
import { BanuLogsComponent } from 'app/core/components/screens/banu-logs/banu-logs.component';
import { PersonelVisitComponent } from 'app/core/components/screens/personel-visit/personel-visit.component';
import { SecurityTransactionsComponent } from 'app/core/components/screens/security-transactions/security-transactions.component';
import { VisitAddComponent } from 'app/core/components/screens/visit-add/visit-add.component';
import { ClaimGuard } from 'app/core/guards/claim.guard';
import { LoginGuard } from 'app/core/guards/login-guard';
import { LoginRouting } from 'app/core/guards/login-routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
    { 
        path: 'user', 
        component: UserComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetUsersQuery' }
    },
    { 
        path: 'group', 
        component: GroupComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetGroupsQuery' }
    },
    { path: 'login', component: LoginComponent, canActivate: [LoginRouting] },
    { 
        path: 'language', 
        component: LanguageComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetLanguagesQuery' }
    },
    { 
        path: 'translate', 
        component: TranslateComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetTranslatesQuery' }
    },
    { 
        path: 'operationclaim', 
        component: OperationClaimComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetOperationClaimsQuery' }
    },
    { 
        path: 'log', 
        component: LogDtoComponent, 
        canActivate: [LoginGuard]
    },
    { 
        path: 'banu-log', 
        component: BanuLogComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetUsersQuery' }
    },
    { 
        path: 'banu-logs', 
        component: BanuLogsComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetBanuLogsForSecurityQuery' }
    },
    { 
        path: 'security-transactions', 
        component: SecurityTransactionsComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetVisitsMultiVisitsQuery' }
    },
    { 
        path: 'personel-visit', 
        component: PersonelVisitComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetPersonnelVisitsQuery' }
    },
    { 
        path: 'visit', 
        component: VisitComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'GetUsersQuery' }
    },
    { 
        path: 'visit-add', 
        component: VisitAddComponent, 
        canActivate: [LoginGuard, ClaimGuard],
        data: { claim: 'VehicleEntranceCommand' }
    }
];
