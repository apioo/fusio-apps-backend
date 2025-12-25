import {Component, input, Input} from '@angular/core';

@Component({
  selector: 'app-form-breadcrump',
  imports: [],
  templateUrl: './form-breadcrump.html',
  styleUrl: './form-breadcrump.css',
})
export class FormBreadcrump {

  mode = input.required<number>();

}
