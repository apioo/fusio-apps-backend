import {CancellationToken, editor, IRange, languages, Position} from "monaco-editor";
import {ApiService} from "../api.service";

export class PhpCompletion implements languages.CompletionItemProvider {

  constructor(private fusio: ApiService) {
  }

  get language() {
    return 'php';
  }

  provideCompletionItems(model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: CancellationToken): languages.ProviderResult<languages.CompletionList> {
    let suggestions: languages.CompletionItem[] = [];

    const textUntilPosition = model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    if (textUntilPosition.endsWith("$request->")) {
      suggestions = this.getRequestMethods(range);
    } else if (textUntilPosition.endsWith("$request->getArguments()->")) {
      suggestions = this.getRequestArgumentsMethods(range);
    } else if (textUntilPosition.endsWith("$context->")) {
      suggestions = this.getContextMethods(range);
    } else if (textUntilPosition.endsWith("$context->getApp()->")) {
      suggestions = this.getContextAppMethods(range);
    } else if (textUntilPosition.endsWith("$context->getUser()->")) {
      suggestions = this.getContextUserMethods(range);
    } else if (textUntilPosition.endsWith("$connector->")) {
      suggestions = this.getConnectorMethods(range);
    } else if (textUntilPosition.endsWith("$response->")) {
      suggestions = this.getResponseMethods(range);
    } else if (textUntilPosition.endsWith("$dispatcher->")) {
      suggestions = this.getDispatcherMethods(range);
    } else if (textUntilPosition.endsWith("$logger->")) {
      suggestions = this.getLoggerMethods(range);
    } else if (textUntilPosition.endsWith("$connector->getConnection('") || textUntilPosition.endsWith("$connector->getConnection(\"")) {
      return this.getAvailableConnections(range);
    } else if (textUntilPosition.endsWith("$connection->")) {
      suggestions = this.getConnectionMethods(range);
    } else if (textUntilPosition.endsWith("$httpClient->")) {
      suggestions = this.getHttpClientMethods(range);
    }

    return {
      suggestions: suggestions,
    };
  }

  getRequestMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "getPayload(): mixed",
      kind: 0,
      insertText: "getPayload()",
      range: range,
    }, {
      label: "getArguments(): RecordInterface",
      kind: 0,
      insertText: "getArguments()",
      range: range,
    }];
  }

  getRequestArgumentsMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "containsKey(key: string): bool",
      kind: 0,
      insertText: "containsKey()",
      range: range,
    }, {
      label: "containsValue(value: mixed): bool",
      kind: 0,
      insertText: "containsValue()",
      range: range,
    }, {
      label: "get(key: string): mixed",
      kind: 0,
      insertText: "get()",
      range: range,
    }, {
      label: "getAll(): array",
      kind: 0,
      insertText: "getAll()",
      range: range,
    }, {
      label: "getOrDefault(key: string, default: mixed): mixed",
      kind: 0,
      insertText: "getOrDefault()",
      range: range,
    }, {
      label: "keySet(): array",
      kind: 0,
      insertText: "keySet()",
      range: range,
    }, {
      label: "values(): array",
      kind: 0,
      insertText: "values()",
      range: range,
    }];
  }

  getContextMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "getOperationId(): int",
      kind: 0,
      documentation: '',
      insertText: "getOperationId()",
      range: range,
    }, {
      label: "getBaseUrl(): string",
      kind: 0,
      documentation: '',
      insertText: "getBaseUrl()",
      range: range,
    }, {
      label: "getTenantId(): string",
      kind: 0,
      documentation: '',
      insertText: "getTenantId()",
      range: range,
    }, {
      label: "getAction(): string",
      kind: 0,
      documentation: '',
      insertText: "getAction()",
      range: range,
    }, {
      label: "getApp(): ExecuteContextApp",
      kind: 0,
      documentation: '',
      insertText: "getApp()",
      range: range,
    }, {
      label: "getUser(): ExecuteContextUser",
      kind: 0,
      documentation: '',
      insertText: "getUser()",
      range: range,
    }];
  }

  getContextAppMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "isAnonymous(): bool",
      kind: 0,
      documentation: '',
      insertText: "isAnonymous()",
      range: range,
    }, {
      label: "getId(): int",
      kind: 0,
      documentation: '',
      insertText: "getId()",
      range: range,
    }, {
      label: "getUserId(): int",
      kind: 0,
      documentation: '',
      insertText: "getUserId()",
      range: range,
    }, {
      label: "getStatus(): int",
      kind: 0,
      documentation: '',
      insertText: "getStatus()",
      range: range,
    }, {
      label: "getName(): string",
      kind: 0,
      documentation: '',
      insertText: "getName()",
      range: range,
    }, {
      label: "getUrl(): string",
      kind: 0,
      documentation: '',
      insertText: "getUrl()",
      range: range,
    }, {
      label: "getAppKey(): string",
      kind: 0,
      documentation: '',
      insertText: "getAppKey()",
      range: range,
    }, {
      label: "getScopes(): array",
      kind: 0,
      documentation: '',
      insertText: "getScopes()",
      range: range,
    }, {
      label: "getParameter(name: string): mixed",
      kind: 0,
      documentation: '',
      insertText: "getParameter()",
      range: range,
    }, {
      label: "getMetadata(key: string): mixed",
      kind: 0,
      documentation: '',
      insertText: "getMetadata()",
      range: range,
    }];
  }

  getContextUserMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "isAnonymous(): bool",
      kind: 0,
      documentation: '',
      insertText: "isAnonymous()",
      range: range,
    }, {
      label: "getId(): int",
      kind: 0,
      documentation: '',
      insertText: "getId()",
      range: range,
    }, {
      label: "getRoleId(): int",
      kind: 0,
      documentation: '',
      insertText: "getRoleId()",
      range: range,
    }, {
      label: "getCategoryId(): int",
      kind: 0,
      documentation: '',
      insertText: "getCategoryId()",
      range: range,
    }, {
      label: "getStatus(): int",
      kind: 0,
      documentation: '',
      insertText: "getStatus()",
      range: range,
    }, {
      label: "getName(): string",
      kind: 0,
      documentation: '',
      insertText: "getName()",
      range: range,
    }, {
      label: "getEmail(): string",
      kind: 0,
      documentation: '',
      insertText: "getEmail()",
      range: range,
    }, {
      label: "getPoints(): int",
      kind: 0,
      documentation: '',
      insertText: "getPoints()",
      range: range,
    }, {
      label: "getExternalId(): string",
      kind: 0,
      documentation: '',
      insertText: "getExternalId()",
      range: range,
    }, {
      label: "getPlanId(): string",
      kind: 0,
      documentation: '',
      insertText: "getPlanId()",
      range: range,
    }, {
      label: "getMetadata(key: string): mixed",
      kind: 0,
      documentation: '',
      insertText: "getMetadata()",
      range: range,
    }];
  }

  getConnectorMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "getConnection(name: string)",
      kind: 0,
      documentation: '',
      insertText: "getConnection('')",
      range: range,
    }];
  }

  getResponseMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "build(statusCode: int, headers: array, body: mixed)",
      kind: 0,
      insertText: "build()",
      range: range,
    }];
  }

  getDispatcherMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "dispatch(eventName: string, payload: mixed)",
      kind: 0,
      insertText: "dispatch()",
      range: range,
    }];
  }

  getLoggerMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "emergency(message: string)",
      kind: 0,
      insertText: "emergency('')",
      range: range,
    }, {
      label: "alert(message: string)",
      kind: 0,
      insertText: "alert('')",
      range: range,
    }, {
      label: "critical(message: string)",
      kind: 0,
      insertText: "critical('')",
      range: range,
    }, {
      label: "error(message: string)",
      kind: 0,
      insertText: "error('')",
      range: range,
    }, {
      label: "warning(message: string)",
      kind: 0,
      insertText: "warning('')",
      range: range,
    }, {
      label: "notice(message: string)",
      kind: 0,
      insertText: "notice('')",
      range: range,
    }, {
      label: "info(message: string)",
      kind: 0,
      insertText: "info('')",
      range: range,
    }, {
      label: "debug(message: string)",
      kind: 0,
      insertText: "debug('')",
      range: range,
    }];
  }

  async getAvailableConnections(range: IRange): Promise<languages.CompletionList> {
    if (!this.fusio) {
      return {
        suggestions: [],
      };
    }

    const connections = await this.fusio.getClient().backend().connection().getAll();
    const suggestions: languages.CompletionItem[] = [];

    connections.entry?.forEach((connection) => {
      suggestions.push({
        label: connection.name || '',
        kind: 0,
        insertText: connection.name || '',
        range: range,
      })
    });

    return {
      suggestions: suggestions,
    };
  }

  getConnectionMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "fetchAllAssociative(query: string, params: array)",
      kind: 0,
      insertText: "fetchAllAssociative('')",
      range: range,
    }, {
      label: "fetchAssociative(query: string, params: array)",
      kind: 0,
      insertText: "fetchAssociative('')",
      range: range,
    }, {
      label: "fetchFirstColumn(query: string, params: array)",
      kind: 0,
      insertText: "fetchFirstColumn('')",
      range: range,
    }, {
      label: "fetchOne(query: string, params: array)",
      kind: 0,
      insertText: "fetchOne('')",
      range: range,
    }, {
      label: "insert(table: string, data: array)",
      kind: 0,
      insertText: "insert('')",
      range: range,
    }, {
      label: "update(table: string, data: array, criteria: array)",
      kind: 0,
      insertText: "update('')",
      range: range,
    }, {
      label: "delete(table: string, criteria: array)",
      kind: 0,
      insertText: "delete('')",
      range: range,
    }, {
      label: "executeStatement(query: string, params: array)",
      kind: 0,
      insertText: "executeStatement('')",
      range: range,
    }];
  }

  getHttpClientMethods(range: IRange): languages.CompletionItem[] {
    return [{
      label: "request(method: string, path: string, options: array)",
      kind: 0,
      insertText: "request('')",
      range: range,
    }];
  }

}
