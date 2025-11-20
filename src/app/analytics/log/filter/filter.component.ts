import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OperationService} from "../../../services/operation.service";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
import {Filter} from "../list/list.component";
import {FormAutocompleteComponent} from "ngx-fusio-sdk";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-log-filter',
  templateUrl: './filter.component.html',
  imports: [
    FormAutocompleteComponent,
    FormsModule
  ],
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input()
  filter!: Filter;

  constructor(public operation: OperationService, public app: AppService, public user: UserService, public modal: NgbActiveModal) { }

  async doSubmit() {
    this.modal.close(this.filter);
  }

  doReset() {
    this.filter = {
      from: undefined,
      to: undefined,
      operationId: undefined,
      appId: undefined,
      userId: undefined,
      ip: undefined,
      userAgent: undefined,
      method: undefined,
      path: undefined,
      header: undefined,
      body: undefined,
    };
  }

}
