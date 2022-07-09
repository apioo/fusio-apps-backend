import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scope-values',
  templateUrl: './scope-values.component.html',
  styleUrls: ['./scope-values.component.css']
})
export class ScopeValuesComponent implements OnInit {

  @Input() scopes?: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
