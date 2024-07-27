import {Component, OnInit} from '@angular/core';
import {ErrorService, Mode, Result} from "ngx-fusio-sdk";
import {ApiService} from "../../../api.service";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {BackendTest} from "fusio-sdk/dist/BackendTest";
import {Router} from "@angular/router";
import {ModalComponent} from "../modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-test-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private fusio: ApiService, private error: ErrorService, private router: Router, private modalService: NgbModal) { }

  public tests: Array<BackendTest> = [];
  public response?: CommonMessage;

  async ngOnInit(): Promise<void> {
    await this.doLoad();
  }

  async doLoad() {
    try {
      const response = await this.fusio.getClient().backend().test().getAll();

      this.tests = response.entry || [];
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doRefresh() {
    try {
      this.response = await this.fusio.getClient().backend().test().refresh();
      await this.doLoad();
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doRun() {
    try {
      this.response = await this.fusio.getClient().backend().test().run();
      await this.doLoad();
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async openUpdateDialog(entity: BackendTest) {
    try {
      entity = await this.fusio.getClient().backend().test().get('' + entity.id)
    } catch (error) {
      this.response = this.error.convert(error);
      return;
    }

    const modalRef = this.modalService.open(ModalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Update;
    modalRef.componentInstance.entity = entity;
    modalRef.closed.subscribe(async (result: Result<BackendTest>) => {
      this.response = result.response;
      if (result.response.success) {
        await this.doLoad();
      }
    });
  }

}
