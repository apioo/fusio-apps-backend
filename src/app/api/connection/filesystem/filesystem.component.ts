import {Component} from '@angular/core';
import {ErrorService, List, Service} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendConnection, BackendFile} from "fusio-sdk";
import {FilesystemService} from "../../../services/connection/filesystem.service";
import {ConnectionService} from "../../../services/connection.service";

@Component({
  selector: 'app-connection-filesystem',
  templateUrl: './filesystem.component.html',
  styleUrls: ['./filesystem.component.css']
})
export class FilesystemComponent extends List<BackendFile> {

  selectedConnection?: BackendConnection;

  constructor(private service: FilesystemService, private connection: ConnectionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): Service<BackendFile> {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection = await this.connection.get(params['connection']);
        if (this.selectedConnection) {
          this.service.setConnection(this.selectedConnection);
        }
      }

      if (this.service.isConfigured()) {
        await super.ngOnInit();
      }
    });

  }

  async download(file: BackendFile): Promise<void> {
    if (!file.id || !file.name) {
      return;
    }

    try {
      const data = await this.service.download(file.id);
      const dataView = new DataView(data);
      const blob = new Blob([dataView], { type: file.contentType || 'application/octet-stream' });

      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async onFileSelected(event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !(target.files instanceof FileList)) {
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files.item(i);
      if (!file) {
        continue;
      }

      formData.append(file.name, file);
    }

    try {
      this.response = await this.service.upload(formData)
    } catch (error) {
      this.response = this.error.convert(error);
    }

    target.value = '';
    await this.doList();
  }

}
