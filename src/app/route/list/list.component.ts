import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../factory.service";
import {Collection_Category_Query} from "fusio-sdk/src/generated/backend/Collection_Category_Query";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {HelpService} from "../../help.service";
import {Route_Methods} from "fusio-sdk/dist/src/generated/backend/Route_Methods";
import {Route_Method} from "fusio-sdk/dist/src/generated/backend/Route_Method";
import {Route_Method_Responses} from "fusio-sdk/dist/src/generated/backend/Route_Method_Responses";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public baseUrl: string = '';
  public search: string = '';
  public totalResults: number = 0;
  public routes: Array<ModelRoute> = [];
  public selected?: ModelRoute = undefined;
  public page: number = 1;
  public pageSize: number = 16;

  constructor(private factory: FactoryService, private help: HelpService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
  }

  async ngOnInit(): Promise<void> {
    this.baseUrl = this.factory.getBaseUrl();

    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = parseInt(params['page']);
      }
      if (params['search']) {
        this.search = params['search'];
      }

      this.doList();
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.get(id);
      }
    });
  }

  async doList() {
    const route = await this.factory.getClient().backendRoute();

    let query: Collection_Category_Query = {};
    query.startIndex = (this.page - 1) * this.pageSize;
    query.count = this.pageSize;
    if (this.search) {
      query.search = this.search;
    }

    const response = await route.getBackendRoutes().backendActionRouteGetAll(query);

    this.totalResults = response.data.totalResults || 0;
    this.routes = response.data.entry || [];
  }

  async get(id: string) {
    const route = await this.factory.getClient().backendRoute();
    const response = await route.getBackendRoutesByRouteId(id).backendActionRouteGet();

    this.selected = response.data;
  }

  doSearch() {
    if (this.selected) {
      this.router.navigate(['/route', this.selected.id], {
        queryParams: this.getQueryParams()
      });
    } else {
      this.router.navigate(['/route'], {
        queryParams: this.getQueryParams()
      });
    }
    return false;
  }

  openCreateDialog() {

  }

  openUpdateDialog(route?: ModelRoute) {
    if (!route) {
      return;
    }
  }

  openDeleteDialog(route?: ModelRoute) {
    if (!route) {
      return;
    }

  }

  openProviderDialog() {

  }

  showLogs(route?: ModelRoute) {
    if (!route) {
      return;
    }

  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  showPreview(schema?: string) {
    if (!schema) {
      return;
    }

  }

  transformMethods(methods?: Route_Methods): Array<Route_Method> {
    if (!methods) {
      return [];
    }

    let result = [];
    for (const [methodName, value] of Object.entries(methods)) {
      if (value.active !== true) {
        continue;
      }
      let method = value;
      method.method = methodName;
      result.push(method);
    }

    return result;
  }

  transformResponses(responses?: Route_Method_Responses): Array<{ code: number, schema: string }> {
    if (!responses) {
      return [];
    }

    let result = [];
    for (const [key, value] of Object.entries(responses)) {
      result.push({
        code: parseInt(key),
        schema: value,
      });
    }

    return result;
  }

  getQueryParams(): QueryParams {
    const queryParams: QueryParams = {};

    if (this.page) {
      queryParams.page = this.page;
    }

    if (this.search) {
      queryParams.search = this.search;
    }

    return queryParams;
  }

}

interface QueryParams {
  page?: number
  search?: string
}
