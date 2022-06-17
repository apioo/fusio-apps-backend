import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  response?: Response;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Response {
  success: boolean
  message: string
}
