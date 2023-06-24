import { Component, OnInit } from '@angular/core';
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {ScopeOperation} from "fusio-sdk/dist/src/generated/backend/ScopeOperation";

@Component({
  selector: 'app-scope-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Scope> {

  operations: Array<Operation & ExtendOperation> = [];

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().operation().getAll(0, 1024);

    this.operations = [];
    response.entry?.forEach((operation) => {
      let extendOperation : Operation & ExtendOperation = operation;

      if (this.entity.operations) {
        extendOperation.allow = this.isOperationAllowed(this.entity.operations, operation);
      } else {
        extendOperation.allow = false;
      }

      this.operations.push(extendOperation);
    });
  }

  protected async create(entity: Scope): Promise<Message> {
    entity.operations = this.getConfiguredScopes();

    return this.fusio.getClient().scope().create(entity);
  }

  protected async update(entity: Scope): Promise<Message> {
    entity.operations = this.getConfiguredScopes();

    return this.fusio.getClient().scope().update('' + entity.id, entity);
  }

  protected async delete(entity: Scope): Promise<Message> {
    return this.fusio.getClient().scope().delete('' + entity.id);
  }

  protected newEntity(): Scope {
    return {
      name: ''
    };
  }

  private isOperationAllowed(operations: Array<ScopeOperation>, targetRoute: Operation): boolean {
    const operation: ScopeOperation|undefined = operations.find((scopeRoute) => {
      return targetRoute.id === scopeRoute.operationId;
    });

    return !(!operation || !operation.allow);
  }

  private getConfiguredScopes(): Array<ScopeOperation> {
    const operations: Array<ScopeOperation> = [];
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
