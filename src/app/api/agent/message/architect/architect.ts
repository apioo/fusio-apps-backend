import {Component, inject, signal} from '@angular/core';
import {ChatAbstract} from "../chat-abstract";
import {Input} from "../input/input";
import {FormAutocompleteComponent, MessageComponent} from "ngx-fusio-sdk";
import {Row} from "../row/row";
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
import {Agent} from "../../../../services/agent/agent";
import {ConnectionService} from "../../../../services/connection.service";
import {AgentService} from "../../../../services/agent.service";

@Component({
  selector: 'app-agent-message-architect',
  imports: [
    Input,
    MessageComponent,
    Row,
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
  ],
  templateUrl: './architect.html',
  styleUrl: './architect.css',
})
export class Architect extends ChatAbstract<Blueprint, Options> {

  connectionId = signal<number|undefined>(undefined);
  actionAgentId = signal<number|undefined>(undefined);
  schemaAgentId = signal<number|undefined>(undefined);
  databaseAgentId = signal<number|undefined>(undefined);

  architectAgent = inject(AgentArchitectService);
  connection = inject(ConnectionService);
  agentService = inject(AgentService);

  getAgent(): Agent<Blueprint, Options> {
    return this.architectAgent;
  }

  protected override getOptions(): Options | undefined {
    const connectionId = this.connectionId();
    if (!connectionId) {
      throw new Error('Please select a connection, where the defined database schema is created');
    }

    const actionAgentId = this.actionAgentId();
    if (!actionAgentId) {
      throw new Error('Please select an action agent, which is used to generate the action');
    }

    const schemaAgentId = this.schemaAgentId();
    if (!schemaAgentId) {
      throw new Error('Please select a schema agent, which is used to generate the schema');
    }

    const databaseAgentId = this.databaseAgentId();
    if (!databaseAgentId) {
      throw new Error('Please select a database agent, which is used to generate the tables');
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
