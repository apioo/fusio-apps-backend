import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AccountRoute,
  ConfirmComponent,
  isAuthenticated,
  LoginComponent,
  LogoutComponent,
  ProviderComponent,
  ResetComponent
} from "ngx-fusio-sdk";
import {AccountComponent} from "./account/account.component";
import {ListComponent as ErrorList} from "./analytics/error/list/list.component";
import {ListComponent as LogList} from "./analytics/log/list/list.component";
import {ListComponent as StatisticList} from "./analytics/statistic/list/list.component";
import {ListComponent as TokenList} from "./analytics/token/list/list.component";
import {DesignerComponent as ActionDesigner} from './api/action/designer/designer.component';
import {ListComponent as ActionList} from "./api/action/list/list.component";
import {ListComponent as ConnectionList} from "./api/connection/list/list.component";
import {ListComponent as CronjobList} from "./api/cronjob/list/list.component";
import {ListComponent as DashboardList} from "./api/dashboard/list/list.component";
import {ListComponent as EventList} from "./api/event/list/list.component";
import {ListComponent as OperationList} from "./api/operation/list/list.component";
import {DesignerComponent as SchemaDesigner} from './api/schema/designer/designer.component';
import {ListComponent as SchemaList} from "./api/schema/list/list.component";
import {ListComponent as AppList} from "./consumer/app/list/list.component";
import {ListComponent as PageList} from "./consumer/page/list/list.component";
import {ListComponent as RateList} from "./consumer/rate/list/list.component";
import {ListComponent as ScopeList} from "./consumer/scope/list/list.component";
import {ListComponent as UserList} from "./consumer/user/list/list.component";
import {ListComponent as WebhookList} from "./consumer/webhook/list/list.component";
import {ListComponent as DatabaseList} from './development/database/list/list.component';
import {GeneratorComponent} from './development/generator/generator.component';
import {ListComponent as MarketplaceList} from "./development/marketplace/list/list.component";
import {DetailComponent as MarketplaceDetail} from "./development/marketplace/detail/detail.component";
import {ListComponent as SdkList} from "./development/sdk/list/list.component";
import {GeneratorComponent as SdkGenerator} from "./development/sdk/generator/generator.component";
import {ListComponent as TestList} from "./development/test/list/list.component";
import {ListComponent as PlanList} from "./monetization/plan/list/list.component";
import {ListComponent as TransactionList} from "./monetization/transaction/list/list.component";
import {ListComponent as AuditList} from "./system/audit/list/list.component";
import {ListComponent as BackupList} from './system/backup/list/list.component';
import {ListComponent as CategoryList} from "./system/category/list/list.component";
import {ListComponent as ConfigList} from "./system/config/list/list.component";
import {ListComponent as IdentityList} from './system/identity/list/list.component';
import {ListComponent as RoleList} from "./system/role/list/list.component";
import {ListComponent as TrashList} from "./system/trash/list/list.component";

