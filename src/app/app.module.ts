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
import {ClipboardModule} from "ngx-clipboard";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from "./api.service";
import {AccountComponent} from './account/account.component';
import {ConfigBuilder} from "./config-builder";
import {NavigationComponent} from './navigation/navigation.component';
import {InstanceComponent} from './instance/instance.component';
import {ModalComponent as InstanceModalComponent} from "./instance/modal/modal.component";
import {Config as EditorConfig} from './editor/config';

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
import {FormComponent as ActionForm} from "./api/action/form/form.component";
import {DetailComponent as ConnectionDetail} from "./api/connection/detail/detail.component";
import {ListComponent as ConnectionList} from "./api/connection/list/list.component";
import {FormComponent as ConnectionForm} from "./api/connection/form/form.component";

import {ListComponent as DatabaseTableList} from './api/connection/database/table/list/list.component';
import {DetailComponent as DatabaseTableDetail} from './api/connection/database/table/detail/detail.component';
import {FormComponent as DatabaseTableForm} from './api/connection/database/table/form/form.component';
import {ColumnComponent as DatabaseTableColumn} from './api/connection/database/table/column/column.component';
import {ForeignKeyComponent as DatabaseTableForeignKey} from './api/connection/database/table/foreign-key/foreign-key.component';
import {IndexComponent as DatabaseTableIndex} from './api/connection/database/table/index/index.component';
import {ListComponent as DatabaseRowList} from './api/connection/database/row/list/list.component';
import {DetailComponent as DatabaseRowDetail} from './api/connection/database/row/detail/detail.component';
import {FormComponent as DatabaseRowForm} from './api/connection/database/row/form/form.component';
import {FilesystemComponent} from './api/connection/filesystem/filesystem.component';
import {HttpComponent} from './api/connection/http/http.component';
import {SdkComponent} from './api/connection/sdk/sdk.component';

import {DetailComponent as CronjobDetail} from "./api/cronjob/detail/detail.component";
import {ListComponent as CronjobList} from "./api/cronjob/list/list.component";
import {FormComponent as CronjobForm} from "./api/cronjob/form/form.component";
import {DetailComponent as TriggerDetail} from "./api/trigger/detail/detail.component";
import {ListComponent as TriggerList} from "./api/trigger/list/list.component";
import {FormComponent as TriggerForm} from "./api/trigger/form/form.component";
import {ListComponent as DashboardList} from "./api/dashboard/list/list.component";
import {DetailComponent as EventDetail} from "./api/event/detail/detail.component";
import {ListComponent as EventList} from "./api/event/list/list.component";
import {FormComponent as EventForm} from "./api/event/form/form.component";
import {DetailComponent as OperationDetail} from "./api/operation/detail/detail.component";
import {ListComponent as OperationList} from "./api/operation/list/list.component";
import {LogComponent as OperationLog} from './api/operation/log/log.component';
import {FormComponent as OperationForm} from "./api/operation/form/form.component";
import {DesignerComponent as SchemaDesigner} from './api/schema/designer/designer.component';
import {DetailComponent as SchemaDetail} from "./api/schema/detail/detail.component";
import {ListComponent as SchemaList} from "./api/schema/list/list.component";
import {FormComponent as SchemaForm} from "./api/schema/form/form.component";

import {DetailComponent as AppDetail} from "./consumer/app/detail/detail.component";
import {ListComponent as AppList} from "./consumer/app/list/list.component";
import {FormComponent as AppForm} from "./consumer/app/form/form.component";
import {DetailComponent as PageDetail} from "./consumer/page/detail/detail.component";
import {ListComponent as PageList} from "./consumer/page/list/list.component";
import {FormComponent as PageForm} from "./consumer/page/form/form.component";
import {DetailComponent as FormDetail} from "./consumer/form/detail/detail.component";
import {ListComponent as FormList} from "./consumer/form/list/list.component";
import {FormComponent as FormForm} from "./consumer/form/form/form.component";
import {DetailComponent as RateDetail} from "./consumer/rate/detail/detail.component";
import {ListComponent as RateList} from "./consumer/rate/list/list.component";
import {FormComponent as RateForm} from "./consumer/rate/form/form.component";
import {DetailComponent as ScopeDetail} from "./consumer/scope/detail/detail.component";
import {ListComponent as ScopeList} from "./consumer/scope/list/list.component";
import {FormComponent as ScopeForm} from "./consumer/scope/form/form.component";
import {DetailComponent as UserDetail} from "./consumer/user/detail/detail.component";
import {ListComponent as UserList} from "./consumer/user/list/list.component";
import {FormComponent as UserForm} from "./consumer/user/form/form.component";
import {DetailComponent as WebhookDetail} from "./consumer/webhook/detail/detail.component";
import {ListComponent as WebhookList} from "./consumer/webhook/list/list.component";
import {FormComponent as WebhookForm} from "./consumer/webhook/form/form.component";

import {GeneratorComponent} from './development/generator/generator.component';
import {GeneratorComponent as SdkGenerate} from './development/sdk/generator/generator.component';
import {ListComponent as MarketplaceList} from "./development/marketplace/list/list.component";
import {DetailComponent as MarketplaceDetail} from './development/marketplace/detail/detail.component';
import {ListComponent as SdkList} from "./development/sdk/list/list.component";
import {ListComponent as TestList} from "./development/test/list/list.component";
import {FormComponent as TestForm} from './development/test/form/form.component';

