import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {ApiService} from "./api.service";

import {routes} from './app.routes';
import {ConfigBuilder} from "./config-builder";
import {provideMarkdown} from "ngx-markdown";
import {ApiService as SDK, FUSIO_CONFIG} from "ngx-fusio-sdk";
import {NGX_MONACO_EDITOR_CONFIG} from "ngx-monaco-editor-v2";
import {JavaCompletion} from "./editor/java-completion";
import {PHPCompletion} from "./editor/php-completion";
import {JavascriptCompletion} from "./editor/javascript-completion";
import {PythonCompletion} from "./editor/python-completion";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown(),
    {
      provide: SDK,
      useExisting: ApiService
    },
    {
      provide: FUSIO_CONFIG,
      useValue: ConfigBuilder.build()
    },
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useFactory: () => {
        const api = inject(ApiService);

        return {
          baseUrl: window.location.origin + '/assets/monaco/min/vs',
          onMonacoLoad: () => {
            const monaco = (<any>window).monaco;
            monaco.languages.registerCompletionItemProvider('java', new JavaCompletion(api))
            monaco.languages.registerCompletionItemProvider('javascript', new JavascriptCompletion(api))
            monaco.languages.registerCompletionItemProvider('php', new PHPCompletion(api))
            monaco.languages.registerCompletionItemProvider('python', new PythonCompletion(api))
          }
        };
      }
    }
  ]
};
