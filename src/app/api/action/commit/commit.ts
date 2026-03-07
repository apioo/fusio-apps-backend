import {Component, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendAction, BackendActionCommit} from "fusio-sdk";
import {CommitService} from "../../../services/action/commit.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActionService} from "../../../services/action.service";
import {DatePipe, SlicePipe} from "@angular/common";
import {DiffEditorComponent, DiffEditorModel} from "ngx-monaco-editor-v2-alternative";

@Component({
  selector: 'app-action-commit',
  imports: [
    MessageComponent,
    NgbPagination,
    ReactiveFormsModule,
    SearchComponent,
    RouterLink,
    DatePipe,
    SlicePipe,
    FormsModule,
    DiffEditorComponent
  ],
  templateUrl: './commit.html',
  styleUrl: './commit.css',
})
export class Commit extends List<BackendActionCommit> {

  action = signal<BackendAction|undefined>(undefined);

  commits = signal<Array<CommitEntry>>([]);

  constructor(private service: CommitService, private actionService: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
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
          const action = await this.actionService.get(params['id'])
          this.action.set(action);
          this.service.setActionId('' + action.id);
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

  getCode(commit: BackendActionCommit): DiffEditorModel {
    const action = this.action();
    if (!action) {
      return {
        language: 'json',
        code: JSON.stringify(commit.config, null, 2),
      };
    }

    if (action.class === 'Fusio.Adapter.Worker.Action.WorkerPHP' || action.class === 'Fusio.Adapter.Worker.Action.WorkerPHPLocal') {
      return {
        language: 'php',
        code: commit.config?.['code'],
      };
    } else if (action.class === 'Fusio.Adapter.Worker.Action.WorkerJava') {
      return {
        language: 'java',
        code: commit.config?.['code'],
      };
    } else if (action.class === 'Fusio.Adapter.Worker.Action.WorkerJavaScript') {
      return {
        language: 'javascript',
        code: commit.config?.['code'],
      };
    } else if (action.class === 'Fusio.Adapter.Worker.Action.WorkerPython') {
      return {
        language: 'python',
        code: commit.config?.['code'],
      };
    }

    return {
      language: 'json',
      code: JSON.stringify(commit.config, null, 2),
    };
  }

}

interface CommitEntry {
  commit: BackendActionCommit
  original: DiffEditorModel
  modified: DiffEditorModel
}
