import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  OperatorFunction,
  switchMap,
  tap
} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {BackendService} from "ngx-fusio-sdk";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";

@Component({
  selector: 'app-action-selector',
  templateUrl: './action-selector.component.html',
  styleUrls: ['./action-selector.component.css']
})
export class ActionSelectorComponent {

  @Input() name: string = 'action-selector';
  @Input() disabled: boolean = false;
  @Input() data?: string = '';
  @Output() dataChange = new EventEmitter<string>();

  schemes = [{
    key: 'action',
    value: 'Action'
  }, {
    key: 'php+class',
    value: 'Class'
  }, {
    key: 'http',
    value: 'HTTP'
  }, {
    key: 'https',
    value: 'HTTPS'
  }, {
    key: 'file',
    value: 'File'
  }];

  scheme: string = '';
  value: string = '';

  searching = false;
  searchFailed = false;

  action?: Action
  type?: any

  actionFormatter = (action: Action) => action.name ? action.name : '-';
  actionSearch: OperatorFunction<string, Array<Action>> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.backend.getClient().action().getAll(0, 16, term)).pipe( // @TODO add term
          map((response) => {
            return response.entry ? response.entry : [];
          }),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }),
        ),
      ),
      tap(() => (this.searching = false)),
    );

  constructor(private backend: BackendService) {
  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      const pos = this.data.indexOf('://');
      if (pos > 0) {
        this.scheme = this.data.substring(0, pos);
        this.value = this.data.substring(pos + 3);

        if (this.scheme === 'action') {
          this.action = await this.backend.getClient().action().get('~' + this.value);
        }
      }
    }
    if (!this.scheme) {
      this.scheme = 'action';
    }
  }

  changeScheme() {
    if (this.disabled) {
      return;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

  changeValue() {
    if (this.disabled) {
      return;
    }

    if (this.scheme === 'action' && this.action?.name) {
      this.value = this.action?.name;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

}
