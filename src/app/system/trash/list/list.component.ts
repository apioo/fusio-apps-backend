import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HelpService} from "ngx-fusio-sdk";
import {BackendTrashData, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  search: string = '';
  totalResults: number = 0;
  entries: Array<BackendTrashData> = [];
  page: number = 1;
  pageSize: number = 16;
  response?: CommonMessage;
  type: string = 'action';
  types?: Array<string>;

  constructor(private fusio: ApiService, private help: HelpService, private route: ActivatedRoute, private router: Router) {
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
    const startIndex = (this.page - 1) * this.pageSize;
    const count = this.pageSize;
    const response = await this.fusio.getClient().backend().trash().getAllByType(this.type, startIndex, count, this.search);

    this.totalResults = response.totalResults || 0;
    this.entries = response.entry || [];
  }

  selectType() {
    this.router.navigate(['/trash/' + this.type]);
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  async doRestore(entry: BackendTrashData) {
    this.response = await this.fusio.getClient().backend().trash().restore(this.type, {
      id: entry.id
    });
    this.doSearch();
  }

  async loadTypes() {
    const response = await this.fusio.getClient().backend().trash().getTypes();
    this.types = response.types;
  }
}
