import {Component, inject, signal} from '@angular/core';
import {AgentBackendConnectionService, Container} from "ngx-fusio-sdk";
import {RouterLink} from "@angular/router";
import {ConsumerAgent} from "fusio-sdk";

@Component({
  selector: 'app-agent-chat',
  imports: [
    Container,
    RouterLink
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {

  agent = signal<ConsumerAgent|undefined>(undefined);

  connection = inject(AgentBackendConnectionService);

}
