import {Component, OnInit, signal} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ImportService, Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";

@Component({
  selector: 'app-specification-list',
  imports: [
    TypeschemaEditorModule,
    MessageComponent
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {

  spec = signal<Specification|undefined>(undefined);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: ApiService, private importService: ImportService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fusio.getClient().backend().specification().get();

      this.spec.set(await this.importService.transform('typeapi', JSON.stringify(response.spec)));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doPublish() {
    try {
      const response = await this.fusio.getClient().backend().specification().publish({});

      this.response.set(response);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
