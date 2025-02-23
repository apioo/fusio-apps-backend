import {Component} from '@angular/core';
import {FormAutocompleteComponent} from "ngx-fusio-sdk";
import {SchemaService} from "../../services/schema.service";

@Component({
  selector: 'app-schema-selector',
  templateUrl: './schema-selector.component.html',
  styleUrls: ['./schema-selector.component.css']
})
export class SchemaSelectorComponent extends FormAutocompleteComponent {

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
  }/*, {
    key: 'typehub',
    value: 'TypeHub'
  }*/];

  scheme: string = '';
  value: string = '';

  constructor(private schema: SchemaService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    if (this.data) {
      const pos = this.data.indexOf('://');
      if (pos > 0) {
        this.scheme = this.data.substring(0, pos);
        this.value = this.data.substring(pos + 3);

        if (this.scheme === 'schema') {
          this.selected = await this.schema.getWithIdAndName('~' + this.value);
        }
      }
    }
    if (!this.scheme) {
      this.scheme = 'schema';
    }
  }

  changeScheme() {
    if (this.disabled) {
      return;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

  override changeValue() {
    if (this.disabled) {
      return;
    }

    if (this.scheme === 'schema' && this.selected?.name) {
      this.value = this.selected?.name;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

}
