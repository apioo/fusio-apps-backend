import { Component, OnInit } from '@angular/core';
import * as packagejson from "../../../package.json";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  version = packagejson.version;

  credentials: Credentials = {
    username: '',
    password: ''
  }

  response = null
  loading = false

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  login(credentials: Credentials): void {

    this.httpClient.post(fusio.baseUrl + 'authorization/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe((response) => {

      this.router.navigateByUrl('/');
    })

  }

}

interface Credentials {
  username: string,
  password: string
}
