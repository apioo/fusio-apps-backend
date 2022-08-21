import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Connection_Introspection_Entity} from "fusio-sdk/dist/src/generated/backend/Connection_Introspection_Entity";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {FusioService} from "../../../fusio.service";

@Component({
  selector: 'app-connection-introspection',
  templateUrl: './introspection.component.html',
  styleUrls: ['./introspection.component.css']
})
export class IntrospectionComponent implements OnInit {

  connectionId: string|null = null;
  entites: Array<string> = [];
  entity?: Connection_Introspection_Entity;
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
    const group = await this.fusio.getClient().backendConnection();
    const response = await group.getBackendConnectionByConnectionIdIntrospection(this.connectionId).backendActionConnectionIntrospectionGetEntities();
    this.entites = response.data.entities || [];
  }

  private async loadEntity(entityName: string): Promise<void> {
    if (!this.connectionId) {
      return;
    }
    const group = await this.fusio.getClient().backendConnection();
    const response = await group.getBackendConnectionByConnectionIdIntrospectionAndEntity(this.connectionId, entityName).backendActionConnectionIntrospectionGetEntity();
    this.entity = response.data;
  }

}
