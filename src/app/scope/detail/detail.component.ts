import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

@Component({
  selector: 'app-scope-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Scope> {

  protected async create(entity: Scope): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScope().backendActionScopeCreate(entity);
  }

  protected async update(entity: Scope): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScopeByScopeId('' + entity.id).backendActionScopeUpdate(entity);
  }

  protected async delete(entity: Scope): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScopeByScopeId('' + entity.id).backendActionScopeDelete();
  }

  protected newEntity(): Scope {
    return {
      name: ''
    };
  }

}
