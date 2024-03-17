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
import {BackendUser} from "fusio-sdk";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent {

  @Input() name: string = 'action-selector';
  @Input() disabled: boolean = false;
  @Input() data?: number = undefined;
  @Output() dataChange = new EventEmitter<number>();

  searching = false;
  searchFailed = false;

  user?: BackendUser
  type?: any

  userFormatter = (user: BackendUser) => user.name ? user.name : '-';
  userSearch: OperatorFunction<string, Array<BackendUser>> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.fusio.getClient().backend().user().getAll(0, 16, term)).pipe(
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
      this.user = await this.fusio.getClient().backend().user().get('' + this.data);
    }
  }

  changeValue() {
    if (this.disabled) {
      return;
    }

    const id = this.user?.id;
    if (!id) {
      return;
    }

    this.dataChange.emit(id);
  }

}
