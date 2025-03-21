import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SchemaService} from "../../services/schema.service";

@Component({
  selector: 'app-schema-selector',
  templateUrl: './schema-selector.component.html',
  styleUrls: ['./schema-selector.component.css']
})
export class SchemaSelectorComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: string = undefined;
  @Output() dataChange = new EventEmitter<string>();

  schemes = [{
    key: 'schema',
    value: 'Schema'
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
  }, {
    key: 'mime',
    value: 'Content-Type'
  }/*, {
    key: 'typehub',
    value: 'TypeHub'
  }*/];

  scheme: string = '';
  value: string = '';

  constructor(public schema: SchemaService) {
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
      this.scheme = 'schema';
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
