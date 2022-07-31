import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from "./authentication.guard";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ChangePasswordComponent} from "./account/change-password/change-password.component";
import {ListComponent as DashboardList} from "./api/dashboard/list/list.component";
import {ListComponent as RouteList} from "./api/route/list/list.component";
import {ListComponent as ActionList} from "./api/action/list/list.component";
import {DesignerComponent as ActionDesigner} from "./api/action/designer/designer.component";
import {ListComponent as SchemaList} from "./api/schema/list/list.component";
import {DesignerComponent as SchemaDesigner} from "./api/schema/designer/designer.component";
import {ListComponent as ConnectionList} from "./api/connection/list/list.component";
import {IntrospectionComponent} from "./api/connection/introspection/introspection.component";
import {ListComponent as EventList} from "./api/event/list/list.component";
import {ListComponent as CronjobList} from "./api/cronjob/list/list.component";
import {GeneratorComponent} from "./api/generator/generator.component";
import {ListComponent as AppList} from "./consumer/app/list/list.component";
import {ListComponent as ScopeList} from "./consumer/scope/list/list.component";
import {ListComponent as UserList} from "./consumer/user/list/list.component";
import {ListComponent as RateList} from "./consumer/rate/list/list.component";
import {ListComponent as PageList} from "./consumer/page/list/list.component";
import {ListComponent as SdkList} from "./consumer/sdk/list/list.component";
import {ListComponent as SubscriptionList} from "./consumer/subscription/list/list.component";
import {ListComponent as LogList} from "./analytics/log/list/list.component";
import {ListComponent as StatisticList} from "./analytics/statistic/list/list.component";
import {ListComponent as ErrorList} from "./analytics/error/list/list.component";
import {ListComponent as TokenList} from "./analytics/token/list/list.component";
import {ListComponent as PlanList} from "./monetization/plan/list/list.component";
import {ListComponent as TransactionList} from "./monetization/transaction/list/list.component";
import {ListComponent as CategoryList} from "./system/category/list/list.component";
import {ListComponent as RoleList} from "./system/role/list/list.component";
import {ListComponent as MarketplaceList} from "./system/marketplace/list/list.component";
import {ListComponent as ConfigList} from "./system/config/list/list.component";
import {ListComponent as AuditList} from "./system/audit/list/list.component";
import {ListComponent as TrashList} from "./system/trash/list/list.component";

const routes: Routes = [
  { path: '', component: DashboardList, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account/change-password', component: ChangePasswordComponent },

  { path: 'dashboard', component: DashboardList, canActivate: [AuthenticationGuard] },
  { path: 'route', component: RouteList, canActivate: [AuthenticationGuard] },
  { path: 'route/:id', component: RouteList, canActivate: [AuthenticationGuard] },
  { path: 'action', component: ActionList, canActivate: [AuthenticationGuard] },
  { path: 'action/:id', component: ActionList, canActivate: [AuthenticationGuard] },
  { path: 'action/designer/:id', component: ActionDesigner, canActivate: [AuthenticationGuard] },
  { path: 'schema', component: SchemaList, canActivate: [AuthenticationGuard] },
  { path: 'schema/designer', component: SchemaDesigner, canActivate: [AuthenticationGuard] },
  { path: 'schema/designer/:id', component: SchemaDesigner, canActivate: [AuthenticationGuard] },
  { path: 'schema/:id', component: SchemaList, canActivate: [AuthenticationGuard] },
  { path: 'connection', component: ConnectionList, canActivate: [AuthenticationGuard] },
  { path: 'connection/:id', component: ConnectionList, canActivate: [AuthenticationGuard] },
  { path: 'connection/introspection/:id', component: IntrospectionComponent, canActivate: [AuthenticationGuard] },
  { path: 'connection/introspection/:id/:entity', component: IntrospectionComponent, canActivate: [AuthenticationGuard] },
  { path: 'event', component: EventList, canActivate: [AuthenticationGuard] },
  { path: 'event/:id', component: EventList, canActivate: [AuthenticationGuard] },
  { path: 'cronjob', component: CronjobList, canActivate: [AuthenticationGuard] },
  { path: 'cronjob/:id', component: CronjobList, canActivate: [AuthenticationGuard] },
  { path: 'generator', component: GeneratorComponent, canActivate: [AuthenticationGuard] },

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
  { path: 'statistic/:statistic', component: StatisticList, canActivate: [AuthenticationGuard] },
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
  { path: 'trash/:type', component: TrashList, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
