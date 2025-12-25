import {API, Method} from "../api";

export class Javascript implements API {

  getRequestMethods(): Array<Method> {
    return [{
      label: "getPayload(): any",
      insertText: "getPayload()",
    }, {
      label: "getArguments(): Record<string, string>",
      insertText: "getArguments()",
    }];
  }

  getRequestArgumentsMethods(): Array<Method> {
    return [];
  }

  getContextMethods(): Array<Method> {
    return [{
      label: "getOperationId(): integer",
      insertText: "getOperationId()",
    }, {
      label: "getBaseUrl(): string",
      insertText: "getBaseUrl()",
    }, {
      label: "getTenantId(): string",
      insertText: "getTenantId()",
    }, {
      label: "getAction(): string",
      insertText: "getAction()",
    }, {
      label: "getApp(): ExecuteContextApp",
      insertText: "getApp()",
    }, {
      label: "getUser(): ExecuteContextUser",
      insertText: "getUser()",
    }];
  }

  getContextAppMethods(): Array<Method> {
    return [{
      label: "isAnonymous(): boolean",
      insertText: "isAnonymous()",
    }, {
      label: "getId(): integer",
      insertText: "getId()",
    }, {
      label: "getName(): String",
      insertText: "getName()",
    }];
  }

  getContextUserMethods(): Array<Method> {
    return [{
      label: "isAnonymous(): boolean",
      insertText: "isAnonymous()",
    }, {
      label: "getId(): integer",
      insertText: "getId()",
    }, {
      label: "getPlanId(): String",
      insertText: "getPlanId()",
    }, {
      label: "getName(): String",
      insertText: "getName()",
    }, {
      label: "getEmail(): String",
      insertText: "getEmail()",
    }, {
      label: "getPoints(): integer",
      insertText: "getPoints()",
    }];
  }

  getConnectorMethods(): Array<Method> {
    return [{
      label: "getConnection(name: string)",
      insertText: "getConnection('')",
    }];
  }

  getResponseMethods(): Array<Method> {
    return [{
      label: "build(statusCode: integer, headers: Record<string, string>, body: any)",
      insertText: "build()",
    }];
  }

  getDispatcherMethods(): Array<Method> {
    return [{
      label: "dispatch(eventName: string, data: any)",
      insertText: "dispatch()",
    }];
  }

  getLoggerMethods(): Array<Method> {
    return [{
      label: "emergency(message: string)",
      insertText: "emergency('')",
    }, {
      label: "alert(message: string)",
      insertText: "alert('')",
    }, {
      label: "critical(message: string)",
      insertText: "critical('')",
    }, {
      label: "error(message: string)",
      insertText: "error('')",
    }, {
      label: "warning(message: string)",
      insertText: "warning('')",
    }, {
      label: "notice(message: string)",
      insertText: "notice('')",
    }, {
      label: "info(message: string)",
      insertText: "info('')",
    }, {
      label: "debug(message: string)",
      insertText: "debug('')",
    }];
  }

  getConnectionMethods(): Array<Method> {
    return [{
      label: 'execute(sql: string, values: Array)',
      insertText: "execute('')",
      link: 'https://sidorares.github.io/node-mysql2/docs'
    }, {
      label: 'beginTransaction()',
      insertText: "beginTransaction()",
      link: 'https://sidorares.github.io/node-mysql2/docs'
    }, {
      label: 'rollback()',
      insertText: "rollback()",
      link: 'https://sidorares.github.io/node-mysql2/docs'
    }, {
      label: 'commit()',
      insertText: "commit()",
      link: 'https://sidorares.github.io/node-mysql2/docs'
    }];
  }

  getHttpClientMethods(): Array<Method> {
    return [{
      label: 'request(config)',
      insertText: "request()",
      link: 'https://axios-http.com/docs/api_intro'
    }, {
      label: 'get(uri: string, config)',
      insertText: "get()",
      link: 'https://axios-http.com/docs/api_intro'
    }, {
      label: 'delete(uri: string, config)',
      insertText: "delete()",
      link: 'https://axios-http.com/docs/api_intro'
    }, {
      label: 'head(uri: string, config)',
      insertText: "head()",
      link: 'https://axios-http.com/docs/api_intro'
    }, {
      label: 'post(uri: string, config)',
      insertText: "post()",
      link: 'https://axios-http.com/docs/api_intro'
    }, {
      label: 'put(uri: string, config)',
      insertText: "put()",
      link: 'https://axios-http.com/docs/api_intro'
    }, {
      label: 'patch(uri: string, config)',
      insertText: "patch()",
      link: 'https://axios-http.com/docs/api_intro'
    }];
  }

  getFilesystemMethods(): Array<Method> {
    return [];
  }

}
