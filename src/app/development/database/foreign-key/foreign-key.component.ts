import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackendDatabaseTableForeignKeyConstraint} from "fusio-sdk";

@Component({
  selector: 'app-database-foreign-key',
  templateUrl: './foreign-key.component.html',
  styleUrls: ['./foreign-key.component.css']
})
export class ForeignKeyComponent implements OnInit {
  @Input() name: string = 'table-foreign-key';
  @Input() disabled: boolean = false;
  @Input() data: Array<BackendDatabaseTableForeignKeyConstraint> = [];
  @Output() dataChange = new EventEmitter<Array<BackendDatabaseTableForeignKeyConstraint>>();

  newName?: string;
  newForeignTable?: string;
  newLocalColumnNames: Array<string> = [];
  newForeignColumnNames: Array<string> = [];

  result: Array<BackendDatabaseTableForeignKeyConstraint> = [];

  ngOnInit(): void {
    this.result = this.filter(this.data);
  }

  add() {
    if (!this.newName || !this.newForeignTable || this.disabled) {
      return;
    }

    this.result.push({
      name: this.newName,
      foreignTable: this.newForeignTable,
      localColumnNames: this.newLocalColumnNames,
      foreignColumnNames: this.newForeignColumnNames,
    })

    this.newName = undefined;
    this.newForeignTable = undefined;
    this.newLocalColumnNames = [];
    this.newForeignColumnNames = [];
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

  private filter(result: Array<BackendDatabaseTableForeignKeyConstraint>) {
    return result;
  }

  parseCsv(data?: string): Array<string> {
    if (!data) {
      return [];
    }

    return data.split(',').map((el) => {
      return el.trim();
    }).filter(Boolean);
  }

}
