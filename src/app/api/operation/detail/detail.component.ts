import {Component} from '@angular/core';
import {LogComponent} from "../log/log.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Detail} from "ngx-fusio-sdk";
import {BackendOperation} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-operation-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendOperation> {

  public baseUrl: string = '';

  constructor(private fusio: ApiService, protected modalService: NgbModal) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();
  }

  showLogs() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modalService.open(LogComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.operation = this.selected;
  }

}
