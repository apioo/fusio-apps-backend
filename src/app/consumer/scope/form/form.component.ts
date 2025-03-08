import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendOperation, BackendScope, BackendScopeOperation, CommonMessage} from "fusio-sdk";
import {ScopeService} from "../../../services/scope.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-scope-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendScope> {

  operations: Array<BackendOperation & ExtendOperation> = [];

  constructor(private service: ScopeService, private fusio: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ScopeService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    const response = await this.fusio.getClient().backend().operation().getAll(0, 1024);

    this.operations = [];
    response.entry?.forEach((operation) => {
      let extendOperation : BackendOperation & ExtendOperation = operation;

      if (this.entity?.operations) {
        extendOperation.allow = this.isOperationAllowed(this.entity.operations, operation);
      } else {
        extendOperation.allow = false;
      }

      this.operations.push(extendOperation);
    });
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
    this.operations.forEach((operation) => {
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
    this.operations.forEach((operation) => {
      operation.allow = !operation.allow;
    });
  }

}

interface ExtendOperation {
  allow?: boolean
}
