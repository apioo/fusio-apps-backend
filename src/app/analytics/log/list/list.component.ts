import {Component, computed, signal} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendLog} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../../../services/log.service";
import {NgbModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendLog> {

  filter = signal<Array<any>>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  override collectionQuery = computed<Array<any>>(() => {
    let query: Array<any> = [];
    query.push((this.page() - 1) * this.pageSize());
    query.push(this.pageSize());
    const search = this.search();
    if (search) {
      query.push(search);
    } else {
      query.push('');
    }

    this.filter().forEach((value) => {
      if (value !== null && value !== undefined) {
        query.push(value);
      } else {
        query.push('');
      }
    });

    return query;
  });

  constructor(private service: LogService, private modalService: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.route.queryParams.subscribe(async params => {
      this.filter.set([
        params['from'] || '',
        params['to'] || '',
        params['operation'] || '',
        params['app'] || '',
        params['user'] || '',
        params['ip'] || '',
        params['userAgent'] || '',
        params['method'] || '',
        params['path'] || '',
        params['header'] || '',
        params['body'] || '',
      ]);
    });
  }

  protected getService(): LogService {
    return this.service;
  }

  openFilterDialog() {
    const modalRef = this.modalService.open(FilterComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.filter = this.filter();
    modalRef.closed.subscribe(async (filter: Array<any>) => {
      await this.router.navigate([], {
        queryParams: {
          from: filter[0],
          to: filter[1],
          operation: filter[2],
          app: filter[3],
          user: filter[4],
          ip: filter[5],
          userAgent: filter[6],
          method: filter[7],
          path: filter[8],
          header: filter[9],
          body: filter[10],
        }
      });
    });
  }

}
