import {CancellationToken, editor, languages, Position} from "monaco-editor";
import {ApiService} from "../api.service";

export class PhpCompletion implements languages.CompletionItemProvider {

  constructor(private fusio: ApiService) {
  }

  get language() {
    return 'php';
  }

  provideCompletionItems(model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: CancellationToken): languages.ProviderResult<languages.CompletionList> {
    let suggestions: languages.CompletionItem[] = [];

    const textUntilPosition = model.getLineContent(position.lineNumber).substring(0, position.column - 1).trim();

    if (textUntilPosition.endsWith("$request->")) {
      suggestions = this.getRequestMethods(position);
    } else if (textUntilPosition.endsWith("$context->")) {
      suggestions = this.getContextMethods(position);
    } else if (textUntilPosition.endsWith("$connector->")) {
      suggestions = this.getConnectorMethods(position);
    } else if (textUntilPosition.endsWith("$response->")) {
      suggestions = this.getResponseMethods(position);
    } else if (textUntilPosition.endsWith("$dispatcher->")) {
      suggestions = this.getDispatcherMethods(position);
    } else if (textUntilPosition.endsWith("$logger->")) {
      suggestions = this.getLoggerMethods(position);
    } else if (textUntilPosition.endsWith("$connector->getConnection('") || textUntilPosition.endsWith("$connector->getConnection(\"")) {
      return this.getAvailableConnections(position);
    }

    return {
      suggestions: suggestions,
    };
  }

  getRequestMethods(position: Position): languages.CompletionItem[] {
    return [{
      label: "getPayload(): mixed",
      kind: 0,
      insertText: "getPayload()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "getArguments(): RecordInterface",
      kind: 0,
      insertText: "getArguments()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "getContext(): ExecuteRequestContext",
      kind: 0,
      insertText: "getContext()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }];
  }

  getContextMethods(position: Position): languages.CompletionItem[] {
    return [{
      label: "getOperationId(): int",
      kind: 0,
      documentation: '',
      insertText: "getOperationId()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "getBaseUrl(): string",
      kind: 0,
      documentation: '',
      insertText: "getBaseUrl()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "getTenantId(): string",
      kind: 0,
      documentation: '',
      insertText: "getTenantId()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "getAction(): string",
      kind: 0,
      documentation: '',
      insertText: "getAction()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "getApp(): ExecuteContextApp",
      kind: 0,
      documentation: '',
      insertText: "getApp()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "getUser(): ExecuteContextUser",
      kind: 0,
      documentation: '',
      insertText: "getUser()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }];
  }

  getConnectorMethods(position: Position): languages.CompletionItem[] {
    return [{
      label: "getConnection(name: string)",
      kind: 0,
      documentation: '',
      insertText: "getConnection('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }];
  }

  getResponseMethods(position: Position): languages.CompletionItem[] {
    return [{
      label: "build(statusCode: int, headers: array, body: mixed)",
      kind: 0,
      insertText: "build()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }];
  }

  getDispatcherMethods(position: Position): languages.CompletionItem[] {
    return [{
      label: "dispatch(eventName: string, payload: mixed)",
      kind: 0,
      insertText: "dispatch()",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }];
  }

  getLoggerMethods(position: Position): languages.CompletionItem[] {
    return [{
      label: "emergency(message: string)",
      kind: 0,
      insertText: "emergency('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "alert(message: string)",
      kind: 0,
      insertText: "alert('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "critical(message: string)",
      kind: 0,
      insertText: "critical('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "error(message: string)",
      kind: 0,
      insertText: "error('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "warning(message: string)",
      kind: 0,
      insertText: "warning('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "notice(message: string)",
      kind: 0,
      insertText: "notice('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "info(message: string)",
      kind: 0,
      insertText: "info('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }, {
      label: "debug(message: string)",
      kind: 0,
      insertText: "debug('')",
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      },
    }];
  }

  async getAvailableConnections(position: Position): Promise<languages.CompletionList> {
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
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column,
          endColumn: position.column,
        },
      })
    });

    return {
      suggestions: suggestions,
    };
  }

}
