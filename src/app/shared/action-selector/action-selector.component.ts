import {AfterContentChecked, AfterContentInit, Component, computed, input, OnInit, output, signal} from '@angular/core';
import {ActionService} from "../../services/action.service";
import {FormsModule} from "@angular/forms";
import {FormAutocompleteComponent} from "ngx-fusio-sdk";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-action-selector',
  templateUrl: './action-selector.component.html',
  imports: [
    FormsModule,
    FormAutocompleteComponent,
    NgbPopover
  ],
  styleUrls: ['./action-selector.component.css']
})
export class ActionSelectorComponent implements AfterContentChecked {

  name = input.required<string>();
  data = input.required<string|undefined>();
  disabled = input<boolean>(false);
  dataChange = output<string>();

  scheme = signal<string>('');
  value = signal<string>('');

  schemes = [{
    key: 'action',
    value: 'Action'
  }, {
    key: 'php+class',
    value: 'Class'
  }, {
    key: 'http',
    value: 'HTTP'
  }, {
    key: 'https',
    value: 'HTTPS'
  }, {
    key: 'file',
    value: 'File'
  }];

  constructor(public action: ActionService) {
  }

  ngAfterContentChecked() {
    const data = this.data();
    if (data) {
      const pos = data.indexOf('://');
      if (pos > 0) {
        this.scheme.set(data.substring(0, pos));
        this.value.set(data.substring(pos + 3));
      }
    }
    if (!this.scheme()) {
      this.scheme.set('action');
    }
  }

  changeScheme() {
    if (this.disabled()) {
      return;
    }

    this.value.set('');

    this.dataChange.emit(this.scheme() + '://' + this.value());
  }

  changeValue() {
    if (this.disabled()) {
      return;
    }

    this.dataChange.emit(this.scheme() + '://' + this.value());
  }

}
