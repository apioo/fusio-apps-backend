import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";
import {Router} from "@angular/router";
import {LogCollection} from "fusio-sdk/dist/src/generated/backend/LogCollection";
import {BackendService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-operation-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() operation?: Operation;

  logs?: LogCollection;

  constructor(public modal: NgbActiveModal, private backend: BackendService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (!this.operation) {
      return
    }

    this.logs = await this.backend.getClient().log().getAll(0, 16, '', undefined, undefined, this.operation.id);
  }

  detail(log: Log) {
    this.modal.close();
    this.router.navigate(['/log', log.id]);
  }

}
