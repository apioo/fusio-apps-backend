import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";

@Component({
  selector: 'app-cronjob-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendCronjob> {

}
