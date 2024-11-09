import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendOperation, BackendScope, BackendScopeOperation, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-scope-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendScope> {

  operations: Array<BackendOperation & ExtendOperation> = [];

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().operation().getAll(0, 1024);

    this.operations = [];
    response.entry?.forEach((operation) => {
      let extendOperation : BackendOperation & ExtendOperation = operation;

      if (this.entity.operations) {
        extendOperation.allow = this.isOperationAllowed(this.entity.operations, operation);
      } else {
        extendOperation.allow = false;
      }

      this.operations.push(extendOperation);
    });
  }

  protected async create(entity: BackendScope): Promise<CommonMessage> {
    entity.operations = this.getConfiguredScopes();

    return this.fusio.getClient().backend().scope().create(entity);
  }

  protected async update(entity: BackendScope): Promise<CommonMessage> {
    entity.operations = this.getConfiguredScopes();

    return this.fusio.getClient().backend().scope().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendScope): Promise<CommonMessage> {
    return this.fusio.getClient().backend().scope().delete('' + entity.id);
  }

  protected newEntity(): BackendScope {
    return {
      name: ''
    };
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
