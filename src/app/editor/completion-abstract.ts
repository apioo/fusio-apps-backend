import {CancellationToken, editor, IRange, languages, Position} from "monaco-editor";
import {ApiFactory} from "./api";
import {ApiService} from "../api.service";


export abstract class CompletionAbstract implements languages.CompletionItemProvider {

  constructor(private fusio: ApiService) {
  }

  abstract get language(): string;

  abstract provideCompletionItems(model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: CancellationToken): languages.ProviderResult<languages.CompletionList>;

  protected getRequestMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getRequestMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getRequestArgumentsMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getRequestArgumentsMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getContextMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getContextMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getContextAppMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getContextAppMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getContextUserMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getContextUserMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getConnectorMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getConnectorMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getResponseMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getResponseMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getDispatcherMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getDispatcherMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getLoggerMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getLoggerMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected async getAvailableConnections(range: IRange): Promise<languages.CompletionList> {
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

  protected getConnectionMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getConnectionMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getHttpClientMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getHttpClientMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

  protected getFilesystemMethods(range: IRange): languages.CompletionItem[] {
    const suggestions: Array<languages.CompletionItem> = [];
    ApiFactory.factory(this.language).getFilesystemMethods().forEach((method) => {
      suggestions.push({
        label: method.label,
        kind: 0,
        insertText: method.insertText,
        range: range,
      });
    });

    return suggestions;
  }

}

