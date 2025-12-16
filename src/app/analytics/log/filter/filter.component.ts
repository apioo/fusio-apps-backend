import {Component, Input, OnInit, signal} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OperationService} from "../../../services/operation.service";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
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
export class FilterComponent implements OnInit {

  @Input()
  filter!: Array<any>;

  result = signal<Array<any>>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  constructor(public operation: OperationService, public app: AppService, public user: UserService, public modal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.result.set(this.filter);
  }

  async doSubmit() {
    this.modal.close(this.result());
  }

  doReset() {
    this.result.set([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    this.doSubmit();
  }

  set(key: number, value: any) {
    this.result.update((filter) => {
      filter[key] = value;
      return filter;
    });
  }

}
