import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {BackendService} from "ngx-fusio-sdk";
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";

@Component({
  selector: 'app-log-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  filter!: Array<any>;

  constructor(private backend: BackendService, public modal: NgbActiveModal) { }

  operations?: Array<Operation>;
  apps?: Array<App>;
  users?: Array<User>;

  async ngOnInit(): Promise<void> {
    this.loadOperations();
    this.loadApps();
    this.loadUsers();
  }

  async doSubmit() {
    this.modal.close(this.filter);
  }

  private async loadOperations(): Promise<void> {
    const response = await this.backend.getClient().operation().getAll(0, 1024);
    this.operations = response.entry;
  }

  private async loadApps(): Promise<void> {
    const response = await this.backend.getClient().app().getAll(0, 1024);
    this.apps = response.entry;
  }

  private async loadUsers(): Promise<void> {
    const response = await this.backend.getClient().user().getAll(0, 1024);
    this.users = response.entry;
  }

}
