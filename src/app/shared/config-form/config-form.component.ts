import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Specification} from "ngx-typeschema-editor/lib/model/Specification";
import {
  FormContainer
} from "fusio-sdk/dist/src/generated/backend/FormContainer";

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css']
})
export class ConfigFormComponent implements OnInit, OnChanges {

  @Input() container?: FormContainer;
  @Input() data?: Record<string, any> = {};
  @Output() dataChange = new EventEmitter<Record<string, any>>();

  elements: Array<any> = [];

  spec: Specification = {
    imports: [],
    operations: [],
    types: []
  };

  constructor() { }

  ngOnInit(): void {
    this.loadElements(this.container);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['container'] && changes['container'].currentValue) {
      this.loadElements(changes['container'].currentValue);
    }
  }

  public doChange(key: string, value: any): void {
    if (!this.data) {
      this.data = {};
    }

    this.data[key] = value;
    this.dataChange.emit(this.data);
  }

  private loadElements(container?: FormContainer): void {
    this.elements = [];

    let data: Record<string, any> = {};
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
      }

      this.elements.push(element);
    });

    if (!this.data) {
      this.data = data;
      this.dataChange.emit(this.data);
    }
  }

}
