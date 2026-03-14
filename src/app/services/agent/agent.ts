import {
  BackendAgentContentBinary,
  BackendAgentContentChoice,
  BackendAgentContentObject,
  BackendAgentContentText,
  BackendAgentContentToolCall,
  BackendAgentInput,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../api.service";
import {inject} from "@angular/core";

export interface Agent<TModel, TOptions = undefined> {

  /**
   * Sends a prompt to a specific agent and returns the content
   */
  prompt(agentId: number, prompt: string, parent?: number): Promise<BackendAgentContent|undefined>;

  /**
   * Transforms the agent content into a model
   */
  transform(content: BackendAgentContent): TModel|undefined;

  /**
   * Executes the provided model, mostly this means that we create or update the model
   */
  execute(model: TModel, indicator: ExecutionIndicator, options?: TOptions): Promise<CommonMessage|undefined>;

}

export abstract class AgentAbstract<TModel, TOptions = undefined> implements Agent<TModel, TOptions> {

  protected api = inject(ApiService);

  async prompt(agentId: number, prompt: string, parent?: number): Promise<BackendAgentContent|undefined> {
    const input: BackendAgentInput = {
      input: {
        type: 'text',
        content: prompt,
      }
    };

    const output = await this.api.getClient().backend().agent().message().submit('' + agentId, input, parent);
    const content = output.output;
    if (!content) {
      return;
    }

    return content;
  }

  abstract transform(content: BackendAgentContent): TModel|undefined;

  abstract execute(model: TModel, indicator: ExecutionIndicator, options?: TOptions): Promise<CommonMessage|undefined>;

  protected getText(content: BackendAgentContent): string|undefined {
    if (content.type === 'text' && content.content) {
      return content.content;
    }

    return;
  }

  protected getJson(content: BackendAgentContent): object|undefined {
    if (content.type === 'object' && content.payload) {
      return content.payload;
    }

    return;
  }

}

export class ExecutionIndicator {

  constructor(private callback: Function) {
  }

  request(message: string) {
    const result: Message = {
      level: 'info',
      message: '> ' + message,
    };

    this.callback.apply(null, [result]);
  }

  response(message?: CommonMessage) {
    if (!message || !message.message) {
      return;
    }

    let result: Message|undefined = undefined;
    if (message.success === true) {
      result = {
        level: 'success',
        message: '< ' + message.message,
      };
    } else if (message.success === false) {
      result = {
        level: 'danger',
        message: '< ' + message.message,
      };
    }

    if (result !== undefined) {
      this.callback.apply(null, [result]);
    }
  }

}

export interface Message
{
  level: Level,
  message: string,
}

export type Level = 'info'|'danger'|'success';

export type BackendAgentContent = BackendAgentContentBinary | BackendAgentContentChoice | BackendAgentContentObject | BackendAgentContentText | BackendAgentContentToolCall;
