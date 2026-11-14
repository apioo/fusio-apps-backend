import {inject, Injectable} from '@angular/core';
import {BackendOperation, BackendOperationParameters, CommonMessage} from "fusio-sdk";
import {AgentActionService} from "./agent-action.service";
import {AgentSchemaService} from "./agent-schema.service";
import {AgentDatabaseService} from "./agent-database.service";
import {AgentAbstract, AgentContent, Connection, ErrorService, ExecutionIndicator, FusioService} from "ngx-fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentArchitectService extends AgentAbstract<Blueprint, Options> {

  private api = inject(FusioService);
  private action = inject(AgentActionService);
  private schema = inject(AgentSchemaService);
  private database = inject(AgentDatabaseService);
  private error = inject(ErrorService);

  transform(content: AgentContent): Blueprint|undefined {
    const object = this.getJson(content) as Blueprint;
    if (!object || !object.operations || !Array.isArray(object.operations)) {
      return;
    }

    return object;
  }

  async execute(connection: Connection, model: Blueprint, indicator: ExecutionIndicator, options: Options): Promise<CommonMessage|undefined> {
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

    const context: ExecutionContext = {
      connectionName: await this.getConnectionName(connectionId),
      schemaCache: new Map<string, string>(),
      errors: [],
    };

    if (model.database) {
      try {
        const result = await this.invokeDatabaseAgent(connection, options.databaseAgentId, this.withConnection(model.database, context), options.connectionId, indicator);
        if (!result) {
          context.errors.push('database: the database agent returned no valid tables');
        } else if (result.success !== true) {
          // we continue since i.e. a table may already exist from a previous run, the error is reported at the end
          context.errors.push('database: ' + result.message);
        }
      } catch (error) {
        const message = this.error.convert(error);
        indicator.response(message);
        context.errors.push('database: ' + (message.message || 'unknown error'));
      }
    }

    let created = 0;
    for (let i = 0; i < model.operations.length; i++) {
      const name = model.operations[i].name;
      try {
        const operation = await this.transformOperation(connection, model.operations[i], indicator, options, context);
        if (!operation) {
          continue;
        }

        let existing: BackendOperation|undefined = undefined;
        try {
          existing = await this.api.getClient().backend().operation().get('~' + operation.name);
        } catch (error) {
          // operation does not exist
        }

        let response: CommonMessage;
        if (existing) {
          indicator.request('Operation update: ' + existing.name);

          response = await this.api.getClient().backend().operation().update('' + existing.id, operation);
        } else {
          indicator.request('Operation create: ' + operation.name);

          response = await this.api.getClient().backend().operation().create(operation);
        }

        indicator.response(response);

        if (response.success === true) {
          created++;
        } else {
          context.errors.push(name + ': ' + (response.message || 'could not save operation'));
        }
      } catch (error) {
        const message = this.error.convert(error);
        indicator.response(message);
        context.errors.push(name + ': ' + (message.message || 'unknown error'));
      }
    }

    const total = model.operations.length;
    if (context.errors.length === 0) {
      return {
        success: true,
        message: 'Successfully executed blueprint, created ' + created + ' of ' + total + ' operations',
      };
    }

    return {
      success: false,
      message: 'Executed blueprint, created ' + created + ' of ' + total + ' operations, the following errors occurred: ' + context.errors.join(', '),
    };
  }

  private async transformOperation(connection: Connection, operation: Operation, indicator: ExecutionIndicator, options: Options, context: ExecutionContext): Promise<BackendOperation|undefined> {
    let incoming: string|undefined = undefined;
    if (operation.incoming && operation.incoming !== 'Empty') {
      incoming = await this.resolveSchema(connection, options.schemaAgentId, operation.incoming, indicator, context);
      if (!incoming) {
        context.errors.push(operation.name + ': could not generate incoming schema "' + this.getSchemaName(operation.incoming) + '"');
        return;
      }
    }

    let outgoing: string|undefined = undefined;
    if (operation.outgoing && operation.outgoing !== 'Empty') {
      outgoing = await this.resolveSchema(connection, options.schemaAgentId, operation.outgoing, indicator, context);
      if (!outgoing) {
        context.errors.push(operation.name + ': could not generate outgoing schema "' + this.getSchemaName(operation.outgoing) + '"');
        return;
      }
    }

    const action = await this.resolveAction(connection, options.actionAgentId, this.buildActionPrompt(operation, context), indicator);
    if (!action) {
      context.errors.push(operation.name + ': could not generate action "' + this.getSchemaName(operation.action) + '"');
      return;
    }

    const parameters: BackendOperationParameters = {};
    (operation.parameters || []).forEach((parameter) => {
      parameters[parameter.name] = {
        type: parameter.type,
        description: parameter.description,
      };
    });

    return {
      name: operation.name,
      active: true,
      public: operation.public,
      stability: 1,
      description: operation.description,
      httpMethod: operation.httpMethod,
      httpPath: operation.httpPath,
      httpCode: operation.httpCode,
      parameters: parameters,
      incoming: incoming,
      outgoing: outgoing,
      action: action,
    };
  }

  private async invokeSchemaAgent(connection: Connection, agentId: number, prompt: string, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    indicator.request('Schema agent request: ' + prompt);

    const output = await this.schema.prompt(connection, agentId, prompt, 0);
    const content = output?.item;
    if (!content) {
      return;
    }

    const model = this.schema.transform(content);
    if (!model) {
      return;
    }

    return await this.schema.execute(connection, model, indicator);
  }

  private async invokeActionAgent(connection: Connection, agentId: number, prompt: string, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    indicator.request('Action agent request: ' + prompt);

    const output = await this.action.prompt(connection, agentId, prompt, 0);
    const content = output?.item;
    if (!content) {
      return;
    }

    const model = this.action.transform(content);
    if (!model) {
      return;
    }

    return await this.action.execute(connection, model, indicator);
  }

  private async invokeDatabaseAgent(connection: Connection, agentId: number, prompt: string, connectionId: number, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    indicator.request('Database agent request: ' + prompt);

    const output = await this.database.prompt(connection, agentId, prompt, 0);
    const content = output?.item;
    if (!content) {
      return;
    }

    const model = this.database.transform(content);
    if (!model) {
      return;
    }

    return await this.database.execute(connection, model, indicator, {
      connectionId: connectionId
    });
  }

  private async resolveSchema(connection: Connection, agentId: number, prompt: string, indicator: ExecutionIndicator, context: ExecutionContext): Promise<string|undefined> {
    if (prompt === 'Message') {
      return 'schema://' + prompt;
    }

    // a schema name can be used by multiple operations, we generate every schema only once per blueprint since
    // otherwise a later agent call would overwrite the schema which was already assigned to a previous operation
    const cacheKey = this.getSchemaName(prompt);
    const cached = context.schemaCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // the architect references an existing schema by its plain name (without the "NAME:" prefix), in this case we
    // reuse the schema as it is and do not invoke the schema agent which would overwrite the schema
    if (!/^\s*NAME:/.test(prompt)) {
      const existing = await this.getExistingSchema(prompt.trim());
      if (existing) {
        context.schemaCache.set(cacheKey, existing);
        return existing;
      }
    }

    const response = await this.invokeSchemaAgent(connection, agentId, prompt, indicator);
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
    const uri = 'schema://' + schema.name;

    context.schemaCache.set(cacheKey, uri);

    return uri;
  }

  private buildActionPrompt(operation: Operation, context: ExecutionContext): string {
    const parameters = (operation.parameters || []).map((parameter) => parameter.name + ' (' + parameter.type + ')');

    const lines = [
      'Operation: ' + operation.httpMethod + ' ' + operation.httpPath + ' (' + (operation.public ? 'public, the user may be anonymous' : 'private, requires an authenticated user') + ')',
      'Parameters: ' + (parameters.length > 0 ? parameters.join(', ') : 'none'),
      'Request schema: ' + this.getSchemaName(operation.incoming || 'Empty'),
      'Response schema: ' + this.getSchemaName(operation.outgoing || 'Empty'),
      'Success status code: ' + operation.httpCode,
    ];

    if (context.connectionName) {
      lines.push('Connection: ' + context.connectionName);
    }

    return operation.action + '\n\n' + lines.join('\n');
  }

  private withConnection(prompt: string, context: ExecutionContext): string {
    if (!context.connectionName) {
      return prompt;
    }

    return prompt + '\n\nConnection: ' + context.connectionName;
  }

  private getSchemaName(prompt: string): string {
    const result = prompt.match(/^\s*NAME:\s*([^.\s]+)\s*\./);
    if (result && result[1]) {
      return result[1];
    }

    return prompt.trim();
  }

  private async getExistingSchema(name: string): Promise<string|undefined> {
    if (!/^[A-Za-z0-9_-]+$/.test(name)) {
      return undefined;
    }

    try {
      const schema = await this.api.getClient().backend().schema().get('~' + name);
      return schema.name ? 'schema://' + schema.name : undefined;
    } catch (error) {
      return undefined;
    }
  }

  private async getConnectionName(connectionId: number): Promise<string|undefined> {
    try {
      const connection = await this.api.getClient().backend().connection().get('' + connectionId);
      return connection.name;
    } catch (error) {
      return undefined;
    }
  }

  private async resolveAction(connection: Connection, agentId: number, prompt: string, indicator: ExecutionIndicator): Promise<string|undefined> {
    const response = await this.invokeActionAgent(connection, agentId, prompt, indicator);
    if (!response) {
      return;
    }

    if (response.success !== true) {
      return;
    }

    if (!response.id) {
      return;
    }

    const action = await this.api.getClient().backend().action().get(response.id);

    return 'action://' + action.name;
  }

}

export interface Blueprint {
  operations: Array<Operation>
  database: string
}

interface Operation {
  name: string
  public: boolean
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

interface ExecutionContext {
  connectionName?: string
  schemaCache: Map<string, string>
  errors: Array<string>
}

export interface Options {
  connectionId: number
  actionAgentId: number
  schemaAgentId: number
  databaseAgentId: number
}
