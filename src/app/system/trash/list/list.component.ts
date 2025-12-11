import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendTrashData, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {FormsModule} from "@angular/forms";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  search = signal<string>('');
  totalResults = signal<number>(0);
  entries = signal<Array<BackendTrashData>>([]);
  page = signal<number>(1);
  pageSize = signal<number>(16);
  response = signal<CommonMessage|undefined>(undefined);
  type = signal<string>('action');
  types = signal<Array<string>>([]);

  constructor(private fusio: ApiService, private help: HelpService, private error: ErrorService, private route: ActivatedRoute, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadTypes();

    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (type) {
        this.type.set(type);
      }
      this.doSearch();
    });
  }

  async doSearch() {
    const startIndex = (this.page() - 1) * this.pageSize();
    const count = this.pageSize();
    const response = await this.fusio.getClient().backend().trash().getAllByType(this.type(), startIndex, count, this.search());

    this.totalResults.set(response.totalResults || 0);
    this.entries.set(response.entry || []);
  }

  selectType(type: string) {
    this.router.navigate(['/trash/' + type]);
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  async doRestore(entry: BackendTrashData) {
    try {
      const response = await this.fusio.getClient().backend().trash().restore(this.type(), {
        id: entry.id
      });

      this.response.set(response);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.doSearch();
  }

  async loadTypes() {
    try {
      const response = await this.fusio.getClient().backend().trash().getTypes();
      this.types.set(response.types || []);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }
}
