import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackendOperationParameters} from "fusio-sdk";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-operation-parameters',
  templateUrl: './operation-parameters.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./operation-parameters.component.css']
})
export class OperationParametersComponent implements OnInit {

  @Input() name: string = 'operation-parameters';
  @Input() disabled: boolean = false;
  @Input() data?: BackendOperationParameters = {};
  @Output() dataChange = new EventEmitter<BackendOperationParameters>();

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
    if (!this.newName || !this.newType || this.disabled) {
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
    if (this.disabled) {
      return;
    }

    this.result = this.result.filter((row) => {
      return row.name !== name;
    });
  }

  changeValue() {
    if (this.disabled) {
      return;
    }

    const result: BackendOperationParameters = {};
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
