import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
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
export class IndexComponent implements OnInit {
  @Input() name: string = 'table-index';
  @Input() disabled: boolean = false;
  @Input() data: Array<BackendDatabaseTableIndex> = [];
  @Output() dataChange = new EventEmitter<Array<BackendDatabaseTableIndex>>();

  newName?: string;
  newUnique?: boolean = false;
  newColumns?: Array<string>;

  result = signal<Array<BackendDatabaseTableIndex>>([]);

  ngOnInit(): void {
    this.result.set(this.filter(this.data));
  }

  add() {
    if (!this.newName || !this.newColumns || this.disabled) {
      return;
    }

    this.result.update((columns) => {
      columns.push({
        name: this.newName,
        unique: this.newUnique,
        columns: this.newColumns,
      });
      return columns;
    });

    this.newName = undefined;
    this.newUnique = false;
    this.newColumns = undefined;
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
