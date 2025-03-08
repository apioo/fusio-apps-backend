import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackendDatabaseTableColumn} from "fusio-sdk";

@Component({
  selector: 'app-database-table-column',
  templateUrl: './column.component.html',
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

  result: Array<BackendDatabaseTableColumn> = [];

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
    this.result = this.filter(this.data);
  }

  add() {
    if (!this.newName || !this.newType || this.disabled) {
      return;
    }

    this.result.push({
      name: this.newName,
      type: this.newType,
      length: this.newLength,
      notNull: this.newNotNull,
    })

    this.newName = undefined;
    this.newType = 'string';
    this.newLength = undefined;
    this.newNotNull = false;
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

    this.dataChange.emit(this.filter(this.result));
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
