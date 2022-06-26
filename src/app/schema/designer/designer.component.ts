import { Component, OnInit } from '@angular/core';
import {Include, Type} from "ngx-typeschema-editor";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  imports: Array<Include> = [];
  types: Array<Type> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
