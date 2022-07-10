import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  @Input() loading: boolean = true;
  @Output() newClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  doClick() {
    this.newClick.emit();
  }

  get hasNew(): boolean {
    return this.newClick.observed;
  }

}
