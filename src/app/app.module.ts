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
import {ListComponent as DashboardList} from "./dashboard/list/list.component";
import {ListComponent as RouteList} from "./route/list/list.component";
import {DetailComponent as RouteDetail} from "./route/detail/detail.component";
import {LogComponent as RouteLog} from './route/log/log.component';
import {ProviderComponent as RouteProvider} from './route/provider/provider.component';
import {ListComponent as ActionList} from "./action/list/list.component";
import {DetailComponent as ActionDetail} from "./action/detail/detail.component";
import {DesignerComponent as ActionDesigner} from './action/designer/designer.component';
import {ListComponent as SchemaList} from "./schema/list/list.component";
import {DetailComponent as SchemaDetail} from "./schema/detail/detail.component";
import {ListComponent as ConnectionList} from "./connection/list/list.component";
import {DetailComponent as ConnectionDetail} from "./connection/detail/detail.component";
import {ListComponent as EventList} from "./event/list/list.component";
import {DetailComponent as EventDetail} from "./event/detail/detail.component";
import {ListComponent as CronjobList} from "./cronjob/list/list.component";
import {DetailComponent as CronjobDetail} from "./cronjob/detail/detail.component";
import {ErrorComponent as CronjobError} from './cronjob/error/error.component';
import {ListComponent as AppList} from "./app/list/list.component";
import {DetailComponent as AppDetail} from "./app/detail/detail.component";
import {ListComponent as ScopeList} from "./scope/list/list.component";
import {DetailComponent as ScopeDetail} from "./scope/detail/detail.component";
import {ListComponent as UserList} from "./user/list/list.component";
import {DetailComponent as UserDetail} from "./user/detail/detail.component";
import {ListComponent as RateList} from "./rate/list/list.component";
import {DetailComponent as RateDetail} from "./rate/detail/detail.component";
import {ListComponent as PageList} from "./page/list/list.component";
import {DetailComponent as PageDetail} from "./page/detail/detail.component";
import {ListComponent as SdkList} from "./sdk/list/list.component";
import {ListComponent as SubscriptionList} from "./subscription/list/list.component";
import {DetailComponent as SubscriptionDetail} from "./subscription/detail/detail.component";
import {ListComponent as LogList} from "./log/list/list.component";
import {ListComponent as StatisticList} from "./statistic/list/list.component";
import {ListComponent as ErrorList} from "./error/list/list.component";
import {ListComponent as TokenList} from "./token/list/list.component";
import {ListComponent as PlanList} from "./plan/list/list.component";
import {DetailComponent as PlanDetail} from "./plan/detail/detail.component";
import {ListComponent as TransactionList} from "./transaction/list/list.component";
import {ListComponent as CategoryList} from "./category/list/list.component";
import {DetailComponent as CategoryDetail} from "./category/detail/detail.component";
import {ListComponent as RoleList} from "./role/list/list.component";
import {DetailComponent as RoleDetail} from "./role/detail/detail.component";
import {ListComponent as MarketplaceList} from "./marketplace/list/list.component";
import {ListComponent as ConfigList} from "./config/list/list.component";
import {DetailComponent as ConfigDetail} from "./config/detail/detail.component";
import {ListComponent as AuditList} from "./audit/list/list.component";
import {FilterComponent as AuditFilter} from './audit/filter/filter.component';
import {ListComponent as TrashList} from "./trash/list/list.component";
import {MessageComponent} from './message/message.component';
import {CsvPipe} from './route/csv.pipe';
import {ConfigFormComponent} from './config-form/config-form.component';
import {ScopeCategoriesComponent} from './scope-categories/scope-categories.component';
import {TagEditorComponent} from './tag-editor/tag-editor.component';
import {DesignerComponent} from './schema/designer/designer.component';
import {TypeschemaEditorModule} from "ngx-typeschema-editor";

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
    DesignerComponent,
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
