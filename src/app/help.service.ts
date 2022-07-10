import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HelpComponent} from "./shared/help/help.component";

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(protected modalService: NgbModal) { }

  showDialog(path: string) {
    const modalRef = this.modalService.open(HelpComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.path = path;
    modalRef.closed.subscribe((response) => {
    })
  }

}
