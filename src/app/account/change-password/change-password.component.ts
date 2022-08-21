import {Component, OnInit} from '@angular/core';
import {Account_ChangePassword} from "fusio-sdk/dist/src/generated/backend/Account_ChangePassword";
import axios from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {FusioService} from "../../fusio.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  credentials: Account_ChangePassword = {
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
  };
  response?: Message;

  constructor(protected fusio: FusioService) { }

  ngOnInit(): void {
  }

  async submit() {
    try {
      const group = await this.fusio.getClient().backendAccount();
      const response = await group.getBackendAccountChangePassword().backendActionAccountChangePassword(this.credentials);

      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

}
