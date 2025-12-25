import {API, Method} from "../api";

export class Java implements API {

  getRequestMethods(): Array<Method> {
    return [{
      label: "getPayload(): Object",
      insertText: "getPayload()",
    }, {
      label: "getArguments(): Map<String, String>",
      insertText: "getArguments()",
    }];
  }

  getRequestArgumentsMethods(): Array<Method> {
    return [{
      label: "containsKey(String key): boolean",
      insertText: "containsKey()",
    }, {
      label: "containsValue(String value): boolean",
      insertText: "containsValue()",
    }, {
      label: "get(String key): String",
      insertText: "get()",
    }, {
      label: "getOrDefault(String key, Object default): Object",
      insertText: "getOrDefault()",
    }, {
      label: "keySet(): Set<String>",
      insertText: "keySet()",
    }, {
      label: "values(): Collection<String>",
      insertText: "values()",
    }];
  }

  getContextMethods(): Array<Method> {
    return [{
      label: "getOperationId(): Integer",
      insertText: "getOperationId()",
    }, {
      label: "getBaseUrl(): String",
      insertText: "getBaseUrl()",
    }, {
      label: "getTenantId(): String",
      insertText: "getTenantId()",
    }, {
      label: "getAction(): String",
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
      label: "getConnection(String name)",
      insertText: "getConnection('')",
    }];
  }

  getResponseMethods(): Array<Method> {
    return [{
      label: "build(integer statusCode, Map<String, String> headers, Object body)",
      insertText: "build()",
    }];
  }

  getDispatcherMethods(): Array<Method> {
    return [{
      label: "dispatch(String eventName, Object data)",
      insertText: "dispatch()",
    }];
  }

  getLoggerMethods(): Array<Method> {
    return [{
      label: "emergency(String message)",
      insertText: "emergency('')",
    }, {
      label: "alert(String message)",
      insertText: "alert('')",
    }, {
      label: "critical(String message)",
      insertText: "critical('')",
    }, {
      label: "error(String message)",
      insertText: "error('')",
    }, {
      label: "warning(String message)",
      insertText: "warning('')",
    }, {
      label: "notice(String message)",
      insertText: "notice('')",
    }, {
      label: "info(String message)",
      insertText: "info('')",
    }, {
      label: "debug(String message)",
      insertText: "debug('')",
    }];
  }

  getConnectionMethods(): Array<Method> {
    return [{
      label: 'createStatement()',
      insertText: "createStatement()",
      link: 'https://docs.oracle.com/javase/8/docs/api/java/sql/Connection.html#createStatement--'
    }, {
      label: 'prepareCall(String sql)',
      insertText: 'prepareCall("")',
      link: 'https://docs.oracle.com/javase/8/docs/api/java/sql/Connection.html#prepareCall-java.lang.String-'
    }, {
      label: 'prepareStatement(String sql)',
      insertText: 'prepareStatement("")',
      link: 'https://docs.oracle.com/javase/8/docs/api/java/sql/Connection.html#prepareStatement-java.lang.String-'
    }, {
      label: 'setAutoCommit(boolean autoCommit)',
      insertText: "setAutoCommit(false)",
      link: 'https://docs.oracle.com/javase/8/docs/api/java/sql/Connection.html#setAutoCommit-boolean-'
    }, {
      label: 'rollback()',
      insertText: "rollback()",
      link: 'https://docs.oracle.com/javase/8/docs/api/java/sql/Connection.html#rollback--'
    }, {
      label: 'commit()',
      insertText: "commit()",
      link: 'https://docs.oracle.com/javase/8/docs/api/java/sql/Connection.html#commit--'
    }];
  }

  getHttpClientMethods(): Array<Method> {
    return [{
      label: 'execute()',
      insertText: "execute()",
      link: 'https://hc.apache.org/httpcomponents-client-5.6.x/quickstart.html'
    }];
  }

  getFilesystemMethods(): Array<Method> {
    return [];
  }

}
