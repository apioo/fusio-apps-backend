import {Component, input} from '@angular/core';

@Component({
  selector: 'app-operation-status',
  imports: [],
  templateUrl: './operation-status.html',
  styleUrl: './operation-status.css',
})
export class OperationStatus {

  active = input.required<boolean|undefined>();
  public = input.required<boolean|undefined>();

}
