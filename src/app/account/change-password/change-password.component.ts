import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {AccountChangePassword} from "fusio-sdk/dist/src/generated/backend/AccountChangePassword";
import {BackendService, ErrorService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  credentials: AccountChangePassword = {
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
  };
  response?: Message;

  constructor(private backend: BackendService, private error: ErrorService) { }

  ngOnInit(): void {
  }

  async submit() {
    try {
      this.response = await this.backend.getClient().account().changePassword(this.credentials);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
