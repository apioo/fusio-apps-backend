import {Component, computed, inject, input, signal} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendAction, BackendConnection} from "fusio-sdk";
import {ConnectionService} from "../../../../../services/connection.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ApiService} from "../../../../../api.service";
import {Specification} from "ngx-typeschema-editor";
import {FilesystemService} from "../../../../../services/connection/filesystem.service";
import {ClipboardModule} from "ngx-clipboard";
import {ApiFactory} from "../../../../../editor/api";

@Component({
  selector: 'app-action-designer-editor-connection',
  imports: [
    FormsModule,
    RouterLink,
    ClipboardModule
  ],
  templateUrl: './connection.html',
  styleUrl: './connection.css',
})
export class Connection extends List<BackendConnection> {

  private table = inject(TableService);
  private filesystem = inject(FilesystemService);
  private api = inject(ApiService);

  action = input.required<BackendAction>();
  lang = input.required<string>();

  selectedConnection = signal<BackendConnection|undefined>(undefined);

  connectionString = computed<string>(() => {
    const connection = this.selectedConnection();
    if (!connection) {
      return '';
    }

    if (this.lang() === 'java') {
      let variable = 'var client';
      if (connection.class === 'Fusio.Impl.Connection.System' || connection.class === 'Fusio.Adapter.Sql.Connection.Sql' || connection.class === 'Fusio.Adapter.Sql.Connection.SqlAdvanced') {
        variable = 'def connection';
      } else if (connection.class === 'Fusio.Adapter.Http.Connection.Http') {
        variable = 'def httpClient';
      } else if (connection.class === 'Fusio.Adapter.File.Connection.Filesystem') {
        variable = 'def filesystem';
      }

      return variable + ' = connector.getConnection("' + connection.name + '");';
    } else if (this.lang() === 'javascript') {
      let variable = 'const client';
      if (connection.class === 'Fusio.Impl.Connection.System' || connection.class === 'Fusio.Adapter.Sql.Connection.Sql' || connection.class === 'Fusio.Adapter.Sql.Connection.SqlAdvanced') {
        variable = 'const connection';
      } else if (connection.class === 'Fusio.Adapter.Http.Connection.Http') {
        variable = 'const httpClient';
      } else if (connection.class === 'Fusio.Adapter.File.Connection.Filesystem') {
        variable = 'const filesystem';
      }

      return variable + ' = await connector.getConnection(\'' + connection.name + '\');';
    } else if (this.lang() === 'python') {
      let variable = 'client';
      if (connection.class === 'Fusio.Impl.Connection.System' || connection.class === 'Fusio.Adapter.Sql.Connection.Sql' || connection.class === 'Fusio.Adapter.Sql.Connection.SqlAdvanced') {
        variable = 'connection';
      } else if (connection.class === 'Fusio.Adapter.Http.Connection.Http') {
        variable = 'httpClient';
      } else if (connection.class === 'Fusio.Adapter.File.Connection.Filesystem') {
        variable = 'filesystem';
      }

      return variable + ' = connector.get_connection(\'' + connection.name + '\');';
    } else {
      let variable = '$client';
      if (connection.class === 'Fusio.Impl.Connection.System' || connection.class === 'Fusio.Adapter.Sql.Connection.Sql' || connection.class === 'Fusio.Adapter.Sql.Connection.SqlAdvanced') {
        variable = '$connection';
      } else if (connection.class === 'Fusio.Adapter.Http.Connection.Http') {
        variable = '$httpClient';
      } else if (connection.class === 'Fusio.Adapter.File.Connection.Filesystem') {
        variable = '$filesystem';
      }

      return variable + ' = $connector->getConnection(\'' + connection.name + '\');';
    }
  });

  methods = signal<Array<Item>>([]);
  details = signal<Array<Item>>([]);

  constructor(private service: ConnectionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConnectionService {
    return this.service;
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.route.queryParams.subscribe(async (params) => {
      if (params['connection']) {
        try {
          const connection = await this.service.get(params['connection']);
          if (connection) {
            this.selectedConnection.set(connection);

            this.loadConnectionMethods(connection);
            this.loadConnectionDetails(connection);
          }
        } catch (error) {
          this.response.set(this.error.convert(error));
        }
      }
    });
  }

  selectConnection(connectionId: number) {
    this.router.navigate(['/action/designer', this.action().id], {
      queryParams: {
        connection: connectionId
      }
    })
  }

  async loadConnectionMethods(connection: BackendConnection) {
    const lang = this.lang();
    const items: Array<Item> = [];

    if (connection.class === 'Fusio.Impl.Connection.System' || connection.class === 'Fusio.Adapter.Sql.Connection.Sql' || connection.class === 'Fusio.Adapter.Sql.Connection.SqlAdvanced') {
      ApiFactory.factory(lang).getConnectionMethods().forEach((method) => {
        items.push({
          name: method.label,
          link: method.link,
        });
      });
    } else if (connection.class === 'Fusio.Adapter.Http.Connection.Http') {
      ApiFactory.factory(lang).getHttpClientMethods().forEach((method) => {
        items.push({
          name: method.label,
          link: method.link,
        });
      });
    } else if (connection.class === 'Fusio.Adapter.File.Connection.Filesystem') {
      ApiFactory.factory(lang).getFilesystemMethods().forEach((method) => {
        items.push({
          name: method.label,
          link: method.link,
        });
      });
    } else if (connection.class === 'Fusio.Adapter.Worker.Connection.Worker') {
    } else if (connection.class?.startsWith('Fusio.Adapter.SdkFabric.Connection.')) {
      const className = connection.class;
      if (!className) {
        return;
      }

      const typeHubName = className.substring(className.lastIndexOf('.') + 1).toLowerCase();
      const spec = await this.api.getClient().backend().connection().sdk().get('' + connection.id) as Specification;

      if (spec.operations) {
        spec.operations.forEach((operation) => {
          items.push({
            name: operation.name,
            link: 'https://app.typehub.cloud/d/sdkfabric/' + typeHubName
          })
        })
      }
    }

    this.methods.set(items);
  }

  async loadConnectionDetails(connection: BackendConnection) {
    const items: Array<Item> = [];

    if (connection.class === 'Fusio.Impl.Connection.System' || connection.class === 'Fusio.Adapter.Sql.Connection.Sql' || connection.class === 'Fusio.Adapter.Sql.Connection.SqlAdvanced') {
      this.table.setConnection(connection);
      const collection = await this.table.getAll([0, 32]);

      collection.entry?.forEach((entry) => {
        if (!entry.name) {
          return;
        }

        items.push({
          name: entry.name,
          link: ['/connection', connection.id, 'database', entry.name],
        });
      });
    } else if (connection.class === 'Fusio.Adapter.File.Connection.Filesystem') {
      this.filesystem.setConnection(connection);
      const collection = await this.filesystem.getAll([0, 32]);

      collection.entry?.forEach((entry) => {
        if (!entry.name) {
          return;
        }

        items.push({
          name: entry.name,
          link: ['/connection', connection.id, 'filesystem'],
        });
      });
    } else if (connection.class === 'Fusio.Adapter.Http.Connection.Http') {
    } else if (connection.class === 'Fusio.Adapter.Worker.Connection.Worker') {
    } else if (connection.class?.startsWith('Fusio.Adapter.SdkFabric.Connection.')) {
    }

    this.details.set(items);
  }

}

interface Item {
  name: string;
  link?: Array<any>|string;
}
