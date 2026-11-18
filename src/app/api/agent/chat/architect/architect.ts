import {Component, inject, signal} from '@angular/core';
import {Agent, Chat, FormAutocompleteComponent, FusioService, Input, MessageComponent, Row} from "ngx-fusio-sdk";
import {JsonPipe} from "@angular/common";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbPopover
} from "@ng-bootstrap/ng-bootstrap";
import {OperationStatus} from "../../../../shared/operation-status/operation-status";
import {AgentArchitectService, Blueprint, Options} from "../../../../services/agent/agent-architect.service";
import {Loader} from "../../loader/loader";
import {ConnectionService} from "../../../../services/connection.service";
import {AgentTaskService} from "../../../../services/agent/agent-task.service";

@Component({
  selector: 'app-agent-chat-architect',
  imports: [
    MessageComponent,
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    OperationStatus,
    JsonPipe,
    FormAutocompleteComponent,
    NgbPopover,
    Loader,
    Row,
    Input,
  ],
  templateUrl: './architect.html',
  styleUrl: './architect.css',
})
export class Architect extends Chat<Blueprint, Options> {

  connectionId = signal<number|undefined>(undefined);
  actionAgentId = signal<number|undefined>(undefined);
  schemaAgentId = signal<number|undefined>(undefined);
  databaseAgentId = signal<number|undefined>(undefined);

  api = inject(FusioService);
  architectAgent = inject(AgentArchitectService);
  connectionService = inject(ConnectionService);

  getAgent(): Agent<Blueprint, Options> {
    return this.architectAgent;
  }

  protected override getOptions(): Options | undefined {
    const connectionId = this.connectionId();
    if (!connectionId) {
      throw new Error('Please select a connection where the database schema will be created');
    }

    // if the architect agent has an action the blueprint is executed at the backend which resolves the sub-agents
    const agent = this.agent();
    if (AgentTaskService.hasAction(agent) && agent.id) {
      return {
        connectionId: connectionId,
        actionAgentId: this.actionAgentId() ?? 0,
        schemaAgentId: this.schemaAgentId() ?? 0,
        databaseAgentId: this.databaseAgentId() ?? 0,
        agentId: agent.id,
        useTask: true,
      };
    }

    const actionAgentId = this.actionAgentId();
    if (!actionAgentId) {
      throw new Error('Please select an action agent which generates the action');
    }

    const schemaAgentId = this.schemaAgentId();
    if (!schemaAgentId) {
      throw new Error('Please select a schema agent which generates the schema');
    }

    const databaseAgentId = this.databaseAgentId();
    if (!databaseAgentId) {
      throw new Error('Please select a database agent which generates the tables');
    }

    return {
      connectionId: connectionId,
      actionAgentId: actionAgentId,
      schemaAgentId: schemaAgentId,
      databaseAgentId: databaseAgentId,
    };
  }

  /**
   * For UX we try to pre-select the fitting agents, a user can then also select different agents
   */
  protected override async onLoad() {
    const response = await this.api.getClient().backend().agent().getAll(0, 16, 'type:2 OR type:3 OR type:4');
    if (response.entry) {
      for (let i = 0; i < response.entry?.length; i++) {
        const entry = response.entry[i];
        const id = entry.id;
        if (!id) {
          continue;
        }

        if (this.actionAgentId() === undefined && entry.type === 2) {
          this.actionAgentId.set(id);
        } else if (this.schemaAgentId() === undefined && entry.type === 3) {
          this.schemaAgentId.set(id);
        } else if (this.databaseAgentId() === undefined && entry.type === 4) {
          this.databaseAgentId.set(id);
        }
      }
    }
  }

}
