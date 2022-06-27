import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";

@Component({
  selector: 'app-role-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Role> {

  categories?: Array<Category>;

  override async ngOnInit(): Promise<void> {
    const category = await this.factory.getClient().backendCategory();
    const response = await category.getBackendCategory().backendActionCategoryGetAll({count: 1024});
    this.categories = response.data.entry;
  }

  protected async create(entity: Role): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRole().backendActionRoleCreate(entity);
  }

  protected async update(entity: Role): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRoleByRoleId('' + entity.id).backendActionRoleUpdate(entity);
  }

  protected async delete(entity: Role): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRoleByRoleId('' + entity.id).backendActionRoleDelete();
  }

  protected newEntity(): Role {
    return {
      name: ''
    };
  }

}
