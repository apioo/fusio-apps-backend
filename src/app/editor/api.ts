import {PHP} from "./api/php";
import {Java} from "./api/java";
import {Javascript} from "./api/javascript";
import {Python} from "./api/python";

export class ApiFactory {

  private static container: Record<string, API> = {};

  static factory(lang: string): API {
    if (ApiFactory.container[lang]) {
      return ApiFactory.container[lang];
    }

    let api: API;
    if (lang === 'java') {
      api = new Java();
    } else if (lang === 'javascript') {
      api = new Javascript();
    } else if (lang === 'python') {
      api = new Python();
    } else {
      api = new PHP();
    }

    return ApiFactory.container[lang] = api;
  }

}

export interface API {
  getRequestMethods(): Array<Method>;
  getRequestArgumentsMethods(): Array<Method>;
  getContextMethods(): Array<Method>;
  getContextAppMethods(): Array<Method>;
  getContextUserMethods(): Array<Method>;
  getConnectorMethods(): Array<Method>;
  getResponseMethods(): Array<Method>;
  getDispatcherMethods(): Array<Method>;
  getLoggerMethods(): Array<Method>;

  getConnectionMethods(): Array<Method>;
  getHttpClientMethods(): Array<Method>;
  getFilesystemMethods(): Array<Method>;
}

export interface Method {
  label: string,
  insertText: string,
  link?: string,
}
