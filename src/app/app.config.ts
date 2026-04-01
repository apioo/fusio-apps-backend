import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {PathLocationStrategy} from "@angular/common";
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
import {provideHighlightOptions} from "ngx-highlightjs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown(),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        go: () => import('highlight.js/lib/languages/go'),
        java: () => import('highlight.js/lib/languages/java'),
        javascript: () => import('highlight.js/lib/languages/javascript'),
        json: () => import('highlight.js/lib/languages/json'),
        php: () => import('highlight.js/lib/languages/php'),
        python: () => import('highlight.js/lib/languages/python'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
    }),
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
        const location = inject(PathLocationStrategy);

        return {
          baseUrl: window.location.origin + location.getBaseHref() + 'assets/monaco/min/vs',
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
