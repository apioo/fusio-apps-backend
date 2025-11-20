import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {ApiService} from "./api.service";

import {routes} from './app.routes';
import {ConfigBuilder} from "./config-builder";
import {provideMarkdown} from "ngx-markdown";
import {FUSIO_CONFIG, ApiService as SDK} from "ngx-fusio-sdk";
import {NGX_MONACO_EDITOR_CONFIG} from "ngx-monaco-editor-v2";

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
      useValue: {
        baseUrl: window.location.origin + '/assets/monaco/min/vs'
      }
    }
  ]
};
