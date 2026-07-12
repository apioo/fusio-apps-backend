import {Component, Inject, inject, Input, OnInit, signal} from '@angular/core';
import {ApiService} from "../../../api.service";
import {BackendSpecificationChangelog, CommonMessage} from "fusio-sdk";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorService} from "ngx-fusio-sdk";
import {UnifiedDiffComponent} from "ngx-diff";

@Component({
  selector: 'app-changelog',
  imports: [
    UnifiedDiffComponent
  ],
  templateUrl: './changelog.html',
  styleUrl: './changelog.css',
})
export class Changelog implements OnInit {

  @Input()
  input!: BackendSpecificationChangelog;

  master = signal<string>('');
  tag = signal<string>('');
  version = signal<string>('');
  changelog = signal<Array<string>>([]);

  modal = inject(NgbActiveModal);

  ngOnInit(): void {
    this.master.set(JSON.stringify(this.input.master, null, 4));
    this.tag.set(JSON.stringify(this.input.tag, null, 4));
    this.version.set(this.input.version || '');
    this.changelog.set(this.input.changelog || []);
  }

}
