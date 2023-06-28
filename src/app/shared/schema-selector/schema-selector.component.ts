import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter, from,
  map,
  Observable, of,
  OperatorFunction,
  switchMap,
  tap
} from "rxjs";
import {BackendService} from "ngx-fusio-sdk";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Component({
  selector: 'app-schema-selector',
  templateUrl: './schema-selector.component.html',
  styleUrls: ['./schema-selector.component.css']
})
export class SchemaSelectorComponent implements OnInit {

  @Input() name: string = 'schema-selector';
  @Input() disabled: boolean = false;
  @Input() data?: string = '';
  @Output() dataChange = new EventEmitter<string>();

  schemes = [{
    key: 'schema',
    value: 'Schema'
  }, {
    key: 'http',
    value: 'HTTP'
  }, {
    key: 'https',
    value: 'HTTPS'
  }, {
    key: 'file',
    value: 'File'
  }/*, {
    key: 'typehub',
    value: 'TypeHub'
  }*/];

  scheme: string = '';
  value: string = '';

  searching = false;
  searchFailed = false;

  schema?: Schema
  type?: any

  schemaFormatter = (schema: Schema) => schema.name ? schema.name : '-';
  schemaSearch: OperatorFunction<string, Array<Schema>> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.backend.getClient().schema().getAll(0, 16, term)).pipe(
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

        if (this.scheme === 'schema') {
          this.schema = await this.backend.getClient().schema().get('~' + this.value);
        }
      }
    }
    if (!this.scheme) {
      this.scheme = 'schema';
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

    if (this.scheme === 'schema' && this.schema?.name) {
      this.value = this.schema?.name;
    }

    this.dataChange.emit(this.scheme + '://' + this.value);
  }

}
