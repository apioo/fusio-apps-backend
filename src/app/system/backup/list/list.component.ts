import {Component} from '@angular/core';
import {ErrorService} from "ngx-fusio-sdk";
import {CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-backup-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  response?: CommonMessage;
  export: string = '';
  import: string = '';

  constructor(private fusio: ApiService, private error: ErrorService) {
  }

  async doExport(): Promise<void> {
    const data = await this.fusio.getClient().backend().backup().export();
    this.export = data.export || '';
  }

  async doImport(): Promise<void> {
    try {
      const result = await this.fusio.getClient().backend().backup().import({
        import: this.import
      });

      this.response = result;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
