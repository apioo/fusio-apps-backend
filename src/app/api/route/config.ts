import {Route_Version} from "fusio-sdk/dist/src/generated/backend/Route_Version";
import {Route_Method} from "fusio-sdk/dist/src/generated/backend/Route_Method";
import {Route_Methods} from "fusio-sdk/dist/src/generated/backend/Route_Methods";
import {Route_Method_Responses} from "fusio-sdk/dist/src/generated/backend/Route_Method_Responses";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";

export class Config {

  public static getActiveVersion(selected?: ModelRoute, activeVersion?: number): Route_Version|null {
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

  public static getActiveMethod(selected?: ModelRoute, activeVersion?: number, activeMethod?: string): Route_Method|null {
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

  public static transformMethods(methods?: Route_Methods, onlyActive?: boolean): Array<Route_Method> {
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

  public static transformResponses(responses?: Route_Method_Responses): Array<HttpResponse> {
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
