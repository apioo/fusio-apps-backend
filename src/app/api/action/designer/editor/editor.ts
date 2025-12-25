import {Component, inject, input, output} from '@angular/core';
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {ConnectionService} from "../../../../services/connection.service";
import {Connection} from "./connection/connection";
import {BackendAction} from "fusio-sdk";
import {HelpComponent} from "ngx-fusio-sdk";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-action-designer-editor',
  imports: [
    EditorComponent,
    FormsModule,
    Connection,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor {

  private connection = inject(ConnectionService);
  private modal = inject(NgbModal);

  action = input.required<BackendAction>();
  lang = input.required<string>();
  code = input<string|undefined>(undefined);
  disabled = input<boolean>(false);

  codeChange = output<string>();
  submitClick = output<undefined>();
  requestClick = output<undefined>();

  showHelp() {
    const modalRef = this.modal.open(HelpComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.path = 'api/action/worker-' + this.lang() + '/';
  }

}
