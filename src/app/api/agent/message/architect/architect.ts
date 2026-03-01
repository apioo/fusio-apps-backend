import {Component, signal} from '@angular/core';
import {ChatAbstract} from "../chat-abstract";
import {Input} from "../input/input";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {Row} from "../row/row";
import {
  BackendAgentContentBinary,
  BackendAgentContentChoice,
  BackendAgentContentObject,
  BackendAgentContentText,
  BackendAgentContentToolCall,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../../../api.service";
import {JsonPipe, KeyValuePipe} from "@angular/common";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";
import {OperationStatus} from "../../../../shared/operation-status/operation-status";
import {TableService} from "../../../../services/connection/database/table.service";
import {OperationService} from "../../../../services/operation.service";

@Component({
  selector: 'app-agent-message-architect',
  imports: [
    Input,
    MessageComponent,
    Row,
    KeyValuePipe,
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    OperationStatus,
    JsonPipe
  ],
  templateUrl: './architect.html',
  styleUrl: './architect.css',
})
export class Architect extends ChatAbstract {

  architectLoading = signal<boolean>(false);
  blueprint = signal<Blueprint|undefined>(undefined);

  constructor(api: ApiService, error: ErrorService, private tableService: TableService, private operationService: OperationService) {
    super(api, error);
  }

  onOutput(output: BackendAgentContentBinary | BackendAgentContentChoice | BackendAgentContentObject | BackendAgentContentText | BackendAgentContentToolCall): void {
    if (output.type === 'object' && output.payload) {
      this.loadBlueprint(output.payload);
    }
  }

  loadBlueprint(blueprint: Blueprint) {
    this.blueprint.set(blueprint);
  }

  async executeBlueprint() {
    const blueprint = this.blueprint();
    if (!blueprint) {
      return;
    }

    this.architectLoading.set(true);

    try {

      const responses: Array<CommonMessage> = [];

      // create tables
      blueprint.tables.forEach(async (table) => {
        responses.push(await this.tableService.create(table));
      });

      // create schemas
      blueprint.operations.forEach((operation) => {

        operation.incoming
        operation.outgoing

      });

      this.response.set({
        success: true,
        message: '',
      });
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.architectLoading.set(false);
  }

}

interface Blueprint {
  operations: Array<Operation>
  tables: Array<Table>
}

interface Operation {
  name: string
  active: boolean
  public: boolean
  stability: number
  description: string
  httpMethod: string
  httpPath: string
  httpCode: number
  parameters: Record<string, Parameter>
  incoming: string
  outgoing: string
  action: string
}

interface Parameter {
  description: string
  type: string
}

interface Table {
  name: string
  columns: Array<Column>
  primaryKey: string
}

interface Column {
  name: string
  type: string
  length: number
  notNull: boolean
  autoIncrement: boolean
  precision: number
  scale: number
  default: string
  comment: string
}
