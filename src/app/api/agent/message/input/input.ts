import {Component, input, output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-agent-message-input',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {

  loading = input.required<boolean>();
  input = signal<string>('');
  send = output<string>();

}
