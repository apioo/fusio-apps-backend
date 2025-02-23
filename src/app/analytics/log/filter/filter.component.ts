import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BackendApp, BackendOperation, BackendUser} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {OperationService} from "../../../services/operation.service";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-log-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input()
  filter!: Array<any>;

  constructor(private fusio: ApiService, public operation: OperationService, public app: AppService, public user: UserService, public modal: NgbActiveModal) { }

  async doSubmit() {
    this.modal.close(this.filter);
  }

}
