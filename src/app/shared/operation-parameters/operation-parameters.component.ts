import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OperationParameters} from "fusio-sdk/dist/src/generated/backend/OperationParameters";

@Component({
  selector: 'app-operation-parameters',
  templateUrl: './operation-parameters.component.html',
  styleUrls: ['./operation-parameters.component.css']
})
export class OperationParametersComponent {

  @Input() data?: OperationParameters = {};
  @Output() dataChange = new EventEmitter<OperationParameters>();

}
