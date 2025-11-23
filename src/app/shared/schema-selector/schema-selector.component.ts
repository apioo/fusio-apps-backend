import {
  AfterContentChecked,
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  output,
  Output,
  signal
} from '@angular/core';
import {SchemaService} from "../../services/schema.service";
import {FormsModule} from "@angular/forms";
import {FormAutocompleteComponent} from "ngx-fusio-sdk";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-schema-selector',
  templateUrl: './schema-selector.component.html',
  imports: [
    FormsModule,
    FormAutocompleteComponent,
    NgbPopover
  ],
  styleUrls: ['./schema-selector.component.css']
})
export class SchemaSelectorComponent implements AfterContentChecked {

  name = input.required<string>();
  data = input.required<string|undefined>();
  disabled = input<boolean>(false);
  dataChange = output<string>();

  scheme = signal<string>('');
  value = signal<string>('');

  schemes = [{
    key: 'schema',
    value: 'Schema'
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
  }, {
    key: 'mime',
    value: 'Content-Type'
  }/*, {
    key: 'typehub',
    value: 'TypeHub'
  }*/];

  constructor(public schema: SchemaService) {
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
      this.scheme.set('schema');
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
