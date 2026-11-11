import {Component, effect, inject, input, output, signal} from '@angular/core';
import {
  CommonFormContainer,
  CommonFormElementAction,
  CommonFormElementAgent,
  CommonFormElementCheckbox,
  CommonFormElementCollection,
  CommonFormElementConnection,
  CommonFormElementInput,
  CommonFormElementMap,
  CommonFormElementSelect,
  CommonFormElementTextArea,
  CommonFormElementTypeAPI,
  CommonFormElementTypeSchema
} from "fusio-sdk";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";
import {FormAutocompleteComponent, FormListComponent, FormMapComponent} from "ngx-fusio-sdk";
import {ActionService} from "../../services/action.service";
import {ConnectionService} from "../../services/connection.service";
import {AgentService} from "../../services/agent.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  imports: [
    FormsModule,
    EditorComponent,
    TypeschemaEditorModule,
    FormAutocompleteComponent,
    FormListComponent,
    FormMapComponent
  ],
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  container = input<CommonFormContainer|undefined>(undefined);
  data = input<Record<string, any>|undefined>({});
  disabled = input<boolean>(false);
  dataChange = output<Record<string, any>>();

  elements = signal<Array<FormElement>>([]);

  spec: Specification = {
    imports: [],
    operations: [],
    types: []
  };

  actionService = inject(ActionService);
  agentService = inject(AgentService);
  connectionService = inject(ConnectionService);

  constructor() {
    effect(() => {
      this.loadElements(this.container());
    });
  }

  public doChange(key: string, value: any): void {
    let data = this.data();
    if (!data) {
      data = {};
    }

    data[key] = value;
    this.dataChange.emit(data);
  }

  private loadElements(container?: CommonFormContainer): void {
    let data: Record<string, any> = {};
    let elements: Array<FormElement> = [];
    container?.element?.forEach((element) => {
      if (!element.name) {
        return;
      }

      // BC layer
      if (element.element === 'http://fusio-project.org/ns/2015/form/input') {
        element.element = 'input';
      } else if (element.element === 'http://fusio-project.org/ns/2015/form/select') {
        element.element = 'select';
      } else if (element.element === 'http://fusio-project.org/ns/2015/form/textarea') {
        element.element = 'textarea';
      }

      if (element.element === 'collection') {
        data[element.name] = [];
      } else if (element.element === 'map') {
        data[element.name] = {};
      } else if (element.element === 'typeschema') {
        data[element.name] = {
          imports: [],
          types: []
        };
      } else if (element.element === 'typeapi') {
        data[element.name] = {
          imports: [],
          operations: [],
          types: []
        };
      }

      elements.push(element);
    });

    this.elements.set(elements);

    if (!this.data()) {
      this.dataChange.emit(data);
    }
  }

}

type FormElement = CommonFormElementCheckbox | CommonFormElementCollection | CommonFormElementInput | CommonFormElementMap | CommonFormElementSelect | CommonFormElementTextArea | CommonFormElementTypeAPI | CommonFormElementTypeSchema | CommonFormElementAction | CommonFormElementAgent | CommonFormElementConnection;

