import {Component, input} from '@angular/core';

@Component({
  selector: 'app-agent-message-type',
  imports: [
  ],
  templateUrl: './type.html',
  styleUrl: './type.css',
})
export class Type {

  value = input.required<number|undefined>()

}
