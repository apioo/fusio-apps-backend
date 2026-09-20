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
import {ApiService as SDK, FUSIO_CONFIG, provideAgentChatTypes} from "ngx-fusio-sdk";
import {NGX_MONACO_EDITOR_CONFIG} from "ngx-monaco-editor-v2";
import {JavaCompletion} from "./editor/java-completion";
import {PHPCompletion} from "./editor/php-completion";
import {JavascriptCompletion} from "./editor/javascript-completion";
import {PythonCompletion} from "./editor/python-completion";
import {Architect} from "./api/agent/chat/architect/architect";
import {Action} from "./api/agent/chat/action/action";
import {Schema} from "./api/agent/chat/schema/schema";
import {Database} from "./api/agent/chat/database/database";
import {Seed} from "./api/agent/chat/seed/seed";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAgentChatTypes([
      [1, {type: Architect, label: 'Architect'}],
      [2, {type: Action, label: 'Action'}],
      [3, {type: Schema, label: 'Schema'}],
      [4, {type: Database, label: 'Database'}],
      [5, {type: Seed, label: 'Seed'}],
    ]),
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
