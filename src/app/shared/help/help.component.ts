import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  path?: string;
  url?: SafeUrl;

  constructor(public modal: NgbActiveModal, protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.path) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.fusio-project.org/docs/backend/' + this.path);
    }
  }

}
