import {Directive, OnInit} from '@angular/core';
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import axios, {AxiosResponse} from "axios";
import {HelpService} from "./help.service";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {FactoryService} from "./factory.service";

@Directive()
export abstract class List<T extends ModelId> implements OnInit {

  public search: string = '';
  public totalResults: number = 0;
  public entries: Array<T> = [];
  public selected?: T;
  public page: number = 1;
  public pageSize: number = 16;
  public response?: Message;
  public loading: boolean = true;

  constructor(protected factory: FactoryService, protected help: HelpService, protected route: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = parseInt(params['page']);
      }
      if (params['search']) {
        this.search = params['search'];
      }

      this.doList();
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doGet(id);
      }
    });
  }

  async doList() {
    let query: Collection_Category_Query = {};
    query.startIndex = (this.page - 1) * this.pageSize;
    query.count = this.pageSize;
    if (this.search) {
      query.search = this.search;
    }

    try {
      const response = await this.getAll(query);

      this.totalResults = response.data.totalResults || 0;
      this.entries = response.data.entry || [];

      this.onList();

      // in case we are not at a specific route redirect to the first
      const isDetailRoute: boolean|undefined = this.route.routeConfig?.path?.endsWith(':id');
      if (this.entries.length > 0 && this.entries[0].id && isDetailRoute === false) {
        await this.doGet('' + this.entries[0].id);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }

    this.loading = false;
  }

  async doGet(id: string) {
    try {
      const response = await this.get(id);

      this.selected = response.data;

      this.onGet();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  doSearch() {
    if (this.selected) {
      this.router.navigate([this.getRoute(), this.selected.id], {
        queryParams: this.getQueryParams()
      });
    } else {
      this.router.navigate([this.getRoute()], {
        queryParams: this.getQueryParams()
      });
    }
    return false;
  }

  openCreateDialog() {
    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Create;
    modalRef.closed.subscribe((response) => {
      this.response = response;
      if (response.success) {
        this.doList();
      }
    })
  }

  openUpdateDialog() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Update;
    modalRef.componentInstance.entity = this.selected;
    modalRef.closed.subscribe((response) => {
      this.response = response;
      if (response.success) {
        this.doList();
      }
    })

  }

  openDeleteDialog() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Delete;
    modalRef.componentInstance.entity = this.selected;
    modalRef.closed.subscribe((response) => {
      this.response = response;
      if (response.success) {
        this.doList();
      }
    })
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  getQueryParams(): QueryParams {
    const queryParams: QueryParams = {};

    if (this.page) {
      queryParams.page = this.page;
    }

    if (this.search) {
      queryParams.search = this.search;
    }

    return queryParams;
  }

  protected abstract getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<T>>>;
  protected abstract get(id: string): Promise<AxiosResponse<T>>;
  protected abstract getDetailComponent(): any;
  protected abstract getRoute(): string;
  protected abstract onList(): void;
  protected abstract onGet(): void;

}

interface QueryParams {
  page?: number
  search?: string
}

export interface ModelId {
  id?: number
}

export enum Mode {
  Create = 1,
  Update,
  Delete,
}
