import {Component} from '@angular/core';
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";
import {LogComponent} from "../log/log.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BackendService, Detail} from "ngx-fusio-sdk";

@Component({
  selector: 'app-operation-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Operation> {

  public baseUrl: string = '';
  public activeVersion: number = 1;
  public activeMethod: string = 'GET';

  constructor(private backend: BackendService, protected modalService: NgbModal) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.baseUrl = this.backend.getBaseUrl();
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
