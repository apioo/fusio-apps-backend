import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {BackendService, Detail} from "ngx-fusio-sdk";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";

@Component({
  selector: 'app-schema-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Schema> implements OnChanges {

  renderedId?: number;
  preview?: string;
  loading: boolean = false;

  constructor(private backend: BackendService) {
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
    const response = await this.backend.getClient().schema().getPreview(id);

    this.preview = response.preview;
    this.loading = false;
  }

}
