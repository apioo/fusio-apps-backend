import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../../services/app.service";
import {UserService} from "../../../services/user.service";
import {Filter} from "../list/list.component";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input()
  filter!: Filter;

  constructor(public app: AppService, public user: UserService, public modal: NgbActiveModal) { }

  async doSubmit() {
    this.modal.close(this.filter);
  }

}
