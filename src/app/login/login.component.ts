import { Component, OnInit } from '@angular/core';
import packageJson from "../../../package.json";
import {FactoryService} from "../factory.service";

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

  response = null
  loading = false

  constructor(private factory: FactoryService) {
  }

  ngOnInit(): void {
  }

  async login(credentials: Credentials) {
    const client = this.factory.getClientWithCredentials(credentials.username, credentials.password);
    const account = await client.backendAccount();
    const response = await account.getBackendAccount().backendActionAccountGet();

    if (response.data.name) {
      // login successful
    }
  }

}

interface Credentials {
  username: string,
  password: string
}
