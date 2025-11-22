import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {Instance} from "../../instance-manager";
import {ConsumerUserJWT, ConsumerUserLogin, SystemAbout} from "fusio-sdk";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-instance-modal',
  templateUrl: './modal.component.html',
  imports: [
    FormsModule,
    NgbPopover
  ],
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  instance?: Instance;
  error?: string;

  constructor(public modal: NgbActiveModal, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.instance = {
      url: '',
      host: '',
      username: '',
      password: '',
    };
  }

  submit() {
    this.error = undefined;

    const url = this.instance?.url;
    if (!url) {
      this.error = 'Provided no url';
      return;
    }

    if (!URL.canParse(url)) {
      this.error = 'Provided an invalid url: ' + url;
      return;
    }

    this.httpClient.get<SystemAbout>(url).subscribe({
      next: (about) => {
        const apiVersion = about.apiVersion;
        if (!apiVersion || apiVersion.indexOf('.') === -1) {
          this.error = 'It looks like the provided url is not a Fusio instance';
          return;
        }

        about.links?.forEach((link) => {
          if (link.rel === 'root') {
            // check username and password
            const payload: ConsumerUserLogin = {
              username: this.instance?.username,
              password: this.instance?.password
            };

            this.httpClient.post<ConsumerUserJWT>(link.href + 'consumer/login', payload).subscribe({
              next: (token) => {
                if (!token.token) {
                  this.error = 'Could not obtain token for provided username and password';
                  return;
                }

                this.modal.close(this.instance);
              },
              error: (error: HttpErrorResponse) => {
                this.error = 'Could not obtain token for provided username and password' + (error.status > 0 ? ', got: ' + error.status : '');
              }
            });
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.error = 'It looks like the provided url is not a Fusio instance' + (error.status > 0 ? ', got: ' + error.status : '');
      }
    });
  }

}
