import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {BackendService, HelpService} from "ngx-fusio-sdk";
import {TrashData} from "fusio-sdk/dist/src/generated/backend/TrashData";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  search: string = '';
  totalResults: number = 0;
  entries: Array<TrashData> = [];
  page: number = 1;
  pageSize: number = 16;
  response?: Message;
  type: string = 'action';
  types?: Array<string>;

  constructor(private backend: BackendService, private help: HelpService, private route: ActivatedRoute, private router: Router) {
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
    let query: CollectionCategoryQuery = {};
    query.startIndex = (this.page - 1) * this.pageSize;
    query.count = this.pageSize;
    if (this.search) {
      query.search = this.search;
    }

    const resource = await this.backend.getClient().getBackendTrashByType(this.type);
    const response = await resource.backendActionTrashGetAll(query);

    this.totalResults = response.data.totalResults || 0;
    this.entries = response.data.entry || [];
  }

  selectType() {
    this.router.navigate(['/trash/' + this.type]);
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  async doRestore(entry: TrashData) {
    const resource = await this.backend.getClient().getBackendTrashByType(this.type);
    const response = await resource.backendActionTrashRestore({
      id: entry.id
    });
    this.response = response.data;
    this.doSearch();
  }

  async loadTypes() {
    const resource = await this.backend.getClient().getBackendTrash();
    const response = await resource.backendActionTrashGetTypes();
    this.types = response.data.types;
  }
}
