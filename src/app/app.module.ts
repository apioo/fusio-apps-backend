import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {NgxApexchartsModule} from "ngx-apexcharts";
import {MarkdownModule} from "ngx-markdown";
import {ApiService as SDK, FusioSdkModule} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from "./api.service";
import {AccountComponent} from './account/account.component';
import {ConfigBuilder} from "./config-builder";
import {NavigationComponent} from './navigation/navigation.component';

import {DetailComponent as ErrorDetail} from "./analytics/error/detail/detail.component";
import {ListComponent as ErrorList} from "./analytics/error/list/list.component";
import {DetailComponent as LogDetail} from "./analytics/log/detail/detail.component";
import {FilterComponent as LogFilter} from './analytics/log/filter/filter.component';
import {ListComponent as LogList} from "./analytics/log/list/list.component";
import {ListComponent as StatisticList} from "./analytics/statistic/list/list.component";
import {DetailComponent as TokenDetail} from "./analytics/token/detail/detail.component";
import {FilterComponent as TokenFilter} from "./analytics/token/filter/filter.component";
import {ListComponent as TokenList} from "./analytics/token/list/list.component";

import {DesignerComponent as ActionDesigner} from './api/action/designer/designer.component';
import {DetailComponent as ActionDetail} from "./api/action/detail/detail.component";
import {ListComponent as ActionList} from "./api/action/list/list.component";
import {ModalComponent as ActionModal} from "./api/action/modal/modal.component";
import {DetailComponent as ConnectionDetail} from "./api/connection/detail/detail.component";
import {ListComponent as ConnectionList} from "./api/connection/list/list.component";
import {ModalComponent as ConnectionModal} from "./api/connection/modal/modal.component";
import {DetailComponent as CronjobDetail} from "./api/cronjob/detail/detail.component";
import {ListComponent as CronjobList} from "./api/cronjob/list/list.component";
import {ModalComponent as CronjobModal} from "./api/cronjob/modal/modal.component";
import {ListComponent as DashboardList} from "./api/dashboard/list/list.component";
import {DetailComponent as EventDetail} from "./api/event/detail/detail.component";
import {ListComponent as EventList} from "./api/event/list/list.component";
import {ModalComponent as EventModal} from "./api/event/modal/modal.component";
import {DetailComponent as OperationDetail} from "./api/operation/detail/detail.component";
import {ListComponent as OperationList} from "./api/operation/list/list.component";
import {LogComponent as OperationLog} from './api/operation/log/log.component';
import {ModalComponent as OperationModal} from "./api/operation/modal/modal.component";
import {DesignerComponent as SchemaDesigner} from './api/schema/designer/designer.component';
import {DetailComponent as SchemaDetail} from "./api/schema/detail/detail.component";
import {ListComponent as SchemaList} from "./api/schema/list/list.component";
import {ModalComponent as SchemaModal} from "./api/schema/modal/modal.component";

import {DetailComponent as AppDetail} from "./consumer/app/detail/detail.component";
import {ListComponent as AppList} from "./consumer/app/list/list.component";
import {ModalComponent as AppModal} from "./consumer/app/modal/modal.component";
import {DetailComponent as PageDetail} from "./consumer/page/detail/detail.component";
import {ListComponent as PageList} from "./consumer/page/list/list.component";
import {ModalComponent as PageModal} from "./consumer/page/modal/modal.component";
import {DetailComponent as RateDetail} from "./consumer/rate/detail/detail.component";
import {ListComponent as RateList} from "./consumer/rate/list/list.component";
import {ModalComponent as RateModal} from "./consumer/rate/modal/modal.component";
import {DetailComponent as ScopeDetail} from "./consumer/scope/detail/detail.component";
import {ListComponent as ScopeList} from "./consumer/scope/list/list.component";
import {ModalComponent as ScopeModal} from "./consumer/scope/modal/modal.component";
import {DetailComponent as UserDetail} from "./consumer/user/detail/detail.component";
import {ListComponent as UserList} from "./consumer/user/list/list.component";
import {ModalComponent as UserModal} from "./consumer/user/modal/modal.component";
import {DetailComponent as WebhookDetail} from "./consumer/webhook/detail/detail.component";
import {ListComponent as WebhookList} from "./consumer/webhook/list/list.component";
import {ModalComponent as WebhookModal} from "./consumer/webhook/modal/modal.component";

import {ColumnComponent as DatabaseColumn} from './development/database/column/column.component';
import {ForeignKeyComponent as DatabaseForeignKey} from './development/database/foreign-key/foreign-key.component';
import {IndexComponent as DatabaseIndex} from './development/database/index/index.component';
import {ListComponent as DatabaseList} from './development/database/list/list.component';
import {RowComponent as DatabaseRow} from './development/database/row/row.component';
import {TableComponent as DatabaseTable} from './development/database/table/table.component';
import {GeneratorComponent} from './development/generator/generator.component';
import {GeneratorComponent as SdkGenerate} from './development/sdk/generator/generator.component';
import {ListComponent as SdkList} from "./development/sdk/list/list.component";

