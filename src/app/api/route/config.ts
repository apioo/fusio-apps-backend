import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {RouteVersion} from "fusio-sdk/dist/src/generated/backend/RouteVersion";
import {RouteMethod} from "fusio-sdk/dist/src/generated/backend/RouteMethod";
import {RouteMethods} from "fusio-sdk/dist/src/generated/backend/RouteMethods";
import {RouteMethodResponses} from "fusio-sdk/dist/src/generated/backend/RouteMethodResponses";

export class Config {

  public static getActiveVersion(selected?: ModelRoute, activeVersion?: number): RouteVersion|null {
    if (!selected || !selected.config) {
      return null;
    }
    if (!activeVersion) {
      return null;
    }
    for (let i = 0; i < selected.config.length; i++) {
      if (selected.config[i].version === activeVersion) {
        return selected.config[i];
      }
    }
    return null;
  }

  public static getActiveMethod(selected?: ModelRoute, activeVersion?: number, activeMethod?: string): RouteMethod|null {
    const version = this.getActiveVersion(selected, activeVersion);
    if (!version || !version.methods) {
      return null;
    }
    if (!activeMethod) {
      return null;
    }
    for (const [methodName, value] of Object.entries(version.methods)) {
      if (methodName === activeMethod) {
        return value;
      }
    }
    return null;
  }

  public static getLatestVersion(selected?: ModelRoute): number {
    let version = 0;
    if (!selected || !selected.config) {
      return version;
    }
    for (let i = 0; i < selected.config.length; i++) {
      let ver = selected.config[i].version;
      if (!ver) {
        continue;
      }
      if (ver > version) {
        version = ver
      }
    }
    return version
  }

  public static transformMethods(methods?: RouteMethods, onlyActive?: boolean): Array<RouteMethod> {
    if (!methods) {
      return [];
    }

    let result = [];
    for (const [methodName, value] of Object.entries(methods)) {
      if (onlyActive && value.active !== true) {
        continue;
      }
      let method = value;
      method.method = methodName;
      result.push(method);
    }

    return result;
  }

  public static transformResponses(responses?: RouteMethodResponses): Array<HttpResponse> {
    if (!responses) {
      return [];
    }

    let result = [];
    for (const [key, value] of Object.entries(responses)) {
      result.push({
        code: parseInt(key),
        schema: value,
      });
    }

    return result;
  }

}

export interface HttpResponse {
  code: number
  schema: string
}
