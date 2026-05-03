import {inject, Injectable} from '@angular/core';
import {AgentAbstract, BackendAgentContent, ExecutionIndicator} from "./agent";
import {CommonMessage} from "fusio-sdk";
import {ErrorService} from "ngx-fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentSeedService extends AgentAbstract<SeedData, Options> {

  protected error = inject(ErrorService);

  transform(content: BackendAgentContent): SeedData|undefined {
    const object = this.getJson(content) as SeedData;
    if (!object || !object.tables) {
      return;
    }

    return object;
  }

  async execute(model: SeedData, indicator: ExecutionIndicator, options: Options): Promise<CommonMessage|undefined> {
    const connectionId = options.connectionId;
    if (!connectionId) {
      return;
    }

    if (!model || !model.tables) {
      return;
    }

    let success = 0;
    let errorMessages: Array<string> = [];

    for (const [tableName, rows] of Object.entries(model.tables)) {
      rows.forEach(async (row) => {
        try {
          indicator.request('Insert seed: ' + tableName);

          const response = await this.api.getClient().backend().connection().database().createRow('' + connectionId, tableName, row);
          indicator.response(response);

          success++;
        } catch (err) {
          const error = this.error.convert(err);

          indicator.response(error);

          if (error.message) {
            errorMessages.push(error.message);
          }
        }
      });
    }

    if (errorMessages.length === 0) {
      return {
        success: true,
        message: 'Successfully inserted seeds',
      };
    } else {
      let message = '';
      if (success > 0) {
        message += 'Successfully inserted ' + success + ' seeds, ';
      }

      message += errorMessages.length + ' seeds produced the following errors: ' + errorMessages.join(', ');

      return {
        success: false,
        message: message,
      };
    }
  }

}

export interface SeedData {
  tables: Record<string, Array<Record<string, any>>>
}

export interface Options {
  connectionId: number
}
