import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgChartsModule} from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonacoEditorModule, NgxMonacoEditorConfig} from '@dmlukichev/ngx-monaco-editor';
import {ChangePasswordComponent} from './account/change-password/change-password.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ListComponent as DashboardList} from "./api/dashboard/list/list.component";
import {ListComponent as RouteList} from "./api/route/list/list.component";
import {DetailComponent as RouteDetail} from "./api/route/detail/detail.component";
import {LogComponent as RouteLog} from './api/route/log/log.component';
import {ProviderComponent as RouteProvider} from './api/route/provider/provider.component';
import {ListComponent as ActionList} from "./api/action/list/list.component";
import {DetailComponent as ActionDetail} from "./api/action/detail/detail.component";
import {DesignerComponent as ActionDesigner} from './api/action/designer/designer.component';
import {ListComponent as SchemaList} from "./api/schema/list/list.component";
import {DetailComponent as SchemaDetail} from "./api/schema/detail/detail.component";
import {DesignerComponent as SchemaDesigner} from './api/schema/designer/designer.component';
import {ListComponent as ConnectionList} from "./api/connection/list/list.component";
import {DetailComponent as ConnectionDetail} from "./api/connection/detail/detail.component";
import {ListComponent as EventList} from "./api/event/list/list.component";
import {DetailComponent as EventDetail} from "./api/event/detail/detail.component";
import {ListComponent as CronjobList} from "./api/cronjob/list/list.component";
import {DetailComponent as CronjobDetail} from "./api/cronjob/detail/detail.component";
import {ErrorComponent as CronjobError} from './api/cronjob/error/error.component';
import {ListComponent as AppList} from "./consumer/app/list/list.component";
import {DetailComponent as AppDetail} from "./consumer/app/detail/detail.component";
import {ListComponent as ScopeList} from "./consumer/scope/list/list.component";
import {DetailComponent as ScopeDetail} from "./consumer/scope/detail/detail.component";
import {ListComponent as UserList} from "./consumer/user/list/list.component";
import {DetailComponent as UserDetail} from "./consumer/user/detail/detail.component";
import {ListComponent as RateList} from "./consumer/rate/list/list.component";
import {DetailComponent as RateDetail} from "./consumer/rate/detail/detail.component";
import {ListComponent as PageList} from "./consumer/page/list/list.component";
import {DetailComponent as PageDetail} from "./consumer/page/detail/detail.component";
import {ListComponent as SdkList} from "./consumer/sdk/list/list.component";
import {ListComponent as SubscriptionList} from "./consumer/subscription/list/list.component";
import {DetailComponent as SubscriptionDetail} from "./consumer/subscription/detail/detail.component";
import {ListComponent as LogList} from "./analytics/log/list/list.component";
import {ListComponent as StatisticList} from "./analytics/statistic/list/list.component";
import {ListComponent as ErrorList} from "./analytics/error/list/list.component";
import {ListComponent as TokenList} from "./analytics/token/list/list.component";
import {ListComponent as PlanList} from "./monetization/plan/list/list.component";
import {DetailComponent as PlanDetail} from "./monetization/plan/detail/detail.component";
import {ListComponent as TransactionList} from "./monetization/transaction/list/list.component";
import {ListComponent as CategoryList} from "./system/category/list/list.component";
import {DetailComponent as CategoryDetail} from "./system/category/detail/detail.component";
import {ListComponent as RoleList} from "./system/role/list/list.component";
import {DetailComponent as RoleDetail} from "./system/role/detail/detail.component";
import {ListComponent as MarketplaceList} from "./system/marketplace/list/list.component";
import {ListComponent as ConfigList} from "./system/config/list/list.component";
import {DetailComponent as ConfigDetail} from "./system/config/detail/detail.component";
import {ListComponent as AuditList} from "./system/audit/list/list.component";
import {FilterComponent as AuditFilter} from './system/audit/filter/filter.component';
import {ListComponent as TrashList} from "./system/trash/list/list.component";
import {MessageComponent} from './shared/message/message.component';
import {ConfigFormComponent} from './shared/config-form/config-form.component';
import {ScopeCategoriesComponent} from './shared/scope-categories/scope-categories.component';
import {TagEditorComponent} from './shared/tag-editor/tag-editor.component';
import {CsvPipe} from "./shared/tag-editor/csv.pipe";
import {ScopeValuesComponent} from './shared/scope-values/scope-values.component';
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import { HelpComponent } from './shared/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ChangePasswordComponent,
    LoginComponent,
    LogoutComponent,
    DashboardList,
    RouteList,
    RouteDetail,
    RouteLog,
    RouteProvider,
    ActionList,
    ActionDetail,
    ActionDesigner,
    SchemaList,
    SchemaDetail,
    SchemaDesigner,
    ConnectionList,
    ConnectionDetail,
    EventList,
    EventDetail,
    CronjobList,
    CronjobDetail,
    CronjobError,
    AppList,
    AppDetail,
    ScopeList,
    ScopeDetail,
    UserList,
    UserDetail,
    RateList,
    RateDetail,
    PageList,
    PageDetail,
    SdkList,
    SubscriptionList,
    SubscriptionDetail,
    StatisticList,
    LogList,
    ErrorList,
    TokenList,
    PlanList,
    PlanDetail,
    TransactionList,
    CategoryList,
    CategoryDetail,
    RoleList,
    RoleDetail,
    MarketplaceList,
    ConfigList,
    ConfigDetail,
    AuditList,
    AuditFilter,
    TrashList,
    MessageComponent,
    CsvPipe,
    ConfigFormComponent,
    ScopeCategoriesComponent,
    TagEditorComponent,
    ScopeValuesComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MonacoEditorModule.forRoot(),
    TypeschemaEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

declare global {
  var FUSIO_URL: string | undefined;
}
