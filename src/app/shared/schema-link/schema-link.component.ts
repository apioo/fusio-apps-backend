import {Component, effect, input, Input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-schema-link',
  templateUrl: './schema-link.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./schema-link.component.css']
})
export class SchemaLinkComponent {

  data = input.required<string|undefined>();

  scheme = signal<string>('');
  value = signal<string>('');
  schema = signal<string>('');

  constructor() {
    effect(() => {
      const data = this.data();
      if (!data) {
        return;
      }

      let pos = data.indexOf('://');
      if (pos === -1) {
        return;
      }

      this.scheme.set(data.substring(0, pos));

      let value = data.substring(pos + 3);
      let schema = data.substring(pos + 3);
      pos = schema.indexOf('@');
      if (pos !== -1) {
        schema = schema.substring(0, pos);
        value = schema + '@' + value.substring(pos + 1).substring(0, 8);
      }

      this.value.set(value);
      this.schema.set(schema);
    });
  }

}
