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
import {App} from "fusio-sdk/dist/src/generated/backend/App";

@Component({
  selector: 'app-app-selector',
  templateUrl: './app-selector.component.html',
  styleUrls: ['./app-selector.component.css']
})
export class AppSelectorComponent {

  @Input() name: string = 'app-selector';
  @Input() disabled: boolean = false;
  @Input() data?: number = undefined;
  @Output() dataChange = new EventEmitter<number>();

  searching = false;
  searchFailed = false;

  app?: App
  type?: any

  appFormatter = (app: App) => app.name ? app.name : '-';
  appSearch: OperatorFunction<string, Array<App>> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.backend.getClient().app().getAll(0, 16, term)).pipe(
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
      this.app = await this.backend.getClient().app().get('' + this.data);
    }
  }

  changeValue() {
    if (this.disabled) {
      return;
    }

    const id = this.app?.id;
    if (!id) {
      return;
    }

    this.dataChange.emit(id);
  }

}
