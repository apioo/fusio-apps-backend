import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {FactoryService} from "../../factory.service";
import {Log_Collection_Query} from "fusio-sdk/dist/src/generated/backend/Log_Collection_Query";
import {Log_Collection} from "fusio-sdk/dist/src/generated/backend/Log_Collection";
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";

@Component({
  selector: 'app-route-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() route?: ModelRoute;

  logs?: Log_Collection;

  constructor(public modal: NgbActiveModal, private factory: FactoryService) { }

  async ngOnInit(): Promise<void> {
    if (!this.route) {
      return
    }

    const query: Log_Collection_Query = {
      routeId: this.route.id
    };

    const log = await this.factory.getClient().backendLog();
    const response = await log.getBackendLog().backendActionLogGetAll(query);

    this.logs = response.data;
  }

  detail(log: Log) {

  }

}
