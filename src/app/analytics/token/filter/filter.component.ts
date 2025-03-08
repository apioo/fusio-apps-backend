import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BackendApp, BackendUser} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-token-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input()
  filter!: any;

  constructor(protected backend: ApiService, public app: AppService, public user: UserService, public modal: NgbActiveModal) { }

  async doSubmit() {
    this.modal.close(this.filter);
  }

}
