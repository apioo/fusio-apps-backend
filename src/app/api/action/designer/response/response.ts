import {Component, computed, input} from '@angular/core';
import {BackendActionExecuteResponse} from "fusio-sdk";
import {NgClass} from "@angular/common";
import {ClipboardModule} from "ngx-clipboard";

@Component({
  selector: 'app-action-designer-response',
  imports: [
    NgClass,
    ClipboardModule,

  ],
  templateUrl: './response.html',
  styleUrl: './response.css',
})
export class Response {

  response = input.required<BackendActionExecuteResponse>();

  body = computed<any>(() => {
    let body = this.response().body;

    if (typeof body === 'string' && body[0] === '{') {
      body = JSON.parse(body);
    }

    if (typeof body === 'string') {
      return body;
    }

    return JSON.stringify(body, undefined, 2);
  });

}
