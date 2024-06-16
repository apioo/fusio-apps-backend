import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {BackendSdkTypes} from "fusio-sdk/dist/BackendSdkTypes";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sdk-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  constructor(private fusio: ApiService, private route: ActivatedRoute, private error: ErrorService) { }

  public types: BackendSdkTypes = {};
  public response?: CommonMessage;

  public type?: string;
  public namespace?: string;

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fusio.getClient().backend().sdk().getAll();

      this.types = response.types || {};
    } catch (error) {
      this.response = this.error.convert(error);
    }

    this.route.paramMap.subscribe(async params => {
      const type = params.get('type');
      if (type) {
        this.type = type;
      }
    });
  }

  async generate() {
    try {
      const config: Record<string, string> = {};
      if (this.namespace) {
        config['namespace'] = this.namespace;
      }

      const response = await this.fusio.getClient().backend().sdk().generate({
        format: this.type,
        config: new URLSearchParams(config).toString(),
      });

      if (response.success === true && response.link) {
        window.location.href = response.link;
      } else {
        this.response = response;
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
