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
import {BackendApp} from "fusio-sdk";
import {ApiService} from "../../api.service";

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

  app?: BackendApp
  type?: any

  appFormatter = (app: BackendApp) => app.name ? app.name : '-';
  appSearch: OperatorFunction<string, Array<BackendApp>> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.fusio.getClient().backend().app().getAll(0, 16, term)).pipe(
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

  constructor(private fusio: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.app = await this.fusio.getClient().backend().app().get('' + this.data);
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
