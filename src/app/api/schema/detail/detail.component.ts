import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-schema-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendSchema> implements OnChanges {

  renderedId?: number;
  preview?: string;
  loading: boolean = false;

  constructor(private fusio: ApiService) {
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
    const response = await this.fusio.getClient().backend().schema().getPreview(id);

    this.preview = response.preview;
    this.loading = false;
  }

}
