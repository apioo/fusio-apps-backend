import {Component, effect, input, OnInit, output, signal} from '@angular/core';
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
export class Input implements OnInit {

  loading = input.required<boolean>();
  text = input<string>('');

  input = signal<string>('');
  send = output<string>();

  ngOnInit(): void {
    this.input.set(this.text());
  }

}
