import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionService} from "../../services/action.service";

@Component({
  selector: 'app-action-selector',
  templateUrl: './action-selector.component.html',
  styleUrls: ['./action-selector.component.css']
})
export class ActionSelectorComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: string = undefined;
  @Output() dataChange = new EventEmitter<string>();

  schemes = [{
    key: 'action',
    value: 'Action'
  }, {
    key: 'php+class',
    value: 'Class'
  }, {
    key: 'http',
    value: 'HTTP'
  }, {
    key: 'https',
    value: 'HTTPS'
  }, {
    key: 'file',
    value: 'File'
  }];

  scheme: string = '';
  value: string = '';

  constructor(public action: ActionService) {
  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      const pos = this.data.indexOf('://');
      if (pos > 0) {
        this.scheme = this.data.substring(0, pos);
        this.value = this.data.substring(pos + 3);
      }
    }
    if (!this.scheme) {
      this.scheme = 'action';
    }
  }

  changeScheme() {
    if (this.disabled) {
      return;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

  changeValue() {
    if (this.disabled) {
      return;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

}
