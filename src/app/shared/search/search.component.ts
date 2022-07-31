import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HelpService} from "../../help.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  searchTerm?: string;

  @Input()
  helpPath!: string;

  @Input()
  placeholder!: string;

  @Input()
  buttons: Array<Button> = [];

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  newClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected help: HelpService) {
  }

  ngOnInit(): void {
  }

  doSearch(search?: string): void {
    this.search.emit(search || '');
  }

  doCreateClick(): void {
    this.newClick.emit();
  }

  showHelp() {
    this.help.showDialog(this.helpPath);
  }

}

interface Button {
  routerLink: string,
  icon: string,
}
