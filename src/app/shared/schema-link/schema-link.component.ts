import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-schema-link',
  templateUrl: './schema-link.component.html',
  styleUrls: ['./schema-link.component.css']
})
export class SchemaLinkComponent implements OnInit {

  @Input() data?: string = '';

  link?: string = '';

  ngOnInit(): void {
    this.link = '';
  }

}
