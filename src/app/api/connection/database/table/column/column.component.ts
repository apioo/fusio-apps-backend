import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
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
export class ColumnComponent implements OnInit {
  @Input() name: string = 'table-columns';
  @Input() disabled: boolean = false;
  @Input() data: Array<BackendDatabaseTableColumn> = [];
  @Output() dataChange = new EventEmitter<Array<BackendDatabaseTableColumn>>();

  newName?: string;
  newType?: string = 'string';
  newLength?: number;
  newNotNull?: boolean = false;

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

  ngOnInit(): void {
    this.result.set(this.filter(this.data));
  }

  add() {
    if (!this.newName || !this.newType || this.disabled) {
      return;
    }

    this.result.update((columns) => {
      columns.push({
        name: this.newName,
        type: this.newType,
        length: this.newLength,
        notNull: this.newNotNull,
      });
      return columns;
    });

    this.newName = undefined;
    this.newType = 'string';
    this.newLength = undefined;
    this.newNotNull = false;
  }

  remove(name?: string) {
    if (this.disabled) {
      return;
    }

    this.result.update((columns) => {
      columns = columns.filter((row) => {
        return row.name !== name;
      });
      return columns;
    });
  }

  changeValue() {
    if (this.disabled) {
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
