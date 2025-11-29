import {Component, effect, EventEmitter, input, Input, OnInit, output, Output, signal} from '@angular/core';
import {BackendDatabaseTableForeignKeyConstraint} from "fusio-sdk";
import {FormsModule} from "@angular/forms";
import {CsvPipe} from "../../../../../shared/tag-editor/csv.pipe";

@Component({
  selector: 'app-connection-database-table-foreign-key',
  templateUrl: './foreign-key.component.html',
  imports: [
    FormsModule,
    CsvPipe
  ],
  styleUrls: ['./foreign-key.component.css']
})
export class ForeignKeyComponent {
  name = input<string>('table-foreign-key');
  disabled = input<boolean>(false);
  data = input<Array<BackendDatabaseTableForeignKeyConstraint>>([]);
  dataChange = output<Array<BackendDatabaseTableForeignKeyConstraint>>();

  newName = signal<string|undefined>(undefined);
  newForeignTable = signal<string|undefined>(undefined);
  newLocalColumnNames = signal<Array<string>>([]);
  newForeignColumnNames = signal<Array<string>>([]);

  result = signal<Array<BackendDatabaseTableForeignKeyConstraint>>([]);

  constructor() {
    effect(() => {
      this.result.set(this.filter(this.data()));
    });
  }

  add() {
    const newName = this.newName();
    const newForeignTable = this.newForeignTable();
    if (!newName || !newForeignTable || this.disabled()) {
      return;
    }

    this.result.update((keys) => {
      keys.push({
        name: newName,
        foreignTable: newForeignTable,
        localColumnNames: this.newLocalColumnNames(),
        foreignColumnNames: this.newForeignColumnNames(),
      });
      return keys;
    });

    this.newName.set(undefined);
    this.newForeignTable.set(undefined);
    this.newLocalColumnNames.set([]);
    this.newForeignColumnNames.set([]);

    this.changeValue();
  }

  setName(index:number, name: string) {
    this.result.update((keys) => {
      keys[index].name = name;
      return keys;
    });

    this.changeValue();
  }

  setForeignTable(index:number, foreignTable: string) {
    this.result.update((keys) => {
      keys[index].foreignTable = foreignTable;
      return keys;
    });

    this.changeValue();
  }

  setLocalColumnNames(index:number, localColumnNames: string) {
    this.result.update((keys) => {
      keys[index].localColumnNames = this.parseCsv(localColumnNames);
      return keys;
    });

    this.changeValue();
  }

  setForeignColumnNames(index:number, foreignColumnNames: string) {
    this.result.update((keys) => {
      keys[index].foreignColumnNames = this.parseCsv(foreignColumnNames);
      return keys;
    });

    this.changeValue();
  }

  remove(name?: string) {
    if (this.disabled()) {
      return;
    }

    this.result.update((keys) => {
      return keys.filter((row) => {
        return row.name !== name;
      });
    });

    this.changeValue();
  }

  changeValue() {
    if (this.disabled()) {
      return;
    }

    this.dataChange.emit(this.filter(this.result()));
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
