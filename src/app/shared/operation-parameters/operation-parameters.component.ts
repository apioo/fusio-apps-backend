import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OperationParameters} from "fusio-sdk/dist/src/generated/backend/OperationParameters";

@Component({
  selector: 'app-operation-parameters',
  templateUrl: './operation-parameters.component.html',
  styleUrls: ['./operation-parameters.component.css']
})
export class OperationParametersComponent {

  @Input() name: string = 'operation-parameters';
  @Input() data?: OperationParameters = {};
  @Output() dataChange = new EventEmitter<OperationParameters>();

  result: Array<{ name?: string, type?: string, format?: string, description?: string }> = [];

  newName?: string;
  newType?: string = 'string';
  newDescription?: string;

  types = [
    {key: 'string', value: 'String'},
    {key: 'integer', value: 'Integer'},
    {key: 'number', value: 'Number'},
    {key: 'boolean', value: 'Boolean'},
  ]

  ngOnInit() {
    if (this.data) {
      this.result = [];
      for (const [key, value] of Object.entries(this.data)) {
        this.result.push({
          name: key,
          type: value.type,
          format: value.format,
          description: value.description,
        })
      }
    }
  }

  add() {
    if (!this.newName || !this.newType) {
      return;
    }

    this.result.push({
      name: this.newName,
      type: this.newType,
      description: this.newDescription,
    })

    this.newName = undefined;
    this.newType = 'string';
    this.newDescription = undefined;
  }

  remove(name?: string) {
    this.result = this.result.filter((row) => {
      return row.name !== name;
    });
  }

  changeValue() {
    const result: OperationParameters = {};
    this.result.forEach((row) => {
      if (!row.name) {
        return;
      }

      let schema = Object.assign({}, row);
      delete schema.name;
      result[row.name] = schema;
    });

    this.dataChange.emit(result);
  }

}
