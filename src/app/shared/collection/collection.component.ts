import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  @Input() name: string = 'collection';
  @Input() type: string = 'text';
  @Input() data: Array<any> = [];
  @Output() change = new EventEmitter<Object>();

  local: Array<any> = [];
  newValue: any = '';

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.local = this.data.slice();
    }
  }

  onChange(index: number, value?: any) {
    this.local[index] = value;
    this.change.emit(this.local);
  }

  add() {
    if (!this.newValue) {
      return;
    }

    let newValue = this.newValue;
    if (this.type === 'number') {
      newValue = parseInt(newValue);
    }

    this.local.push(newValue);
    this.newValue = '';
    this.change.emit(this.local);
  }

  remove(index: number) {
    if (this.local[index]) {
      this.local.splice(index, 1);
      this.change.emit(this.local);
    }
  }

}
