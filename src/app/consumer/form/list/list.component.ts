import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendForm} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormService} from "../../../services/form.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-form-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendForm> {

  constructor(private service: FormService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FormService {
    return this.service;
  }

}
