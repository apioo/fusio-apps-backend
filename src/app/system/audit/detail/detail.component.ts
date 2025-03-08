import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendAudit} from "fusio-sdk";
import {AuditService} from "../../../services/audit.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-audit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAudit> {

  constructor(private service: AuditService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AuditService {
    return this.service;
  }

}
