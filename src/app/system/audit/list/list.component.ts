import { Component, OnInit } from '@angular/core';
import {List} from "../../../list";
import {Audit} from "fusio-sdk/dist/src/generated/backend/Audit";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Audit> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Audit>>> {
    const group = await this.factory.getClient().backendAudit();
    return await group.getBackendAudit().backendActionAuditGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Audit>> {
    const group = await this.factory.getClient().backendAudit();
    return await group.getBackendAuditByAuditId(id).backendActionAuditGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/audit';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
