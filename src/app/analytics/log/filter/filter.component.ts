import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../../api.service";
import {BackendApp, BackendOperation, BackendUser} from "fusio-sdk";

@Component({
  selector: 'app-log-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  filter!: Array<any>;

  constructor(private fusio: ApiService, public modal: NgbActiveModal) { }

  operations?: Array<BackendOperation>;
  apps?: Array<BackendApp>;
  users?: Array<BackendUser>;

  async ngOnInit(): Promise<void> {
    this.loadOperations();
    this.loadApps();
    this.loadUsers();
  }

  async doSubmit() {
    this.modal.close(this.filter);
  }

  private async loadOperations(): Promise<void> {
    const response = await this.fusio.getClient().backend().operation().getAll(0, 1024);
    this.operations = response.entry;
  }

  private async loadApps(): Promise<void> {
    const response = await this.fusio.getClient().backend().app().getAll(0, 1024);
    this.apps = response.entry;
  }

  private async loadUsers(): Promise<void> {
    const response = await this.fusio.getClient().backend().user().getAll(0, 1024);
    this.users = response.entry;
  }

}
