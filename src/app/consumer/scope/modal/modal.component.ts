import { Component, OnInit } from '@angular/core';
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {ScopeRoute} from "fusio-sdk/dist/src/generated/backend/ScopeRoute";

@Component({
  selector: 'app-scope-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Scope> {

  routes: Array<ModelRoute & ExtendRoute> = [];

  override async ngOnInit(): Promise<void> {
    const user = await this.fusio.getClient().getBackendRoutes();
    const response = await user.backendActionRouteGetAll({count: 1024});

    this.routes = [];
    response.data.entry?.forEach((route) => {
      let extendRoute : ModelRoute & ExtendRoute = route;

      if (this.entity.routes) {
        const methods = this.getMethodsForRoute(this.entity.routes, route);

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

      this.routes.push(extendRoute);
    });
  }

  protected async create(entity: Scope): Promise<AxiosResponse<Message>> {
    entity.routes = this.getConfiguredScopes();

    const resource = await this.fusio.getClient().getBackendScope();
    return await resource.backendActionScopeCreate(entity);
  }

  protected async update(entity: Scope): Promise<AxiosResponse<Message>> {
    entity.routes = this.getConfiguredScopes();

    const resource = await this.fusio.getClient().getBackendScopeByScopeId('' + entity.id);
    return await resource.backendActionScopeUpdate(entity);
  }

  protected async delete(entity: Scope): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendScopeByScopeId('' + entity.id);
    return await resource.backendActionScopeDelete();
  }

  protected newEntity(): Scope {
    return {
      name: ''
    };
  }

  private getMethodsForRoute(routes: Array<ScopeRoute>, targetRoute: ModelRoute): Array<string> {
    const route: ScopeRoute|undefined = routes.find((scopeRoute) => {
      return targetRoute.id === scopeRoute.routeId;
    });

    if (!route || !route.methods) {
      return [];
    }

    return route.methods.split('|');
  }

  private getConfiguredScopes(): Array<ScopeRoute> {
    const routes: Array<ScopeRoute> = [];
    this.routes.forEach((route) => {
      const methods = [];
      if (route.allowedMethods) {
        for (const [methodName, allow] of Object.entries(route.allowedMethods)) {
          if (allow) {
            methods.push(methodName.toUpperCase());
          }
        }
      }
      if (methods.length > 0) {
        routes.push({
          routeId: route.id,
          allow: true,
          methods: methods.join('|'),
        });
      }
    });
    return routes;
  }

  toggleSelect(name: string) {
    this.routes.forEach((route) => {
      if (route.allowedMethods) {
        if (name === 'GET') {
          route.allowedMethods.get = !route.allowedMethods.get;
        } else if (name === 'POST') {
          route.allowedMethods.post = !route.allowedMethods.post;
        } else if (name === 'PUT') {
          route.allowedMethods.put = !route.allowedMethods.put;
        } else if (name === 'PATCH') {
          route.allowedMethods.patch = !route.allowedMethods.patch;
        } else if (name === 'DELETE') {
          route.allowedMethods.delete = !route.allowedMethods.delete;
        }
      }
    });
  }

}

interface ExtendRoute {
  allowedMethods?: AllowedMethods
}

interface AllowedMethods {
  get: boolean
  post: boolean
  put: boolean
  patch: boolean
  delete: boolean
}
