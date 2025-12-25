import {Component, effect, EventEmitter, input, Output, resource, signal} from '@angular/core';
import {BackendScopeCategory, BackendScopeCategoryScope} from "fusio-sdk";
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-scope-categories',
  templateUrl: './scope-categories.component.html',
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    NgbNavOutlet
  ],
  styleUrls: ['./scope-categories.component.css']
})
export class ScopeCategoriesComponent {

  scopes = input<Array<string>|undefined>(undefined);
  disabled = input<boolean>(false);

  @Output() dataChange = new EventEmitter<any>();

  categories = resource({
    loader: async (): Promise<Array<BackendScopeCategory>> => {
      const response = await this.fusio.getClient().backend().scope().getCategories();
      return response.categories || [];
    },
  });

  selected = signal<Array<string>>([]);

  selectedCategory: number = 1;
  toggleScope: boolean = true;

  constructor(private fusio: ApiService) {
    effect(async () => {
      const scopes = this.scopes();
      if (scopes) {
        this.selected.set(scopes);
      }
    });
  }

  scopeSelect(event: any, scope?: string) {
    const selected = event.target.checked;
    if (!scope) {
      return;
    }

    if (selected) {
      this.addScope(scope);
    } else {
      this.removeScope(scope);
    }

    this.dataChange.emit(this.selected())
  }

  toggleScopes(scopes?: Array<BackendScopeCategoryScope>) {
    if (!scopes) {
      return;
    }

    scopes.forEach((scope) => {
      if (!scope.name) {
        return;
      }
      if (this.toggleScope) {
        this.addScope(scope.name);
      } else {
        this.removeScope(scope.name);
      }
    });

    this.dataChange.emit(this.selected())
    this.toggleScope = !this.toggleScope;
  }

  private addScope(scope: string) {
    this.selected.update((entries) => {
      entries.push(scope);
      return entries;
    });
  }

  private removeScope(scope: string) {
    this.selected.update((entries) => {
      entries = entries.filter((value) => {
        return value !== scope;
      });
      return entries;
    });
  }

}
