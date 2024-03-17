import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackendScopeCategory, BackendScopeCategoryScope} from "fusio-sdk";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-scope-categories',
  templateUrl: './scope-categories.component.html',
  styleUrls: ['./scope-categories.component.css']
})
export class ScopeCategoriesComponent implements OnInit {

  @Input() scopes?: Array<string>;
  @Output() dataChange = new EventEmitter<any>();

  categories?: Array<BackendScopeCategory>;
  selected: Array<string> = [];
  selectedCategory: number = 1;
  toggleScope: boolean = true;

  constructor(private fusio: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().scope().getCategories();
    this.categories = response.categories;
    if (this.scopes) {
      this.selected = this.scopes;
    }
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

    this.dataChange.emit(this.selected)
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

    this.dataChange.emit(this.selected)
    this.toggleScope = !this.toggleScope;
  }

  private addScope(scope: string) {
    this.selected.push(scope)
  }

  private removeScope(scope: string) {
    this.selected = this.selected.filter((value) => {
      return value !== scope;
    });
  }
}
