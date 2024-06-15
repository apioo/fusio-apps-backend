import {Component} from '@angular/core';
import {Modal, ModelId} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendDatabaseTable} from "fusio-sdk/dist/BackendDatabaseTable";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends Modal<Client, BackendDatabaseTable & ModelId> {

  connection!: string;

  protected async create(entity: BackendDatabaseTable): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().createTable(this.connection, entity);
  }

  protected async update(entity: BackendDatabaseTable): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().updateTable(this.connection, entity.name || '', entity);
  }

  protected async delete(entity: BackendDatabaseTable): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().deleteTable(this.connection, entity.name || '');
  }

  protected newEntity(): BackendDatabaseTable {
    return {
      name: '',
      columns: [],
      indexes: [],
      foreignKeys: [],
    };
  }

}
