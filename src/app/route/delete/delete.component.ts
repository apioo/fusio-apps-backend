import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() route?: ModelRoute;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  submit() {

  }

}
