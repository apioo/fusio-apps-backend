import {Injectable} from '@angular/core';
import {AgentAbstract, BackendAgentContent} from "./agent";
import {BackendDatabaseTable, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentDatabaseService extends AgentAbstract<Database, Options> {

  transform(content: BackendAgentContent): Database|undefined {
    const object = this.getJson(content) as Database;
    if (!object.tables || !Array.isArray(object.tables)) {
      return;
    }

    return object;
  }

  async execute(model: Database, options: Options): Promise<CommonMessage|undefined> {
    const connectionId = options.connectionId;
    if (!connectionId) {
      return;
    }

    if (!model || !model.tables) {
      return;
    }

    let responses: Array<CommonMessage> = [];

    for (let i = 0; i < model.tables.length; i++) {
      const table = model.tables[i];
      const response = await this.api.getClient().backend().connection().database().createTable('' + connectionId, table);
      if (response.success === true) {
        responses.push(response);
      }
    }

    return {
      success: true,
      message: 'Successfully created ' + responses.length + ' tables',
    };
  }

}

export interface Database {
  tables: Array<BackendDatabaseTable>
}

export interface Options {
  connectionId: number
}
