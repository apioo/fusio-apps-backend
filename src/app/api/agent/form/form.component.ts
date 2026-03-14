import {Component, signal} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendAgent, BackendAgentTool} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {AgentService} from "../../../services/agent.service";
import {SchemaSelectorComponent} from "../../../shared/schema-selector/schema-selector.component";
import {ConnectionService} from "../../../services/connection.service";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-agent-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    SchemaSelectorComponent,
    FormAutocompleteComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendAgent> {

  types = [
    {key: 0, value: 'General'},
    {key: 1, value: 'Architect'},
    {key: 2, value: 'Action'},
    {key: 3, value: 'Schema'},
    {key: 4, value: 'Database'}
  ]

  tools = signal<Array<BackendAgentTool>>([]);

  selected = signal<Record<string, boolean>>({});

  constructor(private service: AgentService, private api: ApiService, private help: HelpService, public connection: ConnectionService, public event: EventService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AgentService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  protected override async onLoad() {
    try {
      const response = await this.api.getClient().backend().agent().getTools();
      const tools = response.tools || [];
      this.tools.set(tools);

      const selected: Record<string, boolean> = {};
      this.entity().tools?.forEach((toolName: string) => {
        selected[toolName] = true;
      });
      this.selected.set(selected);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  protected override beforeCreate(entity: BackendAgent): BackendAgent {
    entity.tools = this.getSelectedTools();
    return entity;
  }

  protected override beforeUpdate(entity: BackendAgent): BackendAgent {
    entity.tools = this.getSelectedTools();
    return entity;
  }

  select(toolName: string, select: boolean) {
    this.selected.update((selected) => {
      selected[toolName] = select;
      return selected;
    });
  }

  getSelectedTools(): Array<string> {
    const tools: Array<string> = [];
    const selected = this.selected();
    for (const [key, value] of Object.entries(selected)) {
      if (value) {
        tools.push(key);
      }
    }

    return tools;
  }
}
