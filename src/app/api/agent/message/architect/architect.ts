import {Component, inject, OnInit, signal} from '@angular/core';
import {ChatAbstract} from "../chat-abstract";
import {Input} from "../input/input";
import {ErrorService, FormAutocompleteComponent, MessageComponent} from "ngx-fusio-sdk";
import {Row} from "../row/row";
import {BackendAgentMessage} from "fusio-sdk";
import {ApiService} from "../../../../api.service";
import {JsonPipe} from "@angular/common";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem, NgbPopover
} from "@ng-bootstrap/ng-bootstrap";
import {OperationStatus} from "../../../../shared/operation-status/operation-status";
import {OperationService} from "../../../../services/operation.service";
import {Router} from "@angular/router";
import {AgentArchitectService, Blueprint, Options} from "../../../../services/agent/agent-architect.service";
import {Agent} from "../../../../services/agent/agent";
import {AgentDatabaseService, Database as DatabaseModel} from "../../../../services/agent/agent-database.service";
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
    NgbPopover
  ],
  templateUrl: './architect.html',
  styleUrl: './architect.css',
})
export class Architect extends ChatAbstract<Blueprint, Options> implements OnInit {

  connectionId = signal<number|undefined>(undefined);
  actionAgentId = signal<number|undefined>(undefined);
  schemaAgentId = signal<number|undefined>(undefined);
  databaseAgentId = signal<number|undefined>(undefined);

  architectAgent = inject(AgentArchitectService);
  connection = inject(ConnectionService);
  agentService = inject(AgentService);

  async ngOnInit(): Promise<void> {
    window.setTimeout(() => {
      this.detectAgentIds();
    }, 500);
  }

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

  private async detectAgentIds() {
    try {
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
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
