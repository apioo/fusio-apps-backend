import {Routes} from '@angular/router';
import {
  AccountRoute,
  ConfirmComponent,
  EntityRoute,
  isAuthenticated,
  LoginComponent,
  LogoutComponent,
  ProviderComponent,
  ResetComponent
} from "ngx-fusio-sdk";
import {ListComponent as DashboardList} from "./api/dashboard/list/list.component";
import {AccountComponent} from "./account/account.component";
import {ListComponent as OperationList} from "./api/operation/list/list.component";
import {DetailComponent as OperationDetail} from "./api/operation/detail/detail.component";
import {FormComponent as OperationForm} from "./api/operation/form/form.component";
import {ListComponent as ActionList} from "./api/action/list/list.component";
import {DetailComponent as ActionDetail} from "./api/action/detail/detail.component";
import {FormComponent as ActionForm} from "./api/action/form/form.component";
import {DesignerComponent as ActionDesigner} from "./api/action/designer/designer.component";
import {ListComponent as SchemaList} from "./api/schema/list/list.component";
import {DetailComponent as SchemaDetail} from "./api/schema/detail/detail.component";
import {FormComponent as SchemaForm} from "./api/schema/form/form.component";
import {ListComponent as ConnectionList} from "./api/connection/list/list.component";
import {DetailComponent as ConnectionDetail} from "./api/connection/detail/detail.component";
import {FormComponent as ConnectionForm} from "./api/connection/form/form.component";
import {ListComponent as TableList} from "./api/connection/database/table/list/list.component";
import {DetailComponent as TableDetail} from "./api/connection/database/table/detail/detail.component";
import {FormComponent as TableForm} from "./api/connection/database/table/form/form.component";
import {ListComponent as RowList} from "./api/connection/database/row/list/list.component";
import {DetailComponent as RowDetail} from "./api/connection/database/row/detail/detail.component";
import {FormComponent as RowForm} from "./api/connection/database/row/form/form.component";
import {FilesystemComponent} from "./api/connection/filesystem/filesystem.component";
import {HttpComponent} from "./api/connection/http/http.component";
import {SdkComponent} from "./api/connection/sdk/sdk.component";
import {ListComponent as EventList} from "./api/event/list/list.component";
import {DetailComponent as EventDetail} from "./api/event/detail/detail.component";
import {FormComponent as EventForm} from "./api/event/form/form.component";
import {ListComponent as CronjobList} from "./api/cronjob/list/list.component";
import {DetailComponent as CronjobDetail} from "./api/cronjob/detail/detail.component";
import {FormComponent as CronjobForm} from "./api/cronjob/form/form.component";
import {ListComponent as TriggerList} from "./api/trigger/list/list.component";
import {DetailComponent as TriggerDetail} from "./api/trigger/detail/detail.component";
import {FormComponent as TriggerForm} from "./api/trigger/form/form.component";
import {GeneratorComponent} from "./development/generator/generator.component";
import {ListComponent as MarketplaceList} from "./development/marketplace/list/list.component";
import {DetailComponent as MarketplaceDetail} from "./development/marketplace/detail/detail.component";
import {ListComponent as SdkList} from "./development/sdk/list/list.component";
import {GeneratorComponent as SdkGenerator} from "./development/sdk/generator/generator.component";
import {ListComponent as TestList} from "./development/test/list/list.component";
import {ListComponent as AppList} from "./consumer/app/list/list.component";
import {DetailComponent as AppDetail} from "./consumer/app/detail/detail.component";
import {FormComponent as AppForm} from "./consumer/app/form/form.component";
import {ListComponent as ScopeList} from "./consumer/scope/list/list.component";
import {DetailComponent as ScopeDetail} from "./consumer/scope/detail/detail.component";
import {FormComponent as ScopeForm} from "./consumer/scope/form/form.component";
import {ListComponent as UserList} from "./consumer/user/list/list.component";
import {DetailComponent as UserDetail} from "./consumer/user/detail/detail.component";
import {FormComponent as UserForm} from "./consumer/user/form/form.component";
import {ListComponent as RateList} from "./consumer/rate/list/list.component";
import {DetailComponent as RateDetail} from "./consumer/rate/detail/detail.component";
import {FormComponent as RateForm} from "./consumer/rate/form/form.component";
import {ListComponent as PageList} from "./consumer/page/list/list.component";
import {DetailComponent as PageDetail} from "./consumer/page/detail/detail.component";
import {FormComponent as PageForm} from "./consumer/page/form/form.component";
import {ListComponent as FormList} from "./consumer/form/list/list.component";
import {DetailComponent as FormDetail} from "./consumer/form/detail/detail.component";
import {FormComponent as FormForm} from "./consumer/form/form/form.component";
import {ListComponent as WebhookList} from "./consumer/webhook/list/list.component";
import {DetailComponent as WebhookDetail} from "./consumer/webhook/detail/detail.component";
import {FormComponent as WebhookForm} from "./consumer/webhook/form/form.component";
import {ListComponent as LogList} from "./analytics/log/list/list.component";
import {DetailComponent as LogDetail} from "./analytics/log/detail/detail.component";
import {ListComponent as StatisticList} from "./analytics/statistic/list/list.component";
import {ListComponent as ErrorList} from "./analytics/error/list/list.component";
import {DetailComponent as ErrorDetail} from "./analytics/error/detail/detail.component";
import {ListComponent as TokenList} from "./analytics/token/list/list.component";
import {DetailComponent as TokenDetail} from "./analytics/token/detail/detail.component";
import {ListComponent as PlanList} from "./monetization/plan/list/list.component";
import {DetailComponent as PlanDetail} from "./monetization/plan/detail/detail.component";
import {FormComponent as PlanForm} from "./monetization/plan/form/form.component";
import {ListComponent as TransactionList} from "./monetization/transaction/list/list.component";
import {DetailComponent as TransactionDetail} from "./monetization/transaction/detail/detail.component";
import {ListComponent as CategoryList} from "./system/category/list/list.component";
import {DetailComponent as CategoryDetail} from "./system/category/detail/detail.component";
import {FormComponent as CategoryForm} from "./system/category/form/form.component";
import {ListComponent as RoleList} from "./system/role/list/list.component";
import {DetailComponent as RoleDetail} from "./system/role/detail/detail.component";
import {FormComponent as RoleForm} from "./system/role/form/form.component";
import {ListComponent as IdentityList} from "./system/identity/list/list.component";
import {DetailComponent as IdentityDetail} from "./system/identity/detail/detail.component";
import {FormComponent as IdentityForm} from "./system/identity/form/form.component";
import {ListComponent as FirewallList} from "./system/firewall/list/list.component";
import {DetailComponent as FirewallDetail} from "./system/firewall/detail/detail.component";
import {FormComponent as FirewallForm} from "./system/firewall/form/form.component";
import {ListComponent as ConfigList} from "./system/config/list/list.component";
import {DetailComponent as ConfigDetail} from "./system/config/detail/detail.component";
import {FormComponent as ConfigForm} from "./system/config/form/form.component";
import {ListComponent as AuditList} from "./system/audit/list/list.component";
import {DetailComponent as AuditDetail} from "./system/audit/detail/detail.component";
import {ListComponent as BackupList} from "./system/backup/list/list.component";
import {ListComponent as TrashList} from "./system/trash/list/list.component";

