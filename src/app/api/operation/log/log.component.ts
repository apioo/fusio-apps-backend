import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {BackendLog, BackendLogCollection, BackendOperation} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-operation-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() operation?: BackendOperation;

  logs?: BackendLogCollection;

  constructor(public modal: NgbActiveModal, private fusio: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (!this.operation) {
      return
    }

    this.logs = await this.fusio.getClient().backend().log().getAll(0, 16, '', undefined, undefined, this.operation.id);
  }

  detail(log: BackendLog) {
    this.modal.close();
    this.router.navigate(['/log', log.id]);
  }

}
