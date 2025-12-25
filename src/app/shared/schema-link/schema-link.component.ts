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

  constructor() {
    effect(() => {
      const data = this.data();
      if (!data) {
        return;
      }

      const pos = data.indexOf('://');
      if (pos === -1) {
        return;
      }

      this.scheme.set(data.substring(0, pos));
      this.value.set(data.substring(pos + 3));
    });
  }

}
