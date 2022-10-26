import {Component} from '@angular/core';
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Config, HttpResponse} from "../config";
import {LogComponent} from "../log/log.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BackendService, Detail} from "ngx-fusio-sdk";
import {RouteMethods} from "fusio-sdk/dist/src/generated/backend/RouteMethods";
import {RouteMethod} from "fusio-sdk/dist/src/generated/backend/RouteMethod";
import {RouteMethodResponses} from "fusio-sdk/dist/src/generated/backend/RouteMethodResponses";

@Component({
  selector: 'app-route-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<ModelRoute> {

  public baseUrl: string = '';
  public activeVersion: number = 1;
  public activeMethod: string = 'GET';

  constructor(private backend: BackendService, protected modalService: NgbModal) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.baseUrl = this.backend.getBaseUrl();

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

  showLogs() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modalService.open(LogComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.route = this.selected;
  }

  transformMethods(methods?: RouteMethods): Array<RouteMethod> {
    return Config.transformMethods(methods, true);
  }

  transformResponses(responses?: RouteMethodResponses): Array<HttpResponse> {
    return Config.transformResponses(responses);
  }

}
