import { Component, OnInit } from '@angular/core';
import navigation from './../../navigation.json';
import packageInfo from './../../../package.json';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  version = packageInfo.version;
  navigation: Array<GroupItem> = navigation.entries;

  constructor() { }

  ngOnInit(): void {
  }

  changeNavHeading(item: GroupItem): void {
    for (let i = 0; i < this.navigation.length; i++) {
      this.navigation[i].visible = this.navigation[i].title === item.title
    }
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
