import {Component, input} from '@angular/core';
import {BackendActionExecuteResponse} from "fusio-sdk";
import {JsonPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-action-designer-response',
  imports: [
    NgClass,
    JsonPipe,
  ],
  templateUrl: './response.html',
  styleUrl: './response.css',
})
export class Response {

  response = input.required<BackendActionExecuteResponse>();

}
