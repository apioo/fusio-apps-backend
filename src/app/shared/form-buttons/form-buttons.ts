import {Component, EventEmitter, input, Input, Output} from '@angular/core';

@Component({
  selector: 'app-form-buttons',
  imports: [],
  templateUrl: './form-buttons.html',
  styleUrl: './form-buttons.css',
})
export class FormButtons {

  mode = input.required<number>();

  @Output() onCreate = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onHelp = new EventEmitter<void>();

}
