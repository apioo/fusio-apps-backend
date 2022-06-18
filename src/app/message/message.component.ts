import {Component, Input, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/src/generated/backend/Message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  response?: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
