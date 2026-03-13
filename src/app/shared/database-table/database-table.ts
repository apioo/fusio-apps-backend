import {Component, input} from '@angular/core';
import {BackendDatabaseTable} from "fusio-sdk";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-database-table',
  imports: [
    RouterLink
  ],
  templateUrl: './database-table.html',
  styleUrl: './database-table.css',
})
export class DatabaseTable {

  selected = input.required<BackendDatabaseTable>();
  connectionId = input<number|undefined>(undefined);

}
