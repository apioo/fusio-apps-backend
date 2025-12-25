import {Component, signal} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendOperation, BackendScope, BackendScopeOperation} from "fusio-sdk";
import {ScopeService} from "../../../services/scope.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-scope-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendScope> {

  operations = signal<Array<BackendOperation & ExtendOperation>>([]);

  constructor(private service: ScopeService, private fusio: ApiService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ScopeService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    const response = await this.fusio.getClient().backend().operation().getAll(0, 1024);

    const result: Array<BackendOperation & ExtendOperation> = [];
    response.entry?.forEach((operation) => {
      let extendOperation : BackendOperation & ExtendOperation = operation;

      const operations = this.entity().operations;
      if (operations) {
        extendOperation.allow = this.isOperationAllowed(operations, operation);
      } else {
        extendOperation.allow = false;
      }

      result.push(extendOperation);
    });

    this.operations.set(result);
  }

  protected override beforeCreate(entity: BackendScope): BackendScope {
    entity.operations = this.getConfiguredScopes();

    return entity;
  }

  protected override beforeUpdate(entity: BackendScope): BackendScope {
    entity.operations = this.getConfiguredScopes();

    return entity;
  }

  private isOperationAllowed(operations: Array<BackendScopeOperation>, targetRoute: BackendOperation): boolean {
    const operation: BackendScopeOperation|undefined = operations.find((scopeRoute) => {
      return targetRoute.id === scopeRoute.operationId;
    });

    return !(!operation || !operation.allow);
  }

  private getConfiguredScopes(): Array<BackendScopeOperation> {
    const operations: Array<BackendScopeOperation> = [];
    this.operations().forEach((operation) => {
      if (operation.allow) {
        operations.push({
          operationId: operation.id,
          allow: true,
        });
      }
    });
    return operations;
  }

  toggleSelect() {
    this.operations().forEach((operation) => {
      operation.allow = !operation.allow;
    });
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}

interface ExtendOperation {
  allow?: boolean
}
