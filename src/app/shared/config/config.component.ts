import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonFormContainer} from "fusio-sdk";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {CollectionComponent} from "../collection/collection.component";
import {MapComponent} from "../map/map.component";
import {Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";
import {KeyValuePipe} from "@angular/common";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  imports: [
    FormsModule,
    EditorComponent,
    CollectionComponent,
    MapComponent,
    TypeschemaEditorModule
  ],
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, OnChanges {

  @Input() container?: CommonFormContainer;
  @Input() data?: Record<string, any> = {};
  @Input() disabled: boolean = false;
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

  private loadElements(container?: CommonFormContainer): void {
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
      } else if (element.element === 'typeapi') {
        data[element.name] = {
          imports: [],
          operations: [],
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

  protected readonly Array = Array;
}
