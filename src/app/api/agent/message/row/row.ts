import {Component, input} from '@angular/core';
import {JsonPipe, NgClass} from "@angular/common";
import {BackendAgentMessage} from "fusio-sdk";
import {Highlight} from "ngx-highlightjs";
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'app-agent-message-row',
  imports: [
    JsonPipe,
    Highlight,
    NgClass,
    MarkdownComponent
  ],
  templateUrl: './row.html',
  styleUrl: './row.css',
})
export class Row {

  message = input.required<BackendAgentMessage>();

}
