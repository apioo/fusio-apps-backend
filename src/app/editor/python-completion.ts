import {CancellationToken, editor, languages, Position} from "monaco-editor";
import {CompletionAbstract} from "./completion-abstract";

export class PythonCompletion extends CompletionAbstract {

  get language() {
    return 'python';
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

    if (textUntilPosition.endsWith("request.")) {
      suggestions = this.getRequestMethods(range);
    } else if (textUntilPosition.endsWith("request.arguments.")) {
      suggestions = this.getRequestArgumentsMethods(range);
    } else if (textUntilPosition.endsWith("context.")) {
      suggestions = this.getContextMethods(range);
    } else if (textUntilPosition.endsWith("context.app.")) {
      suggestions = this.getContextAppMethods(range);
    } else if (textUntilPosition.endsWith("context.user.")) {
      suggestions = this.getContextUserMethods(range);
    } else if (textUntilPosition.endsWith("connector.")) {
      suggestions = this.getConnectorMethods(range);
    } else if (textUntilPosition.endsWith("response.")) {
      suggestions = this.getResponseMethods(range);
    } else if (textUntilPosition.endsWith("dispatcher.")) {
      suggestions = this.getDispatcherMethods(range);
    } else if (textUntilPosition.endsWith("logger.")) {
      suggestions = this.getLoggerMethods(range);
    } else if (textUntilPosition.endsWith("connector.get_connection('") || textUntilPosition.endsWith("connector.get_connection(\"")) {
      return this.getAvailableConnections(range);
    } else if (textUntilPosition.endsWith("connection.")) {
      suggestions = this.getConnectionMethods(range);
    } else if (textUntilPosition.endsWith("httpClient.")) {
      suggestions = this.getHttpClientMethods(range);
    } else if (textUntilPosition.endsWith("filesystem.")) {
      suggestions = this.getFilesystemMethods(range);
    }

    return {
      suggestions: suggestions,
    };
  }

}
