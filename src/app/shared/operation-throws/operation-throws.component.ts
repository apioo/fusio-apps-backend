import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OperationThrows} from "fusio-sdk/dist/src/generated/backend/OperationThrows";

@Component({
  selector: 'app-operation-throws',
  templateUrl: './operation-throws.component.html',
  styleUrls: ['./operation-throws.component.css']
})
export class OperationThrowsComponent implements OnInit {

  @Input() name: string = 'operation-throws';
  @Input() data?: OperationThrows = {};
  @Output() dataChange = new EventEmitter<OperationThrows>();

  result: Array<{ code: number, schema: string }> = [];

  newCode?: number;

  errorStatusCodes = [
    {key: 0, value: ''},
    {key: 400, value: 'Bad Request'},
    {key: 402, value: 'Payment Required'},
    {key: 403, value: 'Forbidden'},
    {key: 404, value: 'Not Found'},
    {key: 405, value: 'Method Not Allowed'},
    {key: 408, value: 'Request Timeout'},
    {key: 409, value: 'Conflict'},
    {key: 410, value: 'Gone'},
    {key: 412, value: 'Precondition Failed'},
    {key: 417, value: 'Expectation Failed'},
    {key: 422, value: 'Unprocessable Entity'},
    {key: 423, value: 'Locked'},
    {key: 424, value: 'Failed Dependency'},
    {key: 429, value: 'Too Many Requests'},
    {key: 500, value: 'Internal Server Error'},
    {key: 501, value: 'Not Implemented'},
    {key: 502, value: 'Bad Gateway'},
    {key: 503, value: 'Service Unavailable'},
    {key: 504, value: 'Gateway Timeout'},
    {key: 507, value: 'Insufficient Storage'},
    {key: 508, value: 'Loop Detected'},
  ]

  ngOnInit() {
    if (this.data) {
      this.result = [];
      for (const [key, value] of Object.entries(this.data)) {
        this.result.push({
          code: parseInt(key),
          schema: value,
        })
      }
    }
  }

  add() {
    if (!this.newCode) {
      return;
    }

    this.result.push({
      code: this.newCode,
      schema: ''
    })

    this.newCode = undefined;
  }

  remove() {
    this.result = this.result.filter((row) => {
      return row.code !== 0;
    });
  }

  getNotUsedCodes() {
    return this.errorStatusCodes.filter((code) => {
      const selected = this.result.find((row) => {
        return row.code === code.key;
      });
      return !selected;
    });
  }

  changeValue() {
    const result: OperationThrows = {};
    this.result.forEach((row) => {
      result[row.code] = row.schema;
    });

    this.dataChange.emit(result);
  }

}
