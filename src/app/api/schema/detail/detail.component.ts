import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {FusioService} from "../../../fusio.service";

@Component({
  selector: 'app-schema-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Schema> implements OnChanges {

  renderedId?: number;
  preview?: string;
  loading: boolean = false;

  constructor(protected fusio: FusioService) {
    super();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['selected']) {
      if (this.renderedId !== changes['selected'].currentValue.id) {
        this.renderedId = changes['selected'].currentValue.id;
        this.loading = true;
        this.renderPreview('' + this.renderedId);
      }
    }
  }

  private async renderPreview(id: string) {
    const group = await this.fusio.getClient().backendSchema();
    const response = await group.getBackendSchemaPreviewBySchemaId(id).backendActionSchemaGetPreview();

    this.preview = response.data.preview;
    this.loading = false;
  }

}
