import {Component, signal} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendAgent, BackendAgentTool} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {AgentService} from "../../../services/agent.service";
import {SchemaLinkComponent} from "../../../shared/schema-link/schema-link.component";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-agent-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe,
    SchemaLinkComponent,
    RouterLink
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAgent> {

  tools = signal<Array<BackendAgentTool>>([]);

  constructor(private service: AgentService, private api: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AgentService {
    return this.service;
  }

  protected override async onLoad() {
    try {
      const response = await this.api.getClient().backend().agent().getTools();
      let tools = response.tools || [];

      const selectedTools = this.selected()?.tools || [];
      tools = tools.filter((tool) => {
        return selectedTools.includes(tool.name || '');
      });

      this.tools.set(tools);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
