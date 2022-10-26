import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";
import {Router} from "@angular/router";
import {LogCollection} from "fusio-sdk/dist/src/generated/backend/LogCollection";
import {LogCollectionQuery} from "fusio-sdk/dist/src/generated/backend/LogCollectionQuery";
import {BackendService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-route-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() route?: ModelRoute;

  logs?: LogCollection;

  constructor(public modal: NgbActiveModal, private backend: BackendService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (!this.route) {
      return
    }

    const query: LogCollectionQuery = {
      routeId: this.route.id
    };

    const log = await this.backend.getClient().getBackendLog();
    const response = await log.backendActionLogGetAll(query);

    this.logs = response.data;
  }

  detail(log: Log) {
    this.modal.close();
    this.router.navigate(['/log', log.id]);
  }

}
