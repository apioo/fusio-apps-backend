import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendOperation} from "fusio-sdk";
import {OperationService} from "../../../services/operation.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-operation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendOperation> {

  baseUrl: string = '';

  constructor(private service: OperationService, private fusio: ApiService, public action: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): OperationService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.baseUrl = this.fusio.getBaseUrl();
  }
}
