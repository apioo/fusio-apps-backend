import {NgxMonacoEditorConfig} from "ngx-monaco-editor-v2";
import {PhpCompletion} from "./php-completion";
import {ApiService} from "../api.service";

export class Config {

  public static fusio: ApiService;

  public static getConfig(): NgxMonacoEditorConfig {
    return {
      onMonacoLoad: function () {
        (<any>window).monaco.languages.registerCompletionItemProvider('php', new PhpCompletion(Config.fusio));
      }
    };
  }
}
