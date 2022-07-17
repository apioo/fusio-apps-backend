import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";
import {Specification} from "ngx-typeschema-editor/lib/model/Specification";

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css']
})
export class ConfigFormComponent implements OnInit, OnChanges {

  @Input() container?: Form_Container;
  @Input() data?: Record<string, any> = {};
  @Output() dataChange = new EventEmitter<Record<string, any>>();

  elements: Array<any> = [];

  spec: Specification = {
    imports: [],
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

  public change(key: string, value: any): void {
    console.log('change config', key, value);
    if (!this.data) {
      this.data = {};
    }

    this.data[key] = value;
    this.dataChange.emit(this.data);
  }

  private loadElements(container?: Form_Container): void {
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
