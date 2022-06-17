import { Component, OnInit } from '@angular/core';
import packageJson from "../../../package.json";
import {FactoryService} from "../factory.service";
import {Router} from "@angular/router";

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

  constructor(private factory: FactoryService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async login(credentials: Credentials) {
    const client = this.factory.getClientWithCredentials(credentials.username, credentials.password);
    const account = await client.backendAccount();

    account.getBackendAccount().backendActionAccountGet().then(() => {
      this.router.navigate(['/route']);
    }).catch(() => {
    });
  }

}

interface Credentials {
  username: string,
  password: string
}
