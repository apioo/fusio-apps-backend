import {Component} from '@angular/core';
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Config, HttpResponse} from "../config";
import {LogComponent} from "../log/log.component";
import {Route_Methods} from "fusio-sdk/dist/src/generated/backend/Route_Methods";
import {Route_Method} from "fusio-sdk/dist/src/generated/backend/Route_Method";
import {Route_Method_Responses} from "fusio-sdk/dist/src/generated/backend/Route_Method_Responses";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Detail} from "ngx-fusio-sdk";
import {FusioService} from "../../../fusio.service";

@Component({
  selector: 'app-route-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<ModelRoute> {

  public baseUrl: string = '';
  public activeVersion: number = 1;
  public activeMethod: string = 'GET';

  constructor(protected fusio: FusioService, protected modalService: NgbModal) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();

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

  transformMethods(methods?: Route_Methods): Array<Route_Method> {
    return Config.transformMethods(methods, true);
  }

  transformResponses(responses?: Route_Method_Responses): Array<HttpResponse> {
    return Config.transformResponses(responses);
  }

}
