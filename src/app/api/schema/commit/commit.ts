import {Component, signal} from '@angular/core';
import {BackendSchema, BackendSchemaCommit} from "fusio-sdk";
import {CommitService} from "../../../services/schema/commit.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {DiffEditorComponent, DiffEditorModel} from "ngx-monaco-editor-v2-alternative";
import {SchemaService} from "../../../services/schema.service";
import {DatePipe, SlicePipe} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-schema-commit',
  imports: [
    DatePipe,
    DiffEditorComponent,
    MessageComponent,
    NgbPagination,
    SearchComponent,
    SlicePipe,
    RouterLink
  ],
  templateUrl: './commit.html',
  styleUrl: './commit.css',
})
export class Commit extends List<BackendSchemaCommit> {
  schema = signal<BackendSchema|undefined>(undefined);

  commits = signal<Array<CommitEntry>>([]);

  constructor(private service: CommitService, private schemaService: SchemaService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CommitService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.route.params.subscribe(async (params) => {
      if (params['id']) {
        try {
          const schema = await this.schemaService.get(params['id'])
          this.schema.set(schema);
          this.service.setSchemaId('' + schema.id);
        } catch (error) {
          this.response.set(this.error.convert(error));
        }
      }
    });
  }

  protected override onLoad() {
    const entries = this.entries();
    const commits: Array<CommitEntry> = [];
    for (let i = 0; i < entries.length; i++) {
      commits.push({
        commit: entries[i],
        original: this.getCode(i < entries.length - 1 ? entries[i + 1] : entries[i]),
        modified: this.getCode(entries[i]),
      });
    }
    this.commits.set(commits);
  }

  getCode(commit: BackendSchemaCommit): DiffEditorModel {
    return {
      language: 'json',
      code: JSON.stringify(commit.schema, null, 2),
    };
  }

}

interface CommitEntry {
  commit: BackendSchemaCommit
  original: DiffEditorModel
  modified: DiffEditorModel
}
