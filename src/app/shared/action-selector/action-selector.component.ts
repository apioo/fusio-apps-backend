import {Component} from '@angular/core';
import {FormAutocompleteComponent} from "ngx-fusio-sdk";
import {ActionService} from "../../services/action.service";

@Component({
  selector: 'app-action-selector',
  templateUrl: './action-selector.component.html',
  styleUrls: ['./action-selector.component.css']
})
export class ActionSelectorComponent extends FormAutocompleteComponent {

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

  constructor(private action: ActionService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    if (this.data) {
      const pos = this.data.indexOf('://');
      if (pos > 0) {
        this.scheme = this.data.substring(0, pos);
        this.value = this.data.substring(pos + 3);

        if (this.scheme === 'action') {
          this.selected = await this.action.getWithIdAndName('~' + this.value);
        }
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

  override changeValue() {
    if (this.disabled) {
      return;
    }

    if (this.scheme === 'action' && this.selected?.name) {
      this.value = this.selected?.name;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

}