const routes: Routes = [
  { path: '', component: DashboardList, canActivate: [isAuthenticated] },
  { path: 'login', component: LoginComponent },
  { path: 'login/:provider', component: ProviderComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'password/reset', component: ResetComponent },
  { path: 'password/confirm/:token', component: ConfirmComponent },

  { path: 'account', component: AccountComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll()},

  { path: 'dashboard', component: DashboardList, canActivate: [isAuthenticated] },
  { path: 'operation', component: OperationList, canActivate: [isAuthenticated] },
  { path: 'operation/:id', component: OperationList, canActivate: [isAuthenticated] },
  { path: 'action', component: ActionList, canActivate: [isAuthenticated] },
  { path: 'action/:id', component: ActionList, canActivate: [isAuthenticated] },
  { path: 'action/designer/:id', component: ActionDesigner, canActivate: [isAuthenticated] },
  { path: 'schema', component: SchemaList, canActivate: [isAuthenticated] },
  { path: 'schema/designer', component: SchemaDesigner, canActivate: [isAuthenticated] },
  { path: 'schema/designer/:id', component: SchemaDesigner, canActivate: [isAuthenticated] },
  { path: 'schema/:id', component: SchemaList, canActivate: [isAuthenticated] },
  { path: 'connection', component: ConnectionList, canActivate: [isAuthenticated] },
  { path: 'connection/:id', component: ConnectionList, canActivate: [isAuthenticated] },
  { path: 'event', component: EventList, canActivate: [isAuthenticated] },
  { path: 'event/:id', component: EventList, canActivate: [isAuthenticated] },
  { path: 'cronjob', component: CronjobList, canActivate: [isAuthenticated] },
  { path: 'cronjob/:id', component: CronjobList, canActivate: [isAuthenticated] },

  { path: 'database', component: DatabaseList, canActivate: [isAuthenticated] },
  { path: 'database/:connection', component: DatabaseList, canActivate: [isAuthenticated] },
  { path: 'database/:connection/:table', component: DatabaseList, canActivate: [isAuthenticated] },
  { path: 'generator', component: GeneratorComponent, canActivate: [isAuthenticated] },
  { path: 'marketplace', component: MarketplaceList, canActivate: [isAuthenticated] },
  { path: 'marketplace/:type', component: MarketplaceList, canActivate: [isAuthenticated] },
  { path: 'marketplace/:type/:user/:name', component: MarketplaceDetail, canActivate: [isAuthenticated] },
  { path: 'sdk', component: SdkList, canActivate: [isAuthenticated] },
  { path: 'sdk/generator/:type', component: SdkGenerator, canActivate: [isAuthenticated] },
  { path: 'test', component: TestList, canActivate: [isAuthenticated] },

  { path: 'app', component: AppList, canActivate: [isAuthenticated] },
  { path: 'app/:id', component: AppList, canActivate: [isAuthenticated] },
  { path: 'scope', component: ScopeList, canActivate: [isAuthenticated] },
  { path: 'scope/:id', component: ScopeList, canActivate: [isAuthenticated] },
  { path: 'user', component: UserList, canActivate: [isAuthenticated] },
  { path: 'user/:id', component: UserList, canActivate: [isAuthenticated] },
  { path: 'rate', component: RateList, canActivate: [isAuthenticated] },
  { path: 'rate/:id', component: RateList, canActivate: [isAuthenticated] },
  { path: 'page', component: PageList, canActivate: [isAuthenticated] },
  { path: 'page/:id', component: PageList, canActivate: [isAuthenticated] },
  { path: 'webhook', component: WebhookList, canActivate: [isAuthenticated] },
  { path: 'webhook/:id', component: WebhookList, canActivate: [isAuthenticated] },

  { path: 'log', component: LogList, canActivate: [isAuthenticated] },
  { path: 'log/:id', component: LogList, canActivate: [isAuthenticated] },
  { path: 'statistic', component: StatisticList, canActivate: [isAuthenticated] },
  { path: 'statistic/:statistic', component: StatisticList, canActivate: [isAuthenticated] },
  { path: 'error', component: ErrorList, canActivate: [isAuthenticated] },
  { path: 'error/:id', component: ErrorList, canActivate: [isAuthenticated] },
  { path: 'token', component: TokenList, canActivate: [isAuthenticated] },
  { path: 'token/:id', component: TokenList, canActivate: [isAuthenticated] },

  { path: 'plan', component: PlanList, canActivate: [isAuthenticated] },
  { path: 'plan/:id', component: PlanList, canActivate: [isAuthenticated] },
  { path: 'transaction', component: TransactionList, canActivate: [isAuthenticated] },
  { path: 'transaction/:id', component: TransactionList, canActivate: [isAuthenticated] },

  { path: 'category', component: CategoryList, canActivate: [isAuthenticated] },
  { path: 'category/:id', component: CategoryList, canActivate: [isAuthenticated] },
  { path: 'role', component: RoleList, canActivate: [isAuthenticated] },
  { path: 'role/:id', component: RoleList, canActivate: [isAuthenticated] },
  { path: 'identity', component: IdentityList, canActivate: [isAuthenticated] },
  { path: 'identity/:id', component: IdentityList, canActivate: [isAuthenticated] },
  { path: 'config', component: ConfigList, canActivate: [isAuthenticated] },
  { path: 'config/:id', component: ConfigList, canActivate: [isAuthenticated] },
  { path: 'audit', component: AuditList, canActivate: [isAuthenticated] },
  { path: 'audit/:id', component: AuditList, canActivate: [isAuthenticated] },
  { path: 'backup', component: BackupList, canActivate: [isAuthenticated] },
  { path: 'backup/:id', component: BackupList, canActivate: [isAuthenticated] },
  { path: 'trash', component: TrashList, canActivate: [isAuthenticated] },
  { path: 'trash/:type', component: TrashList, canActivate: [isAuthenticated] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
