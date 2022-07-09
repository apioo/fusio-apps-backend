import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";

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
    if (!this.data) {
      this.data = {};
    }

    this.data[key] = value;
    this.dataChange.emit(this.data);
  }

  private loadElements(container?: Form_Container): void {
    this.elements = [];

    container?.element?.forEach((element) => {
      if (!element.name) {
        return;
      }

      this.elements.push(element);
    });
  }

}
