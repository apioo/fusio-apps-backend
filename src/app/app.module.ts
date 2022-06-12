import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgChartsModule} from 'ng2-charts';
import {FormsModule} from "@angular/forms";
import {ChangePasswordComponent} from './account/change-password/change-password.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ListComponent as DashboardList} from "./dashboard/list/list.component";
import {ListComponent as RouteList} from "./route/list/list.component";
import {CreateComponent as RouteCreate} from "./route/create/create.component";
import {UpdateComponent as RouteUpdate} from "./route/update/update.component";
import {DeleteComponent as RouteDelete} from "./route/delete/delete.component";
import {LogComponent as RouteLog} from './route/log/log.component';
import {ProviderComponent as RouteProvider} from './route/provider/provider.component';
import {ChangelogComponent as RouteProviderChangelog} from './route/provider/changelog/changelog.component';
import {ListComponent as ActionList} from "./action/list/list.component";
import {CreateComponent as ActionCreate} from "./action/create/create.component";
import {UpdateComponent as ActionUpdate} from "./action/update/update.component";
import {DeleteComponent as ActionDelete} from "./action/delete/delete.component";
import {DesignerComponent as ActionDesigner} from './action/designer/designer.component';
import {ListComponent as SchemaList} from "./schema/list/list.component";
import {CreateComponent as SchemaCreate} from "./schema/create/create.component";
import {UpdateComponent as SchemaUpdate} from "./schema/update/update.component";
import {DeleteComponent as SchemaDelete} from "./schema/delete/delete.component";
import {PreviewComponent as SchemaPreview} from './schema/preview/preview.component';
import {ListComponent as ConnectionList} from "./connection/list/list.component";
import {CreateComponent as ConnectionCreate} from "./connection/create/create.component";
import {UpdateComponent as ConnectionUpdate} from "./connection/update/update.component";
import {DeleteComponent as ConnectionDelete} from "./connection/delete/delete.component";
import {ListComponent as EventList} from "./event/list/list.component";
import {CreateComponent as EventCreate} from "./event/create/create.component";
import {UpdateComponent as EventUpdate} from "./event/update/update.component";
import {DeleteComponent as EventDelete} from "./event/delete/delete.component";
import {ListComponent as CronjobList} from "./cronjob/list/list.component";
import {CreateComponent as CronjobCreate} from "./cronjob/create/create.component";
import {UpdateComponent as CronjobUpdate} from "./cronjob/update/update.component";
import {DeleteComponent as CronjobDelete} from "./cronjob/delete/delete.component";
import {ErrorComponent as CronjobError} from './cronjob/error/error.component';
import {ListComponent as AppList} from "./app/list/list.component";
import {CreateComponent as AppCreate} from "./app/create/create.component";
import {UpdateComponent as AppUpdate} from "./app/update/update.component";
import {DeleteComponent as AppDelete} from "./app/delete/delete.component";
import {ListComponent as ScopeList} from "./scope/list/list.component";
import {CreateComponent as ScopeCreate} from "./scope/create/create.component";
import {UpdateComponent as ScopeUpdate} from "./scope/update/update.component";
import {DeleteComponent as ScopeDelete} from "./scope/delete/delete.component";
import {ListComponent as UserList} from "./user/list/list.component";
import {CreateComponent as UserCreate} from "./user/create/create.component";
import {UpdateComponent as UserUpdate} from "./user/update/update.component";
import {DeleteComponent as UserDelete} from "./user/delete/delete.component";
import {ListComponent as RateList} from "./rate/list/list.component";
import {CreateComponent as RateCreate} from "./rate/create/create.component";
import {UpdateComponent as RateUpdate} from "./rate/update/update.component";
import {DeleteComponent as RateDelete} from "./rate/delete/delete.component";
import {ListComponent as PageList} from "./page/list/list.component";
import {CreateComponent as PageCreate} from "./page/create/create.component";
import {UpdateComponent as PageUpdate} from "./page/update/update.component";
import {DeleteComponent as PageDelete} from "./page/delete/delete.component";
import {ListComponent as SdkList} from "./sdk/list/list.component";
import {ListComponent as SubscriptionList} from "./subscription/list/list.component";
import {CreateComponent as SubscriptionCreate} from "./subscription/create/create.component";
import {UpdateComponent as SubscriptionUpdate} from "./subscription/update/update.component";
import {DeleteComponent as SubscriptionDelete} from "./subscription/delete/delete.component";
import {ListComponent as LogList} from "./log/list/list.component";
import {ListComponent as StatisticList} from "./statistic/list/list.component";
import {ListComponent as ErrorList} from "./error/list/list.component";
import {ListComponent as TokenList} from "./token/list/list.component";
import {ListComponent as PlanList} from "./plan/list/list.component";
import {CreateComponent as PlanCreate} from "./plan/create/create.component";
import {UpdateComponent as PlanUpdate} from "./plan/update/update.component";
import {DeleteComponent as PlanDelete} from "./plan/delete/delete.component";
import {ListComponent as TransactionList} from "./transaction/list/list.component";
import {ListComponent as CategoryList} from "./category/list/list.component";
import {CreateComponent as CategoryCreate} from "./category/create/create.component";
import {UpdateComponent as CategoryUpdate} from "./category/update/update.component";
import {DeleteComponent as CategoryDelete} from "./category/delete/delete.component";
import {ListComponent as RoleList} from "./role/list/list.component";
import {CreateComponent as RoleCreate} from "./role/create/create.component";
import {UpdateComponent as RoleUpdate} from "./role/update/update.component";
import {DeleteComponent as RoleDelete} from "./role/delete/delete.component";
import {ListComponent as MarketplaceList} from "./marketplace/list/list.component";
import {ListComponent as ConfigList} from "./config/list/list.component";
import {UpdateComponent as ConfigUpdate} from "./config/update/update.component";
import {ListComponent as AuditList} from "./audit/list/list.component";
import {DetailComponent as AuditDetail} from './audit/detail/detail.component';
import {FilterComponent as AuditFilter} from './audit/filter/filter.component';
import {ListComponent as TrashList} from "./trash/list/list.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ChangePasswordComponent,
    LoginComponent,
    LogoutComponent,
    DashboardList,
    RouteList,
    RouteCreate,
    RouteUpdate,
    RouteDelete,
    RouteLog,
    RouteProvider,
    RouteProviderChangelog,
    ActionList,
    ActionCreate,
    ActionUpdate,
    ActionDelete,
    ActionDesigner,
    SchemaList,
    SchemaCreate,
    SchemaUpdate,
    SchemaDelete,
    SchemaPreview,
    ConnectionList,
    ConnectionCreate,
    ConnectionUpdate,
    ConnectionDelete,
    EventList,
    EventCreate,
    EventUpdate,
    EventDelete,
    CronjobList,
    CronjobCreate,
    CronjobUpdate,
    CronjobDelete,
    CronjobError,
    AppList,
    AppCreate,
    AppUpdate,
    AppDelete,
    ScopeList,
    ScopeCreate,
    ScopeUpdate,
    ScopeDelete,
    UserList,
    UserCreate,
    UserUpdate,
    UserDelete,
    RateList,
    RateCreate,
    RateUpdate,
    RateDelete,
    PageList,
    PageCreate,
    PageUpdate,
    PageDelete,
    SdkList,
    SubscriptionList,
    SubscriptionCreate,
    SubscriptionUpdate,
    SubscriptionDelete,
    StatisticList,
    LogList,
    ErrorList,
    TokenList,
    PlanList,
    PlanCreate,
    PlanUpdate,
    PlanDelete,
    TransactionList,
    CategoryList,
    CategoryCreate,
    CategoryUpdate,
    CategoryDelete,
    RoleList,
    RoleCreate,
    RoleUpdate,
    RoleDelete,
    MarketplaceList,
    ConfigList,
    ConfigUpdate,
    AuditList,
    AuditDetail,
    AuditFilter,
    TrashList,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

declare global {
  var FUSIO_URL: string|undefined;
}
