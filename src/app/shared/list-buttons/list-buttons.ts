import {Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-buttons',
  imports: [
    RouterLink
  ],
  templateUrl: './list-buttons.html',
  styleUrl: './list-buttons.css',
})
export class ListButtons {

  buttons = input<Array<Button>>([]);

  @Output() onDetail = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

}

interface Button {
  icon: string
  link: Array<any>
  type?: 'primary'|'secondary'|'info'|'warning'|'danger'
  title?: string
}
