import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {BackendTest} from "fusio-sdk/dist/BackendTest";
import {config} from "rxjs";

@Component({
  selector: 'app-test-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendTest> {

  body: string = '';
  disabled: boolean = false;

  override ngOnInit() {
    super.ngOnInit();

    this.disabled = this.entity.status === 6;
    if (this.entity.config?.body) {
      this.body = JSON.stringify(this.entity.config?.body, null, 2);
    }
  }

  protected async create(entity: BackendTest): Promise<void> {
  }

  protected async update(entity: BackendTest): Promise<CommonMessage> {
    const data = Object.assign({}, entity);
    data.status = this.disabled ? 6 : 1;
    if (this.body) {
      if (!data.config) {
        data.config = {
          method: "GET"
        };
      }
      data.config.body = JSON.parse(this.body);
    }

    return this.fusio.getClient().backend().test().update('' + entity.id, data);
  }

  protected async delete(entity: BackendTest): Promise<void> {
  }

  protected newEntity(): BackendTest {
    return {
    };
  }

}
