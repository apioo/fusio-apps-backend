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

  override ngOnInit() {
    super.ngOnInit();

    if (this.entity.config?.body) {
      this.body = JSON.stringify(this.entity.config?.body, null, 2);
    }
  }

  protected async create(entity: BackendTest): Promise<void> {
  }

  protected async update(entity: BackendTest): Promise<CommonMessage> {
    const config = Object.assign({}, entity.config);
    if (this.body) {
      config.body = JSON.parse(this.body);
    }

    return this.fusio.getClient().backend().test().update('' + entity.id, config);
  }

  protected async delete(entity: BackendTest): Promise<void> {
  }

  protected newEntity(): BackendTest {
    return {
    };
  }

}
