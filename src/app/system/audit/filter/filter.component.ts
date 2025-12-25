import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
import {Filter} from "../list/list.component";
import {FormsModule} from "@angular/forms";
import {FormAutocompleteComponent} from "ngx-fusio-sdk";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  imports: [
    FormsModule,
    FormAutocompleteComponent
  ],
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input()
  filter!: Filter;

  constructor(public app: AppService, public user: UserService, public modal: NgbActiveModal) { }

  async doSubmit() {
    this.modal.close(this.filter);
  }

  doReset() {
    this.filter = {
      from: undefined,
      to: undefined,
      appId: undefined,
      userId: undefined,
      event: undefined,
      ip: undefined,
      message: undefined,
    };
  }

}
