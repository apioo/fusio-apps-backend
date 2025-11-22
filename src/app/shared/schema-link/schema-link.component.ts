import {Component, Input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-schema-link',
  templateUrl: './schema-link.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./schema-link.component.css']
})
export class SchemaLinkComponent implements OnInit, OnChanges {

  @Input() data?: string = '';

  scheme = signal<string>('');
  value = signal<string>('');

  ngOnInit(): void {
    this.parse();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parse();
  }

  private parse() {
    const data = this.data;
    if (!data) {
      return;
    }

    const pos = data.indexOf('://');
    if (pos === -1) {
      return;
    }

    this.scheme.set(data.substring(0, pos));
    this.value.set(data.substring(pos + 3));
  }
}
