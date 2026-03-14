import {inject, Injectable} from '@angular/core';
import {AgentAbstract, BackendAgentContent, ExecutionIndicator} from "./agent";
import {BackendOperation, CommonMessage} from "fusio-sdk";
import {AgentActionService} from "./agent-action.service";
import {AgentSchemaService} from "./agent-schema.service";
import {AgentDatabaseService} from "./agent-database.service";
import {ErrorService} from "ngx-fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentArchitectService extends AgentAbstract<Blueprint, Options> {

  protected action = inject(AgentActionService);
  protected schema = inject(AgentSchemaService);
  protected database = inject(AgentDatabaseService);
  protected error = inject(ErrorService);

  transform(content: BackendAgentContent): Blueprint|undefined {
    const object = this.getJson(content) as Blueprint;
    if (!object.operations || !Array.isArray(object.operations)) {
      return;
    }

    return object;
  }

  async execute(model: Blueprint, indicator: ExecutionIndicator, options: Options): Promise<CommonMessage|undefined> {
    const connectionId = options.connectionId;
    if (!connectionId) {
      return;
    }

    const actionAgentId = options.actionAgentId;
    const schemaAgentId = options.schemaAgentId;
    const databaseAgentId = options.databaseAgentId;
    if (!actionAgentId || !schemaAgentId || !databaseAgentId) {
      return;
    }

    if (!model || !model.operations) {
      return;
    }

    if (model.database) {
      await this.invokeDatabaseAgent(options.databaseAgentId, model.database, options.connectionId, indicator);
    }

    let response: CommonMessage|undefined;
    for (let i = 0; i < model.operations.length; i++) {
      const operation = model.operations[i];

      try {
        const incoming = await this.resolveSchema(options.schemaAgentId, operation.incoming, indicator);
        if (incoming) {
          operation.incoming = incoming;
        } else {
          continue;
        }

        const outgoing = await this.resolveSchema(options.schemaAgentId, operation.outgoing, indicator);
        if (outgoing) {
          operation.outgoing = outgoing;
        } else {
          continue;
        }

        const action = await this.resolveAction(options.actionAgentId, operation.action, indicator);
        if (action) {
          operation.action = action;
        } else {
          continue;
        }
      } catch (error) {
        indicator.push(this.error.convert(error));
        continue;
      }

      let existing: BackendOperation|undefined = undefined;
      try {
        existing = await this.api.getClient().backend().schema().get('~' + operation.name);
      } catch (error) {
        // operation does not exist
      }

      if (existing) {
        response = await this.api.getClient().backend().schema().update('' + existing.id, operation);
      } else {
        response = await this.api.getClient().backend().schema().create(operation);
      }

      indicator.push(response);
    }

    return {
      success: true,
      message: 'Successfully executed blueprint',
    };
  }

  private async invokeSchemaAgent(agentId: number, prompt: string, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    const content = await this.schema.prompt(agentId, prompt);
    if (!content) {
      return;
    }

    const model = this.schema.transform(content);
    if (!model) {
      return;
    }

    return await this.schema.execute(model, indicator);
  }

  private async invokeActionAgent(agentId: number, prompt: string, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    const content = await this.action.prompt(agentId, prompt);
    if (!content) {
      return;
    }

    const model = this.action.transform(content);
    if (!model) {
      return;
    }

    return await this.action.execute(model, indicator);
  }

  private async invokeDatabaseAgent(agentId: number, prompt: string, connectionId: number, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    const content = await this.database.prompt(agentId, prompt);
    if (!content) {
      return;
    }

    const model = this.database.transform(content);
    if (!model) {
      return;
    }

    return await this.database.execute(model, indicator, {
      connectionId: connectionId
    });
  }

  private async resolveSchema(agentId: number, prompt: string, indicator: ExecutionIndicator): Promise<string|undefined> {
    const response = await this.invokeSchemaAgent(agentId, prompt, indicator);
    if (!response) {
      return;
    }

    if (response.success !== true) {
      return;
    }

    if (!response.id) {
      return;
    }

    const schema = await this.api.getClient().backend().schema().get(response.id);

    return schema.name;
  }

  private async resolveAction(agentId: number, prompt: string, indicator: ExecutionIndicator): Promise<string|undefined> {
    const response = await this.invokeActionAgent(agentId, prompt, indicator);
    if (!response) {
      return;
    }

    if (response.success !== true) {
      return;
    }

    if (!response.id) {
      return;
    }

    const schema = await this.api.getClient().backend().action().get(response.id);

    return schema.name;
  }

}

export interface Blueprint {
  operations: Array<Operation>
  database: string
}

interface Operation {
  name: string
  active: boolean
  public: boolean
  stability: number
  description: string
  httpMethod: string
  httpPath: string
  httpCode: number
  parameters: Array<Parameter>
  incoming: string
  outgoing: string
  action: string
}

interface Parameter {
  name: string
  type: string
  description: string
}

export interface Options {
  connectionId: number
  actionAgentId: number
  schemaAgentId: number
  databaseAgentId: number
}
