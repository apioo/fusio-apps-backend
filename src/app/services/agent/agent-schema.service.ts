import {inject, Injectable} from '@angular/core';
import {AgentAbstract, BackendAgentContent, ExecutionIndicator} from "./agent";
import {BackendSchema, CommonMessage} from "fusio-sdk";
import {ExportService, Specification} from "ngx-typeschema-editor";

@Injectable({
  providedIn: 'root'
})
export class AgentSchemaService extends AgentAbstract<Schema> {

  exportService = inject(ExportService);

  transform(content: BackendAgentContent): Schema|undefined {
    const object = this.getJson(content) as Schema;
    if (!object.name) {
      return;
    }

    if (!object.types || !Array.isArray(object.types)) {
      return;
    }

    return object;
  }

  async execute(model: Schema, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    const name = model.name;
    if (!name) {
      return;
    }

    let existing: BackendSchema|undefined = undefined;
    try {
      existing = await this.api.getClient().backend().schema().get('~' + name);
    } catch (error) {
      // schema does not exist
    }

    const source = this.exportService.transform(model);

    let response: CommonMessage;
    if (existing) {
      existing.source = source;

      response = await this.api.getClient().backend().schema().update('' + existing.id, existing);
    } else {
      response = await this.api.getClient().backend().schema().create({
        name: name,
        source: source
      });
    }

    return response;
  }

}

export interface Schema extends Specification {
  name: string
}
