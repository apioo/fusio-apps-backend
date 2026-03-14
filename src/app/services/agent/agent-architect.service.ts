import {inject, Injectable} from '@angular/core';
import {AgentAbstract, BackendAgentContent} from "./agent";
import {BackendOperation, BackendSchema, CommonMessage} from "fusio-sdk";
import {AgentActionService} from "./agent-action.service";
import {AgentSchemaService} from "./agent-schema.service";
import {AgentDatabaseService} from "./agent-database.service";

@Injectable({
  providedIn: 'root'
})
export class AgentArchitectService extends AgentAbstract<Blueprint, Options> {

  action = inject(AgentActionService);
  schema = inject(AgentSchemaService);
  database = inject(AgentDatabaseService);

  transform(content: BackendAgentContent): Blueprint|undefined {
    const object = this.getJson(content) as Blueprint;
    if (!object.operations || !Array.isArray(object.operations)) {
      return;
    }

    return object;
  }

  async execute(model: Blueprint, options: Options): Promise<CommonMessage|undefined> {
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

    let responses: Array<CommonMessage> = [];

    if (model.database) {
      const response = await this.invokeDatabaseAgent(options.databaseAgentId, model.database, options.connectionId);
      if (response && response.success === true) {
        responses.push(response);
      } else {
        throw new Error('Agent could not create database for: ' + model.database);
      }
    }

    let response: CommonMessage|undefined;
    for (let i = 0; i < model.operations.length; i++) {
      const operation = model.operations[i];

      response = await this.invokeSchemaAgent(options.schemaAgentId, operation.incoming);
      if (response && response.success === true && response.id) {
        operation.incoming = response.id;
      } else {
        throw new Error('Agent could not create schema for: ' + operation.incoming);
      }

      response = await this.invokeSchemaAgent(options.schemaAgentId, operation.outgoing);
      if (response && response.success === true && response.id) {
        operation.outgoing = response.id;
      } else {
        throw new Error('Agent could not create schema for: ' + operation.outgoing);
      }

      response = await this.invokeActionAgent(options.actionAgentId, operation.action);
      if (response && response.success === true && response.id) {
        operation.action = response.id;
      } else {
        throw new Error('Agent could not create action for: ' + operation.action);
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

      responses.push(response);
    }

    return {
      success: true,
      message: 'Successfully executed blueprint',
    };
  }

  private async invokeSchemaAgent(agentId: number, prompt: string): Promise<CommonMessage|undefined> {
    const content = await this.schema.prompt(agentId, prompt);
    if (!content) {
      return;
    }

    const model = this.schema.transform(content);
    if (!model) {
      return;
    }

    return await this.schema.execute(model);
  }

  private async invokeActionAgent(agentId: number, prompt: string): Promise<CommonMessage|undefined> {
    const content = await this.action.prompt(agentId, prompt);
    if (!content) {
      return;
    }

    const model = this.action.transform(content);
    if (!model) {
      return;
    }

    return await this.action.execute(model);
  }

  private async invokeDatabaseAgent(agentId: number, prompt: string, connectionId: number): Promise<CommonMessage|undefined> {
    const content = await this.database.prompt(agentId, prompt);
    if (!content) {
      return;
    }

    const model = this.database.transform(content);
    if (!model) {
      return;
    }

    return await this.database.execute(model, {
      connectionId: connectionId
    });
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
