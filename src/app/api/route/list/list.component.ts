import {Component} from '@angular/core';
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Route_Methods} from "fusio-sdk/dist/src/generated/backend/Route_Methods";
import {Route_Method} from "fusio-sdk/dist/src/generated/backend/Route_Method";
import {Route_Method_Responses} from "fusio-sdk/dist/src/generated/backend/Route_Method_Responses";
import {DetailComponent} from "../detail/detail.component";
import {LogComponent} from "../log/log.component";
import {Config, HttpResponse} from "../config";
import {AxiosResponse} from "axios";
import {List} from "../../../list";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ProviderComponent} from "../provider/provider.component";

@Component({
  selector: 'app-route-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<ModelRoute> {

  public baseUrl: string = '';
  public activeVersion: number = 1;
  public activeMethod: string = 'GET';

  override ngOnInit(): void {
    super.ngOnInit();

    this.baseUrl = this.factory.getBaseUrl();
  }

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<ModelRoute>>> {
    const group = await this.factory.getClient().backendRoute();
    return await group.getBackendRoutes().backendActionRouteGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<ModelRoute>> {
    const group = await this.factory.getClient().backendRoute();
    return await group.getBackendRoutesByRouteId(id).backendActionRouteGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/route';
  }

  protected onList() {
  }

  protected onGet() {
    let version = Config.getActiveVersion(this.selected, this.activeVersion);
    if (version === null) {
      this.activeVersion = 1;
      version = Config.getActiveVersion(this.selected, this.activeVersion);
    }

    const method = Config.getActiveMethod(this.selected, this.activeVersion, this.activeMethod)
    if (method === null && version && version.methods) {
      this.activeMethod = Object.keys(version.methods)[0];
    }
  }

  openProviderDialog() {
    const modalRef = this.modalService.open(ProviderComponent, {
      size: 'lg'
    });
    modalRef.closed.subscribe((response) => {
      this.response = response;
    })
  }

  showLogs() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modalService.open(LogComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.route = this.selected;
  }

  transformMethods(methods?: Route_Methods): Array<Route_Method> {
    return Config.transformMethods(methods, true);
  }

  transformResponses(responses?: Route_Method_Responses): Array<HttpResponse> {
    return Config.transformResponses(responses);
  }

}
