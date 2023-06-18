import { Component, OnInit } from '@angular/core';
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {AxiosResponse} from "axios";
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
      let extendRoute : Operation & ExtendOperation = operation;

      if (this.entity.operations) {
        const methods = this.getMethodsForRoute(this.entity.operations, operation);

        extendRoute.allowedMethods = {
          get: methods.includes('GET'),
          post: methods.includes('POST'),
          put: methods.includes('PUT'),
          patch: methods.includes('PATCH'),
          delete: methods.includes('DELETE')
        }
      }

      if (!extendRoute.allowedMethods) {
        extendRoute.allowedMethods = {
          get: false,
          post: false,
          put: false,
          patch: false,
          delete: false,
        };
      }

      this.operations.push(extendRoute);
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

  private getMethodsForRoute(routes: Array<ScopeOperation>, targetRoute: Operation): Array<string> {
    const operation: ScopeOperation|undefined = routes.find((scopeRoute) => {
      return targetRoute.id === scopeRoute.operationId;
    });

    if (!operation || !operation.methods) {
      return [];
    }

    return operation.methods.split('|');
  }

  private getConfiguredScopes(): Array<ScopeOperation> {
    const operations: Array<ScopeOperation> = [];
    this.operations.forEach((operation) => {
      const methods = [];
      if (operation.allowedMethods) {
        for (const [methodName, allow] of Object.entries(operation.allowedMethods)) {
          if (allow) {
            methods.push(methodName.toUpperCase());
          }
        }
      }
      if (methods.length > 0) {
        operations.push({
          operationId: operation.id,
          allow: true,
          methods: methods.join('|'),
        });
      }
    });
    return operations;
  }

  toggleSelect(name: string) {
    this.operations.forEach((operation) => {
      if (operation.allowedMethods) {
        if (name === 'GET') {
          operation.allowedMethods.get = !operation.allowedMethods.get;
        } else if (name === 'POST') {
          operation.allowedMethods.post = !operation.allowedMethods.post;
        } else if (name === 'PUT') {
          operation.allowedMethods.put = !operation.allowedMethods.put;
        } else if (name === 'PATCH') {
          operation.allowedMethods.patch = !operation.allowedMethods.patch;
        } else if (name === 'DELETE') {
          operation.allowedMethods.delete = !operation.allowedMethods.delete;
        }
      }
    });
  }

}

interface ExtendOperation {
  allowedMethods?: AllowedMethods
}

interface AllowedMethods {
  get: boolean
  post: boolean
  put: boolean
  patch: boolean
  delete: boolean
}
