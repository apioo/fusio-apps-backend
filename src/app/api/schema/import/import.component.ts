import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";
import {ErrorService, Mode, Result} from "ngx-fusio-sdk";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Document} from "typehub-javascript-sdk/dist/src/Document";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  search = '';
  totalResults = 0;
  startIndex = 0;
  itemsPerPage = 0;
  entry: Array<Document> = [];

  page = 0;
  response?: Message;

  constructor(private http: HttpClient, private router: Router, private error: ErrorService, protected modalService: NgbModal) { }

  ngOnInit(): void {
  }

  async doSearch() {
    const startIndex = (this.page - 1) * this.itemsPerPage;

    try {
      /*
      const resource = await this.typehub.getClientAnonymous().getExplore();
      const response = await resource.getExplore({
        startIndex: startIndex,
        search: this.search,
      });

      this.totalResults = response.data.totalResults || 0;
      this.startIndex = response.data.startIndex || 0;
      this.itemsPerPage = response.data.itemsPerPage || 0;
      this.entry = response.data.entry || [];
      */
    } catch (e) {
      this.response = this.error.convert(e);
    }
  }

  async doImport(document: Document) {
    if (!document.name || !document.user?.name) {
      return;
    }

    try {
      /*
      const resource = await this.typehub.getClientAnonymous().getDocumentByUserAndDocumentExport(document.user?.name, document.name);
      const response = await resource.postDocumentUserDocumentExport({
        user: document.user?.name,
        document: document.name,
        format: 'typeschema'
      });

      const href = response.data.href;
      if (!href) {
        return;
      }

      this.http.get(href).subscribe((data) => {
        const modalRef = this.modalService.open(ModalComponent, {
          size: 'lg'
        });

        modalRef.componentInstance.mode = Mode.Create;
        modalRef.componentInstance.schema = JSON.stringify(data, null, 2);

        modalRef.closed.subscribe((data: Result<Schema>) => {
          this.response = data.response;
          if (this.response.success) {
            if (data.entity.id) {
              this.router.navigate(['/schema/' + data.entity.id]);
            } else {
              this.router.navigate(['/schema']);
            }
          }
        });
      });
      */
    } catch (e) {
      this.response = this.error.convert(e);
    }
  }

}
