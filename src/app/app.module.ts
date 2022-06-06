import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ListComponent } from './action/list/list.component';
import { CreateComponent } from './action/create/create.component';
import { DeleteComponent } from './action/delete/delete.component';
import { UpdateComponent } from './action/update/update.component';
import { DesignerComponent } from './action/designer/designer.component';
import { DetailComponent } from './audit/detail/detail.component';
import { FilterComponent } from './audit/filter/filter.component';
import { ErrorComponent } from './cronjob/error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LogComponent } from './route/log/log.component';
import { ProviderComponent } from './route/provider/provider.component';
import { ChangelogComponent } from './route/provider/changelog/changelog.component';
import { PreviewComponent } from './schema/preview/preview.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    ListComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
    DesignerComponent,
    DetailComponent,
    FilterComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    LogComponent,
    ProviderComponent,
    ChangelogComponent,
    PreviewComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
