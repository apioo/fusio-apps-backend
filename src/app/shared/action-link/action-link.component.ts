import {Component, effect, input, Input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-action-link',
  templateUrl: './action-link.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./action-link.component.css']
})
export class ActionLinkComponent {

  data = input.required<string|undefined>();

  scheme = signal<string>('');
  value = signal<string>('');
  action = signal<string>('');

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
      this.value.set(data.substring(pos + 3));

      let action = data.substring(pos + 3);
      pos = action.indexOf('@');
      if (pos !== -1) {
        action = action.substring(0, pos);
      }

      this.action.set(action);
    });
  }

}
