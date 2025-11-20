import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-breadcrump',
  imports: [],
  templateUrl: './form-breadcrump.html',
  styleUrl: './form-breadcrump.css',
})
export class FormBreadcrump {

  @Input() mode!: number;

}
