import { Component, OnInit } from '@angular/core';
import packageJson from "../../../package.json";
import {FactoryService} from "../factory.service";
import {Router} from "@angular/router";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import axios from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  version = packageJson.version;

  credentials: Credentials = {
    username: '',
    password: ''
  }

  response?: Message;
  loading = false

  constructor(private factory: FactoryService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;

    try {
      const client = this.factory.getClientWithCredentials(this.credentials.username, this.credentials.password);
      const account = await client.backendAccount();
      const response = await account.getBackendAccount().backendActionAccountGet();

      this.router.navigate(['/']).then(() => {
        location.reload();
      });
    } catch (error) {
      this.loading = false;
      if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.error_description || 'An unknown error occurred',
        };
      } else {
        this.response = {
          success: false,
          message: error instanceof Error ? error.toString() : 'An unknown error occurred',
        };
      }
    }
  }

}

interface Credentials {
  username: string,
  password: string
}
