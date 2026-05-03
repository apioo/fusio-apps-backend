import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {FormAutocompleteComponent, MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {ChatAbstract} from "../chat-abstract";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {ConnectionService} from "../../../../services/connection.service";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbPopover
} from "@ng-bootstrap/ng-bootstrap";
import {Agent} from "../../../../services/agent/agent";
import {AgentSeedService, Options, SeedData} from "../../../../services/agent/agent-seed.service";

@Component({
  selector: 'app-agent-message-seed',
  imports: [
    FormsModule,
    JsonPipe,
    MessageComponent,
    TypeschemaEditorModule,
    Input,
    Row,
    FormAutocompleteComponent,
    NgbPopover,
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem
  ],
  templateUrl: './seed.html',
  styleUrl: './seed.css',
})
export class Seed extends ChatAbstract<SeedData, Options> {

  connectionId = signal<number|undefined>(undefined);

  seedAgent = inject(AgentSeedService);
  connection = inject(ConnectionService);

  getAgent(): Agent<SeedData, Options> {
    return this.seedAgent;
  }

  protected override getOptions(): Options|undefined {
    const connectionId = this.connectionId();
    if (!connectionId) {
      throw new Error('Please select a connection');
    }

    return {
      connectionId: connectionId
    };
  }

}
