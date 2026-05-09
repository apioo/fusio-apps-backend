import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormButton} from "../form-button/form-button";

@Component({
  selector: 'app-form-buttons',
  imports: [
    FormButton
  ],
  templateUrl: './form-buttons.html',
  styleUrl: './form-buttons.css',
})
export class FormButtons {

  mode = input.required<number>();
  loading = input.required<boolean>();

  @Output() onCreate = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onHelp = new EventEmitter<void>();

}
