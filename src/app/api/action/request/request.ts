import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveOffcanvas, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {BackendActionExecuteRequest} from "fusio-sdk";

@Component({
  selector: 'app-action-request',
  imports: [
    EditorComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPopover
  ],
  templateUrl: './request.html',
  styleUrl: './request.css',
})
export class Request implements OnInit {

  private offcanvas = inject(NgbActiveOffcanvas);

  method = signal<string>('GET');
  uriFragments = signal<string>('');
  parameters = signal<string>('');
  headers = signal('');
  body = signal<string>('');

  @Input() request!: BackendActionExecuteRequest;

  ngOnInit(): void {
    if (this.request.method) {
      this.method.set(this.request.method);
    }
    if (this.request.uriFragments) {
      this.uriFragments.set(this.request.uriFragments);
    }
    if (this.request.parameters) {
      this.parameters.set(this.request.parameters);
    }
    if (this.request.headers) {
      this.headers.set(this.request.headers);
    }
    if (this.request.body) {
      this.body.set(JSON.stringify(this.request.body, null, 2));
    }
  }

  save(): void {
    const request: BackendActionExecuteRequest = {
      method: this.method(),
      uriFragments: this.uriFragments(),
      parameters: this.parameters(),
      headers: this.headers(),
    };

    const body = this.body();
    if (body) {
      request.body = JSON.parse(body);
    }

    this.offcanvas.close(request);
  }

  close(): void {
    this.offcanvas.dismiss();
  }

}
