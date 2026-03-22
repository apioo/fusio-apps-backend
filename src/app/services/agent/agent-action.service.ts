import {Injectable} from '@angular/core';
import {BackendAction, CommonMessage} from "fusio-sdk";
import {AgentAbstract, BackendAgentContent, ExecutionIndicator} from "./agent";

@Injectable({
  providedIn: 'root'
})
export class AgentActionService extends AgentAbstract<Action> {

  transform(content: BackendAgentContent): Action|undefined {
    const text = this.getText(content);
    if (!text) {
      return;
    }

    const name = this.extractName(text);
    const code = this.extractCode(text);

    return {
      name: name,
      code: code,
    };
  }

  async execute(model: Action, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    const name = model.name;
    if (!name) {
      return;
    }

    let existing: BackendAction|undefined = undefined;
    try {
      existing = await this.api.getClient().backend().action().get('~' + name);
    } catch (error) {
      // action does not exist
    }

    let response: CommonMessage;
    if (existing) {
      if (!existing.config) {
        existing.config = {};
      }

      existing.config['code'] = model.code;

      indicator.request('Action update: ' + existing.name);

      response = await this.api.getClient().backend().action().update('' + existing.id, existing);
    } else {
      indicator.request('Action create: ' + name);

      response = await this.api.getClient().backend().action().create({
        name: name,
        class: 'Fusio.Adapter.Worker.Action.WorkerPHPLocal',
        config: {
          code: model.code
        },
      });
    }

    indicator.response(response);

    return response;
  }

  private extractName(content: string): string {
    const result = content.match(/Action: ([A-Za-z0-9-]+)/im);
    if (!result) {
      return '';
    }

    return result[1] || '';
  }

  private extractCode(content: string): string {
    let captured = false;
    let code = '';

    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '<?php') {
        captured = true;
      }

      if (captured) {
        code+= line + "\n";
      }

      if (line === '};') {
        break;
      }
    }

    return code;
  }

}

export interface Action {
  name: string
  code: string
}
