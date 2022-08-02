import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModelId, QueryParams} from "../../list";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent<T extends ModelId & Properties> implements OnInit {

  @Input()
  public name!: string;
  @Input()
  public nameKey!: string;
  @Input()
  public totalResults: number = 0;
  @Input()
  public entries: Array<T> = [];
  @Input()
  public selected?: T;
  @Input()
  public page!: number;
  @Input()
  public pageSize!: number;
  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  entrySelect: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  ngOnInit(): void {
  }

  doPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  doEntrySelect(entry: T): void {
    this.entrySelect.emit(entry);
  }

}

interface Properties {
  [key: string]: any
}
