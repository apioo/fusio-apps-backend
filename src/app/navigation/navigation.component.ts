import { Component, OnInit } from '@angular/core';
import navigation from './../../navigation.json';
import packageInfo from './../../../package.json';
import {FactoryService} from "../factory.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  version = packageInfo.version;
  navigation: Array<GroupItem> = [];

  constructor(private factory: FactoryService) {
  }

  ngOnInit(): void {
    this.navigation = this.getNavigation();
  }

  changeNavHeading(item: GroupItem): void {
    for (let i = 0; i < this.navigation.length; i++) {
      this.navigation[i].visible = this.navigation[i].title === item.title
    }
  }

  getNavigation() {
    let result = [];
    for (let i = 0; i < navigation.entries.length; i++) {
      let children = [];
      for (let j = 0; j < navigation.entries[i].children.length; j++) {
        if (!this.factory.hasScope(navigation.entries[i].children[j].scope)) {
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

}

interface GroupItem {
  title: string
  visible: boolean
  children: Array<Item>
}

interface Item {
  title: string
  icon: string
  path: string
  scope: string
}
