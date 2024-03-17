import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../../api.service";
import {BackendApp, BackendUser} from "fusio-sdk";

@Component({
  selector: 'app-token-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  filter!: any;

  constructor(protected backend: ApiService, public modal: NgbActiveModal) { }

  apps?: Array<BackendApp>;
  users?: Array<BackendUser>;

  async ngOnInit(): Promise<void> {
    this.loadApps();
    this.loadUsers();
  }

  async doSubmit() {
    this.modal.close(this.filter);
  }

  private async loadApps(): Promise<void> {
    const response = await this.backend.getClient().backend().app().getAll(0, 1024);
    this.apps = response.entry;
  }

  private async loadUsers(): Promise<void> {
    const response = await this.backend.getClient().backend().user().getAll(0, 1024);
    this.users = response.entry;
  }

}
