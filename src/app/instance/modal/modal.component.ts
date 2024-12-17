import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Instance} from "../../instance-manager";

@Component({
  selector: 'app-instance-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  instance?: Instance;

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.instance = {
      url: '',
      host: '',
      username: '',
      password: '',
    };
  }

  submit() {
    this.modal.close(this.instance);
  }

}
