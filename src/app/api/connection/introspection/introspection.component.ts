import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {FusioService} from "../../../fusio.service";
import {ConnectionIntrospectionEntity} from "fusio-sdk/dist/src/generated/backend/ConnectionIntrospectionEntity";

@Component({
  selector: 'app-connection-introspection',
  templateUrl: './introspection.component.html',
  styleUrls: ['./introspection.component.css']
})
export class IntrospectionComponent implements OnInit {

  connectionId: string|null = null;
  entites: Array<string> = [];
  entity?: ConnectionIntrospectionEntity;
  response?: Message;

  constructor(protected fusio: FusioService, protected route: ActivatedRoute) {
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
    const resource = await this.fusio.getClient().getBackendConnectionByConnectionIdIntrospection(this.connectionId);
    const response = await resource.backendActionConnectionIntrospectionGetEntities();
    this.entites = response.data.entities || [];
  }

  private async loadEntity(entityName: string): Promise<void> {
    if (!this.connectionId) {
      return;
    }
    const resource = await this.fusio.getClient().getBackendConnectionByConnectionIdIntrospectionAndEntity(this.connectionId, entityName);
    const response = await resource.backendActionConnectionIntrospectionGetEntity();
    this.entity = response.data;
  }

}
