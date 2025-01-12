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
import { SecurityTransactionsComponent } from 'app/core/components/screens/security-transactions/security-transactions.component';
import { LoginGuard } from 'app/core/guards/login-guard';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { VisitAddComponent } from 'app/core/components/screens/visit-add/visit-add.component';





export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent,canActivate:[LoginGuard] }, 
    { path: 'user',           component: UserComponent, canActivate:[LoginGuard] },
    { path: 'group',          component: GroupComponent, canActivate:[LoginGuard] },
    { path: 'login',          component: LoginComponent },
    { path: 'language',       component: LanguageComponent,canActivate:[LoginGuard]},
    { path: 'translate',      component: TranslateComponent,canActivate:[LoginGuard]},
    { path: 'operationclaim', component: OperationClaimComponent,canActivate:[LoginGuard]},
    { path: 'log',            component: LogDtoComponent,canActivate:[LoginGuard]},
    { path: 'banu-log',            component: BanuLogComponent, canActivate:[LoginGuard]},
    { path: 'banu-logs',            component: BanuLogsComponent, canActivate:[LoginGuard]},
    { path: 'security-transactions',            component: SecurityTransactionsComponent, canActivate:[LoginGuard]},
    { path: 'visit',            component: VisitComponent, canActivate:[LoginGuard]},
    { path: 'visit-add',            component: VisitAddComponent,canActivate:[LoginGuard]},
];
