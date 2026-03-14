import {inject, Injectable} from '@angular/core';
import {AgentAbstract, BackendAgentContent, ExecutionIndicator} from "./agent";
import {BackendDatabaseTable, CommonMessage} from "fusio-sdk";
import {ErrorService} from "ngx-fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentDatabaseService extends AgentAbstract<Database, Options> {

  protected error = inject(ErrorService);

  transform(content: BackendAgentContent): Database|undefined {
    const object = this.getJson(content) as Database;
    if (!object.tables || !Array.isArray(object.tables)) {
      return;
    }

    return object;
  }

  async execute(model: Database, indicator: ExecutionIndicator, options: Options): Promise<CommonMessage|undefined> {
    const connectionId = options.connectionId;
    if (!connectionId) {
      return;
    }

    if (!model || !model.tables) {
      return;
    }

    for (let i = 0; i < model.tables.length; i++) {
      try {
        const table = model.tables[i];
        const response = await this.api.getClient().backend().connection().database().createTable('' + connectionId, table);
        indicator.push(response);
      } catch (error) {
        indicator.push(this.error.convert(error));
      }
    }

    return {
      success: true,
      message: 'Successfully created tables',
    };
  }

}

export interface Database {
  tables: Array<BackendDatabaseTable>
}

export interface Options {
  connectionId: number
}
