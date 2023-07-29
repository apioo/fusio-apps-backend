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
import {User} from "fusio-sdk/dist/src/generated/backend/User";

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

  user?: User
  type?: any

  userFormatter = (user: User) => user.name ? user.name : '-';
  userSearch: OperatorFunction<string, Array<User>> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.backend.getClient().user().getAll(0, 16, term)).pipe(
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
      this.user = await this.backend.getClient().user().get('' + this.data);
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
