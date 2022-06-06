import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fusio';

  userAuthenticated = true;
  user = {name: 'foobar'}
  menu = [{
    title: 'Change password',
    path: '/account/change_password'
  }, {
    title: 'Logout',
    path: '/logout'
  }];

  ngOnInit(): void {
  }

}
