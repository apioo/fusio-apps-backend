import {AgentInput, AgentOutput, ConsumerAgent, ConsumerAgentMessageCollection} from "fusio-sdk";
import {Injectable} from "@angular/core";
import {AgentConnectionInterface, FusioService, MessagesResourceParams} from "ngx-fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentConnectionService implements AgentConnectionInterface {

  constructor(private fusio: FusioService) {
  }

  async getMessages(params: MessagesResourceParams): Promise<ConsumerAgentMessageCollection> {
    return this.fusio.getClient().backend().agent().message().getAll('' + params.agent.id, params.chatId);
  }

  async getChats(agentId: string): Promise<ConsumerAgentMessageCollection> {
    return this.fusio.getClient().backend().agent().message().getAll(agentId);
  }

  async get(agentId: string): Promise<ConsumerAgent> {
    return this.fusio.getClient().backend().agent().get(agentId);
  }

  async submit(agentId: string, input: AgentInput): Promise<AgentOutput> {
    return this.fusio.getClient().backend().agent().message().submit(agentId, input);
  }

}
