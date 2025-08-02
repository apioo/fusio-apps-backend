import {Injectable} from '@angular/core';
import {BackendConnection} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  hasDesignerLink(connection: BackendConnection): boolean {
    return this.getDesignerLink(connection).length > 0;
  }

  getDesignerLink(connection: BackendConnection): Array<string> {
    if (!connection.class) {
      return [];
    }

    if (['Fusio.Adapter.Sql.Connection.Sql', 'Fusio.Adapter.Sql.Connection.SqlAdvanced', 'Fusio.Impl.Connection.System'].includes(connection.class)) {
      return ['/', 'connection', '' + connection.id, 'database'];
    } else if (['Fusio.Adapter.File.Connection.Filesystem'].includes(connection.class)) {
      return ['/', 'connection', '' + connection.id, 'filesystem'];
    } else if (['Fusio.Adapter.Http.Connection.Http'].includes(connection.class)) {
      return ['/', 'connection', '' + connection.id, 'http'];
    } else if (connection.class?.startsWith('Fusio.Adapter.SdkFabric.Connection.')) {
      return ['/', 'connection', '' + connection.id, 'sdk'];
    }

    return [];
  }

}
