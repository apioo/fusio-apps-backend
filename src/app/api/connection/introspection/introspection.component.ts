import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendConnectionIntrospectionEntity, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-connection-introspection',
  templateUrl: './introspection.component.html',
  styleUrls: ['./introspection.component.css']
})
export class IntrospectionComponent implements OnInit {

  connectionId: string|null = null;
  entites: Array<string> = [];
  entity?: BackendConnectionIntrospectionEntity;
  response?: CommonMessage;

  constructor(protected fusio: ApiService, protected route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      if (this.connectionId != params.get('id')) {
        this.connectionId = params.get('id');
        await this.loadEntities();
      }

      const entityName = params.get('entity');
      if (entityName && this.entity?.name != entityName) {
        await this.loadEntity(entityName);
      }
    });
  }

  private async loadEntities(): Promise<void> {
    if (!this.connectionId) {
      return;
    }

    const response = await this.fusio.getClient().backend().connection().getIntrospection(this.connectionId);
    this.entites = response.entities || [];
  }

  private async loadEntity(entityName: string): Promise<void> {
    if (!this.connectionId) {
      return;
    }

    this.entity = await this.fusio.getClient().backend().connection().getIntrospectionForEntity(this.connectionId, entityName);
  }

}
