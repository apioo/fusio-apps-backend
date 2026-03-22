import {Injectable} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {AgentAbstract, BackendAgentContent, ExecutionIndicator} from "./agent";

@Injectable({
  providedIn: 'root'
})
export class AgentGeneralService extends AgentAbstract<BackendAgentContent> {

  transform(content: BackendAgentContent): BackendAgentContent|undefined {
    return content;
  }

  async execute(model: BackendAgentContent, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    return {
      success: true,
      message: 'Nothing to execute'
    };
  }

}
