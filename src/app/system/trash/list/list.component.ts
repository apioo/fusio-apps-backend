import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Trash_Data} from "fusio-sdk/dist/src/generated/backend/Trash_Data";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {HelpService} from "ngx-fusio-sdk";
import {FusioService} from "../../../fusio.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  search: string = '';
  totalResults: number = 0;
  entries: Array<Trash_Data> = [];
  page: number = 1;
  pageSize: number = 16;
  response?: Message;
  type: string = 'action';
  types?: Array<string>;

  constructor(protected fusio: FusioService, protected help: HelpService, protected route: ActivatedRoute, protected router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.loadTypes();

    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (type) {
        this.type = type;
        this.doSearch();
      }
    });
  }

  async doSearch() {
    let query: Collection_Category_Query = {};
    query.startIndex = (this.page - 1) * this.pageSize;
    query.count = this.pageSize;
    if (this.search) {
      query.search = this.search;
    }

    const group = await this.fusio.getClient().backendTrash();
    const response = await group.getBackendTrashByType(this.type).backendActionTrashGetAll(query);

    this.totalResults = response.data.totalResults || 0;
    this.entries = response.data.entry || [];
  }

  selectType() {
    this.router.navigate(['/trash/' + this.type]);
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  async doRestore(entry: Trash_Data) {
    const group = await this.fusio.getClient().backendTrash();
    const response = await group.getBackendTrashByType(this.type).backendActionTrashRestore({
      id: entry.id
    });
    this.response = response.data;
    this.doSearch();
  }

  async loadTypes() {
    const group = await this.fusio.getClient().backendTrash();
    const response = await group.getBackendTrash().backendActionTrashGetTypes();
    this.types = response.data.types;
  }
}
