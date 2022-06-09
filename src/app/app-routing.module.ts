import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent as DashboardList} from "./dashboard/list/list.component";
import {ListComponent as RouteList} from "./route/list/list.component";
import {ListComponent as ActionList} from "./action/list/list.component";
import {ListComponent as SchemaList} from "./schema/list/list.component";
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

const routes: Routes = [
  { path: '', component: DashboardList },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardList },
  { path: 'route', component: RouteList },
  { path: 'action', component: ActionList },
  { path: 'schema', component: SchemaList },
  { path: 'connection', component: ConnectionList },
  { path: 'event', component: EventList },
  { path: 'cronjob', component: CronjobList },

  { path: 'app', component: AppList },
  { path: 'scope', component: ScopeList },
  { path: 'user', component: UserList },
  { path: 'rate', component: RateList },
  { path: 'page', component: PageList },
  { path: 'sdk', component: SdkList },
  { path: 'subscription', component: SubscriptionList },

  { path: 'log', component: LogList },
  { path: 'statistic', component: StatisticList },
  { path: 'error', component: ErrorList },
  { path: 'token', component: TokenList },

  { path: 'plan', component: PlanList },
  { path: 'transaction', component: TransactionList },

  { path: 'category', component: CategoryList },
  { path: 'role', component: RoleList },
  { path: 'marketplace', component: MarketplaceList },
  { path: 'config', component: ConfigList },
  { path: 'audit', component: AuditList },
  { path: 'trash', component: TrashList },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
