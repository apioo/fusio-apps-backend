import {Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'app-form-button',
  imports: [],
  templateUrl: './form-button.html',
  styleUrl: './form-button.css',
})
export class FormButton {

  type = input.required<'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'|'link'>();
  title = input.required<string>();
  titleLoading = input.required<string>();
  loading = input.required<boolean>();

  @Output() onAction = new EventEmitter<void>();

  doClick() {
    if (this.loading()) {
      return;
    }

    this.onAction.emit();
  }

}
