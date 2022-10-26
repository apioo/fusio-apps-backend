import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";
import {Router} from "@angular/router";
import {FusioService} from "../../../fusio.service";
import {LogCollection} from "fusio-sdk/dist/src/generated/backend/LogCollection";
import {LogCollectionQuery} from "fusio-sdk/dist/src/generated/backend/LogCollectionQuery";

@Component({
  selector: 'app-route-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() route?: ModelRoute;

  logs?: LogCollection;

  constructor(public modal: NgbActiveModal, private fusio: FusioService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (!this.route) {
      return
    }

    const query: LogCollectionQuery = {
      routeId: this.route.id
    };

    const log = await this.fusio.getClient().getBackendLog();
    const response = await log.backendActionLogGetAll(query);

    this.logs = response.data;
  }

  detail(log: Log) {
    this.modal.close();
    this.router.navigate(['/log', log.id]);
  }

}
