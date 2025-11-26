import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private fusio: ApiService) {
  }

  getAll(): Array<GroupItem> {
    const navigation = this.getPossibleEntries();
    let result = [];
    for (let i = 0; i < navigation.entries.length; i++) {
      let children = [];
      for (let j = 0; j < navigation.entries[i].children.length; j++) {
        if (!this.fusio.hasScope(navigation.entries[i].children[j].scope)) {
          continue;
        }

        children.push(navigation.entries[i].children[j])
      }

      if (children.length > 0) {
        let menu = navigation.entries[i];
        menu.children = children;
        result.push(menu);
      }
    }

    return result;
  }

  private getPossibleEntries() {
    return {
      "entries": [
        {
          "title": "API",
          "visible": true,
          "children": [
            {
              "title": "Dashboard",
              "icon": "bi-tablet",
              "path": "/dashboard",
              "scope": "backend.dashboard"
            },
            {
              "title": "Operation",
              "icon": "bi-terminal",
              "path": "/operation",
              "scope": "backend.operation"
            },
            {
              "title": "Action",
              "icon": "bi-code",
              "path": "/action",
              "scope": "backend.action"
            },
            {
              "title": "Schema",
              "icon": "bi-star",
              "path": "/schema",
              "scope": "backend.schema"
            },
            {
              "title": "Connection",
              "icon": "bi-cloud",
              "path": "/connection",
              "scope": "backend.connection"
            },
            {
              "title": "Event",
              "icon": "bi-calendar-event",
              "path": "/event",
              "scope": "backend.event"
            },
            {
              "title": "Cronjob",
              "icon": "bi-alarm",
              "path": "/cronjob",
              "scope": "backend.cronjob"
            },
            {
              "title": "Trigger",
              "icon": "bi-disc",
              "path": "/trigger",
              "scope": "backend.trigger"
            }
          ]
        },
        {
          "title": "Development",
          "visible": false,
          "children": [
            {
              "title": "SDK",
              "icon": "bi-download",
              "path": "/sdk",
              "scope": "backend.sdk"
            },
            {
              "title": "Generator",
              "icon": "bi-cpu",
              "path": "/generator",
              "scope": "backend.generator"
            },
            {
              "title": "Marketplace",
              "icon": "bi-shop-window",
              "path": "/marketplace",
              "scope": "backend.marketplace"
            },
            {
              "title": "Test",
              "icon": "bi-bug",
              "path": "/test",
              "scope": "backend.test"
            }
          ]
        },
        {
          "title": "Consumer",
          "visible": false,
          "children": [
            {
              "title": "App",
              "icon": "bi-app",
              "path": "/app",
              "scope": "backend.app"
            },
            {
              "title": "Scope",
              "icon": "bi-bag",
              "path": "/scope",
              "scope": "backend.scope"
            },
            {
              "title": "User",
              "icon": "bi-person",
              "path": "/user",
              "scope": "backend.user"
            },
            {
              "title": "Rate",
              "icon": "bi-filter",
              "path": "/rate",
              "scope": "backend.rate"
            },
            {
              "title": "Page",
              "icon": "bi-file-earmark-code",
              "path": "/page",
              "scope": "backend.page"
            },
            {
              "title": "Form",
              "icon": "bi-textarea-resize",
              "path": "/form",
              "scope": "backend.form"
            },
            {
              "title": "Webhook",
              "icon": "bi-calendar-plus",
              "path": "/webhook",
              "scope": "backend.webhook"
            }
          ]
        },
        {
          "title": "Analytics",
          "visible": false,
          "children": [
            {
              "title": "Log",
              "icon": "bi-briefcase",
              "path": "/log",
              "scope": "backend.log"
            },
            {
              "title": "Statistic",
              "icon": "bi-bar-chart",
              "path": "/statistic",
              "scope": "backend.statistic"
            },
            {
              "title": "Error",
              "icon": "bi-bell",
              "path": "/error",
              "scope": "backend.log"
            },
            {
              "title": "Token",
              "icon": "bi-file-earmark-binary",
              "path": "/token",
              "scope": "backend.app"
            }
          ]
        },
        {
          "title": "Monetization",
          "visible": false,
          "children": [
            {
              "title": "Plan",
              "icon": "bi-hdd",
              "path": "/plan",
              "scope": "backend.plan"
            },
            {
              "title": "Transaction",
              "icon": "bi bi-wallet",
              "path": "/transaction",
              "scope": "backend.transaction"
            }
          ]
        },
        {
          "title": "System",
          "visible": false,
          "children": [
            {
              "title": "Category",
              "icon": "bi-record",
              "path": "/category",
              "scope": "backend.category"
            },
            {
              "title": "Role",
              "icon": "bi-people",
              "path": "/role",
              "scope": "backend.role"
            },
            {
              "title": "Identity",
              "icon": "bi-file-person",
              "path": "/identity",
              "scope": "backend.identity"
            },
            {
              "title": "Firewall",
              "icon": "bi-bricks",
              "path": "/firewall",
              "scope": "backend.firewall"
            },
            {
              "title": "Config",
              "icon": "bi-gear",
              "path": "/config",
              "scope": "backend.config"
            },
            {
              "title": "Audit",
              "icon": "bi-camera-video",
              "path": "/audit",
              "scope": "backend.audit"
            },
            {
              "title": "Backup",
              "icon": "bi-arrow-down-up",
              "path": "/backup",
              "scope": "backend.backup"
            },
            {
              "title": "Trash",
              "icon": "bi-trash",
              "path": "/trash",
              "scope": "backend.trash"
            }
          ]
        }
      ]
    }
  }

}

export interface GroupItem {
  title: string
  visible: boolean
  children: Array<Item>
}

export interface Item {
  title: string
  icon: string
  path: string
  scope: string
}
