import {Component, input} from '@angular/core';
import {JsonPipe, NgClass} from "@angular/common";
import {BackendAgentMessage} from "fusio-sdk";
import {KatexSpecificOptions, MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'app-agent-message-row',
  imports: [
    JsonPipe,
    NgClass,
    MarkdownComponent
  ],
  templateUrl: './row.html',
  styleUrl: './row.css',
})
export class Row {

  message = input.required<BackendAgentMessage>();

  katexOptions: KatexSpecificOptions = {
    throwOnError: false,
  };

}
