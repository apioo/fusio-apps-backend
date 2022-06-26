import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent as DashboardList} from "./dashboard/list/list.component";
import {ListComponent as RouteList} from "./route/list/list.component";
import {ListComponent as ActionList} from "./action/list/list.component";
import {DesignerComponent as ActionDesigner} from "./action/designer/designer.component";
import {ListComponent as SchemaList} from "./schema/list/list.component";
import {DesignerComponent as SchemaDesigner} from "./schema/designer/designer.component";
import {ListComponent as ConnectionList} from "./connection/list/list.component";
import {ListComponent as EventList} from "./event/list/list.component";
import {ListComponent as CronjobList} from "./cronjob/list/list.component";
import {ListComponent as AppList} from "./app/list/list.component";
import {ListComponent as ScopeList} from "./scope/list/list.component";
import {ListComponent as UserList} from "./user/list/list.component";
import {ListComponent as RateList} from "./rate/list/list.component";
import {ListComponent as PageList} from "./page/list/list.component";
import {ListComponent as SdkList} from "./sdk/list/list.component";
import {ListComponent as SubscriptionList} from "./subscription/list/list.component";
import {ListComponent as LogList} from "./log/list/list.component";
import {ListComponent as StatisticList} from "./statistic/list/list.component";
import {ListComponent as ErrorList} from "./error/list/list.component";
import {ListComponent as TokenList} from "./token/list/list.component";
import {ListComponent as PlanList} from "./plan/list/list.component";
import {ListComponent as TransactionList} from "./transaction/list/list.component";
import {ListComponent as CategoryList} from "./category/list/list.component";
import {ListComponent as RoleList} from "./role/list/list.component";
import {ListComponent as MarketplaceList} from "./marketplace/list/list.component";
import {ListComponent as ConfigList} from "./config/list/list.component";
import {ListComponent as AuditList} from "./audit/list/list.component";
import {ListComponent as TrashList} from "./trash/list/list.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticationGuard} from "./authentication.guard";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  { path: '', component: DashboardList, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'dashboard', component: DashboardList, canActivate: [AuthenticationGuard] },
  { path: 'route', component: RouteList, canActivate: [AuthenticationGuard] },
  { path: 'route/:id', component: RouteList, canActivate: [AuthenticationGuard] },
  { path: 'action', component: ActionList, canActivate: [AuthenticationGuard] },
  { path: 'action/designer', component: ActionDesigner, canActivate: [AuthenticationGuard] },
  { path: 'action/:id', component: ActionList, canActivate: [AuthenticationGuard] },
  { path: 'schema', component: SchemaList, canActivate: [AuthenticationGuard] },
  { path: 'schema/designer', component: SchemaDesigner, canActivate: [AuthenticationGuard] },
  { path: 'schema/:id', component: SchemaList, canActivate: [AuthenticationGuard] },
  { path: 'connection', component: ConnectionList, canActivate: [AuthenticationGuard] },
  { path: 'connection/:id', component: ConnectionList, canActivate: [AuthenticationGuard] },
  { path: 'event', component: EventList, canActivate: [AuthenticationGuard] },
  { path: 'event/:id', component: EventList, canActivate: [AuthenticationGuard] },
  { path: 'cronjob', component: CronjobList, canActivate: [AuthenticationGuard] },
  { path: 'cronjob/:id', component: CronjobList, canActivate: [AuthenticationGuard] },

  { path: 'app', component: AppList, canActivate: [AuthenticationGuard] },
  { path: 'app/:id', component: AppList, canActivate: [AuthenticationGuard] },
  { path: 'scope', component: ScopeList, canActivate: [AuthenticationGuard] },
  { path: 'scope/:id', component: ScopeList, canActivate: [AuthenticationGuard] },
  { path: 'user', component: UserList, canActivate: [AuthenticationGuard] },
  { path: 'user/:id', component: UserList, canActivate: [AuthenticationGuard] },
  { path: 'rate', component: RateList, canActivate: [AuthenticationGuard] },
  { path: 'rate/:id', component: RateList, canActivate: [AuthenticationGuard] },
  { path: 'page', component: PageList, canActivate: [AuthenticationGuard] },
  { path: 'page/:id', component: PageList, canActivate: [AuthenticationGuard] },
  { path: 'sdk', component: SdkList, canActivate: [AuthenticationGuard] },
  { path: 'subscription', component: SubscriptionList, canActivate: [AuthenticationGuard] },
  { path: 'subscription/:id', component: SubscriptionList, canActivate: [AuthenticationGuard] },

  { path: 'log', component: LogList, canActivate: [AuthenticationGuard] },
  { path: 'log/:id', component: LogList, canActivate: [AuthenticationGuard] },
  { path: 'statistic', component: StatisticList, canActivate: [AuthenticationGuard] },
  { path: 'error', component: ErrorList, canActivate: [AuthenticationGuard] },
  { path: 'error/:id', component: ErrorList, canActivate: [AuthenticationGuard] },
  { path: 'token', component: TokenList, canActivate: [AuthenticationGuard] },
  { path: 'token/:id', component: TokenList, canActivate: [AuthenticationGuard] },

  { path: 'plan', component: PlanList, canActivate: [AuthenticationGuard] },
  { path: 'plan/:id', component: PlanList, canActivate: [AuthenticationGuard] },
  { path: 'transaction', component: TransactionList, canActivate: [AuthenticationGuard] },
  { path: 'transaction/:id', component: TransactionList, canActivate: [AuthenticationGuard] },

  { path: 'category', component: CategoryList, canActivate: [AuthenticationGuard] },
  { path: 'category/:id', component: CategoryList, canActivate: [AuthenticationGuard] },
  { path: 'role', component: RoleList, canActivate: [AuthenticationGuard] },
  { path: 'role/:id', component: RoleList, canActivate: [AuthenticationGuard] },
  { path: 'marketplace', component: MarketplaceList, canActivate: [AuthenticationGuard] },
  { path: 'config', component: ConfigList, canActivate: [AuthenticationGuard] },
  { path: 'config/:id', component: ConfigList, canActivate: [AuthenticationGuard] },
  { path: 'audit', component: AuditList, canActivate: [AuthenticationGuard] },
  { path: 'audit/:id', component: AuditList, canActivate: [AuthenticationGuard] },
  { path: 'trash', component: TrashList, canActivate: [AuthenticationGuard] },
  { path: 'trash/:id', component: TrashList, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
