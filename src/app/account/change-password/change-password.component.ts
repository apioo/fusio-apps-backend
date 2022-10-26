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
      const resource = await this.backend.getClient().getBackendAccountChangePassword();
      const response = await resource.backendActionAccountChangePassword(this.credentials);

      this.response = response.data;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
