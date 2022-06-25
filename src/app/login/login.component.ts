import { Component, OnInit } from '@angular/core';
import packageJson from "../../../package.json";
import {FactoryService} from "../factory.service";
import {Router} from "@angular/router";
import {Message} from "fusio-sdk/src/generated/backend/Message";

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
    const client = this.factory.getClientWithCredentials(this.credentials.username, this.credentials.password);
    const account = await client.backendAccount();

    account.getBackendAccount().backendActionAccountGet().then((resp) => {
      this.router.navigate(['/']).then(() => {
        location.reload();
      });
    }).catch((error) => {
      this.response = error.response.data;
    });
  }

}

interface Credentials {
  username: string,
  password: string
}
