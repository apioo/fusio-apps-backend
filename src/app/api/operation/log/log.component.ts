import {Component, input, Input, OnInit, signal} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {BackendLog, BackendLogCollection, BackendOperation, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";

@Component({
  selector: 'app-operation-log',
  templateUrl: './log.component.html',
  imports: [
    MessageComponent
  ],
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  operation = input.required<BackendOperation>();

  logs = signal<BackendLogCollection|undefined>(undefined);

  response = signal<CommonMessage|undefined>(undefined);

  constructor(public modal: NgbActiveModal, private fusio: ApiService, private router: Router, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    try {
      const logs = await this.fusio.getClient().backend().log().getAll(0, 16, '', undefined, undefined, this.operation().id)
      this.logs.set(logs);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  detail(log: BackendLog) {
    this.modal.close();
    this.router.navigate(['/log', log.id]);
  }

}
