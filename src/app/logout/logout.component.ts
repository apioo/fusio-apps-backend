import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../factory.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private factory: FactoryService, private router: Router) {
  }

  ngOnInit(): void {
    this.factory.logout();
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

}
