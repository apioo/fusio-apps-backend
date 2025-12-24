import {Component, effect, EventEmitter, input, Input, OnInit, output, Output, signal} from '@angular/core';
import {BackendDatabaseTableColumn} from "fusio-sdk";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-connection-database-table-column',
  templateUrl: './column.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  name = input<string>('table-columns');
  disabled = input<boolean>(false);
  data = input<Array<BackendDatabaseTableColumn>>([]);
  dataChange = output<Array<BackendDatabaseTableColumn>>();

  newName = signal<string|undefined>(undefined);
  newType = signal<string|undefined>('string');
  newLength = signal<number|undefined>(undefined);
  newNotNull = signal<boolean>(false);

  result = signal<Array<BackendDatabaseTableColumn>>([]);

  types = [
    {key: 'smallint', value: 'SmallInt'},
    {key: 'integer', value: 'Integer'},
    {key: 'bigint', value: 'BigInt'},
    {key: 'string', value: 'String'},
    {key: 'text', value: 'Text'},
    {key: 'guid', value: 'GUID'},
    {key: 'binary', value: 'Binary'},
    {key: 'blob', value: 'Blob'},
    {key: 'boolean', value: 'Boolean'},
    {key: 'date', value: 'Date'},
    {key: 'datetime', value: 'DateTime'},
    {key: 'time', value: 'Time'},
    {key: 'simple_array', value: 'SimpleArray'},
    {key: 'json', value: 'JSON'},
  ]

  constructor() {
    effect(() => {
      this.result.set(this.filter(this.data()));
    });
  }

  add() {
    const newName = this.newName();
    const newType = this.newType();
    if (!newName || !newType || this.disabled()) {
      return;
    }

    this.result.update((columns) => {
      columns.push({
        name: newName,
        type: newType,
        length: this.newLength(),
        notNull: this.newNotNull(),
      });
      return columns;
    });

    this.newName.set(undefined);
    this.newType.set('string');
    this.newLength.set(undefined);
    this.newNotNull.set(false);

    this.changeValue();
  }

  setName(index:number, name: string) {
    this.result.update((columns) => {
      columns[index].name = name;
      return columns;
    });

    this.changeValue();
  }

  setType(index:number, type: string) {
    this.result.update((columns) => {
      columns[index].type = type;
      return columns;
    });

    this.changeValue();
  }

  setLength(index:number, length?: number) {
    this.result.update((columns) => {
      columns[index].length = length;
      return columns;
    });

    this.changeValue();
  }

  setNotNull(index:number, notNull: boolean) {
    this.result.update((columns) => {
      columns[index].notNull = notNull;
      return columns;
    });

    this.changeValue();
  }

  setAutoIncrement(index:number, autoIncrement: boolean) {
    this.result.update((columns) => {
      columns[index].autoIncrement = autoIncrement;
      return columns;
    });

    this.changeValue();
  }

  remove(name?: string) {
    if (this.disabled()) {
      return;
    }

    this.result.update((columns) => {
      columns = columns.filter((row) => {
        return row.name !== name;
      });
      return columns;
    });

    this.changeValue();
  }

  changeValue() {
    if (this.disabled()) {
      return;
    }

    this.dataChange.emit(this.filter(this.result()));
  }

  private filter(result: Array<BackendDatabaseTableColumn>) {
    return result.map((column) => {
      if (column.length === null) {
        delete column.length;
      }
      if (column.precision === null) {
        delete column.precision;
      }
      if (column.scale === null) {
        delete column.scale;
      }
      if (column.unsigned === null) {
        delete column.unsigned;
      }
      if (column.fixed === null) {
        delete column.fixed;
      }
      if (column.notNull === null) {
        delete column.notNull;
      }
      if (column.autoIncrement === null) {
        delete column.autoIncrement;
      }
      if (column.default === null) {
        delete column.default;
      }
      if (column.comment === null) {
        delete column.comment;
      }

      return column;
    });
  }

}
