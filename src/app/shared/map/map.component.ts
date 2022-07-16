import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() name: string = 'map';
  @Input() type: string = 'text';
  @Input() data: Record<string, any> = {};
  @Output() change = new EventEmitter<Object>();

  local: Record<string, any> = {};
  newKey: string = '';
  newValue: any = '';

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      console.log('init', this.data);
      this.local = Object.assign({}, this.data);
    }
  }

  onChange(key: string, value?: any) {

    console.log('change', key, value);

    this.local[key] = value;
    //this.change.emit(this.local);
  }

  add() {
    console.log('add', this.newKey, this.newValue);

    if (!this.newKey || !this.newValue) {
      return;
    }

    let newValue = this.newValue;
    if (this.type === 'number') {
      newValue = parseInt(newValue);
    }

    this.local[this.newKey] = newValue;
    this.newKey = '';
    this.newValue = '';
    //this.change.emit(this.local);
  }

  remove(key: string) {
    if (this.local[key]) {
      console.log('remove', key);
      delete this.local[key];
      //this.change.emit(this.local);
    }
  }

}
