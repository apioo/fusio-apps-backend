import {Component, effect, input, output, signal} from '@angular/core';
import {
  CommonFormContainer,
  CommonFormElementInput,
  CommonFormElementSelect,
  CommonFormElementTag,
  CommonFormElementTextArea
} from "fusio-sdk";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "ngx-monaco-editor-v2";
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

  elements = signal<Array<CommonFormElementInput | CommonFormElementSelect | CommonFormElementTag | CommonFormElementTextArea>>([]);

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
    let elements: Array<CommonFormElementInput | CommonFormElementSelect | CommonFormElementTag | CommonFormElementTextArea> = [];
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
