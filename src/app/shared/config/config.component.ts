import {Component, effect, input, output, signal} from '@angular/core';
import {
  CommonFormContainer,
  CommonFormElementCheckbox,
  CommonFormElementCollection,
  CommonFormElementInput,
  CommonFormElementMap,
  CommonFormElementSelect,
  CommonFormElementTextArea,
  CommonFormElementTypeAPI,
  CommonFormElementTypeSchema
} from "fusio-sdk";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "ngx-monaco-editor-v2-alternative";
import {Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";
import {FormListComponent, FormMapComponent} from "ngx-fusio-sdk";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  imports: [
    FormsModule,
    EditorComponent,
    TypeschemaEditorModule,
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

  elements = signal<Array<CommonFormElementCheckbox | CommonFormElementCollection | CommonFormElementInput | CommonFormElementMap | CommonFormElementSelect | CommonFormElementTextArea | CommonFormElementTypeAPI | CommonFormElementTypeSchema>>([]);

  spec: Specification = {
    imports: [],
    operations: [],
    types: []
  };

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
    let elements: Array<CommonFormElementCheckbox | CommonFormElementCollection | CommonFormElementInput | CommonFormElementMap | CommonFormElementSelect | CommonFormElementTextArea | CommonFormElementTypeAPI | CommonFormElementTypeSchema> = [];
    container?.element?.forEach((element) => {
      if (!element.name) {
        return;
      }

      // BC layer
      if (element.element === 'input') {
        element.element = 'input';
      } else if (element.element === 'select') {
        element.element = 'select';
      } else if (element.element === 'textarea') {
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
