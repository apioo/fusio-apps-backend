import {Component} from '@angular/core';
import {Action} from "fusio-sdk/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";
import {Detail} from "../../detail";
import {Category} from "fusio-sdk/src/generated/backend/Category";

@Component({
  selector: 'app-category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Category> {

  protected async create(entity: Category): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendCategory();
    return await group.getBackendCategory().backendActionCategoryCreate(entity);
  }

  protected async update(entity: Category): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendCategory();
    return await group.getBackendCategoryByCategoryId('' + entity.id).backendActionCategoryUpdate(entity);
  }

  protected async delete(entity: Category): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendCategory();
    return await group.getBackendCategoryByCategoryId('' + entity.id).backendActionCategoryDelete();
  }

  protected newEntity(): Category {
    return {
      name: '',
    };
  }

}
