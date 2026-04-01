import {Component, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-backup-list',
  templateUrl: './list.component.html',
  imports: [
    EditorComponent,
    FormsModule,
    MessageComponent
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  response = signal<CommonMessage|undefined>(undefined);
  export = signal<string>('');
  import = signal<string>('');

  constructor(private fusio: ApiService, private error: ErrorService) {
  }

  async doExport(): Promise<void> {
    const data = await this.fusio.getClient().backend().backup().export();
    this.export.set(data.export || '');
  }

  async doImport(): Promise<void> {
    try {
      const result = await this.fusio.getClient().backend().backup().import({
        import: this.import()
      });

      this.response.set(result);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
