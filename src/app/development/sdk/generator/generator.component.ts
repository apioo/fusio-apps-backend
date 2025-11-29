import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendSdkTypes, CommonMessage} from "fusio-sdk";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../../api.service";
import {FormsModule} from "@angular/forms";
import {KeyValuePipe} from "@angular/common";

@Component({
  selector: 'app-sdk-generator',
  templateUrl: './generator.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    FormsModule,
    KeyValuePipe
  ],
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  types = signal<BackendSdkTypes>({});
  response = signal<CommonMessage|undefined>(undefined);

  type = signal<string|undefined>(undefined);
  namespace = signal<string|undefined>(undefined);

  constructor(private fusio: ApiService, private route: ActivatedRoute, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fusio.getClient().backend().sdk().getAll();

      this.types.set(response.types || {});
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.route.paramMap.subscribe(async params => {
      const type = params.get('type');
      if (type) {
        this.type.set(type);
      }
    });
  }

  async generate() {
    try {
      const config: Record<string, string> = {};
      const namespace = this.namespace();
      if (namespace) {
        config['namespace'] = namespace;
      }

      const response = await this.fusio.getClient().backend().sdk().generate({
        format: this.type(),
        config: new URLSearchParams(config).toString(),
      });

      if (response.success === true && response.link) {
        window.location.href = response.link;
      } else {
        this.response.set(response);
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
