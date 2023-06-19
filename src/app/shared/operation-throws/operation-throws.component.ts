import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OperationThrows} from "fusio-sdk/dist/src/generated/backend/OperationThrows";

@Component({
  selector: 'app-operation-throws',
  templateUrl: './operation-throws.component.html',
  styleUrls: ['./operation-throws.component.css']
})
export class OperationThrowsComponent {

  @Input() data?: OperationThrows = {};
  @Output() dataChange = new EventEmitter<OperationThrows>();

}
