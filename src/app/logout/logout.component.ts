import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.user.logout();
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

}
