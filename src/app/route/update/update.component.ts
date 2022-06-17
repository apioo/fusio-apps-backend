import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() route?: ModelRoute;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  submit() {

  }

}