export const routes: Routes = [
  { path: '', component: DashboardList, canActivate: [isAuthenticated] },
  { path: 'login', component: LoginComponent },
  { path: 'login/:provider', component: ProviderComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'password/reset', component: ResetComponent },
  { path: 'password/confirm/:token', component: ConfirmComponent },

  { path: 'account', component: AccountComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll()},

  { path: 'dashboard', component: DashboardList, canActivate: [isAuthenticated] },
  { path: 'operation', canActivate: [isAuthenticated], children: EntityRoute.getAll(OperationList, OperationDetail, OperationForm) },
  { path: 'action', canActivate: [isAuthenticated], children: EntityRoute.getAll(ActionList, ActionDetail, ActionForm) },
  { path: 'action/designer/:id', component: ActionDesigner, canActivate: [isAuthenticated] },
  { path: 'schema', canActivate: [isAuthenticated], children: EntityRoute.getAll(SchemaList, SchemaDetail, SchemaForm) },
  { path: 'connection', canActivate: [isAuthenticated], children: [
      ...EntityRoute.getAll(ConnectionList, ConnectionDetail, ConnectionForm),
      { path: ':connection/database', canActivate: [isAuthenticated], children: EntityRoute.getAll(TableList, TableDetail, TableForm) },
      { path: ':connection/database/:table/data', canActivate: [isAuthenticated], children: EntityRoute.getAll(RowList, RowDetail, RowForm) },
      { path: ':connection/filesystem', component: FilesystemComponent, canActivate: [isAuthenticated] },
      { path: ':connection/http', component: HttpComponent, canActivate: [isAuthenticated] },
      { path: ':connection/sdk', component: SdkComponent, canActivate: [isAuthenticated] },
    ] },
  { path: 'event', canActivate: [isAuthenticated], children: EntityRoute.getAll(EventList, EventDetail, EventForm) },
  { path: 'cronjob', canActivate: [isAuthenticated], children: EntityRoute.getAll(CronjobList, CronjobDetail, CronjobForm) },
  { path: 'trigger', canActivate: [isAuthenticated], children: EntityRoute.getAll(TriggerList, TriggerDetail, TriggerForm) },

  { path: 'generator', component: GeneratorComponent, canActivate: [isAuthenticated] },
  { path: 'marketplace', component: MarketplaceList, canActivate: [isAuthenticated] },
  { path: 'marketplace/:type', component: MarketplaceList, canActivate: [isAuthenticated] },
  { path: 'marketplace/:type/:user/:name', component: MarketplaceDetail, canActivate: [isAuthenticated] },
  { path: 'sdk', component: SdkList, canActivate: [isAuthenticated] },
  { path: 'sdk/generator/:type', component: SdkGenerator, canActivate: [isAuthenticated] },
  { path: 'test', component: TestList, canActivate: [isAuthenticated] },

  { path: 'app', canActivate: [isAuthenticated], children: EntityRoute.getAll(AppList, AppDetail, AppForm) },
  { path: 'scope', canActivate: [isAuthenticated], children: EntityRoute.getAll(ScopeList, ScopeDetail, ScopeForm) },
  { path: 'user', canActivate: [isAuthenticated], children: EntityRoute.getAll(UserList, UserDetail, UserForm) },
  { path: 'rate', canActivate: [isAuthenticated], children: EntityRoute.getAll(RateList, RateDetail, RateForm) },
  { path: 'page', canActivate: [isAuthenticated], children: EntityRoute.getAll(PageList, PageDetail, PageForm) },
  { path: 'form', canActivate: [isAuthenticated], children: EntityRoute.getAll(FormList, FormDetail, FormForm) },
  { path: 'webhook', canActivate: [isAuthenticated], children: EntityRoute.getAll(WebhookList, WebhookDetail, WebhookForm) },

  { path: 'log', canActivate: [isAuthenticated], children: EntityRoute.getAll(LogList, LogDetail) },
  { path: 'statistic', component: StatisticList, canActivate: [isAuthenticated] },
  { path: 'statistic/:statistic', component: StatisticList, canActivate: [isAuthenticated] },
  { path: 'error', canActivate: [isAuthenticated], children: EntityRoute.getAll(ErrorList, ErrorDetail) },
  { path: 'token', canActivate: [isAuthenticated], children: EntityRoute.getAll(TokenList, TokenDetail) },

  { path: 'plan', canActivate: [isAuthenticated], children: EntityRoute.getAll(PlanList, PlanDetail, PlanForm) },
  { path: 'transaction', canActivate: [isAuthenticated], children: EntityRoute.getAll(TransactionList, TransactionDetail) },

  { path: 'category', canActivate: [isAuthenticated], children: EntityRoute.getAll(CategoryList, CategoryDetail, CategoryForm) },
  { path: 'role', canActivate: [isAuthenticated], children: EntityRoute.getAll(RoleList, RoleDetail, RoleForm) },
  { path: 'identity', canActivate: [isAuthenticated], children: EntityRoute.getAll(IdentityList, IdentityDetail, IdentityForm) },
  { path: 'firewall', canActivate: [isAuthenticated], children: EntityRoute.getAll(FirewallList, FirewallDetail, FirewallForm) },
  { path: 'config', canActivate: [isAuthenticated], children: EntityRoute.getAll(ConfigList, ConfigDetail, ConfigForm) },
  { path: 'audit', canActivate: [isAuthenticated], children: EntityRoute.getAll(AuditList, AuditDetail) },
  { path: 'backup', component: BackupList, canActivate: [isAuthenticated] },
  { path: 'backup/:id', component: BackupList, canActivate: [isAuthenticated] },
  { path: 'trash', component: TrashList, canActivate: [isAuthenticated] },
  { path: 'trash/:type', component: TrashList, canActivate: [isAuthenticated] },

];
