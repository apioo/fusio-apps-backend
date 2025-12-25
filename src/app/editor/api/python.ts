import {API, Method} from "../api";

export class Python implements API {

  getRequestMethods(): Array<Method> {
    return [{
      label: "payload: Any",
      insertText: "payload",
    }, {
      label: "arguments: Dict[str, str]",
      insertText: "arguments",
    }];
  }

  getRequestArgumentsMethods(): Array<Method> {
    return [];
  }

  getContextMethods(): Array<Method> {
    return [{
      label: "operation_id: int",
      insertText: "operation_id",
    }, {
      label: "base_url: str",
      insertText: "base_url",
    }, {
      label: "tenant_id: str",
      insertText: "tenant_id",
    }, {
      label: "action: str",
      insertText: "action",
    }, {
      label: "app: ExecuteContextApp",
      insertText: "app",
    }, {
      label: "user: ExecuteContextUser",
      insertText: "user",
    }];
  }

  getContextAppMethods(): Array<Method> {
    return [{
      label: "anonymous: bool",
      insertText: "anonymous",
    }, {
      label: "id: int",
      insertText: "id",
    }, {
      label: "name: str",
      insertText: "name",
    }];
  }

  getContextUserMethods(): Array<Method> {
    return [{
      label: "anonymous: bool",
      insertText: "anonymous",
    }, {
      label: "id: int",
      insertText: "id",
    }, {
      label: "plan_id: str",
      insertText: "plan_id",
    }, {
      label: "name: str",
      insertText: "name",
    }, {
      label: "email: str",
      insertText: "email",
    }, {
      label: "points: int",
      insertText: "points",
    }];
  }

  getConnectorMethods(): Array<Method> {
    return [{
      label: "get_connection(name: str)",
      insertText: "get_connection('')",
    }];
  }

  getResponseMethods(): Array<Method> {
    return [{
      label: "build(statusCode: int, headers: Dict[str, str], body: Any)",
      insertText: "build()",
    }];
  }

  getDispatcherMethods(): Array<Method> {
    return [{
      label: "dispatch(eventName: str, data: Any)",
      insertText: "dispatch()",
    }];
  }

  getLoggerMethods(): Array<Method> {
    return [{
      label: "emergency(message: str)",
      insertText: "emergency('')",
    }, {
      label: "alert(message: str)",
      insertText: "alert('')",
    }, {
      label: "critical(message: str)",
      insertText: "critical('')",
    }, {
      label: "error(message: str)",
      insertText: "error('')",
    }, {
      label: "warning(message: str)",
      insertText: "warning('')",
    }, {
      label: "notice(message: str)",
      insertText: "notice('')",
    }, {
      label: "info(message: str)",
      insertText: "info('')",
    }, {
      label: "debug(message: str)",
      insertText: "debug('')",
    }];
  }

  getConnectionMethods(): Array<Method> {
    return [{
      label: "cursor()",
      insertText: "cursor()",
      link: 'https://peps.python.org/pep-0249/#cursor-methods',
    }, {
      label: "commit()",
      insertText: "commit()",
      link: 'https://peps.python.org/pep-0249/',
    }, {
      label: "rollback()",
      insertText: "rollback()",
      link: 'https://peps.python.org/pep-0249/',
    }];
  }

  getHttpClientMethods(): Array<Method> {
    return [{
      label: 'get(uri: str, data)',
      insertText: "get()",
      link: 'https://www.python-httpx.org/quickstart/'
    }, {
      label: 'delete(uri: str, data)',
      insertText: "delete()",
      link: 'https://www.python-httpx.org/quickstart/'
    }, {
      label: 'head(uri: str, config)',
      insertText: "head()",
      link: 'https://www.python-httpx.org/quickstart/'
    }, {
      label: 'post(uri: str, config)',
      insertText: "post()",
      link: 'https://www.python-httpx.org/quickstart/'
    }, {
      label: 'put(uri: str, config)',
      insertText: "put()",
      link: 'https://www.python-httpx.org/quickstart/'
    }, {
      label: 'patch(uri: str, config)',
      insertText: "patch()",
      link: 'https://www.python-httpx.org/quickstart/'
    }];
  }

  getFilesystemMethods(): Array<Method> {
    return [];
  }

}
