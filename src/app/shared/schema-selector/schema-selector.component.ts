import {Component} from '@angular/core';
import {BackendSchema} from "fusio-sdk";
import {ObjectSelector} from "ngx-fusio-sdk";
import {BackendSchemaCollection} from "fusio-sdk";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-schema-selector',
  templateUrl: './schema-selector.component.html',
  styleUrls: ['./schema-selector.component.css']
})
export class SchemaSelectorComponent extends ObjectSelector<BackendSchema, string> {

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

  constructor(private fusio: ApiService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    if (this.data) {
      const pos = this.data.indexOf('://');
      if (pos > 0) {
        this.scheme = this.data.substring(0, pos);
        this.value = this.data.substring(pos + 3);

        if (this.scheme === 'schema') {
          this.selected = await this.fusio.getClient().backend().schema().get('~' + this.value);
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

  protected async getAll(parameters: Array<any>): Promise<BackendSchemaCollection> {
    return this.fusio.getClient().backend().schema().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendSchema> {
    return this.fusio.getClient().backend().schema().get(id);
  }

}
