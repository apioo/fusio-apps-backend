import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import axios from "axios";
import {BackendService, UserService} from "ngx-fusio-sdk";
import {VersionService} from "../version.service";
import {ClientException} from "sdkgen-client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentVersion = '';

  credentials: Credentials = {
    username: '',
    password: ''
  }

  response?: Message;
  loading = false

  constructor(private backend: BackendService, private router: Router, private user: UserService, private version: VersionService) {
  }

  ngOnInit(): void {
    this.currentVersion = this.version.get();
  }

  async login() {
    this.loading = true;

    try {
      const client = this.backend.getClientWithCredentials(this.credentials.username, this.credentials.password);
      const response = await client.account().get();

      this.user.login(response);

      this.router.navigate(['/']).then(() => {
        location.reload();
      });
    } catch (error) {
      this.loading = false;
      if (error instanceof ClientException) {
        this.response = {
          success: false,
          message: 'Could not authenticate',
        };
      } else if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.error_description || 'An unknown error occurred',
        };
      } else {
        throw error;
      }
    }
  }

}

interface Credentials {
  username: string,
  password: string
}
