import {Component, OnInit, signal} from '@angular/core';
import {ChatAbstract} from "../chat-abstract";
import {Input} from "../input/input";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
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
  NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";
import {OperationStatus} from "../../../../shared/operation-status/operation-status";
import {OperationService} from "../../../../services/operation.service";
import {Router} from "@angular/router";

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
    JsonPipe
  ],
  templateUrl: './architect.html',
  styleUrl: './architect.css',
})
export class Architect extends ChatAbstract implements OnInit {

  architectLoading = signal<boolean>(false);
  blueprint = signal<Blueprint|undefined>(undefined);

  actionAgentId = signal<number|undefined>(undefined);
  schemaAgentId = signal<number|undefined>(undefined);
  databaseAgentId = signal<number|undefined>(undefined);

  constructor(api: ApiService, error: ErrorService, private operationService: OperationService, private router: Router) {
    super(api, error);
  }

  async ngOnInit(): Promise<void> {
    this.detectAgentIds();
  }

  onLoad(message: BackendAgentMessage): void {
    if (message.content && message.content.type === 'object' && message.content.payload) {
      this.loadBlueprint(message.content.payload);
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
      /*
      const responses: Array<CommonMessage> = [];

      // create schemas
      blueprint.operations.forEach((operation) => {

        operation.incoming
        operation.outgoing

      });
      */

      this.response.set({
        success: true,
        message: '',
      });
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.architectLoading.set(false);
  }

  private async detectAgentIds() {
    try {
      const response = await this.api.getClient().backend().agent().getAll(0, 16, 'type:2 OR type:3 OR type:4');
      if (response.entry) {
        for (let i = 0; i < response.entry?.length; i++) {
          const entry = response.entry[i];
          if (this.actionAgentId() === undefined && entry.type === 2) {
            this.actionAgentId.set(entry.id);
          } else if (this.schemaAgentId() === undefined && entry.type === 3) {
            this.schemaAgentId.set(entry.id);
          } else if (this.databaseAgentId() === undefined && entry.type === 4) {
            this.databaseAgentId.set(entry.id);
          }
        }
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async generateAction(prompt: string) {
    sessionStorage.setItem('action_prompt', prompt);

    await this.router.navigate(['/agent', this.actionAgentId(), 'message'], {
      queryParams: {
        prompt: 'action_prompt'
      }
    });
  }

  async generateSchema(prompt: string) {
    sessionStorage.setItem('schema_prompt', prompt);

    await this.router.navigate(['/agent', this.schemaAgentId(), 'message'], {
      queryParams: {
        prompt: 'schema_prompt'
      }
    });
  }

  async generateDatabase(prompt: string) {
    sessionStorage.setItem('database_prompt', prompt);

    await this.router.navigate(['/agent', this.databaseAgentId(), 'message'], {
      queryParams: {
        prompt: 'database_prompt'
      }
    });
  }

}

interface Blueprint {
  operations: Array<Operation>
  schema: string
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
  parameters: Array<Parameter>
  incoming: string
  outgoing: string
  action: string
}

interface Parameter {
  name: string
  type: string
  description: string
}
