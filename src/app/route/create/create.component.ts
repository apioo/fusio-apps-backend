import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Response} from "../../message/message.component";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  response?: Response;
  route: ModelRoute = {
    path: '',
    scopes: [],
    config: []
  };

  methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  schemas = []
  actions = []

  statuuus = [{
    key: 4,
    value: 'Development'
  }, {
    key: 1,
    value: 'Production'
  }, {
    key: 2,
    value: 'Deprecated'
  }, {
    key: 3,
    value: 'Closed'
  }]

  statusCodes = {
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '204': 'No Content',
    '205': 'Reset Content',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '400': 'Bad Request',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '412': 'Precondition Failed',
    '417': 'Expectation Failed',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '429': 'Too Many Requests',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected'
  }

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  submit() {

  }

  showHelp(path: string) {
  }

}
