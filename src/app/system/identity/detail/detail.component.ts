import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendIdentity} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-identity-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendIdentity> {

  public baseUrl: string = '';

  constructor(private fusio: ApiService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();
  }

}
