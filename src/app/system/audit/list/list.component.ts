import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendAudit} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {AuditService} from "../../../services/audit.service";

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendAudit> {

  filter: any = {};

  constructor(private service: AuditService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AuditService {
    return this.service;
  }

}
