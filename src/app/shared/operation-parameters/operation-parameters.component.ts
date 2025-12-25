import {Component, effect, input, output, signal} from '@angular/core';
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
export class OperationParametersComponent {

  name = input<string>('operation-parameters');
  disabled = input<boolean>(false);
  data = input<BackendOperationParameters|undefined>({});
  dataChange = output<BackendOperationParameters>();

  result = signal<Array<{ name?: string, type?: string, format?: string, description?: string }>>([]);

  newName = signal<string>('');
  newType= signal<string>('string');
  newDescription = signal<string>('');

  types = [
    {key: 'string', value: 'String'},
    {key: 'integer', value: 'Integer'},
    {key: 'number', value: 'Number'},
    {key: 'boolean', value: 'Boolean'},
  ]

  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        const result = [];
        for (const [key, value] of Object.entries(data)) {
          result.push({
            name: key,
            type: value.type,
            format: value.format,
            description: value.description,
          })
        }

        this.result.set(result);
      }
    });
  }

  add() {
    if (!this.newName() || !this.newType() || this.disabled()) {
      return;
    }

    this.result.update((entries) => {
      entries.push({
        name: this.newName(),
        type: this.newType(),
        description: this.newDescription(),
      });
      return entries;
    });

    this.newName.set('');
    this.newType.set('string');
    this.newDescription.set('');
  }

  setName(index: number, name: string) {
    this.result.update((entries) => {
      entries[index].name = name;
      return entries;
    });
  }

  setType(index: number, type: string) {
    this.result.update((entries) => {
      entries[index].type = type;
      return entries;
    });
  }

  setDescription(index: number, description: string) {
    this.result.update((entries) => {
      entries[index].description = description;
      return entries;
    });
  }

  remove(name?: string) {
    if (this.disabled()) {
      return;
    }

    this.result.update((entries) => {
      return entries.filter((row) => {
        return row.name !== name;
      });
    });
  }

  changeValue() {
    if (this.disabled()) {
      return;
    }

    const result: BackendOperationParameters = {};
    this.result().forEach((row) => {
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
