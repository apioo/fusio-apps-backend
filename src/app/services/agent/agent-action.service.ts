import {inject, Injectable} from '@angular/core';
import {BackendAction, CommonMessage} from "fusio-sdk";
import {AgentAbstract, AgentContent, Connection, ExecutionIndicator, FusioService} from "ngx-fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentActionService extends AgentAbstract<Action> {

  private api = inject(FusioService);

  transform(content: AgentContent): Action|undefined {
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

  async execute(connection: Connection, model: Action, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
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
    // tolerates markdown formatting around the name i.e. "**Action:** `Todo-Get`" or "## Action: Todo-Get"
    const result = content.match(/^[\s#>*_`]*Action\s*:[\s*_`]*([A-Za-z0-9_-]+)/im);
    if (!result) {
      return '';
    }

    return result[1] || '';
  }

  private extractCode(content: string): string {
    const lines = content.replace(/\r\n?/g, "\n").split("\n");

    const start = lines.findIndex((line) => line.trim().startsWith('<?php'));
    if (start === -1) {
      return '';
    }

    // the end of the code is the last closing line of the closure, we search from the bottom since the code itself
    // can contain other closures which also end with "};"
    let end = -1;
    for (let i = lines.length - 1; i > start; i--) {
      if (lines[i].trim() === '};') {
        end = i;
        break;
      }
    }

    let code: Array<string>;
    if (end !== -1) {
      code = lines.slice(start, end + 1);
    } else {
      // fallback in case the closing line is missing, take everything except a trailing markdown fence
      code = lines.slice(start).filter((line) => !line.trim().startsWith('```'));
    }

    // normalize the opening tag i.e. "<?php " or "<?php use ..." on the same line
    code[0] = code[0].trim();

    return code.join("\n").trimEnd() + "\n";
  }

}

export interface Action {
  name: string
  code: string
}
