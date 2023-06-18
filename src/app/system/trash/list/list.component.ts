import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {BackendService, HelpService} from "ngx-fusio-sdk";
import {TrashData} from "fusio-sdk/dist/src/generated/backend/TrashData";

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
    const startIndex = (this.page - 1) * this.pageSize;
    const count = this.pageSize;
    const response = await this.backend.getClient().trash().getAllByType(this.type, startIndex, count, this.search);

    this.totalResults = response.totalResults || 0;
    this.entries = response.entry || [];
  }

  selectType() {
    this.router.navigate(['/trash/' + this.type]);
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  async doRestore(entry: TrashData) {
    this.response = await this.backend.getClient().trash().restore(this.type, {
      id: entry.id
    });
    this.doSearch();
  }

  async loadTypes() {
    const response = await this.backend.getClient().trash().getTypes();
    this.types = response.types;
  }
}
