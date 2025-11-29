import {Component, effect, EventEmitter, input, Input, OnInit, output, Output, signal} from '@angular/core';
import {BackendDatabaseTableIndex} from "fusio-sdk";
import {FormsModule} from "@angular/forms";
import {CsvPipe} from "../../../../../shared/tag-editor/csv.pipe";

@Component({
  selector: 'app-connection-database-table-index',
  templateUrl: './index.component.html',
  imports: [
    FormsModule,
    CsvPipe
  ],
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  name = input<string>('table-index');
  disabled = input<boolean>(false);
  data = input<Array<BackendDatabaseTableIndex>>([]);
  dataChange = output<Array<BackendDatabaseTableIndex>>();

  newName = signal<string|undefined>(undefined);
  newUnique = signal<boolean>(false);
  newColumns = signal<Array<string>|undefined>(undefined);

  result = signal<Array<BackendDatabaseTableIndex>>([]);

  constructor() {
    effect(() => {
      this.result.set(this.filter(this.data()));
    });
  }

  add() {
    const newName = this.newName();
    const newColumns = this.newColumns();
    if (!newName || !newColumns || this.disabled()) {
      return;
    }

    this.result.update((columns) => {
      columns.push({
        name: newName,
        unique: this.newUnique(),
        columns: newColumns,
      });
      return columns;
    });

    this.newName.set(undefined);
    this.newUnique.set(false);
    this.newColumns.set(undefined);

    this.changeValue();
  }

  setName(index:number, name: string) {
    this.result.update((indexes) => {
      indexes[index].name = name;
      return indexes;
    });

    this.changeValue();
  }

  setUnique(index:number, unique: boolean) {
    this.result.update((indexes) => {
      indexes[index].unique = unique;
      return indexes;
    });

    this.changeValue();
  }

  setColumns(index:number, columns: string) {
    this.result.update((indexes) => {
      indexes[index].columns = this.parseCsv(columns);
      return indexes;
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

  private filter(result: Array<BackendDatabaseTableIndex>) {
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
