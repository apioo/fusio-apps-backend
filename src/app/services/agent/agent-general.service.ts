import {Injectable} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {AgentAbstract, AgentContent, ExecutionIndicator} from "ngx-fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentGeneralService extends AgentAbstract<AgentContent> {

  transform(content: AgentContent): AgentContent|undefined {
    return content;
  }

  async execute(model: AgentContent, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    return {
      success: true,
      message: 'Nothing to execute'
    };
  }

}
