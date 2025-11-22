import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CsvPipe} from "./csv.pipe";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  imports: [
    FormsModule,
    CsvPipe,
    NgbPopover
  ],
  styleUrls: ['./tag-editor.component.css']
})
export class TagEditorComponent implements OnInit {

  @Input() name: string = 'tag-editor';
  @Input() disabled: boolean = false;
  @Input() data?: Array<string> = [];
  @Output() dataChange = new EventEmitter<Array<string>>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(data?: string) {
    this.dataChange.emit(this.parseCsv(data));
  }

  parseCsv(data?: string): Array<string> {
    if (!data) {
      return [];
    }

    return data.split(',').map((el) => {
      return el.trim();
    }).filter(Boolean);
  }

}
