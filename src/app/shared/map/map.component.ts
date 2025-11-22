import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() name: string = 'map';
  @Input() type: string = 'text';
  @Input() data: Record<string, any> = {};
  @Input() disabled: boolean = false;
  @Output() dataChange = new EventEmitter<Record<string, any>>();

  local: Array<Entry> = [];
  newKey: string = '';
  newValue: any = '';

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.local = this.toLocal(this.data);
    }
  }

  doChange(index: number, value?: any) {
    this.local[index].value = value;
    this.dataChange.emit(this.fromLocal());
  }

  doAdd() {
    if (!this.newKey || !this.newValue) {
      return;
    }

    let newValue = this.newValue;
    if (this.type === 'number') {
      newValue = parseInt(newValue);
    }

    this.local.push({
      key: this.newKey,
      value: newValue,
    });

    this.newKey = '';
    this.newValue = '';
    this.dataChange.emit(this.fromLocal());
  }

  doRemove(index: number) {
    this.local.splice(index, 1);
    this.dataChange.emit(this.fromLocal());
  }

  toLocal(data: Record<string, any>): Array<Entry> {
    let local = [];
    for (const [key, value] of Object.entries(data)) {
      local.push({
        key: key,
        value: value
      });
    }
    return local;
  }

  fromLocal(): Record<string, any> {
    let data: Record<string, any> = {};
    this.local.forEach((entry: Entry) => {
      data[entry.key] = entry.value;
    });
    return data;
  }

}

interface Entry {
  key: string
  value: string
}
