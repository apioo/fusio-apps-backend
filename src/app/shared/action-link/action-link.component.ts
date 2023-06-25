import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-action-link',
  templateUrl: './action-link.component.html',
  styleUrls: ['./action-link.component.css']
})
export class ActionLinkComponent implements OnInit {

  @Input() data?: string = '';

  link?: string = '';

  ngOnInit(): void {
    this.link = '';
  }

}