import {DetailComponent as PlanDetail} from "./monetization/plan/detail/detail.component";
import {ListComponent as PlanList} from "./monetization/plan/list/list.component";
import {ModalComponent as PlanModal} from "./monetization/plan/modal/modal.component";
import {DetailComponent as TransactionDetail} from "./monetization/transaction/detail/detail.component";
import {ListComponent as TransactionList} from "./monetization/transaction/list/list.component";

import {DetailComponent as AuditDetail} from "./system/audit/detail/detail.component";
import {FilterComponent as AuditFilter} from './system/audit/filter/filter.component';
import {ListComponent as AuditList} from "./system/audit/list/list.component";
import {ListComponent as BackupList} from './system/backup/list/list.component';
import {DetailComponent as CategoryDetail} from "./system/category/detail/detail.component";
import {ListComponent as CategoryList} from "./system/category/list/list.component";
import {ModalComponent as CategoryModal} from "./system/category/modal/modal.component";
import {DetailComponent as ConfigDetail} from "./system/config/detail/detail.component";
import {ListComponent as ConfigList} from "./system/config/list/list.component";
import {ModalComponent as ConfigModal} from "./system/config/modal/modal.component";
import {ModalComponent as IdentityDetail} from './system/identity/modal/modal.component';
import {ListComponent as IdentityList} from './system/identity/list/list.component';
import {DetailComponent as IdentityModal} from './system/identity/detail/detail.component';
import {ListComponent as MarketplaceList} from "./system/marketplace/list/list.component";
import {DetailComponent as RoleDetail} from "./system/role/detail/detail.component";
import {ListComponent as RoleList} from "./system/role/list/list.component";
import {ModalComponent as RoleModal} from "./system/role/modal/modal.component";
import {ListComponent as TrashList} from "./system/trash/list/list.component";

import {ActionLinkComponent} from './shared/action-link/action-link.component';
import {ActionSelectorComponent} from './shared/action-selector/action-selector.component';
import {AppSelectorComponent} from './shared/app-selector/app-selector.component';
import {CollectionComponent} from './shared/collection/collection.component';
import {ConfigFormComponent} from './shared/config-form/config-form.component';
import {MapComponent} from './shared/map/map.component';
import {OperationParametersComponent} from './shared/operation-parameters/operation-parameters.component';
import {OperationThrowsComponent} from './shared/operation-throws/operation-throws.component';
import {SchemaLinkComponent} from './shared/schema-link/schema-link.component';
import {SchemaSelectorComponent} from './shared/schema-selector/schema-selector.component';
import {ScopeCategoriesComponent} from './shared/scope-categories/scope-categories.component';
import {TagEditorComponent} from './shared/tag-editor/tag-editor.component';
import {CsvPipe} from "./shared/tag-editor/csv.pipe";
import {UserSelectorComponent} from './shared/user-selector/user-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavigationComponent,

    ErrorDetail,
    ErrorList,
    LogDetail,
    LogFilter,
    LogList,
    StatisticList,
    TokenDetail,
    TokenFilter,
    TokenList,

    ActionDesigner,
    ActionDetail,
    ActionList,
    ActionModal,
    ConnectionDetail,
    ConnectionList,
    ConnectionModal,
    CronjobDetail,
    CronjobList,
    CronjobModal,
    DashboardList,
    EventDetail,
    EventList,
    EventModal,
    OperationDetail,
    OperationList,
    OperationLog,
    OperationModal,
    SchemaDesigner,
    SchemaDetail,
    SchemaList,
    SchemaModal,

    AppDetail,
    AppList,
    AppModal,
    PageDetail,
    PageList,
    PageModal,
    RateDetail,
    RateList,
    RateModal,
    ScopeDetail,
    ScopeList,
    ScopeModal,
    UserDetail,
    UserList,
    UserModal,
    WebhookDetail,
    WebhookList,
    WebhookModal,

    DatabaseColumn,
    DatabaseForeignKey,
    DatabaseIndex,
    DatabaseList,
    DatabaseRow,
    DatabaseTable,
    GeneratorComponent,
    SdkGenerate,
    SdkList,

    PlanDetail,
    PlanList,
    PlanModal,
    TransactionDetail,
    TransactionList,

    AuditDetail,
    AuditFilter,
    AuditList,
    BackupList,
    CategoryDetail,
    CategoryList,
    CategoryModal,
    ConfigDetail,
    ConfigList,
    ConfigModal,
    IdentityDetail,
    IdentityList,
    IdentityModal,
    MarketplaceList,
    RoleDetail,
    RoleList,
    RoleModal,
    TrashList,

    ActionLinkComponent,
    ActionSelectorComponent,
    AppSelectorComponent,
    CollectionComponent,
    ConfigFormComponent,
    MapComponent,
    OperationParametersComponent,
    OperationThrowsComponent,
    SchemaLinkComponent,
    SchemaSelectorComponent,
    ScopeCategoriesComponent,
    TagEditorComponent,
    CsvPipe,
    UserSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgxApexchartsModule,
    MonacoEditorModule.forRoot(),
    MarkdownModule.forRoot(),
    TypeschemaEditorModule,
    FusioSdkModule.forRoot(ConfigBuilder.build())
  ],
  providers: [
    {
      provide: SDK,
      useExisting: ApiService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

declare global {
  var FUSIO_URL: string | undefined;
  var FUSIO_APP_KEY: string | undefined;
}
