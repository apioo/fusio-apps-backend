import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Scope_Route} from "fusio-sdk/dist/src/generated/backend/Scope_Route";

@Component({
  selector: 'app-scope-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Scope> {

  routes: Array<ModelRoute & ExtendRoute> = [];

  override async ngOnInit(): Promise<void> {
    const user = await this.factory.getClient().backendRoute();
    const response = await user.getBackendRoutes().backendActionRouteGetAll({count: 1024});

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

    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScope().backendActionScopeCreate(entity);
  }

  protected async update(entity: Scope): Promise<AxiosResponse<Message>> {
    entity.routes = this.getConfiguredScopes();

    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScopeByScopeId('' + entity.id).backendActionScopeUpdate(entity);
  }

  protected async delete(entity: Scope): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScopeByScopeId('' + entity.id).backendActionScopeDelete();
  }

  protected newEntity(): Scope {
    return {
      name: ''
    };
  }

  private getMethodsForRoute(routes: Array<Scope_Route>, targetRoute: ModelRoute): Array<string> {
    const route: Scope_Route|undefined = routes.find((scopeRoute) => {
      return targetRoute.id === scopeRoute.routeId;
    });

    if (!route || !route.methods) {
      return [];
    }

    return route.methods.split('|');
  }

  private getConfiguredScopes(): Array<Scope_Route> {
    const routes: Array<Scope_Route> = [];
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
