import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent, Mode} from "ngx-fusio-sdk";
import {BackendTest, CommonMessage} from "fusio-sdk";
import {FormComponent} from "../form/form.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../../api.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-test-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    RouterLink
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tests = signal<Array<BackendTest>>([]);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: ApiService, private error: ErrorService, private modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    await this.doLoad();
  }

  async doLoad() {
    try {
      const response = await this.fusio.getClient().backend().test().getAll();

      this.tests.set(response.entry || []);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doRefresh() {
    try {
      this.response.set(await this.fusio.getClient().backend().test().refresh());
      await this.doLoad();
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doRun() {
    try {
      this.response.set(await this.fusio.getClient().backend().test().run());
      await this.doLoad();
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async openUpdateDialog(entity: BackendTest) {
    try {
      entity = await this.fusio.getClient().backend().test().get('' + entity.id)
    } catch (error) {
      this.response.set(this.error.convert(error));
      return;
    }

    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Update;
    modalRef.componentInstance.entity = entity;
    modalRef.closed.subscribe(async (result: CommonMessage) => {
      this.response.set(result);
      if (result.success) {
        await this.doLoad();
      }
    });
  }

}
