import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-schema-link',
  templateUrl: './schema-link.component.html',
  styleUrls: ['./schema-link.component.css']
})
export class SchemaLinkComponent implements OnInit {

  @Input() data?: string = '';

  scheme?: string = '';
  value?: string = '';

  ngOnInit(): void {
    const data = this.data;
    if (!data) {
      return;
    }

    const pos = data.indexOf('://');
    if (pos === -1) {
      return;
    }

    this.scheme = data.substring(0, pos);
    this.value = data.substring(pos + 3);
  }

}
