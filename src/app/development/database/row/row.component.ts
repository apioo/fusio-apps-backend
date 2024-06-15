import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendDatabaseRow} from "fusio-sdk/dist/BackendDatabaseRow";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {BackendDatabaseTableColumn} from "fusio-sdk/dist/BackendDatabaseTableColumn";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent extends Modal<Client, BackendDatabaseRow> {

  connection!: string;
  table!: string;
  primaryKey!: string;
  columns: Array<BackendDatabaseTableColumn> = [];

  protected async create(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().createRow(this.connection, this.table, entity);
  }

  protected async update(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().updateRow(this.connection, this.table, entity[this.primaryKey], entity);
  }

  protected async delete(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().deleteRow(this.connection, this.table, entity[this.primaryKey]);
  }

  protected newEntity(): BackendDatabaseRow {
    let row: BackendDatabaseRow = {};
    if (this.columns) {
      for (let col of this.columns) {
        if (col.name) {
          row[col.name] = null;
        }
      }
    }

    return row;
  }

}