import {DetailComponent as PlanDetail} from "./monetization/plan/detail/detail.component";
import {ListComponent as PlanList} from "./monetization/plan/list/list.component";
import {FormComponent as PlanForm} from "./monetization/plan/form/form.component";
import {DetailComponent as TransactionDetail} from "./monetization/transaction/detail/detail.component";
import {ListComponent as TransactionList} from "./monetization/transaction/list/list.component";

import {DetailComponent as AuditDetail} from "./system/audit/detail/detail.component";
import {FilterComponent as AuditFilter} from './system/audit/filter/filter.component';
import {ListComponent as AuditList} from "./system/audit/list/list.component";
import {ListComponent as BackupList} from './system/backup/list/list.component';
import {DetailComponent as CategoryDetail} from "./system/category/detail/detail.component";
import {ListComponent as CategoryList} from "./system/category/list/list.component";
import {FormComponent as CategoryForm} from "./system/category/form/form.component";
import {DetailComponent as ConfigDetail} from "./system/config/detail/detail.component";
import {ListComponent as ConfigList} from "./system/config/list/list.component";
import {FormComponent as ConfigForm} from "./system/config/form/form.component";
import {DetailComponent as IdentityDetail} from './system/identity/detail/detail.component';
import {ListComponent as IdentityList} from './system/identity/list/list.component';
import {FormComponent as IdentityForm} from './system/identity/form/form.component';
import {DetailComponent as FirewallDetail} from './system/firewall/detail/detail.component';
import {ListComponent as FirewallList} from './system/firewall/list/list.component';
import {FormComponent as FirewallForm} from './system/firewall/form/form.component';
import {DetailComponent as RoleDetail} from "./system/role/detail/detail.component";
import {ListComponent as RoleList} from "./system/role/list/list.component";
import {FormComponent as RoleForm} from "./system/role/form/form.component";
import {ListComponent as TrashList} from "./system/trash/list/list.component";

import {ActionLinkComponent} from './shared/action-link/action-link.component';
import {ActionSelectorComponent} from './shared/action-selector/action-selector.component';
import {CollectionComponent} from './shared/collection/collection.component';
import {ConfigComponent} from './shared/config/config.component';
import {MapComponent} from './shared/map/map.component';
import {OperationParametersComponent} from './shared/operation-parameters/operation-parameters.component';
import {OperationThrowsComponent} from './shared/operation-throws/operation-throws.component';
import {SchemaLinkComponent} from './shared/schema-link/schema-link.component';
import {SchemaSelectorComponent} from './shared/schema-selector/schema-selector.component';
import {ScopeCategoriesComponent} from './shared/scope-categories/scope-categories.component';
import {TagEditorComponent} from './shared/tag-editor/tag-editor.component';
import {CsvPipe} from "./shared/tag-editor/csv.pipe";
import {ErrorDetailsComponent} from "./shared/error-details/error-details.component";

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavigationComponent,
    InstanceComponent,
    InstanceModalComponent,

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
    ActionForm,
    ConnectionDetail,
    ConnectionList,
    ConnectionForm,

    DatabaseTableList,
    DatabaseTableDetail,
    DatabaseTableForm,
    DatabaseTableColumn,
    DatabaseTableForeignKey,
    DatabaseTableIndex,
    DatabaseRowList,
    DatabaseRowDetail,
    DatabaseRowForm,
    FilesystemComponent,
    HttpComponent,
    SdkComponent,

    CronjobDetail,
    CronjobList,
    CronjobForm,
    TriggerDetail,
    TriggerList,
    TriggerForm,
    DashboardList,
    EventDetail,
    EventList,
    EventForm,
    OperationDetail,
    OperationList,
    OperationLog,
    OperationForm,
    SchemaDesigner,
    SchemaDetail,
    SchemaList,
    SchemaForm,

    AppDetail,
    AppList,
    AppForm,
    PageDetail,
    PageList,
    PageForm,
    FormDetail,
    FormList,
    FormForm,
    RateDetail,
    RateList,
    RateForm,
    ScopeDetail,
    ScopeList,
    ScopeForm,
    UserDetail,
    UserList,
    UserForm,
    WebhookDetail,
    WebhookList,
    WebhookForm,

    GeneratorComponent,
    MarketplaceList,
    MarketplaceDetail,
    SdkGenerate,
    SdkList,
    TestList,
    TestForm,

    PlanDetail,
    PlanList,
    PlanForm,
    TransactionDetail,
    TransactionList,

    AuditDetail,
    AuditFilter,
    AuditList,
    BackupList,
    CategoryDetail,
    CategoryList,
    CategoryForm,
    ConfigDetail,
    ConfigList,
    ConfigForm,
    IdentityForm,
    IdentityList,
    IdentityDetail,
    FirewallForm,
    FirewallList,
    FirewallDetail,
    RoleDetail,
    RoleList,
    RoleForm,
    TrashList,

    ActionLinkComponent,
    ActionSelectorComponent,
    CollectionComponent,
    ConfigComponent,
    ErrorDetailsComponent,
    MapComponent,
    OperationParametersComponent,
    OperationThrowsComponent,
    SchemaLinkComponent,
    SchemaSelectorComponent,
    ScopeCategoriesComponent,
    TagEditorComponent,
    CsvPipe,
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
    MonacoEditorModule.forRoot(EditorConfig.getConfig()),
    MarkdownModule.forRoot(),
    TypeschemaEditorModule,
    FusioSdkModule.forRoot(ConfigBuilder.build()),
    ClipboardModule,
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
