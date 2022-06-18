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
import {Route_Version} from "fusio-sdk/dist/src/generated/backend/Route_Version";
import {CreateComponent} from "../create/create.component";
import {UpdateComponent} from "../update/update.component";
import {DeleteComponent} from "../delete/delete.component";
import {ProviderComponent} from "../provider/provider.component";
import {LogComponent} from "../log/log.component";
import {Response} from "../../message/message.component";
import {Config, HttpResponse} from "../config";

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
  public activeVersion: number = 1;
  public activeMethod: string = 'GET';
  public response?: Response;

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
    const modalRef = this.modalService.open(CreateComponent, {
      size: 'lg'
    });
    modalRef.closed.subscribe((response) => {
      this.response = response;
    })
  }

  openUpdateDialog() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modalService.open(UpdateComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.route = this.selected;
    modalRef.closed.subscribe((response) => {
      this.response = response;
    })

  }

  openDeleteDialog() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modalService.open(DeleteComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.route = this.selected;
    modalRef.closed.subscribe((response) => {
      this.response = response;
    })
  }

  openProviderDialog() {
    const modalRef = this.modalService.open(ProviderComponent);
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

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  showPreview(schema?: string) {
    if (!schema) {
      return;
    }

  }

  transformMethods(methods?: Route_Methods): Array<Route_Method> {
    return Config.transformMethods(methods, true);
  }

  transformResponses(responses?: Route_Method_Responses): Array<HttpResponse> {
    return Config.transformResponses(responses);
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
