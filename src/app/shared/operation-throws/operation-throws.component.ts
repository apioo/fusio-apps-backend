import {Component, effect, EventEmitter, input, Input, OnInit, output, Output, signal} from '@angular/core';
import {BackendOperationThrows} from "fusio-sdk";
import {SchemaService} from "../../services/schema.service";
import {FormsModule} from "@angular/forms";
import {SchemaSelectorComponent} from "../schema-selector/schema-selector.component";

@Component({
  selector: 'app-operation-throws',
  templateUrl: './operation-throws.component.html',
  imports: [
    FormsModule,
    SchemaSelectorComponent
  ],
  styleUrls: ['./operation-throws.component.css']
})
export class OperationThrowsComponent {

  name = input<string>('operation-throws');
  disabled = input<boolean>(false);
  data = input<BackendOperationThrows|undefined>({});
  dataChange = output<BackendOperationThrows>();

  result = signal<Array<{ code: number, schema: string }>>([]);

  newCode = signal<number|undefined>(undefined);

  errorStatusCodes = [
    {key: 0, value: ''},
    {key: 400, value: 'Bad Request'},
    {key: 402, value: 'Payment Required'},
    {key: 403, value: 'Forbidden'},
    {key: 404, value: 'Not Found'},
    {key: 405, value: 'Method Not Allowed'},
    {key: 408, value: 'Request Timeout'},
    {key: 409, value: 'Conflict'},
    {key: 410, value: 'Gone'},
    {key: 412, value: 'Precondition Failed'},
    {key: 417, value: 'Expectation Failed'},
    {key: 422, value: 'Unprocessable Entity'},
    {key: 423, value: 'Locked'},
    {key: 424, value: 'Failed Dependency'},
    {key: 429, value: 'Too Many Requests'},
    {key: 499, value: '4xx'},
    {key: 500, value: 'Internal Server Error'},
    {key: 501, value: 'Not Implemented'},
    {key: 502, value: 'Bad Gateway'},
    {key: 503, value: 'Service Unavailable'},
    {key: 504, value: 'Gateway Timeout'},
    {key: 507, value: 'Insufficient Storage'},
    {key: 508, value: 'Loop Detected'},
    {key: 599, value: '5xx'},
    {key: 999, value: 'All errors'},
  ]

  constructor(public schema: SchemaService) {
    effect(() => {
      const data = this.data();
      if (data) {
        const result = [];
        for (const [key, value] of Object.entries(data)) {
          result.push({
            code: parseInt(key),
            schema: value,
          })
        }

        this.result.set(result);
      }
    });
  }

  add() {
    const newCode = this.newCode();
    if (!newCode || this.disabled()) {
      return;
    }

    this.result.update((entries) => {
      entries.push({
        code: newCode,
        schema: ''
      });
      return entries;
    });

    this.newCode.set(undefined);
  }

  setCode(index: number, code: number) {
    this.result.update((entries) => {
      entries[index].code = code;
      return entries;
    });
  }

  setSchema(index: number, schema: string) {
    this.result.update((entries) => {
      entries[index].schema = schema;
      return entries;
    });
  }

  remove() {
    if (this.disabled()) {
      return;
    }

    this.result.update((entries) => {
      return entries.filter((row) => {
        return row.code !== 0;
      });
    });
  }

  getNotUsedCodes() {
    return this.errorStatusCodes.filter((code) => {
      const selected = this.result().find((row) => {
        return row.code === code.key;
      });
      return !selected;
    });
  }

  changeValue() {
    if (this.disabled()) {
      return;
    }

    const result: BackendOperationThrows = {};
    this.result().forEach((row) => {
      result[row.code] = row.schema;
    });

    this.dataChange.emit(result);
  }

}
